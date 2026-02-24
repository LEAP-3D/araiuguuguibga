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
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Үүлдэр</p>
              <p className="text-sm font-black">{general.breed}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Нас / Жин</p>
              <p className="text-sm font-black">
                {general.age} / {general.weight}
              </p>
            </div>
          </div>
          <div className="bg-[#fba925] p-5 rounded-3xl text-white shadow-lg">
            <p className="text-[10px] font-bold uppercase mb-2 opacity-90">
              Хооллолт: {general.foodGramsPerDay}гр / {general.feedingTimesPerDay}х
            </p>
            <p className="text-xs leading-relaxed">{general.foodType}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-3xl border border-red-100 text-red-700">
            <p className="text-[10px] font-bold uppercase mb-1">⚠️ Хориглох</p>
            <p className="text-xs font-bold">{general.forbiddenFoods}</p>
          </div>
        </div>
      );

    if (activeTab === 'care')
      return (
        <div className="space-y-3 animate-in fade-in">
          {[
            { label: '✂️ Заслага', text: care.neutering, bg: 'bg-orange-50' },
            { label: '🚿 Усанд орох', text: care.bathing, bg: 'bg-blue-50' },
            { label: '🐾 Хумс', text: care.nails, bg: 'bg-gray-50' },
          ].map((item, i) => (
            <div key={i} className={`${item.bg} p-4 rounded-3xl border border-black/5`}>
              <p className="text-[10px] font-bold uppercase mb-1 opacity-60">{item.label}</p>
              <p className="text-sm leading-snug">{item.text}</p>
            </div>
          ))}
        </div>
      );

    return (
      <div className="space-y-4 animate-in fade-in">
        <div className="bg-green-50 p-4 rounded-3xl border border-green-100">
          <p className="text-xs font-bold text-green-700 mb-1 font-bold">💉 Вакцин: {recommendations.vaccines}</p>
          <p className="text-xs text-amber-700">💊 Туулга: {recommendations.deworming}</p>
        </div>
        <p className="text-xs italic text-gray-400 p-2">&quot;{recommendations.extraTips}&quot;</p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-10 p-4">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-gray-900 uppercase">AI Assistant</h1>
        <p className="text-[#fba925] text-sm font-medium">Мэргэжлийн эмчийн онош биш болохыг анхаарна уу.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 w-full flex flex-col items-center">
          <div className="relative w-full rounded-[32px] overflow-hidden bg-gray-50 min-h-80 border-2 border-dashed border-gray-300">
            {image && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="Pet" className="w-full max-h-[500px] object-contain block" />
                <button
                  onClick={() => {
                    setImage(null);
                    setResult(null);
                  }}
                  className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full z-10"
                >
                  ✕
                </button>
              </>
            )}
            {!image && (
              <label className="flex flex-col items-center justify-center h-80 cursor-pointer">
                <span className="text-3xl mb-2">📷</span>
                <p className="font-bold text-gray-400 text-xs uppercase">Зураг оруулах</p>
                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              </label>
            )}
          </div>
          <button
            onClick={analyzePet}
            disabled={!image || loading}
            className={`mt-8 w-full md:w-64 py-3 rounded-2xl font-black text-sm uppercase tracking-widest ${!image || loading ? 'bg-gray-100 text-gray-400' : 'bg-[#fba925] text-white shadow-xl'}`}
          >
            {loading ? 'Шинжилж байна...' : 'Шинжилгээг эхлүүлэх'}
          </button>
        </div>

        <div className="w-full md:w-[450px] bg-white border border-gray-100 rounded-[32px] shadow-2xl flex flex-col h-[550px] overflow-hidden">
          <div className="p-6 border-b border-gray-50">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
              <span className="w-2 h-7 bg-[#fba925] rounded-full"></span>Үр дүн
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
                className={`flex-1 py-4 text-[10px] font-black uppercase ${activeTab === t.id ? 'text-[#fba925] border-b-4 border-[#fba925]' : 'text-gray-300'}`}
              >
                {t.l}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30 custom-scrollbar">
            {!result ? (
              <div className="h-full flex flex-col items-center justify-center opacity-20">
                <span className="text-6xl mb-4">📋</span>
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
