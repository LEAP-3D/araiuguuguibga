'use client';
import { useMemo, useState } from 'react';
import { MapPin } from 'lucide-react';
import LeafletMap from '@/app/_components/Map';
import { NeonGradientCard } from '@/components/ui/neon-gradient-card';

const FILTERS = [
  { id: '', label: 'Бүгд' },
  { id: 'emneleg', label: 'Эмнэлэг' },
  { id: 'lostpets', label: 'Амьтан' },
] as const;

const RADIUS_OPTIONS = ['1km', '3km', '5km'] as const;

export default function Map() {
  const [selectedDistance, setSelectedDistance] = useState<'1km' | '3km' | '5km'>('1km');
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]['id']>(FILTERS[0].id);

  const selectedType = useMemo<'all' | 'lost' | 'vets'>(() => {
    if (activeFilter === 'emneleg') return 'vets';
    if (activeFilter === 'lostpets') return 'lost';
    return 'all';
  }, [activeFilter]);

  return (
    <section className="w-full px-4 py-6 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="pt-6 px-5 flex flex-col gap-2 bg-white rounded-2xl">
          <div className="flex gap-1 items-center">
            <MapPin className="h-8 w-8 text-[#f28a50]" />
            <h1 className="text-2xl font-black text-[#43342D] md:text-3xl" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
              Танд ойр байгаа
            </h1>
          </div>
          <p className="text-sm font-medium text-[#9c6d4d] mb-1">Радиуст багтсан эмнэлэг болон амьтад нь газрын зургийн хажуугийн жагсаалтад харагдана.</p>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex w-fit gap-1.5 rounded-2xl  p-1 text-sm font-medium mb-4">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id)}
                  className={`rounded-xl px-4 py-1.5 cursor-pointer transition ${activeFilter === f.id ? 'bg-[#f28a50] text-white shadow-sm' : 'border border-[#fdb074] bg-[#ffe2cc] text-[#754f37] hover:bg-[#ffc192]'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex w-fit gap-1 rounded-2xl bg-[#ffe2cc] p-1 text-sm font-semibold mb-4">
              {RADIUS_OPTIONS.map((distance) => (
                <button
                  key={distance}
                  type="button"
                  onClick={() => setSelectedDistance(distance)}
                  className={`rounded-xl cursor-pointer px-4 py-1.5 transition ${selectedDistance === distance ? 'bg-[#f28a50] text-white' : 'text-[#8b5f43] hover:bg-orange/50'}`}
                >
                  {distance}
                </button>
              ))}
            </div>
          </div>
          <NeonGradientCard borderSize={1} borderRadius={16} neonColors={{ firstColor: '#f29f67', secondColor: '#ffd1a9' }} innerClassName="bg-white" className="w-full">
            <div className="h-[72vh] p-3">
              <LeafletMap selectedType={selectedType} selectedDistance={selectedDistance} />
            </div>
          </NeonGradientCard>
        </div>
      </div>
    </section>
  );
}
