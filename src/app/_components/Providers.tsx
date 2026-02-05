"use client";

import { PostsProvider } from "@/lib/postsContext";
import { ClinicsProvider } from "@/lib/clinicsContext";
import { SyncUserToDb } from "./SyncUserToDb";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostsProvider>
      <ClinicsProvider>
        <SyncUserToDb />
        {children}
      </ClinicsProvider>
    </PostsProvider>
  );
}
