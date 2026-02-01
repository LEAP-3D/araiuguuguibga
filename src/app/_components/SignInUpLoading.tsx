"use client";

import { useEffect, useState } from "react";

type SignInUpLoadingProps = {
  children: React.ReactNode;
  /** Background бэлэн болсон үед true. Өгөөгүй бол 2 сек дараа автоматаар харуулна */
  isReady?: boolean;
};

export function SignInUpLoading({ children, isReady: externalReady }: SignInUpLoadingProps) {
  const [timeoutReady, setTimeoutReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTimeoutReady(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const ready = externalReady ?? timeoutReady;

  if (ready) return <>{children}</>;

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-40 w-40 rounded-full object-cover ring-4 ring-white/30"
          src="/corgi-loading.mp4"
        />
        <p className="text-lg font-medium text-white drop-shadow-lg">
          Ачаалж байна...
        </p>
      </div>
    </div>
  );
}
