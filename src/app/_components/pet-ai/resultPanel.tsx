"use client";

import { Textarea } from "@/components/ui/textarea";
import { InfoBlock, InfoRow } from "./ui";
import type { PetAnalysisResult } from "./usePetAnalyz";

type Props = {
  loading: boolean;
  result: PetAnalysisResult | null;
  statusText: string;
};

export default function ResultPanel({ loading, result, statusText }: Props) {
  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-slate-900">Шинжилгээний үр дүн</div>

        {result ? (
          <span className="text-xs px-2 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100">
            Бэлэн
          </span>
        ) : (
          <span className="text-xs px-2 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-100">
            {loading ? "Ажиллаж байна" : "Хүлээж байна"}
          </span>
        )}
      </div>

      {result ? (
        <div className="mt-4 space-y-4">
          <InfoRow label="Амьтны төрөл" value={result.petType} />
          <InfoRow label="Үүлдэр" value={result.breed} />
          <InfoRow label="Ойролцоох нас" value={result.estimatedAge} />

          <InfoBlock title="Арчилгаа" text={result.careGuide} />
          <InfoBlock title="Идэж болох" text={result.recommendedFood} />
          <InfoBlock title="Идэж болохгүй" text={result.forbiddenFood} />
          <InfoBlock title="Вакцин зөвлөмж" text={result.vaccineAdvice} />
        </div>
      ) : (
        <div className="mt-4">
          <Textarea
            value={statusText}
            readOnly
            placeholder="Зургаа оруулаад “AI-р шинжлэх” дарвал энд мэдээлэл гарна."
            className="min-h-[240px] rounded-2xl"
          />
        </div>
      )}
    </div>
  );
}
