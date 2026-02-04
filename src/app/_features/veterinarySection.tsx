'use client';

import { useState } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Veterinary } from '../_components/types';
import dynamic from 'next/dynamic';
import { SearchBar } from '../_components/HeroSection/searchBar';
import { NoResults } from '../_components/noResult';
import { VetCard } from '../_components/HeroSection/vetCard';
import Link from 'next/link';

// Filter options
const FILTERS = [
  { id: 'emneleg', label: 'Эмнэлэг' },
  { id: 'klinik', label: 'Клиник' },
  { id: 'yaaraltai', label: 'Яаралтай' },
  { id: 'emiin_san', label: 'Эмийн сан' },
] as const;

// Map component SSR=false
const MapPlaceholder = dynamic(() => import('../_components/HeroSection/mapPlaceHolder'), { ssr: false });

export function VeterinarySection() {
  const [clinics, setClinics] = useState<Veterinary[]>([]);
  const [selectedVet, setSelectedVet] = useState<Veterinary | null>(null);
  const [temporaryVet, setTemporaryVet] = useState<Veterinary | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]['id']>(FILTERS[0].id);

  // Filter + search
  const filteredVets = clinics.filter((vet) => {
    const matchesSearch = vet.name.toLowerCase().includes(searchQuery.toLowerCase()) || vet.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'emneleg' || vet.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Delete
  const handleDelete = (vet: Veterinary) => {
    if (!confirm(`${vet.name}-ийг устгах уу?`)) return;
    setClinics(clinics.filter((v) => v.id !== vet.id));
    if (selectedVet?.id === vet.id) setSelectedVet(null);
  };

  // Edit
  const handleEdit = (vet: Veterinary) => {
    const newName = prompt('Эмнэлгийн нэрийг оруулна уу', vet.name);
    if (newName) {
      setClinics(clinics.map((v) => (v.id === vet.id ? { ...v, name: newName } : v)));
    }
  };

  // Save temporary vet
  const handleSaveTemp = (vet: Veterinary) => {
    if (!vet.name) return;
    setClinics([...clinics, vet]);
    setTemporaryVet(null);
  };

  return (
    <section id="vets" className="min-h-[70vh] px-4 py-12">
      <div className="mb-8 text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5">
          <MapPin className="h-6 w-6 text-[#3f8b5c]" />
          <span className="text-xl font-bold text-[#2a3a32]">
            Танд хамгийн ойр байгаа <span className="text-[#3f8b5c]">мал эмнэлэгүүд</span>
          </span>
        </div>
        <p className="text-sm text-[#4b5a50]">Яаралтай үед ойр байгаа эмнэлэгүүдийн байршил болон мэдээллийг эндээс харж болно</p>
      </div>

      <div className="mx-auto flex h-[600px] max-w-7xl flex-col gap-4 lg:flex-row lg:gap-6">
        {/* Map */}
        <div className="min-h-0 flex-1 rounded-xl overflow-hidden shadow-sm">
          <MapPlaceholder
            vets={filteredVets}
            selectedVet={selectedVet}
            onSelect={setSelectedVet}
            temporaryVet={temporaryVet}
            onMapClick={(lat, lng) =>
              setTemporaryVet({
                id: Date.now().toString(),
                name: '',
                lat,
                lng,
                rating: 0,
                reviewCount: 0,
                services: [],
                isOpen: false,
                phone: '',
                address: '',
                category: 'emneleg',
              })
            }
            onSaveTemp={handleSaveTemp}
            onCancelTemp={() => setTemporaryVet(null)}
          />
        </div>

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
              filteredVets.map((vet) => <VetCard key={vet.id} vet={vet} selected={selectedVet?.id === vet.id} onSelect={setSelectedVet} onDelete={handleDelete} onEdit={handleEdit} />)
            ) : (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                {' '}
                <NoResults />{' '}
                <Link href="/dashboard/add-clinic" className="text-sm font-medium text-[#4f9669] hover:underline">
                  {' '}
                  Админ эмнэлэг нэмэх →{' '}
                </Link>{' '}
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
