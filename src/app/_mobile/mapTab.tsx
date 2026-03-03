'use client';
import { useMemo, useRef, useState } from 'react';
import type L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, Circle } from 'react-leaflet';
import { ChevronDown, ChevronUp, MapPin, Maximize2, Minimize2 } from 'lucide-react';
import { mockVets } from '@/app/_components/HeroSection/mockVets';
import { SearchBar } from '@/app/_components/HeroSection/searchBar';
import SidebarList from '@/app/_components/Map/SidebarList';
import { usePosts } from '@/lib/postsContext';
import { useUserLocation } from '@/app/_components/Map/useUserLocation';
import { getRadius, useFilteredMarkers } from '@/app/_components/Map/useFilteredMarkers';
import { hospitalIcon, lostPetIcon } from '@/app/_components/Map/MapIcons';
import MapController from '@/app/_components/Map/MapController';

const FILTERS = [
  { id: 'all', label: 'Бүгд' },
  { id: 'vets', label: 'Эмнэлэг' },
  { id: 'lost', label: 'Амьтан' },
] as const;
const RADIUS_OPTIONS = ['1km', '3km', '5km'] as const;
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
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1200] bg-gradient-to-b from-black/35 via-black/10 to-transparent px-3 pb-8 pt-3 transition-opacity duration-300"
        style={{ opacity: headerOpacity }}
      >
        <div className="pointer-events-auto rounded-2xl bg-white/92 p-3 shadow-md backdrop-blur-sm">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-base font-bold text-[#3c2f26]">Газрын зураг</p>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setIsMapFullscreen((v) => !v)} className="inline-flex items-center gap-1 rounded-full bg-[#ff862f] px-3 py-1 text-xs font-semibold text-white">
                {isMapFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}Бүтэн
              </button>
              <button type="button" onClick={handleMyLocation} className="inline-flex items-center gap-1 rounded-full bg-[#f28a50] px-3 py-1 text-xs font-semibold text-white">
                <MapPin className="h-3.5 w-3.5" />
                Миний байршил
              </button>
            </div>
          </div>
          {!isMapFullscreen && (
            <>
              <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedType(f.id)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${selectedType === f.id ? 'bg-[#f28a50] text-white' : 'border border-[#f4ba92] bg-[#fff5ed] text-[#7a5338]'}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {RADIUS_OPTIONS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDistance(d)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${selectedDistance === d ? 'bg-[#3c2f26] text-white' : 'bg-white text-[#7f6a5a] ring-1 ring-[#ead7c7]'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {!isMapFullscreen && (
        <div className="absolute inset-x-0 bottom-0 z-[1300] transition-[height] duration-200" style={{ height: `${sheetHeight}%` }}>
          <div className="flex h-full flex-col rounded-t-3xl border-t border-[#eed9c8] bg-white/96 px-3 pb-[max(6px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_24px_rgba(0,0,0,0.15)] backdrop-blur-md transition-all duration-200">
            <button
              type="button"
              onTouchStart={(e) => onDragStart(e.touches[0].clientY)}
              onTouchMove={(e) => onDragMove(e.touches[0].clientY)}
              onTouchEnd={onDragEnd}
              onMouseDown={(e) => onDragStart(e.clientY)}
              onMouseMove={(e) => dragStartY.current !== null && onDragMove(e.clientY)}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
              onClick={toggleSheet}
              className="mx-auto mb-2 flex items-center gap-1 text-[#8f6e59]"
            >
              <span className="h-1.5 w-14 rounded-full bg-[#d8c4b2]" />
              {sheetHeight > 60 ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </button>
            <div className="mb-2">
              <SearchBar query={searchQuery} onChange={setSearchQuery} />
            </div>
            <div className="min-h-0 flex-1">
              <SidebarList
                selectedType={selectedType}
                filteredVets={filteredVets}
                filteredPosts={filteredPosts}
                selectedVetId={selectedVetId}
                selectedPostId={selectedPostId}
                onSelectVet={handleSelectVet}
                onSelectPost={handleSelectPost}
                mobileFullHeight
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
