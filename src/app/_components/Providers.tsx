"use client";

import { PostsProvider } from "@/lib/postsContext";
import { ClinicsProvider } from "@/lib/clinicsContext";
import { SyncUserToDb } from "./SyncUserToDb";

const hasClerkKey = typeof process !== "undefined" && Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostsProvider>
      <ClinicsProvider>
        {hasClerkKey ? <SyncUserToDb /> : null}
        {children}
      </ClinicsProvider>
    </PostsProvider>
  );
}
