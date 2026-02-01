"use client";

import dynamic from "next/dynamic";
import type { Veterinary } from "../_components/types";
import { MapPin, Navigation } from "lucide-react";

const GoogleMapView = dynamic(
  () =>
    import("./GoogleMap").then((mod) => ({ default: mod.GoogleMapView })),
  { ssr: false }
);

type MapPlaceholderProps = {
  vets: Veterinary[];
  selectedVet: Veterinary | null;
  onSelect: (vet: Veterinary | null) => void;
  className?: string;
};

export function MapPlaceholder({
  vets,
  selectedVet,
  onSelect,
  className = "",
}: MapPlaceholderProps) {
  const hasGoogleMapsKey = typeof process !== "undefined" && !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (hasGoogleMapsKey) {
    return (
      <div
        className={`flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 shadow-sm ${className}`}
      >
        <GoogleMapView
          vets={vets}
          selectedVet={selectedVet}
          onSelect={onSelect}
          className="flex-1 min-h-0"
        />
        <div className="shrink-0 border-t border-gray-200 bg-white/90 px-4 py-2">
          <p className="text-center text-xs text-gray-500">
            © Google Maps
          </p>
        </div>
      </div>
    );
  }

  // Placeholder when no API key
  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm ${className}`}
    >
      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-4 p-6 text-center">
          <div className="rounded-full bg-[#4f9669]/10 p-4">
            <MapPin className="h-12 w-12 text-[#4f9669]" />
          </div>
          <p className="text-sm font-medium text-gray-700">
            Google Maps
          </p>
          <p className="text-xs text-gray-500">
            Харагдахын тулд .env.local дээр <code className="rounded bg-gray-200 px-1">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> тохируулна уу
          </p>
          <p className="text-xs text-gray-500">
            {vets.length} эмнэлэг ойролцоо байна
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {vets.slice(0, 5).map((vet) => (
              <button
                key={vet.id}
                onClick={() => onSelect(vet)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedVet?.id === vet.id
                    ? "bg-[#4f9669] text-white shadow-md"
                    : "bg-white text-gray-700 shadow-sm hover:bg-gray-50"
                }`}
              >
                <MapPin className="h-3 w-3" />
                {vet.name}
              </button>
            ))}
          </div>
          <a
            href="https://console.cloud.google.com/apis/credentials"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
          >
            <Navigation className="h-4 w-4" />
            API Key авах
          </a>
        </div>
      </div>
      <div className="shrink-0 border-t border-gray-200 bg-white/90 px-4 py-2">
        <p className="text-center text-xs text-gray-500">
          Google Maps API key шаардлагатай
        </p>
      </div>
    </div>
  );
}
