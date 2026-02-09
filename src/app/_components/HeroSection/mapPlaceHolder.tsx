'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Veterinary } from '../types';
import MapResizeFix from '../HeroSection/MapResizeFix';

const userIcon = new L.Icon({
  iconUrl: '/map.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

type Props = {
  vets: Veterinary[];
  selectedVet: Veterinary | null;
  onSelect: (vet: Veterinary) => void;
  temporaryVet: Veterinary | null;
  userLocation: { lat: number; lng: number } | null;
  onMapClick: (lat: number, lng: number) => void;
  onTempChange?: (vet: Veterinary) => void;
  onCancelTemp: () => void;
};
export default function MapPlaceholder({ vets, selectedVet, onSelect, temporaryVet, userLocation, onMapClick, onTempChange, onCancelTemp }: Props) {
  const isClient = typeof window !== 'undefined';
  const [mapReady, setMapReady] = useState(false);
  if (!isClient) return null;
  function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
    useMapEvents({
      click(e) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  }
  function FlyToSelectedVet({ vet }: { vet: Veterinary | null }) {
    const map = useMap();
    useEffect(() => {
      if (!vet) return;

      map.flyTo([vet.lat, vet.lng], 15, {
        animate: true,
        duration: 0.8,
      });
    }, [vet, map]);
    return null;
  }

  return (
    <div className="h-[400px] w-full md:h-[600px] lg:h-[600px]">
      <MapContainer center={[47.9212, 106.9057]} zoom={12} whenReady={() => setMapReady(true)} style={{ height: '100%', width: '100%' }} className="rounded-xl">
        {mapReady && <MapResizeFix />}

        <FlyToSelectedVet vet={selectedVet} />

        <MapClickHandler onMapClick={onMapClick} />

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* User location */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>Таны байршил</Popup>
          </Marker>
        )}

        {/* Temporary vet */}
        {temporaryVet && (
          <Marker position={[temporaryVet.lat, temporaryVet.lng]}>
            <Popup>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Эмнэлгийн нэр"
                  className="border p-1"
                  value={temporaryVet.name}
                  onChange={(e) =>
                    onTempChange?.({
                      ...temporaryVet,
                      name: e.target.value,
                    })
                  }
                />
                <button onClick={onCancelTemp} className="bg-red-500 text-white px-2 py-1 rounded text-xs mt-1">
                  Цуцлах
                </button>
              </div>
            </Popup>
          </Marker>
        )}

        {vets.map((vet) => (
          <Marker
            key={vet.id}
            position={[vet.lat, vet.lng]}
            eventHandlers={{
              click: () => onSelect(vet),
            }}
          >
            <Popup>
              <strong>{vet.name}</strong>
              <span className="block text-xs">{vet.address}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
