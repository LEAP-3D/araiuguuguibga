"use client";

import { useMemo, useState } from "react";

export type PetAnalysisResult = {
  petType: string;
  breed: string;
  estimatedAge: string;
  careGuide: string;
  recommendedFood: string;
  forbiddenFood: string;
  vaccineAdvice: string;
};

function isPetAnalysisResult(x: unknown): x is PetAnalysisResult {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.petType === "string" &&
    typeof o.breed === "string" &&
    typeof o.estimatedAge === "string" &&
    typeof o.careGuide === "string" &&
    typeof o.recommendedFood === "string" &&
    typeof o.forbiddenFood === "string" &&
    typeof o.vaccineAdvice === "string"
  );
}

function getErrorMessage(x: unknown): string {
  if (!x || typeof x !== "object") return "Алдаа гарлаа";
  const o = x as Record<string, unknown>;
  return typeof o.error === "string" ? o.error : "Алдаа гарлаа";
}

export function usePetAnalyze() {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PetAnalysisResult | null>(null);
  const [statusText, setStatusText] = useState("");

  const canAnalyze = useMemo(() => !!preview && !loading, [preview, loading]);

  const clearAll = () => {
    setPreview(null);
    setLoading(false);
    setResult(null);
    setStatusText("");
  };

  const analyze = async () => {
    if (!preview || loading) return;

    setLoading(true);
    setResult(null);
    setStatusText("Шинжилж байна...");

    try {
      const res = await fetch("/api/analyze-pet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: preview }),
      });

      // res.json() битгий — HTML/текст ирэх магадлалтай
      const raw = await res.text();

      let parsed: unknown;
      try {
        parsed = JSON.parse(raw);
      } catch {
        console.log("❌ API JSON биш:", raw.slice(0, 600));
        setStatusText("API JSON биш зүйл буцаалаа. Console-оо шалга.");
        return;
      }

      if (!res.ok) {
        setStatusText(getErrorMessage(parsed));
        return;
      }

      if (!isPetAnalysisResult(parsed)) {
        console.log("❌ JSON бүтэц буруу:", parsed);
        setStatusText("AI хариуны бүтэц буруу байна. Дахин оролдоно уу.");
        return;
      }

      setResult(parsed);
      setStatusText("");
    } catch (e) {
      console.error(e);
      setStatusText("Сервертэй холбогдож чадсангүй.");
    } finally {
      setLoading(false);
    }
  };

  return {
    preview,
    setPreview,
    loading,
    canAnalyze,
    result,
    statusText,
    clearAll,
    analyze,
  };
}
