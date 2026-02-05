"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

export function SyncUserToDb() {
  const { isSignedIn } = useUser();
  const synced = useRef(false);

  useEffect(() => {
    if (!isSignedIn || synced.current) return;
    synced.current = true;
    const id = setTimeout(() => {
      fetch("/api/user/create-user", { method: "POST" }).catch(() => {
        synced.current = false;
      });
    }, 0);
    return () => clearTimeout(id);
  }, [isSignedIn]);

  return null;
}
