'use client';

import 'leaflet/dist/leaflet.css';
import type L from 'leaflet';
import { useRef, useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker, Circle } from 'react-leaflet';
import { mockVets } from '@/app/_components/HeroSection/mockVets';
import { usePosts } from '@/lib/postsContext';

import { hospitalIcon, lostPetIcon } from './MapIcons';
import { useUserLocation } from './useUserLocation';
import { useFilteredMarkers, getRadius } from './useFilteredMarkers';
import MapController from './MapController';
import FlyToUser from './FlyToUser';
import FullscreenToggle from './FullscreenToggle';
import SidebarList from './SidebarList';
import MapResizeFix from '../HeroSection/MapResizeFix';

type Props = {
  selectedType: 'all' | 'lost' | 'vets';
  selectedDistance: '1km' | '3km' | '5km';
};

export default function LeafletMap({ selectedType, selectedDistance }: Props) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { posts } = usePosts();
  const userLocation = useUserLocation();
  const mapRef = useRef<L.Map | null>(null);
  const { filteredVets, filteredPosts } = useFilteredMarkers(userLocation, selectedDistance);

  const handleMyLocation = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo(userLocation, 15, { duration: 1.5 });
    }
  };

  return (
    <div className={
        isFullScreen
          ? 'fixed inset-0 z-[2000] h-full w-full bg-white p-4'
          : 'w-full flex flex-col md:flex-row gap-3 md:gap-4'}
    >      {/* Map panel */}
      <div className={ isFullScreen ? 'relative h-full w-full' : 'relative w-full h-[55vh] md:h-[70vh] lg:h-[75vh] md:flex-1 overflow-hidden rounded-2xl'}>        <button
          onClick={handleMyLocation}
          className="absolute bottom-4 right-4 z-[1000] bg-[#fe8c09] px-3.5 py-1 text-white font-semibold text-[15px] rounded-2xl shadow hover:bg-orange-50 transition"
        >
          Миний байршил
        </button>

        <FullscreenToggle isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen} />

        <MapContainer key={`${selectedType}-${selectedDistance}`} center={[47.9212, 106.9057]} zoom={13} scrollWheelZoom={false} className="h-full w-full">
          <MapResizeFix/>
          <MapController mapRef={mapRef} />
          <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {userLocation && (
            <>
              <Circle center={userLocation} radius={12} pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 1, weight: 2 }} />
              <Circle center={userLocation} radius={40} pathOptions={{ color: '#3b82f6', fillColor: '#93c5fd', fillOpacity: 0.3, weight: 1 }} />
              <Circle center={userLocation} radius={getRadius(selectedDistance)} pathOptions={{ color: 'orange', fillColor: 'orange', fillOpacity: 0.18, weight: 2.5 }} />
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

      {/* Sidebar */}
    {!isFullScreen && (
      <div className="w-full md:w-[360px] lg:w-[420px] h-[35vh] md:h-[70vh] lg:h-[75vh] overflow-hidden rounded-2xl bg-amber-100/40">
          <SidebarList selectedType={selectedType} filteredVets={filteredVets} filteredPosts={filteredPosts} />
      </div>
  )}    
  </div>
  );
}
