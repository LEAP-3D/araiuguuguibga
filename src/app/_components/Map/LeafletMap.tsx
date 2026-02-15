'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { mockVets } from '@/app/_components/HeroSection/mockVets'; // adjust path
import { usePosts } from '@/lib/postsContext';

const hospitalIcon = new L.Icon({
  iconUrl: '/hospitalMapPin.svg', // your svg file
  iconSize: [30, 41], // same as default marker
  iconAnchor: [12, 41], // bottom center (IMPORTANT)
  popupAnchor: [1, -34], // popup position
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});
const lostPetIcon = new L.Icon({
  iconUrl: '/foundPin.svg', // your svg file
  iconSize: [30, 41], // same as default marker
  iconAnchor: [12, 41], // bottom center (IMPORTANT)
  popupAnchor: [1, -34], // popup position
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

type Props = {
  selectedType: 'all' | 'lost' | 'vets';
  selectedDistance: '1km' | '3km' | '5km';
};

export default function LeafletMap({ selectedType }: Props) {
  const { posts } = usePosts();

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
          posts.map((post) => {
            if (!post.location) return null;

            const [lat, lng] = post.location.split(',').map(Number);

            if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

            return (
              <Marker key={post.id} position={[lat, lng]} icon={lostPetIcon}>
                <Popup>
                  <div className="text-black">
                    <h2 className="font-bold">{post.name}</h2>
                    <p>{post.description}</p>
                    <p>📞 {post.contactPhone}</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
}
