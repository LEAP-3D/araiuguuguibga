'use client';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockVets } from '@/app/_components/HeroSection/mockVets';

const hospitalIcon = new L.Icon({
  iconUrl: '/hospitalPin.svg',
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

export default function HospitalsMapClient({ className = 'h-full w-full' }: { className?: string }) {
  return (
    <div className={className}>
      <MapContainer center={[47.917245, 106.917727]} zoom={12} scrollWheelZoom={false} className="h-full w-full rounded-2xl">
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {mockVets.slice(0, 10).map((vet) => (
          <Marker key={vet.id} position={[vet.lat, vet.lng]} icon={hospitalIcon}>
            <Popup>
              <div className="text-sm">
                <p className="font-bold">{vet.name}</p>
                <p>{vet.address}</p>
                <p>{vet.isOpen ? 'Нээлттэй' : 'Хаалттай'}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
