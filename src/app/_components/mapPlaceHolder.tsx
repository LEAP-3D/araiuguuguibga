import type { Veterinary } from "../_components/types";
import { MapPin, Clock, Navigation } from "lucide-react";

type MapPlaceholderProps = {
  vets: Veterinary[];
  selectedVet: Veterinary | null;
  onSelect: (vet: Veterinary) => void;
};

export function MapPlaceholder({
  vets,
  selectedVet,
  onSelect,
}: MapPlaceholderProps) {
  return (
    <div className="sticky top-24 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
      <div className="aspect-[4/3] p-8">
        <div className="flex h-full flex-col items-center justify-center space-y-4 rounded-xl bg-white/50 backdrop-blur-sm">
          <MapPin className="h-16 w-16 text-orange-500" />
          <p className="text-center font-medium text-gray-700">
            Interactive Map
            <br />
            <span className="text-sm text-gray-500">
              Showing {vets.length} veterinarians nearby
            </span>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {vets.slice(0, 4).map((vet) => (
              <button
                key={vet.id}
                onClick={() => onSelect(vet)}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedVet?.id === vet.id
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <MapPin className="h-3 w-3" />
                {vet.name}
              </button>
            ))}
          </div>
          <button className="mt-4 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
            <Navigation className="h-4 w-4" /> Get Directions
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200 bg-white/80 p-4 backdrop-blur-sm">
        <p className="text-center text-xs text-gray-500">
          <Clock className="inline h-3 w-3" /> with real-time locations
        </p>
      </div>
    </div>
  );
}
