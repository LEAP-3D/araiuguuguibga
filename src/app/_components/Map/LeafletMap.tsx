'use client';

import 'leaflet/dist/leaflet.css';
import type L from 'leaflet';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker, Circle } from 'react-leaflet';
import { mockVets } from '@/app/_components/HeroSection/mockVets';
import { usePosts } from '@/lib/postsContext';
import { CuteSleepingCatLoader } from '@/app/_components/loading/CuteSleepingCatLoader';

import { hospitalIcon, lostPetIcon } from './MapIcons';
import { useUserLocation } from './useUserLocation';
import { useFilteredMarkers, getRadius } from './useFilteredMarkers';
import MapController from './MapController';
import FullscreenToggle from './FullscreenToggle';
import SidebarList from './SidebarList';
import { SearchBar } from '../HeroSection/searchBar';
import { MapPin } from 'lucide-react';

type Props = {
  selectedType: 'all' | 'lost' | 'vets';
  selectedDistance: '1km' | '3km' | '5km';
};

export default function LeafletMap({ selectedType, selectedDistance }: Props) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isResizingMap, setIsResizingMap] = useState(false);
  const [selectedVetId, setSelectedVetId] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const { posts } = usePosts();
  const userLocation = useUserLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef<L.Map | null>(null);
  const { filteredVets: distanceFilteredVets, filteredPosts: distanceFilteredPosts } = useFilteredMarkers(userLocation, selectedDistance);

  const handleMyLocation = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo(userLocation, 15, { duration: 1.5 });
    }
  };

  const flyToPoint = (lat: number, lng: number, zoom = 15) => {
    mapRef.current?.flyTo([lat, lng], zoom, { duration: 1.1 });
  };

  const handleSelectVet = (vet: (typeof mockVets)[number]) => {
    setSelectedVetId(vet.id);
    setSelectedPostId(null);
    flyToPoint(vet.lat, vet.lng);
  };

  const handleSelectPost = (post: (typeof posts)[number]) => {
    if (!post.location) return;
    const [lat, lng] = post.location.split(',').map(Number);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
    setSelectedPostId(post.id);
    setSelectedVetId(null);
    flyToPoint(lat, lng);
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredVets = useMemo(() => {
    if (!normalizedQuery) return distanceFilteredVets;
    return distanceFilteredVets.filter((vet) => vet.name.toLowerCase().includes(normalizedQuery) || vet.address.toLowerCase().includes(normalizedQuery));
  }, [distanceFilteredVets, normalizedQuery]);

  const filteredPosts = distanceFilteredPosts;

  const handleFullScreenChange = (next: boolean) => {
    setIsResizingMap(true);
    setIsFullScreen(next);
  };

  useEffect(() => {
    if (!mapRef.current) return;
    const invalidate = () => mapRef.current?.invalidateSize();

    invalidate();
    const raf = requestAnimationFrame(invalidate);
    const t1 = setTimeout(invalidate, 120);
    const t2 = setTimeout(invalidate, 280);
    const done = setTimeout(() => setIsResizingMap(false), 420);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(done);
    };
  }, [isFullScreen]);

  return (
    <div className={isFullScreen ? 'fixed inset-0 z-[2000] h-full w-full bg-white p-4' : 'flex h-full w-full justify-center gap-4'}>
      {/* Map panel */}
      <div className={isFullScreen ? 'relative h-full w-full' : 'relative h-full flex-1'}>
        {isResizingMap && (
          <div className="absolute inset-0 z-[2050] flex items-center justify-center bg-white/70 backdrop-blur-[1px] pointer-events-none">
            <div className="h-24 w-24">
              <CuteSleepingCatLoader />
            </div>
          </div>
        )}

        <button
          onClick={handleMyLocation}
          className="absolute cursor-pointer flex items-center gap-1 bottom-4 left-4 z-[1000] bg-[#fe8c09] px-3.5 py-1 text-white font-semibold text-[15px] rounded-2xl shadow hover:bg-orange-50 transition"
        >
          <MapPin className="w-4 h-4" />
          Миний байршил
        </button>

        <FullscreenToggle isFullScreen={isFullScreen} setIsFullScreen={handleFullScreenChange} />

        <MapContainer center={[47.9212, 106.9057]} zoom={13} scrollWheelZoom={false} className="h-full w-full">
          <MapController mapRef={mapRef} />
          <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {userLocation && (
            <>
              <Circle center={userLocation} radius={12} pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 1, weight: 2 }} />
              <Circle center={userLocation} radius={40} pathOptions={{ color: '#3b82f6', fillColor: '#93c5fd', fillOpacity: 0.3, weight: 1 }} />
              <Circle center={userLocation} radius={getRadius(selectedDistance)} pathOptions={{ color: 'orange', fillColor: 'orange', fillOpacity: 0.18, weight: 2.5 }} />
            </>
          )}

          {(selectedType === 'all' || selectedType === 'lost') &&
            posts.map((post) => {
              if (!post.location) return null;
              const [lat, lng] = post.location.split(',').map(Number);
              if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
              return (
                <Marker key={post.id} position={[lat, lng]} icon={lostPetIcon} eventHandlers={{ click: () => handleSelectPost(post) }}>
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

          {(selectedType === 'all' || selectedType === 'vets') &&
            mockVets.map((vet) => (
              <Marker key={vet.id} position={[vet.lat, vet.lng]} icon={hospitalIcon} eventHandlers={{ click: () => handleSelectVet(vet) }}>
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
        </MapContainer>
      </div>

      {!isFullScreen && (
        <div className="flex h-full w-[360px] flex-col">
          <div className="border-b border-gray-100 pb-3">
            <SearchBar query={searchQuery} onChange={setSearchQuery} />
          </div>
          <SidebarList
            selectedType={selectedType}
            filteredVets={filteredVets}
            filteredPosts={filteredPosts}
            selectedVetId={selectedVetId}
            selectedPostId={selectedPostId}
            onSelectVet={handleSelectVet}
            onSelectPost={handleSelectPost}
          />
        </div>
      )}
    </div>
  );
}
