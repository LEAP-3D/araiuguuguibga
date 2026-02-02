"use client";

import { PostsProvider } from "@/lib/postsContext";
import { ClinicsProvider } from "@/lib/clinicsContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostsProvider>
      <ClinicsProvider>{children}</ClinicsProvider>
    </PostsProvider>
  );
}
