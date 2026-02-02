"use client";

import { useState } from "react";
import { VideoSection } from "./VideoSection";
import { SignInUpLoading } from "./SignInUpLoading";

export function SignInUpShell({ children }: { children: React.ReactNode }) {
  const [bgReady, setBgReady] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <VideoSection onReady={() => setBgReady(true)} />
      <div className="absolute inset-0 bg-black/40" aria-hidden />

      <SignInUpLoading isReady={bgReady}>
        {children}
      </SignInUpLoading>
    </div>
  );
}
