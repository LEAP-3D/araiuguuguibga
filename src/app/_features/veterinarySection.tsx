import { useState } from "react";
import { MapPin } from "lucide-react";
import type { Veterinary } from "../_components/types";
import { VetCard } from "../_components/vetCard";
import { MapPlaceholder } from "../_components/mapPlaceHolder";
import { SearchBar } from "../_components/searchBar";
import { NoResults } from "../_components/noResult";
import { mockVets } from "../_components/mockVets";
export function VeterinarySection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVet, setSelectedVet] = useState<Veterinary | null>(null);
  const filteredVets = mockVets.filter(
    (vet) =>
      vet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vet.address.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section id="vets" className="flex justify-center px-6 py-16">
      <div className="container">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-4xl font-bold text-black">
            <MapPin className="h-10 w-10 text-orange-500" /> Танд хамгийн ойр
            байгаа <span className="text-orange-300">мал эмнэлэгүүд</span>
          </div>

          <p className="mx-auto max-w-2xl text-gray-600">
            Яаралтай үед ойр байгаа эмнэлэгүүдийн байршил болон мэдээллийг
            эндээс харж болно
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <MapPlaceholder
            vets={filteredVets}
            selectedVet={selectedVet}
            onSelect={setSelectedVet}
          />
          <div className="order-1 space-y-4 lg:order-2">
            <SearchBar query={searchQuery} onChange={setSearchQuery} />
            <div className="space-y-4">
              {filteredVets.length > 0 ? (
                filteredVets.map((vet) => (
                  <VetCard
                    key={vet.id}
                    vet={vet}
                    selected={selectedVet?.id === vet.id}
                    onSelect={setSelectedVet}
                  />
                ))
              ) : (
                <NoResults />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
