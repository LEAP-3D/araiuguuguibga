import { Star, Phone, Navigation } from "lucide-react";
import type { Veterinary } from "../_components/types";

type VetCardProps = {
  vet: Veterinary;
  selected: boolean;
  onSelect: (vet: Veterinary) => void;
};

export function VetCard({ vet, selected, onSelect }: VetCardProps) {
  return (
    <div
      onClick={() => onSelect(vet)}
      className={`cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md ${
        selected
          ? "border-orange-500 ring-2 ring-orange-500/20"
          : "border-gray-100"
      }`}
    >
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900">{vet.name}</h3>
              {vet.isOpen && (
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                  Open
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">📍 {vet.distance}</p>
          </div>
          {vet.emergency && (
            <span className="rounded-lg bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
              24/7
            </span>
          )}
        </div>

        <p className="mb-2 text-sm text-gray-600">
          {vet.address}, {vet.city}, {vet.state}
        </p>

        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
            <span className="font-semibold text-gray-900">{vet.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({vet.reviewCount})</span>
          <span className="text-gray-300">•</span>
          <span className="text-sm text-gray-600">{vet.hours}</span>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {vet.services.map((s) => (
            <span
              key={s}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 font-medium text-white transition-colors hover:bg-orange-600">
            <Phone className="h-4 w-4" /> Call
          </button>
          <button className="flex items-center justify-center rounded-lg border border-gray-200 px-4 py-2.5 transition-colors hover:bg-gray-50">
            <Navigation className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
