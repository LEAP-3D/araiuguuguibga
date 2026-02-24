'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker, Circle, useMap } from 'react-leaflet';
import { mockVets } from '@/app/_components/HeroSection/mockVets';
import { usePosts } from '@/lib/postsContext';

const hospitalIcon = new L.Icon({
  iconUrl: '/hospitalMapPin.svg',
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const lostPetIcon = new L.Icon({
  iconUrl: '/foundPin.svg',
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

type Props = {
  selectedType: 'all' | 'lost' | 'vets';
  selectedDistance: '1km' | '3km' | '5km';
};

// Captures the map instance into the ref
function MapController({ mapRef }: { mapRef: React.MutableRefObject<L.Map | null> }) {
  const map = useMap();
  useEffect(() => {
    mapRef.current = map;
  }, [map]);
  return null;
}

function FlyToUser({ location }: { location: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo(location, 15);
    }
  }, [location]);
  return null;
}

export default function LeafletMap({ selectedType, selectedDistance }: Props) {
  const { posts } = usePosts();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => console.error(err)
    );
  }, []);

  const getRadius = () => {
    if (selectedDistance === '1km') return 1000;
    if (selectedDistance === '3km') return 3000;
    return 5000;
  };

  const handleMyLocation = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo(userLocation, 15, { duration: 1.5 });
    }
  };

  return (
    <div className="h-130 w-220 relative">
      {/* Button sits on top of the map */}
      <button onClick={handleMyLocation} className="absolute top-4 right-4 z-[1000] bg-white px-3 py-2 rounded-lg shadow hover:bg-orange-50 transition">
        📍 My Location
      </button>

      <MapContainer center={[47.9212, 106.9057]} zoom={13} scrollWheelZoom={false} className="h-full w-full">
        <MapController mapRef={mapRef} />

        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {userLocation && (
          <>
            {/* Blue dot for user */}
            <Circle center={userLocation} radius={12} pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 1, weight: 2 }} />
            {/* Outer pulse ring */}
            <Circle center={userLocation} radius={40} pathOptions={{ color: '#3b82f6', fillColor: '#93c5fd', fillOpacity: 0.3, weight: 1 }} />
            {/* Distance radius */}
            <Circle center={userLocation} radius={getRadius()} pathOptions={{ color: 'orange', fillColor: 'orange', fillOpacity: 0.08, weight: 1.5 }} />
            <FlyToUser location={userLocation} />
          </>
        )}

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
