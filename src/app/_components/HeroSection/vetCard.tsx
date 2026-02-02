'use client';
import { Star, Phone, MapPin, Clock, Building2, Trash2, Edit3 } from 'lucide-react';
import type { Veterinary } from '../types';

type VetCardProps = {
  vet: Veterinary;
  selected: boolean;
  onSelect: (vet: Veterinary) => void;
  onDelete: (vet: Veterinary) => void;
  onEdit: (vet: Veterinary) => void;
};

const categoryLabels: Record<string, string> = {
  emneleg: 'Эмнэлэг',
  klinik: 'Клиник',
  yaaraltai: 'Яаралтай',
  emiin_san: 'Эмийн сан',
};

export function VetCard({ vet, selected, onSelect, onDelete, onEdit }: VetCardProps) {
  const category = categoryLabels[vet.category ?? 'emneleg'] ?? 'Эмнэлэг';

  return (
    <div
      onClick={() => onSelect(vet)}
      className={`cursor-pointer overflow-hidden rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md ${selected ? 'border-[#4f9669] ring-2 ring-[#4f9669]/20' : 'border-gray-200'}`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-start gap-2">
          <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-gray-900">{vet.name}</h3>
            <p className="text-xs text-gray-500">{category}</p>
          </div>
        </div>

        <span className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${vet.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{vet.isOpen ? 'Нээлттэй' : 'Хаалттай'}</span>
      </div>

      <div className="space-y-1.5 text-xs text-gray-600">
        <p className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" />
          <span className="line-clamp-1">{vet.address}</span>
        </p>
        <p className="flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5 shrink-0 text-gray-400" />
          {vet.phone || '—'}
        </p>
        <p className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 shrink-0 text-gray-400" />
          {vet.hours || '—'}
        </p>
        <p className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" />
          <span className="font-medium text-gray-900">{vet.rating}</span>
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {vet.services.slice(0, 4).map((s) => (
          <span key={s} className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-700">
            {s}
          </span>
        ))}
        {vet.services.length > 4 && <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">+{vet.services.length - 4}</span>}
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(vet);
          }}
          className="flex items-center gap-1 rounded bg-blue-500 px-2 py-1 text-white text-xs"
        >
          <Edit3 className="h-3 w-3" /> Засах
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(vet);
          }}
          className="flex items-center gap-1 rounded bg-red-500 px-2 py-1 text-white text-xs"
        >
          <Trash2 className="h-3 w-3" /> Устгах
        </button>
      </div>
    </div>
  );
}
