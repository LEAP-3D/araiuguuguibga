"use client";

import { useState } from "react";
import { Sparkles, ImagePlus, Loader2, Scale, UtensilsCrossed } from "lucide-react";
import type { PetAnalysisResult } from "@/app/api/analyze-pet/route";

const MAX_IMAGE_SIZE = 512;

function compressImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      let { width, height } = img;
      if (width > height) {
        if (width > MAX_IMAGE_SIZE) {
          height = (height * MAX_IMAGE_SIZE) / width;
          width = MAX_IMAGE_SIZE;
        }
      } else {
        if (height > MAX_IMAGE_SIZE) {
          width = (width * MAX_IMAGE_SIZE) / height;
          height = MAX_IMAGE_SIZE;
        }
      }
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.75));
    };

    img.onerror = () => resolve("");
    img.src = URL.createObjectURL(file);
  });
}

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
    const dataUrl = await compressImage(file);
    if (dataUrl) {
      setImagePreview(dataUrl);
    }
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

  const formatAge = (r: PetAnalysisResult) => {
    const months = r.ageMonths ?? 0;
    const days = r.ageDays ?? 0;
    if (months >= 12) {
      const years = Math.floor(months / 12);
      const restMonths = months % 12;
      if (restMonths) return `${years} жил ${restMonths} сар`;
      return `${years} жил`;
    }
    if (months) return `${months} сар ${days > 0 ? days + " өдөр" : ""}`.trim();
    return days ? `${days} өдөр` : "—";
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
                <img
                  src={imagePreview}
                  alt="Амьтан"
                  className="mx-auto max-h-64 rounded-lg object-contain"
                />
              </div>
            ) : (
              <>
                <ImagePlus className="h-14 w-14 text-gray-400" />
                <span className="mt-2 text-sm font-medium text-gray-600">
                  Зураг сонгох
                </span>
                <span className="text-xs text-gray-500">
                  JPG, PNG (max 5MB)
                </span>
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

          {error && (
            <p className="mt-3 text-sm text-red-600">{error}</p>
          )}
        </div>

        {result && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Scale className="h-5 w-5 text-[#4f9669]" />
              Амьтны мэдээлэл
            </h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-gray-500">Нас (сар / өдөр)</dt>
                <dd className="text-lg font-medium text-gray-900">
                  {formatAge(result)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Жин (кг)</dt>
                <dd className="text-lg font-medium text-gray-900">
                  {result.weightKg != null ? `${result.weightKg} кг` : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Төрөл / Үүлдэр</dt>
                <dd className="text-lg font-medium text-gray-900">
                  {result.petType || "—"}
                  {result.breed && result.breed !== "Тодорхойгүй" && ` · ${result.breed}`}
                </dd>
              </div>
              <hr className="border-gray-100" />
              <h3 className="flex items-center gap-2 text-base font-semibold text-gray-800">
                <UtensilsCrossed className="h-4 w-4 text-[#4f9669]" />
                Хоолны зөвлөмж
              </h3>
              <div>
                <dt className="text-sm text-gray-500">Өдөрт хэрэгтэй хоол (грамм)</dt>
                <dd className="text-lg font-medium text-gray-900">
                  {result.foodGramsPerDay != null
                    ? `${result.foodGramsPerDay} г/өдөр`
                    : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Өдөрт хэдэн удаа хооллох</dt>
                <dd className="text-lg font-medium text-gray-900">
                  {result.feedingTimesPerDay != null
                    ? `${result.feedingTimesPerDay} удаа`
                    : "—"}
                </dd>
              </div>
              {result.recommendations && (
                <div>
                  <dt className="text-sm text-gray-500">Нэмэлт зөвлөмж</dt>
                  <dd className="mt-1 text-sm text-gray-700">
                    {result.recommendations}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
