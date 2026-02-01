"use client";

import { useState } from "react";
import { Sparkles, ImagePlus, Loader2 } from "lucide-react";
import { compressImage } from "@/lib/compressImage";
import type { PetAnalysisResult } from "@/app/api/analyze-pet/route";
import { AiAnalysisResult } from "./AiAnalysisResult";

export default function AiAssistantPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<PetAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setResult(null);
    const dataUrl = await compressImage(file, 512);
    if (dataUrl) setImagePreview(dataUrl);
    e.target.value = "";
  };

  const handleAnalyze = async () => {
    if (!imagePreview) {
      setError("Эхлээд амьтны зураг оруулна уу");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analyze-pet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: imagePreview }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Алдаа гарлаа");
      }
      const data = (await res.json()) as PetAnalysisResult;
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Алдаа гарлаа");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <Sparkles className="h-7 w-7 text-[#4f9669]" />
          AI Туслах
        </h1>
        <p className="text-gray-600">
          Хайртай амьтныхаа зураг оруулаад нас, жин, хоолны зөвлөмж аваарай
        </p>
      </div>
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <label
            htmlFor="pet-image"
            className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 transition-colors hover:border-[#4f9669]/50 hover:bg-[#4f9669]/5"
          >
            {imagePreview ? (
              <div className="relative w-full">
                {/* eslint-disable-next-line @next/next/no-img-element -- dynamic data URL preview */}
                <img
                  src={imagePreview}
                  alt="Амьтан"
                  className="mx-auto max-h-64 rounded-lg object-contain"
                />
              </div>
            ) : (
              <>
                <ImagePlus className="h-14 w-14 text-gray-400" />
                <span className="mt-2 text-sm font-medium text-gray-600">Зураг сонгох</span>
                <span className="text-xs text-gray-500">JPG, PNG (max 5MB)</span>
              </>
            )}
            <input
              id="pet-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              disabled={isLoading}
            />
          </label>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!imagePreview || isLoading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#4f9669] px-6 py-3 font-medium text-white transition-colors hover:bg-[#458559] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Шинжилж байна...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Шинжилж үзэх
                </>
              )}
            </button>
            {imagePreview && !isLoading && (
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setResult(null);
                }}
                className="rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Цэвэрлэх
              </button>
            )}
          </div>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>
        {result && <AiAnalysisResult result={result} />}
      </div>
    </div>
  );
}
