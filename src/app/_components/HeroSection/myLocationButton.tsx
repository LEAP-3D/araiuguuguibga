'use client';

import { MapPin } from 'lucide-react';

type MyLocationButtonProps = {
  // Параметрыг таны handleLocationFound-тай яг адилхан болгов
  onLocationFound: (lat: number, lng: number) => void;
};

export function MyLocationButton({ onLocationFound }: MyLocationButtonProps) {
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Таны хөтөч байршил тогтоогчийг дэмжихгүй байна.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // Хоёр тусдаа тоон утга дамжуулж байна
        onLocationFound(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        console.error('Байршил тогтооход алдаа гарлаа:', err);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <button
      onClick={handleGetLocation}
      className="absolute bottom-6 right-6 z-[1000] flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl shadow-lg hover:bg-gray-50 active:scale-95 transition-all group"
    >
      <div className="relative">
        <MapPin className="h-5 w-5 text-[#4f9669] group-hover:scale-110 transition-transform" />
      </div>

      <span className="text-sm font-bold text-[#43342D] cursor-pointer" style={{ fontFamily: 'system-ui, sans-serif' }}>
        Миний байршил
      </span>
    </button>
  );
}
