'use client';

import type { PetAnalysisResult } from '../_components/types';

type TabType = 'general' | 'care' | 'tips';

export function AiGeneratorTabContent({ result, activeTab }: { result: PetAnalysisResult; activeTab: TabType }) {
  if (!result) return null;
  const { general, care, recommendations } = result;

  if (activeTab === 'general')
    return (
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="mb-1 text-[10px] font-bold uppercase text-amber-800/80">Үүлдэр</p>
            <p className="text-sm font-bold text-[#43342D]">{general.breed}</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="mb-1 text-[10px] font-bold uppercase text-amber-800/80">Нас / Жин</p>
            <p className="text-sm font-bold text-[#43342D]">
              {general.age} / {general.weight}
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-amber-50/80 p-4">
          <p className="mb-1 text-[10px] font-bold uppercase text-amber-800/80">
            Хооллолт · {general.foodGramsPerDay}гр / {general.feedingTimesPerDay}х
          </p>
          <p className="text-sm leading-relaxed text-zinc-700">{general.foodType}</p>
        </div>
        <div className="rounded-2xl border border-red-200/70 bg-red-50/80 p-4">
          <p className="mb-1 text-[10px] font-bold uppercase text-red-700">Хориглох</p>
          <p className="text-sm font-medium text-red-700">{general.forbiddenFoods}</p>
        </div>
      </div>
    );

  if (activeTab === 'care')
    return (
      <div className="space-y-4">
        {[
          { label: 'Заслага', text: care.neutering },
          { label: 'Усанд орох', text: care.bathing },
          { label: 'Хумс', text: care.nails },
        ].map((item, i) => (
          <div key={i} className="rounded-2xl border border-zinc-200 bg-amber-50/60 p-4">
            <p className="mb-1 text-[10px] font-bold uppercase text-amber-800/80">{item.label}</p>
            <p className="text-sm leading-relaxed text-zinc-700">{item.text}</p>
          </div>
        ))}
      </div>
    );

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-zinc-200 bg-emerald-50/80 p-4">
        <p className="mb-1 text-[10px] font-bold uppercase text-emerald-700/90">Вакцин</p>
        <p className="text-sm text-emerald-800">{recommendations.vaccines}</p>
      </div>
      <div className="rounded-2xl border border-zinc-200 bg-emerald-50/60 p-4">
        <p className="mb-1 text-[10px] font-bold uppercase text-emerald-700/90">Туулга</p>
        <p className="text-sm text-emerald-800">{recommendations.deworming}</p>
      </div>
      <div className="rounded-2xl border border-zinc-200 bg-amber-50/60 p-4">
        <p className="text-sm italic leading-relaxed text-zinc-600">{recommendations.extraTips}</p>
      </div>
    </div>
  );
}
