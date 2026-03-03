'use client';
import { useMemo, useRef, useState } from 'react';
import type L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, Circle } from 'react-leaflet';
import { mockVets } from '@/app/_components/HeroSection/mockVets';
import { usePosts } from '@/lib/postsContext';
import { useUserLocation } from '@/app/_components/Map/useUserLocation';
import { getRadius, useFilteredMarkers } from '@/app/_components/Map/useFilteredMarkers';
import { hospitalIcon, lostPetIcon } from '@/app/_components/Map/MapIcons';
import MapController from '@/app/_components/Map/MapController';
import MapHeaderOverlay from './_components/mapHeaderOverlay';
import MapBottomSheet from './_components/mapBottomSheet';

type SelectedType = 'all' | 'lost' | 'vets';
type SelectedDistance = '1km' | '3km' | '5km';
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function MobileMapTab() {
  const [selectedDistance, setSelectedDistance] = useState<SelectedDistance>('5km');
  const [selectedType, setSelectedType] = useState<SelectedType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVetId, setSelectedVetId] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [sheetHeight, setSheetHeight] = useState(40);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const dragStartY = useRef<number | null>(null);
  const dragStartHeight = useRef(40);
  const mapRef = useRef<L.Map | null>(null);
  const userLocation = useUserLocation();
  const { posts } = usePosts();
  const { filteredVets: distanceFilteredVets, filteredPosts: distanceFilteredPosts } = useFilteredMarkers(userLocation, selectedDistance);
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const headerOpacity = isMapFullscreen ? 1 : clamp(1 - (sheetHeight - 40) / 45, 0.2, 1);

  const filteredVets = useMemo(
    () => (!normalizedQuery ? distanceFilteredVets : distanceFilteredVets.filter((v) => v.name.toLowerCase().includes(normalizedQuery) || v.address.toLowerCase().includes(normalizedQuery))),
    [distanceFilteredVets, normalizedQuery]
  );
  const filteredPosts = useMemo(
    () => (!normalizedQuery ? distanceFilteredPosts : distanceFilteredPosts.filter((p) => [p.name, p.description, p.location, p.contactPhone].some((x) => x?.toLowerCase().includes(normalizedQuery)))),
    [distanceFilteredPosts, normalizedQuery]
  );
  const flyToPoint = (lat: number, lng: number, zoom = 15) => mapRef.current?.flyTo([lat, lng], zoom, { duration: 1.1 });
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
  const handleMyLocation = () => {
    if (userLocation && mapRef.current) mapRef.current.flyTo(userLocation, 15, { duration: 1.4 });
  };
  const onDragStart = (y: number) => {
    if (isMapFullscreen) return;
    dragStartY.current = y;
    dragStartHeight.current = sheetHeight;
  };
  const onDragMove = (y: number) => {
    if (dragStartY.current === null || isMapFullscreen) return;
    const dy = dragStartY.current - y;
    const next = dragStartHeight.current + (dy / window.innerHeight) * 100;
    setSheetHeight(clamp(next, 28, 90));
  };
  const onDragEnd = () => {
    dragStartY.current = null;
  };
  const toggleSheet = () => setSheetHeight((h) => (h > 60 ? 40 : 86));

  return (
    <section className="relative h-[calc(100dvh-88px)] w-full overflow-hidden">
      <MapContainer center={[47.917245, 106.917727]} zoom={13} scrollWheelZoom className="h-full w-full">
        <MapController mapRef={mapRef} />
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {userLocation && (
          <>
            <Circle center={userLocation} radius={12} pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 1, weight: 2 }} />
            <Circle center={userLocation} radius={40} pathOptions={{ color: '#3b82f6', fillColor: '#93c5fd', fillOpacity: 0.3, weight: 1 }} />
            <Circle center={userLocation} radius={getRadius(selectedDistance)} pathOptions={{ color: '#f28a50', fillColor: '#f28a50', fillOpacity: 0.18, weight: 2.2 }} />
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
                    <p>{post.location}</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        {(selectedType === 'all' || selectedType === 'vets') &&
          mockVets.map((vet) => (
            <Marker key={vet.id} position={[vet.lat, vet.lng]} icon={hospitalIcon} eventHandlers={{ click: () => handleSelectVet(vet) }}>
              <Popup>
                <div className="text-black">
                  <h2 className="font-bold">{vet.name}</h2>
                  <p>{vet.address}</p>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
      <MapHeaderOverlay
        headerOpacity={headerOpacity}
        isMapFullscreen={isMapFullscreen}
        selectedType={selectedType}
        selectedDistance={selectedDistance}
        onToggleFullscreen={() => setIsMapFullscreen((v) => !v)}
        onMyLocation={handleMyLocation}
        onSelectType={setSelectedType}
        onSelectDistance={setSelectedDistance}
      />
      {!isMapFullscreen && (
        <MapBottomSheet
          sheetHeight={sheetHeight}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onDragStart={onDragStart}
          onDragMove={(y) => dragStartY.current !== null && onDragMove(y)}
          onDragEnd={onDragEnd}
          onToggleSheet={toggleSheet}
          sidebarProps={{
            selectedType,
            filteredVets,
            filteredPosts,
            selectedVetId,
            selectedPostId,
            onSelectVet: handleSelectVet,
            onSelectPost: handleSelectPost,
          }}
        />
      )}
    </section>
  );
}
