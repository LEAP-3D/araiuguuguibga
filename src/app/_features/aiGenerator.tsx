'use client';

import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { PetAnalysisResult } from '../_components/types';

type TabType = 'general' | 'care' | 'tips';

export default function AiGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PetAnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('general');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const analyzePet = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const response = await fetch('/api/ai-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: image }),
      });
      const data: PetAnalysisResult = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    if (!result) return null;
    const { general, care, recommendations } = result;

    if (activeTab === 'general')
      return (
        <div className="space-y-4 animate-in fade-in">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-amber-100 bg-white/90 p-4 shadow-sm">
              <p className="mb-1 text-[10px] font-bold uppercase text-zinc-500">Үүлдэр</p>
              <p className="text-sm font-black">{general.breed}</p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white/90 p-4 shadow-sm">
              <p className="mb-1 text-[10px] font-bold uppercase text-zinc-500">Нас / Жин</p>
              <p className="text-sm font-black">
                {general.age} / {general.weight}
              </p>
            </div>
          </div>
          <div className="rounded-3xl border border-[#FFBE98] bg-[#FFBE98] p-5 text-zinc-900 shadow-lg">
            <p className="mb-2 text-[10px] font-bold uppercase opacity-80">
              Хооллолт: {general.foodGramsPerDay}гр / {general.feedingTimesPerDay}х
            </p>
            <p className="text-xs leading-relaxed">{general.foodType}</p>
          </div>
          <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-red-700">
            <p className="mb-1 text-[10px] font-bold uppercase">⚠️ Хориглох</p>
            <p className="text-xs font-bold">{general.forbiddenFoods}</p>
          </div>
        </div>
      );

    if (activeTab === 'care')
      return (
        <div className="space-y-3 animate-in fade-in">
          {[
            { label: '✂️ Заслага', text: care.neutering, bg: 'bg-amber-50' },
            { label: '🚿 Усанд орох', text: care.bathing, bg: 'bg-sky-50' },
            { label: '🐾 Хумс', text: care.nails, bg: 'bg-stone-50' },
          ].map((item, i) => (
            <div key={i} className={`${item.bg} rounded-3xl border border-black/5 p-4`}>
              <p className="mb-1 text-[10px] font-bold uppercase opacity-60">{item.label}</p>
              <p className="text-sm leading-snug">{item.text}</p>
            </div>
          ))}
        </div>
      );

    return (
      <div className="space-y-4 animate-in fade-in">
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="mb-1 text-xs font-bold text-emerald-700">💉 Вакцин: {recommendations.vaccines}</p>
          <p className="text-xs text-amber-700">💊 Туулга: {recommendations.deworming}</p>
        </div>
        <p className="p-2 text-xs italic text-zinc-500">&quot;{recommendations.extraTips}&quot;</p>
      </div>
    );
  };

  return (
    <div className="mx-auto my-10 w-full max-w-6xl p-4">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black uppercase text-zinc-900">AI Assistant</h1>
        <p className="text-sm font-medium text-[#c77747]">Мэргэжлийн эмчийн онош биш болохыг анхаарна уу.</p>
      </div>

      <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_450px]">
        <div className="flex w-full flex-col items-center rounded-[32px] border border-white/80 bg-white/70 p-4 shadow-[0_18px_45px_rgba(120,72,20,0.08)] backdrop-blur-sm">
          <div className="relative min-h-80 w-full overflow-hidden rounded-[26px] border-2 border-dashed border-[#FFBE98] bg-amber-50/30">
            {image && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="Pet" className="w-full max-h-[500px] object-contain block" />
                <button
                  onClick={() => {
                    setImage(null);
                    setResult(null);
                  }}
                  className="absolute right-4 top-4 z-10 h-8 w-8 rounded-full bg-red-500 text-white"
                >
                  ✕
                </button>
              </>
            )}
            {!image && (
              <label className="flex h-80 cursor-pointer flex-col items-center justify-center">
                <span className="mb-2 text-3xl">📷</span>
                <p className="text-xs font-bold uppercase text-zinc-500">Зураг оруулах</p>
                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              </label>
            )}
          </div>
          <button
            onClick={analyzePet}
            disabled={!image || loading}
            className={`mt-8 w-full rounded-2xl py-3 text-sm font-black uppercase tracking-widest md:w-64 ${!image || loading ? 'bg-zinc-100 text-zinc-400' : 'bg-[#FFBE98] text-zinc-900 shadow-xl hover:brightness-95'}`}
          >
            {loading ? 'Шинжилж байна...' : 'Шинжилгээг эхлүүлэх'}
          </button>
        </div>

        <div className="flex h-[550px] w-full flex-col overflow-hidden rounded-[32px] border border-white/80 bg-white/80 shadow-2xl backdrop-blur-sm md:w-[450px]">
          <div className="border-b border-amber-100 p-6">
            <h3 className="flex items-center gap-3 text-xl font-black text-zinc-900">
              <span className="h-7 w-2 rounded-full bg-[#FFBE98]"></span>Үр дүн
            </h3>
          </div>
          <div className="flex px-4">
            {(
              [
                { id: 'general', l: 'Ерөнхий' },
                { id: 'care', l: 'Арчилгаа' },
                { id: 'tips', l: 'Зөвлөмж' },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as TabType)}
                className={`flex-1 py-4 text-[10px] font-black uppercase ${activeTab === t.id ? 'text-[#be7a54] border-b-4 border-[#FFBE98]' : 'text-zinc-400'}`}
              >
                {t.l}
              </button>
            ))}
          </div>
          <div className="custom-scrollbar flex-1 overflow-y-auto bg-amber-50/20 p-6">
            {!result ? (
              <div className="flex h-full flex-col items-center justify-center opacity-25">
                <span className="mb-4 text-6xl">📋</span>
                <p className="text-sm font-bold italic">Мэдээлэл байхгүй</p>
              </div>
            ) : (
              renderTabContent()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
