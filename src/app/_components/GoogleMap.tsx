"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import type { Veterinary } from "./types";

const defaultCenter = { lat: 47.9212, lng: 106.9057 }; // Ulaanbaatar

type GoogleMapViewProps = {
  vets: Veterinary[];
  selectedVet: Veterinary | null;
  onSelect: (vet: Veterinary | null) => void;
  className?: string;
};

function InvalidKeyFallback({ className }: { className?: string }) {
  return (
    <div
      className={`flex h-full flex-col items-center justify-center gap-4 rounded-xl bg-amber-50 p-6 text-center ${className || ""}`}
    >
      <p className="font-semibold text-amber-900">InvalidKeyMapError – API key буруу эсвэл олдсонгүй</p>
      <div className="max-w-md space-y-2 text-left text-sm text-amber-800">
        <p><strong>1. API key шалгах:</strong></p>
        <p>
          <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console → Credentials</a> дээр очоод key-ээ шалгана уу. Key зөв хуулагдсан эсэх, зай/тэмдэгт алга эсэхийг шалгана уу.
        </p>
        <p><strong>2. Maps JavaScript API идэвхжүүлэх:</strong></p>
        <p>
          <a href="https://console.cloud.google.com/apis/library/maps-backend.googleapis.com" target="_blank" rel="noopener noreferrer" className="underline">Maps JavaScript API</a> идэвхжүүлсэн эсэхийг шалгана уу.
        </p>
        <p><strong>3. Billing идэвхжүүлэх:</strong></p>
        <p>
          <a href="https://console.cloud.google.com/billing" target="_blank" rel="noopener noreferrer" className="underline">Billing</a> холбосон эсэхийг шалгана уу. Google Maps ашиглахын тулд billing заавал хэрэгтэй.
        </p>
        <p><strong>4. HTTP referrers тохируулах:</strong></p>
        <p>
          API key → Application restrictions → HTTP referrers: <code className="rounded bg-amber-200 px-1">http://localhost:*/*</code>, <code className="rounded bg-amber-200 px-1">https://your-domain.com/*</code> гэх мэт нэмнэ үү.
        </p>
        <p><strong>5. .env.local тохируулах:</strong></p>
        <p>
          <code className="rounded bg-amber-200 px-1">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...</code> гэж .env.local дээр тавьж, dev server-ээ дахин асаана уу.
        </p>
      </div>
    </div>
  );
}

export function GoogleMapView({
  vets,
  selectedVet,
  onSelect,
  className = "",
}: GoogleMapViewProps) {
  const [keyError, setKeyError] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey || "",
  });

  // Google sets gm_authFailure when key is invalid
  useEffect(() => {
    (window as unknown as { gm_authFailure?: () => void }).gm_authFailure = () => {
      setKeyError(true);
    };
    return () => {
      delete (window as unknown as { gm_authFailure?: () => void }).gm_authFailure;
    };
  }, []);

  const mapCenter = useMemo(() => {
    if (selectedVet?.coordinates) {
      return {
        lat: selectedVet.coordinates.lat,
        lng: selectedVet.coordinates.lng,
      };
    }
    if (vets.length > 0 && vets[0].coordinates) {
      return {
        lat: vets[0].coordinates.lat,
        lng: vets[0].coordinates.lng,
      };
    }
    return defaultCenter;
  }, [vets, selectedVet]);

  const onMapLoad = useCallback(() => {}, []);

  if (!apiKey) return null;

  if (loadError || keyError) {
    return <InvalidKeyFallback className={className} />;
  }

  if (!isLoaded) {
    return (
      <div
        className={`flex h-full items-center justify-center rounded-xl bg-gray-100 ${className}`}
      >
        <p className="text-sm text-gray-500">Газрын зураг ачааллаж байна...</p>
      </div>
    );
  }

  return (
    <div className={`h-full w-full overflow-hidden rounded-xl ${className}`}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%", borderRadius: "12px" }}
        center={mapCenter}
        zoom={13}
        onLoad={onMapLoad}
        options={{
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        }}
      >
        {vets.map(
          (vet) =>
            vet.coordinates && (
              <Marker
                key={vet.id}
                position={{
                  lat: vet.coordinates.lat,
                  lng: vet.coordinates.lng,
                }}
                onClick={() => onSelect(vet)}
              />
            )
        )}
        {selectedVet?.coordinates && (
          <InfoWindow
            position={{
              lat: selectedVet.coordinates.lat,
              lng: selectedVet.coordinates.lng,
            }}
            onCloseClick={() => onSelect(null)}
          >
            <div className="p-2">
              <p className="font-semibold">{selectedVet.name}</p>
              <p className="text-sm text-gray-600">{selectedVet.address}</p>
              <p className="text-sm">{selectedVet.phone}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
