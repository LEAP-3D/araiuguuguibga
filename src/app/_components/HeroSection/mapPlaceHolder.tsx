'use client';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import type { Veterinary } from '../types';
import L from 'leaflet';

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
  onMapClick: (lat: number, lng: number) => void;
  onSaveTemp: (vet: Veterinary) => void;
  onCancelTemp: () => void;
};

function AddMarker({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapPlaceHolder({ vets, selectedVet: _selectedVet, onSelect, temporaryVet, onMapClick, onSaveTemp, onCancelTemp }: Props) {
  return (
    <MapContainer center={[47.9212, 106.9057]} zoom={12} className="h-full w-full rounded-xl">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <AddMarker onMapClick={onMapClick} />

      {vets.map((vet) => (
        <Marker key={vet.id} position={[vet.lat, vet.lng]} eventHandlers={{ click: () => onSelect(vet) }}>
          <Popup>{vet.name}</Popup>
        </Marker>
      ))}

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
    </MapContainer>
  );
}
