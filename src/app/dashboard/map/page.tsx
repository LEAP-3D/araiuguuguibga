'use client';
import { useState } from 'react';
import LeafletMap from '@/app/_components/Map';
import ListView from '@/app/_components/Map/ListView';

export default function Map() {
  const [selected, setSelected] = useState<'1km' | '3km' | '5km'>('1km');
  const [selectedView, setSelectedView] = useState<'map' | 'list'>('map');
  const [selectedType, setSelectedType] = useState<'all' | 'lost' | 'vets'>('all');

  return (
    <div className="w-full flex flex-col items-center gap-3 px-3 pb-[calc(env(safe-area-inset-bottom)+96px)]">
      {/* Controls */}
      <div className="w-full max-w-[450px] md:max-w-none md:w-[calc(100%-48px)] lg:w-[calc(100%-80px)] h-fit bg-white rounded-2xl flex flex-col gap-3 p-3 md:p-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-6 w-full items-start md:items-center">
          <p className="text-[22px] md:text-[25px] font-bold ml-0 md:ml-5">Надад ойр</p>

          <div className="flex flex-col gap-2 items-start md:items-end w-full md:w-auto">
            <div className="flex flex-wrap gap-1.5 w-full md:w-fit py-1 rounded-2xl font-medium text-sm">
              <div
                onClick={() => setSelectedType('all')}
                className={`px-4 py-1 rounded-xl cursor-pointer transition ${
                  selectedType === 'all' ? 'bg-orange-400 text-white' : 'bg-amber-50 border border-orange-200 text-orange-950'
                }`}
              >
                All
              </div>
              <div
                onClick={() => setSelectedType('lost')}
                className={`px-4 py-1 rounded-xl cursor-pointer transition ${
                  selectedType === 'lost' ? 'bg-orange-400 text-white' : 'bg-amber-50 border border-orange-200 text-orange-950'
                }`}
              >
                Lost Pets
              </div>
              <div
                onClick={() => setSelectedType('vets')}
                className={`px-4 py-1 rounded-xl cursor-pointer transition ${
                  selectedType === 'vets' ? 'bg-orange-400 text-white' : 'bg-amber-50 border border-orange-200 text-orange-950'
                }`}
              >
                Vets
              </div>
            </div>

            <div className="flex flex-wrap gap-3 font-medium text-sm w-full md:w-auto">
              <div className="flex gap-0.5 bg-orange-200 w-fit px-1 py-1 rounded-2xl">
                {(['1km', '3km', '5km'] as const).map((d) => (
                  <div
                    key={d}
                    onClick={() => setSelected(d)}
                    className={`px-4 py-1 rounded-xl cursor-pointer transition ${selected === d ? 'bg-orange-400 text-white' : 'text-orange-950'}`}
                  >
                    {d}
                  </div>
                ))}
              </div>

              <div className="flex gap-0.5 bg-orange-200 w-fit px-1 py-1 rounded-2xl">
                <div
                  onClick={() => setSelectedView('map')}
                  className={`px-4 py-1 rounded-xl cursor-pointer transition ${selectedView === 'map' ? 'bg-orange-400 text-white' : 'text-orange-950'}`}
                >
                  Газрын зургаар
                </div>
                <div
                  onClick={() => setSelectedView('list')}
                  className={`px-4 py-1 rounded-xl cursor-pointer transition ${selectedView === 'list' ? 'bg-orange-400 text-white' : 'text-orange-950'}`}
                >
                  Жагсаалтаар
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

       <div className="w-full max-w-[450px] md:max-w-none md:w-[calc(100%-48px)] lg:w-[calc(100%-80px)] rounded-2xl bg-white overflow-hidden h-[72vh] md:h-auto md:flex-1">
        {selectedView === 'map' ? <LeafletMap selectedType={selectedType} selectedDistance={selected} /> : <ListView />}
      </div>
    </div>
  );
}