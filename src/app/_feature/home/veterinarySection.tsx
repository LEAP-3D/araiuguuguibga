"use client";

import { useState } from "react";
import { MapPin, Phone, Clock, Star, Navigation, Search } from "lucide-react";
import type { Veterinary } from "./types";

const mockVets: Veterinary[] = [
  {
    id: "1",
    name: "SF Pet Hospital",
    rating: 4.9,
    reviewCount: 328,
    distance: "0.8 mi",
    address: "123 Market St",
    city: "San Francisco",
    state: "CA",
    services: ["Emergency", "Surgery", "Dental"],
    hours: "24/7 Emergency",
    isOpen: true,
    emergency: true,
    phone: "(415) 555-0123",
    coordinates: { lat: 37.7749, lng: -122.4194 },
  },
  {
    id: "2",
    name: "Golden Gate Vet Clinic",
    rating: 4.7,
    reviewCount: 215,
    distance: "1.2 mi",
    address: "456 Oak St",
    city: "San Francisco",
    state: "CA",
    services: ["Wellness", "Vaccination", "Grooming"],
    hours: "8AM - 8PM",
    isOpen: true,
    emergency: false,
    phone: "(415) 555-0456",
    coordinates: { lat: 37.7849, lng: -122.4294 },
  },
  {
    id: "3",
    name: "Bay Area Animal Care",
    rating: 4.8,
    reviewCount: 412,
    distance: "2.1 mi",
    address: "789 Mission St",
    city: "San Francisco",
    state: "CA",
    services: ["Surgery", "Dental", "Boarding"],
    hours: "7AM - 10PM",
    isOpen: true,
    emergency: false,
    phone: "(415) 555-0789",
    coordinates: { lat: 37.7649, lng: -122.4094 },
  },
  {
    id: "4",
    name: "Paws & Claws Veterinary",
    rating: 4.6,
    reviewCount: 189,
    distance: "3.5 mi",
    address: "321 Valencia St",
    city: "San Francisco",
    state: "CA",
    services: ["Wellness", "Emergency", "X-Ray"],
    hours: "9AM - 6PM",
    isOpen: false,
    emergency: false,
    phone: "(415) 555-0321",
    coordinates: { lat: 37.7549, lng: -122.4394 },
  },
];

export function VeterinarySection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVet, setSelectedVet] = useState<Veterinary | null>(null);

  const filteredVets = mockVets.filter(
    (vet) =>
      vet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vet.address.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section id="vets" className="bg-white px-6 py-16">
      <div className="container">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-600">
            <MapPin className="h-4 w-4" />
            Trusted Care Nearby
          </div>
          <h2 className="mb-4 text-4xl font-bold">
            Find <span className="text-orange-500">Veterinary Care</span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Locate trusted veterinarians and pet hospitals near you. From
            routine checkups to emergency care, we've got you covered.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Map Section */}
          <div className="order-2 lg:order-1">
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-orange-50 to-pink-50 shadow-sm">
              <div className="aspect-[4/3] p-8">
                {/* Map Placeholder */}
                <div className="flex h-full flex-col items-center justify-center space-y-4 rounded-xl bg-white/50 backdrop-blur-sm">
                  <MapPin className="h-16 w-16 text-orange-500" />
                  <p className="text-center font-medium text-gray-700">
                    Interactive Map
                    <br />
                    <span className="text-sm text-gray-500">
                      Showing {filteredVets.length} veterinarians nearby
                    </span>
                  </p>

                  {/* Map Markers Simulation */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {filteredVets.slice(0, 4).map((vet) => (
                      <button
                        key={vet.id}
                        onClick={() => setSelectedVet(vet)}
                        className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                          selectedVet?.id === vet.id
                            ? "bg-orange-500 text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <MapPin className="h-3 w-3" />
                        {vet.name}
                      </button>
                    ))}
                  </div>

                  <button className="mt-4 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
                    <Navigation className="h-4 w-4" />
                    Get Directions
                  </button>
                </div>
              </div>

              {/* Map Controls */}
              <div className="border-t border-gray-200 bg-white/80 p-4 backdrop-blur-sm">
                <p className="text-center text-xs text-gray-500">
                  <Clock className="inline h-3 w-3" /> with real-time locations
                </p>
              </div>
            </div>
          </div>

          {/* Listings Section */}
          <div className="order-1 space-y-4 lg:order-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, specialty, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm shadow-sm transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            {/* Vet Cards */}
            <div className="space-y-4">
              {filteredVets.map((vet) => (
                <div
                  key={vet.id}
                  onClick={() => setSelectedVet(vet)}
                  className={`cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md ${
                    selectedVet?.id === vet.id
                      ? "border-orange-500 ring-2 ring-orange-500/20"
                      : "border-gray-100"
                  }`}
                >
                  <div className="p-5">
                    {/* Header */}
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {vet.name}
                          </h3>
                          {vet.isOpen && (
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                              Open
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          📍 {vet.distance}
                        </p>
                      </div>
                      {vet.emergency && (
                        <span className="rounded-lg bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                          24/7
                        </span>
                      )}
                    </div>

                    {/* Address */}
                    <p className="mb-2 text-sm text-gray-600">
                      {vet.address}, {vet.city}, {vet.state}
                    </p>

                    {/* Rating */}
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                        <span className="font-semibold text-gray-900">
                          {vet.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({vet.reviewCount})
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-600">{vet.hours}</span>
                    </div>

                    {/* Services */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {vet.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 font-medium text-white transition-colors hover:bg-orange-600">
                        <Phone className="h-4 w-4" />
                        Call
                      </button>
                      <button className="flex items-center justify-center rounded-lg border border-gray-200 px-4 py-2.5 transition-colors hover:bg-gray-50">
                        <Navigation className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredVets.length === 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
                <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                <p className="font-medium text-gray-600">
                  No veterinarians found
                </p>
                <p className="text-sm text-gray-500">
                  Try adjusting your search
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
