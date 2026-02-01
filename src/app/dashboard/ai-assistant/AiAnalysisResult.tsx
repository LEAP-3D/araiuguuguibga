"use client";

import { Scale, UtensilsCrossed } from "lucide-react";
import type { PetAnalysisResult } from "@/app/api/analyze-pet/route";

function formatAge(r: PetAnalysisResult) {
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
}

export function AiAnalysisResult({ result }: { result: PetAnalysisResult }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
        <Scale className="h-5 w-5 text-[#4f9669]" />
        Амьтны мэдээлэл
      </h2>
      <dl className="space-y-4">
        <div>
          <dt className="text-sm text-gray-500">Нас (сар / өдөр)</dt>
          <dd className="text-lg font-medium text-gray-900">{formatAge(result)}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Жин (кг)</dt>
          <dd className="text-lg font-medium text-gray-900">
            {result.weightKg !== undefined && result.weightKg !== null
              ? `${result.weightKg} кг`
              : "—"}
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
            {result.foodGramsPerDay !== undefined && result.foodGramsPerDay !== null
              ? `${result.foodGramsPerDay} г/өдөр`
              : "—"}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Өдөрт хэдэн удаа хооллох</dt>
          <dd className="text-lg font-medium text-gray-900">
            {result.feedingTimesPerDay !== undefined && result.feedingTimesPerDay !== null
              ? `${result.feedingTimesPerDay} удаа`
              : "—"}
          </dd>
        </div>
        {result.recommendations && (
          <div>
            <dt className="text-sm text-gray-500">Нэмэлт зөвлөмж</dt>
            <dd className="mt-1 text-sm text-gray-700">{result.recommendations}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
