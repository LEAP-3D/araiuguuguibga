'use client';

import { MapPin, Maximize2, Minimize2 } from 'lucide-react';

const FILTERS = [
  { id: 'all', label: 'Бүгд' },
  { id: 'vets', label: 'Эмнэлэг' },
  { id: 'lost', label: 'Амьтан' },
] as const;

const RADIUS_OPTIONS = ['1km', '3km', '5km'] as const;

type SelectedType = 'all' | 'lost' | 'vets';
type SelectedDistance = '1km' | '3km' | '5km';

type Props = {
  headerOpacity: number;
  isMapFullscreen: boolean;
  selectedType: SelectedType;
  selectedDistance: SelectedDistance;
  onToggleFullscreen: () => void;
  onMyLocation: () => void;
  onSelectType: (value: SelectedType) => void;
  onSelectDistance: (value: SelectedDistance) => void;
};

export default function MapHeaderOverlay({
  headerOpacity,
  isMapFullscreen,
  selectedType,
  selectedDistance,
  onToggleFullscreen,
  onMyLocation,
  onSelectType,
  onSelectDistance,
}: Props) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-[1200] bg-gradient-to-b from-black/35 via-black/10 to-transparent px-3 pb-8 pt-3 transition-opacity duration-300"
      style={{ opacity: headerOpacity }}
    >
      <div className="pointer-events-auto rounded-2xl bg-white/92 p-3 shadow-md backdrop-blur-sm">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-base font-bold text-[#3c2f26]">Газрын зураг</p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onToggleFullscreen} className="inline-flex items-center gap-1 rounded-full bg-[#ff862f] px-3 py-1 text-xs font-semibold text-white">
              {isMapFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}Бүтэн
            </button>
            <button type="button" onClick={onMyLocation} className="inline-flex items-center gap-1 rounded-full bg-[#f28a50] px-3 py-1 text-xs font-semibold text-white">
              <MapPin className="h-3.5 w-3.5" />
              Миний байршил
            </button>
          </div>
        </div>
        {!isMapFullscreen && (
          <>
            <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => onSelectType(f.id)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${selectedType === f.id ? 'bg-[#f28a50] text-white' : 'border border-[#f4ba92] bg-[#fff5ed] text-[#7a5338]'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {RADIUS_OPTIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => onSelectDistance(d)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${selectedDistance === d ? 'bg-[#3c2f26] text-white' : 'bg-white text-[#7f6a5a] ring-1 ring-[#ead7c7]'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
