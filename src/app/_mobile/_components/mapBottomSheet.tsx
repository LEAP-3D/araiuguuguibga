'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { SearchBar } from '@/app/_components/HeroSection/searchBar';
import SidebarList from '@/app/_components/Map/SidebarList';
import type { ComponentProps } from 'react';

type SidebarListProps = ComponentProps<typeof SidebarList>;

type Props = {
  sheetHeight: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onDragStart: (y: number) => void;
  onDragMove: (y: number) => void;
  onDragEnd: () => void;
  onToggleSheet: () => void;
  sidebarProps: SidebarListProps;
};

export default function MapBottomSheet({ sheetHeight, searchQuery, onSearchChange, onDragStart, onDragMove, onDragEnd, onToggleSheet, sidebarProps }: Props) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-[1300] transition-[height] duration-200" style={{ height: `${sheetHeight}%` }}>
      <div className="flex h-full flex-col rounded-t-3xl border-t border-[#eed9c8] bg-white/96 px-3 pb-[max(6px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_24px_rgba(0,0,0,0.15)] backdrop-blur-md transition-all duration-200">
        <button
          type="button"
          onTouchStart={(e) => onDragStart(e.touches[0].clientY)}
          onTouchMove={(e) => onDragMove(e.touches[0].clientY)}
          onTouchEnd={onDragEnd}
          onMouseDown={(e) => onDragStart(e.clientY)}
          onMouseMove={(e) => onDragMove(e.clientY)}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onClick={onToggleSheet}
          className="mx-auto mb-2 flex items-center gap-1 text-[#8f6e59]"
        >
          <span className="h-1.5 w-14 rounded-full bg-[#d8c4b2]" />
          {sheetHeight > 60 ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </button>
        <div className="mb-2">
          <SearchBar query={searchQuery} onChange={onSearchChange} />
        </div>
        <div className="min-h-0 flex-1">
          <SidebarList {...sidebarProps} mobileFullHeight />
        </div>
      </div>
    </div>
  );
}
