"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import type { Veterinary } from "../_components/types";
import { VetCard } from "../_components/vetCard";
import { MapPlaceholder } from "../_components/mapPlaceHolder";
import { SearchBar } from "../_components/searchBar";
import { NoResults } from "../_components/noResult";
import { useClinics } from "@/lib/clinicsContext";

const FILTERS = [
  { id: "emneleg", label: "Эмнэлэг" },
  { id: "klinik", label: "Клиник" },
  { id: "yaaraltai", label: "Яаралтай" },
  { id: "emiin_san", label: "Эмийн сан" },
] as const;

export function VeterinarySection() {
  const { clinics } = useClinics();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVet, setSelectedVet] = useState<Veterinary | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("emneleg");

  const filteredVets = clinics.filter((vet) => {
    const matchesSearch =
      vet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vet.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "emneleg" || vet.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <section id="vets" className="min-h-[70vh] px-4 py-12">
      <div className="mb-8 text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5">
          <MapPin className="h-6 w-6 text-orange-500" />
          <span className="text-xl font-bold text-black">
            Танд хамгийн ойр байгаа{" "}
            <span className="text-orange-400">мал эмнэлэгүүд</span>
          </span>
        </div>
        <p className="text-sm text-gray-600">
          Яаралтай үед ойр байгаа эмнэлэгүүдийн байршил болон мэдээллийг
          эндээс харж болно
        </p>
      </div>

      <div className="mx-auto flex h-[600px] max-w-7xl flex-col gap-4 lg:flex-row lg:gap-6">
        {/* Map - left side */}
        <div className="min-h-0 flex-1">
          <MapPlaceholder
            vets={filteredVets}
            selectedVet={selectedVet}
            onSelect={setSelectedVet}
          />
        </div>

        {/* Sidebar - хэрэглэгч зөвхөн харна */}
        <div className="flex min-h-0 w-full flex-col rounded-xl border border-gray-200 bg-white shadow-sm lg:w-[350px] lg:flex-initial">
          <div className="border-b border-gray-100 p-3">
            <SearchBar query={searchQuery} onChange={setSearchQuery} />
          </div>

          <div className="flex items-center gap-1 border-b border-gray-100 p-3">
            <button
              type="button"
              className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Зүүн"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex flex-1 flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    activeFilter === f.id
                      ? "bg-[#4f9669] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Баруун"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            {filteredVets.length > 0 ? (
              <div className="space-y-3">
                {filteredVets.map((vet) => (
                  <VetCard
                    key={vet.id}
                    vet={vet}
                    selected={selectedVet?.id === vet.id}
                    onSelect={setSelectedVet}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <NoResults />
                <Link
                  href="/dashboard/add-clinic"
                  className="text-sm font-medium text-[#4f9669] hover:underline"
                >
                  Админ эмнэлэг нэмэх →
                </Link>
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 px-4 py-3">
            <p className="text-center text-sm text-gray-500">
              {filteredVets.length} эмнэлэг олдлоо
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
