"use client";

import { useState } from "react";

type VideoSectionProps = {
  onReady?: () => void;
};

export function VideoSection({ onReady }: VideoSectionProps) {
  const [error, setError] = useState(false);

  const handleReady = () => {
    onReady?.();
  };

  return (
    <div className="absolute inset-0 min-h-full w-full">
      {!error && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="/home-lifestyle.mp4"
          onCanPlay={handleReady}
          onError={() => {
            setError(true);
            onReady?.();
          }}
        >
          <source src="/home-lifestyle.mp4" type="video/mp4" />
        </video>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 text-center">
          <div className="max-w-sm">
            <span className="text-6xl block mb-4">🏠</span>
            <p className="text-lg font-medium">Гэрийн тав тух</p>
            <p className="text-sm opacity-90 mt-2">
              10 сек видео:{" "}
              <code className="bg-white/20 px-2 py-1 rounded">
                public/home-lifestyle.mp4
              </code>{" "}
              нэмнэ үү
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
