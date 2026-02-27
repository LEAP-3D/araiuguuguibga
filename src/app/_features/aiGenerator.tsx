'use client';

import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { PetAnalysisResult } from '../_components/types';
import { NeonGradientCard } from '@/components/ui/neon-gradient-card';
import { AiGeneratorTabContent } from './AiGeneratorTabContent';

type TabType = 'general' | 'care' | 'tips';

const TABS: { id: TabType; label: string }[] = [
  { id: 'general', label: 'Ерөнхий' },
  { id: 'care', label: 'Арчилгаа' },
  { id: 'tips', label: 'Зөвлөмж' },
];

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

  return (
    <section id="ai-assistant" className="scroll-mt-28 min-h-[70vh] px-4 py-12" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div className="mx-auto max-w-7xl">
        {/* Header — RescueHeader-тэй ижилхэн */}
        <div className="flex justify-center">
          <div className="mb-8 w-full max-w-7xl px-4">
            <div className="flex flex-col gap-1 items-center">
              <span className="text-3xl font-black text-black md:text-5xl">AI Assistant</span>
              <span className="text-sm font-semibold text-[#fbb2a3] md:text-2xl">Тэжээвэр амьтныхаа нүүр болон бие нь тод гарсан зургийг оруулна уу.</span>
              <span className="text-sm font-semibold text-[#fc5e3e] md:text-base">Энэхүү онош нь мэргэжлийн эмчийн онош биш болохыг анхаарна уу.</span>
            </div>
          </div>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_480px]">
          {/* Зураг оруулах */}
          <div className="flex w-full flex-col">
            <NeonGradientCard borderSize={1} borderRadius={24} neonColors={{ firstColor: '#ff9a56', secondColor: '#FFBE98' }} className="min-h-96">
              <div className="relative min-h-96 w-full overflow-hidden bg-white/50">
                {image ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image} alt="Pet" className="block w-full max-h-[550px] object-contain" />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setResult(null);
                      }}
                      className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-zinc-600 shadow-md transition-all hover:bg-white hover:scale-110 active:scale-90"
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  /* group класс нэмснээр доторх бүх элемент хулгана очиход зэрэг хариу үйлдэл үзүүлнэ */
                  <label className="group flex min-h-96 cursor-pointer flex-col items-center justify-center gap-4 text-zinc-700 transition-all duration-300 active:scale-95">
                    {/* Камерын эможи бүхий бөөрөнхий хэсэг */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fc8d0e] shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-[#fc8d0e]/40">
                      <span className="text-3xl">📸</span>
                    </div>

                    <div className="text-center transition-all duration-300 group-hover:translate-y-1">
                      <p className="text-sm font-bold uppercase tracking-wider">Зураг оруулах</p>
                      <p className="text-xs text-zinc-400 mt-1">PNG, JPG файл сонгоно уу</p>
                    </div>

                    <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                  </label>
                )}
              </div>
            </NeonGradientCard>

            <button
              type="button"
              onClick={analyzePet}
              disabled={!image || loading}
              className={`mt-6 w-full rounded-full px-8 py-3.5 text-sm font-bold md:w-auto md:px-12 
      transition-all duration-200 ease-in-out
      ${
        !image || loading
          ? 'cursor-not-allowed bg-zinc-100 text-zinc-400'
          : 'bg-[#fc8d0e] text-white shadow-lg hover:bg-[#f89d35] hover:scale-[1.02] hover:shadow-xl active:scale-95 active:brightness-90'
      }`}
            >
              {loading ? 'Шинжилж байна...' : 'Шинжилгээг эхлүүлэх'}
            </button>
          </div>

          {/* Үр дүн */}
          <NeonGradientCard borderSize={1} borderRadius={24} neonColors={{ firstColor: '#ff9a56', secondColor: '#FFBE98' }} className="h-[620px] min-h-[480px]">
            <div className="flex h-[620px] min-h-[480px] w-full flex-col overflow-hidden bg-white">
              <div className="border-b border-zinc-100 px-6 py-4">
                <h3 className="flex items-center gap-2 text-xl font-black text-[#43342D]">
                  <span className="h-6 w-1.5 rounded-full bg-[#fc8d0e]" />
                  Үр дүн
                </h3>
              </div>
              <div className="flex shrink-0 flex-wrap justify-center gap-3 border-b border-zinc-100 px-4 py-4">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id)}
                    className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                      activeTab === t.id ? 'bg-[#fc8d0e] text-white shadow-sm' : 'border-2 border-[#fc8d0e] bg-white text-[#fc8d0e] hover:bg-[#fc8d0e]/5'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="custom-scrollbar flex-1 overflow-y-auto bg-amber-50/20 p-6">
                {!result ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4 text-zinc-400">
                    <p className="text-sm font-medium">Мэдээлэл байхгүй</p>
                  </div>
                ) : (
                  <AiGeneratorTabContent result={result} activeTab={activeTab} />
                )}
              </div>
            </div>
          </NeonGradientCard>
        </div>
      </div>
    </section>
  );
}
