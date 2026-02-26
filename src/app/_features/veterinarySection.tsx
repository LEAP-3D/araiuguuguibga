'use client';

import { useState, useEffect } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Veterinary } from '../_components/types';
import dynamic from 'next/dynamic';
import { SearchBar } from '../_components/HeroSection/searchBar';
import { NoResults } from '../_components/noResult';
import { mockVets } from '../_components/HeroSection/mockVets';
import { motion } from 'framer-motion';
import { VetCard } from '../_components/HeroSection/vetCard';
import { NeonGradientCard } from '@/components/ui/neon-gradient-card';

const FILTERS = [
  { id: '', label: 'Бүгд' },
  { id: 'emneleg', label: 'Эмнэлэг' },
  { id: 'duudlagaar_uzdeg', label: 'Дуудлагаар үздэг' },
  { id: 'emiin_san', label: 'Эмийн сан' },
] as const;

// Радиусын сонголтууд
const RADIUS_OPTIONS = [2000, 3000, 4000, 5000] as const;

const MapPlaceholder = dynamic(() => import('../_components/HeroSection/mapPlaceHolder'), { ssr: false });

export function VeterinarySection() {
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
    <section id="vets" className="scroll-mt-28 min-h-[70vh] px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, ease: 'easeOut' }} className="leading-tight">
        <div className="mb-8 text-center">
          <div className="mb-2 inline-flex items-center align-center gap-2 rounded-full px-4 py-1.5">
            <MapPin className="h-9 w-9 text-[#cd1c18]" />
            <span className="block text-2xl md:text-4xl font-bold text-black " style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif', color: '#43342D' }}>
              Танд хамгийн ойр байгаа <span>эмнэлэгүүд</span>
            </span>
          </div>
          <p className="hidden md:block text-2xl md:text-xl font-bold " style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif', color: '#E8B07E' }}>
            Эмнэлэгүүдийн байршил болон мэдээллийг эндээс харж болно
          </p>
        </div>

        <div className="mx-auto flex h-150 max-w-7xl flex-col gap-4 lg:flex-row lg:gap-6">
          {/* Map Хэсэг */}
          <NeonGradientCard borderSize={3} borderRadius={16} neonColors={{ firstColor: '#4f9669', secondColor: '#7ab88a' }} innerClassName="bg-transparent" className="min-h-0 flex-1">
          <div className="min-h-0 flex-1 overflow-hidden relative">
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
          </NeonGradientCard>

          {/* Sidebar Хэсэг */}
          <NeonGradientCard borderSize={3} borderRadius={16} neonColors={{ firstColor: '#4f9669', secondColor: '#7ab88a' }} className="flex min-h-0 w-full flex-col lg:w-[350px] lg:flex-initial">
          <div className="flex min-h-0 w-full flex-col bg-white lg:w-full">
            {/* Search */}
            <div className="border-b border-gray-100 p-3">
              <SearchBar query={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* Radius Selector (Шинээр нэмэгдсэн) */}
            <div className="border-b border-gray-100 p-3 bg-gray-50/50">
              <p className="text-[11px] font-bold text-gray-500 mb-2 uppercase tracking-widest">Хайх радиус</p>
              <div className="flex gap-1.5">
                {RADIUS_OPTIONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRadius(r)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all border ${
                      radius === r ? 'bg-[#4f9669] border-[#4f9669] text-white shadow-sm' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {r < 1000 ? `${r}м` : `${r / 1000}км`}
                  </button>
                ))}
              </div>
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
                    className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${activeFilter === f.id ? 'bg-[#4f9669] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
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

            {/* Footer */}
            <div className="border-t border-gray-100 px-4 py-3 bg-gray-50/30">
              <p className="text-center text-xs font-medium text-gray-400">Нийт {filteredVets.length} байршил олдлоо</p>
            </div>
          </div>
          </NeonGradientCard>
        </div>
      </motion.div>
    </section>
  );
}
