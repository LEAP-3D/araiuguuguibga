'use client';
import { useState } from 'react';
import SimpleMap from '@/app/_components/HeroSection/SimpleMap';

export default function Map() {
  const [selected, setSelected] = useState<'1km' | '3km' | '5km'>('1km');
  const [selectedView, setSelectedView] = useState<'map' | 'list'>('map');
  return (
    <div className="h-screen w-screen bg-[#fba7000e] flex flex-col items-center gap-4 pt-3">
      <div className="w-300 h-fit bg-white rounded-2xl flex flex-col gap-3 p-3">
        <div className="flex text-[20px] font-bold">Надад ойр</div>
        <div className="flex gap-4">
          <div className="flex gap-0.5 bg-orange-200 w-fit px-1 py-1 rounded-2xl">
            <div
              onClick={() => setSelected('1km')}
              className={`px-4 py-1 rounded-xl cursor-pointer transition
          ${selected === '1km' ? 'bg-orange-400 text-white' : ' text-orange-950'}`}
            >
              1km
            </div>
            <div
              onClick={() => setSelected('3km')}
              className={`px-4 py-1 rounded-xl cursor-pointer transition
          ${selected === '3km' ? 'bg-orange-400 text-white' : ' text-orange-950'}`}
            >
              3km
            </div>
            <div
              onClick={() => setSelected('5km')}
              className={`px-4 py-1 rounded-xl cursor-pointer transition
          ${selected === '5km' ? 'bg-orange-400 text-white' : ' text-orange-950'}`}
            >
              5km
            </div>
          </div>

          <div className="flex gap-0.5 bg-orange-200 w-fit px-1 py-1 rounded-2xl">
            <div
              onClick={() => setSelectedView('map')}
              className={`px-4 py-1 rounded-xl cursor-pointer transition
          ${selectedView === 'map' ? 'bg-orange-400 text-white' : ' text-orange-950'}`}
            >
              Газрын зургаар
            </div>
            <div
              onClick={() => setSelectedView('list')}
              className={`px-4 py-1 rounded-xl cursor-pointer transition
          ${selectedView === 'list' ? 'bg-orange-400 text-white' : ' text-orange-950'}`}
            >
              Жагсаалтаар
            </div>
          </div>
        </div>
      </div>
      <SimpleMap center={[47.9212, 106.9057]} zoom={12} className="h-96 w-full" />
    </div>
  );
}
