'use client';

import { useState } from 'react';
import type { PetAnalysisResult } from '../types';

type AnalysisResultProps = {
  result: PetAnalysisResult | null;
};

export const AnalysisResult = ({ result }: AnalysisResultProps) => {
  const [activeTab, setActiveTab] = useState<'general' | 'care' | 'tips'>('general');

  // Хэрэв үр дүн байхгүй бол хоосон төлөв харуулна
  if (!result)
    return (
      <div
        className="w-full md:w-[450px] bg-white border border-gray-100 rounded-[32px] shadow-2xl flex flex-col h-[550px] items-center justify-center opacity-20"
        style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}
      >
        <span className="text-6xl mb-4">📋</span>
        <p className="text-sm font-bold italic">Мэдээлэл байхгүй</p>
      </div>
    );

  const renderContent = () => {
    // Өгөгдөл дутуу ирсэн үед crash хийхээс сэргийлнэ
    const { general, care, recommendations } = result;

    if (activeTab === 'general')
      return (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Үүлдэр</p>
              <p className="text-sm font-black">{general?.breed || 'Тодорхойгүй'}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Нас / Жин</p>
              <p className="text-sm font-black">
                {general?.age} / {general?.weight}
              </p>
            </div>
          </div>
          <div className="bg-[#fba925] p-5 rounded-3xl text-white shadow-lg" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
            <p className="text-[10px] font-bold uppercase mb-2 opacity-90">
              Хооллолт: {general?.foodGramsPerDay} / {general?.feedingTimesPerDay}
            </p>
            <p className="text-xs leading-relaxed">{general?.foodType}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-3xl border border-red-100 text-red-700" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
            <p className="text-[10px] font-bold uppercase mb-1">⚠️ Хориглох</p>
            <p className="text-xs font-bold">{general?.forbiddenFoods}</p>
          </div>
        </div>
      );

    if (activeTab === 'care')
      return (
        <div className="space-y-3 animate-in fade-in duration-300" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
          {[
            { label: '✂️ Заслага', text: care?.neutering, bg: 'bg-orange-50' },
            { label: '🚿 Усанд орох', text: care?.bathing, bg: 'bg-blue-50' },
            { label: '🐾 Хумс', text: care?.nails, bg: 'bg-gray-50' },
          ].map((item, i) => (
            <div key={i} className={`${item.bg} p-4 rounded-3xl border border-black/5`}>
              <p className="text-[10px] font-bold uppercase mb-1 opacity-60">{item.label}</p>
              <p className="text-sm leading-snug">{item.text || 'Мэдээлэл алга'}</p>
            </div>
          ))}
        </div>
      );

    if (activeTab === 'tips')
      return (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="bg-green-50 p-5 rounded-3xl border border-green-100" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
            <p className="text-[10px] text-green-600 font-bold uppercase mb-2 tracking-widest">💉 Вакцинжуулалт</p>
            <p className="text-sm text-gray-700 leading-relaxed font-bold">{recommendations?.vaccines}</p>
          </div>
          <div className="bg-amber-50 p-5 rounded-3xl border border-amber-100" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
            <p className="text-[10px] text-amber-600 font-bold uppercase mb-2 tracking-widest">💊 Туулгалт</p>
            <p className="text-sm text-gray-700 leading-relaxed">{recommendations?.deworming}</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-inner" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">💡 Ерөнхий зөвлөмж</p>
            <p className="text-xs italic text-gray-500 leading-relaxed">&quot;{recommendations?.extraTips}&quot;</p>
          </div>
        </div>
      );

    return null;
  };

  return (
    <div className="w-full md:w-[450px] bg-white border border-gray-100 rounded-[32px] shadow-2xl flex flex-col h-[550px] overflow-hidden">
      <div className="p-6 border-b border-gray-50 font-black text-gray-900 flex items-center gap-3" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
        <span className="w-2 h-7 bg-[#fba925] rounded-full"></span>
        Үр дүн
      </div>
      <div className="flex px-4 bg-white" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
        {(['general', 'care', 'tips'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 text-[10px] font-black uppercase transition-all
              ${activeTab === tab ? 'text-[#fba925] border-b-4 border-[#fba925]' : 'text-gray-300 hover:text-gray-500'}`}
          >
            {tab === 'general' ? 'Ерөнхий' : tab === 'care' ? 'Арчилгаа' : 'Зөвлөмж'}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30 custom-scrollbar">{renderContent()}</div>
    </div>
  );
};
