"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Veterinary } from "@/app/_components/types";

const STORAGE_KEY = "admin-clinics";

type ClinicsContextType = {
  clinics: Veterinary[];
  addClinic: (clinic: Omit<Veterinary, "id">) => void;
};

const ClinicsContext = createContext<ClinicsContextType | null>(null);

function loadClinics(): Veterinary[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveClinics(clinics: Veterinary[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clinics));
  } catch (e) {
    console.error("Failed to save clinics:", e);
  }
}

function generateId() {
  return `clinic_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function ClinicsProvider({ children }: { children: React.ReactNode }) {
  const [clinics, setClinics] = useState<Veterinary[]>([]);

  useEffect(() => {
    setClinics(loadClinics());
  }, []);

  const addClinic = useCallback((clinic: Omit<Veterinary, "id">) => {
    const newClinic: Veterinary = {
      ...clinic,
      id: generateId(),
    };
    setClinics((prev) => {
      const next = [newClinic, ...prev];
      saveClinics(next);
      return next;
    });
  }, []);

  return (
    <ClinicsContext.Provider value={{ clinics, addClinic }}>
      {children}
    </ClinicsContext.Provider>
  );
}

export function useClinics() {
  const ctx = useContext(ClinicsContext);
  if (!ctx) {
    throw new Error("useClinics must be used within ClinicsProvider");
  }
  return ctx;
}
