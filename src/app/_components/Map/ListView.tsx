'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Veterinary } from '@/app/_components/types';
import dynamic from 'next/dynamic';
import { SearchBar } from '@/app/_components/HeroSection/searchBar';
import { NoResults } from '@/app/_components/noResult';
import { mockVets } from '@/app/_components/HeroSection/mockVets';
import { motion } from 'framer-motion';
import { VetCard } from '@/app/_components/HeroSection/vetCard';

const FILTERS = [
  { id: '', label: 'Бүгд' },
  { id: 'emneleg', label: 'Эмнэлэг' },
  { id: 'duudlagaar_uzdeg', label: 'Дуудлагаар үздэг' },
  { id: 'emiin_san', label: 'Эмийн сан' },
] as const;

// Радиусын сонголтууд
const RADIUS_OPTIONS = [2000, 3000, 4000, 5000] as const;

const MapPlaceholder = dynamic(() => import('@/app/_components/HeroSection/mapPlaceHolder'), { ssr: false });

export default function ListView() {
  const [selectedVet, setSelectedVet] = useState<Veterinary | null>(null);
  const [temporaryVet, setTemporaryVet] = useState<Veterinary | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]['id']>(FILTERS[0].id);
  const [clinics, setClinics] = useState<Veterinary[]>(mockVets);
  const [radius, setRadius] = useState<number>(1000); // Default 1km

  // Байршлын default утга (UB)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        // Эрх өгөөгүй бол null хэвээр үлдэж, Map доторх "Байршил асаах" товч харагдана
        console.log('Байршил тогтоох эрх хаалттай байна.');
      }
    );
  }, []);

  const filteredVets = clinics.filter((vet) => {
    const matchesSearch = vet.name.toLowerCase().includes(searchQuery.toLowerCase()) || vet.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === '' || vet.category?.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  const handleSaveTemp = (vet: Veterinary) => {
    if (!vet.name) return;
    setClinics([...clinics, vet]);
    setTemporaryVet(null);
  };

  return (
    <div className="w-320 h-230 bg-white rounded-2xl">
      <section id="vets" className="scroll-mt-28 min-h-[70vh] px-4 mt-3">
        {/* Radius Selector (Шинээр нэмэгдсэн) */}
        <div className="border-b border-gray-100 p-3 ">
          <p className="text-[15px] font-bold text-[#ff9500] mb-3 uppercase tracking-widest">Хайх радиус</p>
          <div className="flex gap-1.5">
            {RADIUS_OPTIONS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRadius(r)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all border ${
                  radius === r ? 'bg-[#feab2f] border-[#feab2f] text-white shadow-sm' : 'bg-white border-[#feab2f] text-gray-800 hover:border-gray-300'
                }`}
              >
                {r < 1000 ? `${r}м` : `${r / 1000}км`}
              </button>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, ease: 'easeOut' }} className="leading-tight">
          <div className="mx-auto flex  max-w-7xl flex-col gap-4 lg:flex-row lg:gap-6">
            {/* Map Хэсэг */}
            <div className="min-h-0 flex-1 rounded-xl overflow-hidden shadow-sm relative">
              <MapPlaceholder
                vets={filteredVets}
                selectedVet={selectedVet}
                onSelect={setSelectedVet}
                temporaryVet={temporaryVet}
                userLocation={userLocation}
                setUserLocation={setUserLocation}
                radius={radius}
                onMapClick={(lat, lng) => setTemporaryVet({ id: Date.now().toString(), name: '', lat, lng, rating: 0, services: [], isOpen: false, phone: [''], address: '', category: ['emneleg'] })}
                onSaveTemp={handleSaveTemp}
                onCancelTemp={() => setTemporaryVet(null)}
              />
            </div>

            {/* Sidebar Хэсэг */}
            <div className="flex min-h-0 h-200 w-full flex-col rounded-xl border border-gray-200 bg-white shadow-sm lg:w-[350px] lg:flex-initial">
              {/* Search */}
              <div className="border-b border-gray-100 p-3">
                <SearchBar query={searchQuery} onChange={setSearchQuery} />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-1 border-b border-gray-100 p-3 overflow-x-auto">
                <button type="button" className="rounded p-1 text-gray-400 hover:bg-gray-100 shrink-0">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex flex-1 gap-2 overflow-x-auto no-scrollbar py-1">
                  {FILTERS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setActiveFilter(f.id)}
                      className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${activeFilter === f.id ? 'bg-[#feab2f] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                <button type="button" className="rounded p-1 text-gray-400 hover:bg-gray-100 shrink-0">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Vet list */}
              <div className="min-h-0 flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                {filteredVets.length > 0 ? (
                  filteredVets.map((vet) => <VetCard key={vet.id} vet={vet} selected={selectedVet?.id === vet.id} onSelect={setSelectedVet} />)
                ) : (
                  <div className="flex flex-col items-center gap-3 py-12 text-center">
                    <NoResults />
                  </div>
                )}
              </div>
              <div className="border-t border-gray-100 px-4 py-3 bg-gray-50/30">
                <p className="text-center text-xs font-medium text-gray-400">Нийт {filteredVets.length} байршил олдлоо</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
