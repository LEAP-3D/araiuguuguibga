'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Veterinary } from '../types';
import L from 'leaflet';

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
  onSelect: (vet: Veterinary | null) => void;
  temporaryVet: Veterinary | null;
  userLocation: { lat: number; lng: number } | null;
  onMapClick: (lat: number, lng: number) => void;
  onSaveTemp: (vet: Veterinary) => void;
  onCancelTemp: () => void;
};

export default function MapPlaceholder({ vets, selectedVet: _selectedVet, userLocation, temporaryVet, onSaveTemp, onCancelTemp }: Props) {
  return (
    <MapContainer center={[47.9212, 106.9057]} zoom={12} className="h-full w-full rounded-xl">
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
              <input type="text" placeholder="Эмнэлгийн нэр" className="border p-1" value={temporaryVet.name} onChange={(e) => onSaveTemp({ ...temporaryVet, name: e.target.value })} />
              <div className="flex gap-2">
                <button onClick={() => onSaveTemp(temporaryVet)} className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                  Хадгалах
                </button>
                <button onClick={onCancelTemp} className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                  Цуцлах
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      )}

      {/* All vets */}
      {vets.map((vet) => (
        <Marker key={vet.id} position={[vet.lat, vet.lng]}>
          <Popup>
            <div className="flex flex-col gap-1">
              <strong>{vet.name}</strong>
              <span className="text-xs">{vet.address}</span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
