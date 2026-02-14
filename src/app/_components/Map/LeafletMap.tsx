'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { mockVets } from '@/app/_components/HeroSection/mockVets'; // adjust path
import { mockLostPets } from '@/app/_components/HeroSection/mockLostPets';

const hospitalIcon = new L.Icon({
  iconUrl: '/hospitalPin.svg', // your svg file
  iconSize: [20, 20], // size
  iconAnchor: [20, 40], // bottom center
  popupAnchor: [0, -40],
});
const lostPetIcon = new L.Icon({
  iconUrl: '/lostPetPin.svg', // your svg file
  iconSize: [20, 20], // size
  iconAnchor: [20, 40], // bottom center
  popupAnchor: [0, -40],
});

type Props = {
  selectedType: 'all' | 'lost' | 'vets';
  selectedDistance: '1km' | '3km' | '5km';
};

export default function LeafletMap({ selectedType }: Props) {
  return (
    <div className="h-130 w-220 ">
      <MapContainer center={[47.9212, 106.9057]} zoom={13} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {(selectedType === 'all' || selectedType === 'vets') &&
          mockVets.map((vet) => (
            <Marker key={vet.id} position={[vet.lat, vet.lng]} icon={hospitalIcon}>
              <Popup>
                <div>
                  <h2>{vet.name}</h2>
                  <p>{vet.address}</p>
                  <p>⭐ {vet.rating}</p>
                  <p>{vet.hours}</p>
                  <p>{vet.isOpen ? '🟢 Open' : '🔴 Closed'}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        {(selectedType === 'all' || selectedType === 'lost') &&
          mockLostPets.map((pet) => (
            <Marker key={pet.id} position={[pet.lat, pet.lng]} icon={lostPetIcon}>
              <Popup>
                <h2>{pet.title}</h2>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
