'use client';
import { useState } from 'react';
import LeafletMap from '@/app/_components/Map';
import ListView from '@/app/_components/Map/ListView';

export default function Map() {
  const [selected, setSelected] = useState<'1km' | '3km' | '5km'>('1km');
  const [selectedView, setSelectedView] = useState<'map' | 'list'>('map');
  const [selectedType, setSelectedType] = useState<'all' | 'lost' | 'vets'>('all');

  return (
    <div className="h-screen w-screen flex flex-col items-center gap-4 ">
      <div className="w-320 h-fit bg-white rounded-2xl flex flex-col gap-3 p-3 items-end">
        <div className="flex justify-between w-320 pl-4">
          <p className="text-[25px] font-bold ml-5">Надад ойр</p>
          <div className="flex flex-col gap-2 items-end">
            <div className="flex gap-1.5 w-fit py-1 rounded-2xl font-medium text-sm">
              <div
                onClick={() => setSelectedType('all')}
                className={`px-4 py-1 rounded-xl cursor-pointer transition
          ${selectedType === 'all' ? 'bg-orange-400 text-white' : 'bg-amber-50  border border-orange-200 text-orange-950'}`}
              >
                All
              </div>
              <div
                onClick={() => setSelectedType('lost')}
                className={`px-4 py-1 rounded-xl cursor-pointer transition
          ${selectedType === 'lost' ? 'bg-orange-400 text-white' : 'bg-amber-50 border border-orange-200 text-orange-950'}`}
              >
                Lost Pets
              </div>
              <div
                onClick={() => setSelectedType('vets')}
                className={`px-4 py-1 rounded-xl cursor-pointer transition
          ${selectedType === 'vets' ? 'bg-orange-400 text-white' : 'bg-amber-50 border border-orange-200 text-orange-950'}`}
              >
                Vets
              </div>
            </div>
            <div className="flex gap-4 font-medium text-sm">
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
        </div>
      </div>
      {selectedView === 'map' ? <LeafletMap selectedType={selectedType} selectedDistance={selected} /> : <ListView />}
    </div>
  );
}
