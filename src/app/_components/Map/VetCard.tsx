import { Building2, Clock, MapPin, Phone, Star } from 'lucide-react';
import type { mockVets } from '@/app/_components/HeroSection/mockVets';

type Vet = (typeof mockVets)[number];

type Props = {
  vet: Vet;
  onClick?: () => void;
  selected?: boolean;
};

export default function VetCard({ vet, onClick, selected = false }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border p-3 text-left shadow-sm transition md:w-65 ${
        selected ? 'border-orange-400 bg-orange-50 ring-1 ring-orange-300' : 'bg-white hover:border-orange-200 hover:bg-orange-50/40'
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-start gap-2">
          <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-gray-900">{vet.name}</h3>
            <p className="text-xs text-gray-500">{vet.category}</p>
          </div>
        </div>
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
    </button>
  );
}
