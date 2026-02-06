'use client';

import { useState, useEffect } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Veterinary } from '../_components/types';
import dynamic from 'next/dynamic';
import { SearchBar } from '../_components/HeroSection/searchBar';
import { NoResults } from '../_components/noResult';
import { mockVets } from '../_components/HeroSection/mockVets';
import { VetCard } from '../_components/HeroSection/vetCard';
import { motion } from 'framer-motion';

// Filter options
const FILTERS = [
  { id: '', label: 'Бүгд' },
  { id: 'emneleg', label: 'Эмнэлэг' },
  { id: 'duudlagaar_uzdeg', label: 'Дуудлагаар үздэг' },
  { id: 'emiin_san', label: 'Эмийн сан' },
] as const;

// Map component SSR=false
const MapPlaceholder = dynamic(() => import('../_components/HeroSection/mapPlaceHolder'), { ssr: false });

export function VeterinarySection() {
  const [selectedVet, setSelectedVet] = useState<Veterinary | null>(null);
  const [temporaryVet, setTemporaryVet] = useState<Veterinary | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]['id']>(FILTERS[0].id);
  const [askLocation, setAskLocation] = useState(false);
  const [clinics, setClinics] = useState<Veterinary[]>(mockVets);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({
    lat: 47.9183, // ✅ UB-ийн default координат
    lng: 106.917,
  });

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setAskLocation(false);
      },
      () => {
        setAskLocation(true);
      }
    );
  }, []);

  const filteredVets = clinics.filter((vet) => {
    const matchesSearch = vet.name.toLowerCase().includes(searchQuery.toLowerCase()) || vet.address.toLowerCase().includes(searchQuery.toLowerCase());

    // Default filter = '' буюу бүгдийг харуулна
    const matchesFilter = activeFilter === '' || vet.category?.includes(activeFilter);

    return matchesSearch && matchesFilter;
  });

  // Save temporary vet
  const handleSaveTemp = (vet: Veterinary) => {
    if (!vet.name) return;
    setClinics([...clinics, vet]);
    setTemporaryVet(null);
  };

  return (
    <section id="vets" className="min-h-[70vh] px-4 py-12">
      <div className="mb-8 text-center">
<<<<<<< HEAD
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, ease: 'easeOut' }} className="leading-tight">
          <h2 className="text-3xl md:text-6xl font-bold text-black drop-shadow-sm">
            Танд хамгийн ойр байгаа <span className="text-[#E8B07E]">мал эмнэлэгүүд</span>
          </h2>

          <p className="mt-3 text-sm md:text-base text-gray-600">Яаралтай үед ойр байгаа эмнэлэгүүдийн байршил болон мэдээллийг эндээс харж болно</p>
        </motion.div>
=======
        <div className="mb-2 inline-flex items-center align-center gap-2 rounded-full px-4 py-1.5">
          <MapPin className="h-9 w-9 text-[#cd1c18]" />
          <span className="block text-2xl md:text-4xl font-bold text-gray-700 drop-shadow-sm" style={{ fontFamily: "'Comic Sans MS', 'Marker Felt', 'Chalkboard SE', cursive", color: '#43342D' }}>
            Танд хамгийн ойр байгаа <span>эмнэлэгүүд</span>
          </span>
        </div>
        <p className="block text-2xl md:text-1xl font-bold drop-shadow-sm" style={{ fontFamily: "'Comic Sans MS', 'Marker Felt', 'Chalkboard SE', cursive", color: '#86D2D9' }}>Яаралтай үед ойр байгаа эмнэлэгүүдийн байршил болон мэдээллийг эндээс харж болно</p>
>>>>>>> origin/115-hero-zaya
      </div>

      <div className="mx-auto flex h-[600px] max-w-7xl flex-col gap-4 lg:flex-row lg:gap-6">
        {/* Map */}
        <div className="min-h-0 flex-1 rounded-xl overflow-hidden shadow-sm">
          <MapPlaceholder
            vets={filteredVets}
            selectedVet={selectedVet}
            onSelect={setSelectedVet}
            temporaryVet={temporaryVet}
            userLocation={userLocation}
<<<<<<< HEAD
            onMapClick={(lat, lng) =>
              setTemporaryVet({
                id: Date.now().toString(),
                name: '',
                lat,
                lng,
                rating: 0,
                services: [],
                isOpen: false,
                phone: [''],
                address: '',
                category: ['emneleg'],
              })
            }
            onTempChange={setTemporaryVet}
=======
            onMapClick={(lat, lng) => setTemporaryVet({ id: Date.now().toString(), name: '', lat, lng, rating: 0, services: [], isOpen: false, phone: [''], address: '', category: ['emneleg'] })}
            onSaveTemp={handleSaveTemp}
>>>>>>> origin/115-hero-zaya
            onCancelTemp={() => setTemporaryVet(null)}
          />
        </div>
        {askLocation && (
          <div className="mb-3 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800">
            📍 Өөрт ойр эмнэлэг харахын тулд location-оо асаана уу
            <button onClick={() => { setAskLocation(false); navigator.geolocation?.getCurrentPosition((pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }), () => setAskLocation(true)); }} className="ml-2 font-medium underline">Байршил асаах</button>
          </div>
        )}

        {/* Sidebar */}
        <div className="flex min-h-0 w-full flex-col rounded-xl border border-gray-200 bg-white shadow-sm lg:w-[350px] lg:flex-initial">
          {/* Search */}
          <div className="border-b border-gray-100 p-3">
            <SearchBar query={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1 border-b border-gray-100 p-3">
            <button type="button" className="rounded p-1 text-gray-400 hover:bg-gray-100" aria-label="Зүүн">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex flex-1 flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium ${activeFilter === f.id ? 'bg-[#4f9669] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <button type="button" className="rounded p-1 text-gray-400 hover:bg-gray-100" aria-label="Баруун">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Vet list */}
          <div className="min-h-0 flex-1 overflow-y-auto p-3 space-y-3">
            {filteredVets.length > 0 ? (
              filteredVets.map((vet) => <VetCard key={vet.id} vet={vet} selected={selectedVet?.id === vet.id} onSelect={setSelectedVet} />)
            ) : (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <NoResults />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-4 py-3">
            <p className="text-center text-sm text-gray-500">{filteredVets.length} эмнэлэг олдлоо</p>
          </div>
        </div>
      </div>
    </section>
  );
}
