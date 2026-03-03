'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import type { PetMedicalForm } from '@/app/_components/Profile/AddMedicalRecord';
import { usePets } from '@/lib/petsContext';
import { toast } from 'sonner';
import ProfileMobile from './profileMobile';
import { getTodayStr, toDateOnlyStr } from '@/app/profile/profileDateUtils';
import { triggerTestMedicalNotification, useMedicalNotifications } from '@/app/profile/useMedicalNotifications';
import type { MedicalRecordItem } from '@/app/profile/ProfileMedicalSection';
import { CuteSleepingCatLoader } from '@/app/_components/loading/CuteSleepingCatLoader';

export default function UserTab({ onBackHome }: { onBackHome: () => void }) {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const { pets, refetchPets, petsLoading } = usePets();

  const [medicalRecords, setMedicalRecords] = useState<MedicalRecordItem[]>([]);
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [deletingRecordId, setDeletingRecordId] = useState<string | null>(null);
  const [selectedPetFilter, setSelectedPetFilter] = useState<string>('all');

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.replace('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (!isSignedIn) return;
    void refetchPets();
  }, [isSignedIn, refetchPets]);

  useEffect(() => {
    if (!isSignedIn) return;
    let cancelled = false;
    setRecordsLoading(true);

    fetch('/api/medical-records')
      .then((res) => (res.ok ? res.json() : []))
      .then((data: MedicalRecordItem[]) => {
        if (!cancelled && Array.isArray(data)) setMedicalRecords(data);
      })
      .catch(() => {
        if (!cancelled) setMedicalRecords([]);
      })
      .finally(() => {
        if (!cancelled) setRecordsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isSignedIn]);

  const dueTodayRecords = useMemo(() => {
    const today = getTodayStr();
    return medicalRecords.filter((r) => {
      const d = toDateOnlyStr(r.date);
      const next = toDateOnlyStr(r.nextDueDate);
      return d === today || (next && next === today);
    });
  }, [medicalRecords]);

  const filteredRecords = useMemo(() => {
    if (selectedPetFilter === 'all') return medicalRecords;
    return medicalRecords.filter((record) => record.pet === selectedPetFilter);
  }, [medicalRecords, selectedPetFilter]);

  useMedicalNotifications(dueTodayRecords);

  const handleAddRecord = async (record: PetMedicalForm) => {
    try {
      const res = await fetch('/api/medical-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (!res.ok) {
        toast.error('Эрүүл мэндийн бүртгэл нэмэх үед алдаа гарлаа.');
        return;
      }
      const saved = (await res.json()) as { id: string };
      setMedicalRecords((prev) => [{ ...record, id: saved.id }, ...prev]);
      toast.success('Эрүүл мэндийн бүртгэл амжилттай нэмэгдлээ.');
    } catch {
      toast.error('Эрүүл мэндийн бүртгэл нэмэх үед алдаа гарлаа.');
    }
  };

  const handleDeleteRecord = async (id: string) => {
    if (!id || deletingRecordId) return;
    setDeletingRecordId(id);
    try {
      const res = await fetch(`/api/medical-records/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        toast.error('Эрүүл мэндийн бүртгэл устгах үед алдаа гарлаа.');
        return;
      }
      setMedicalRecords((prev) => prev.filter((record) => record.id !== id));
      toast.success('Эрүүл мэндийн бүртгэл устгагдлаа.');
    } catch {
      toast.error('Эрүүл мэндийн бүртгэл устгах үед алдаа гарлаа.');
    } finally {
      setDeletingRecordId(null);
    }
  };

  const handleTestNotification = async () => {
    triggerTestMedicalNotification();
    try {
      await fetch('/api/send-test-medical-email', { method: 'POST' });
    } catch {}
  };

  if (!isLoaded || (petsLoading && recordsLoading)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-24 w-24">
          <CuteSleepingCatLoader />
        </div>
      </div>
    );
  }

  if (!isSignedIn) return null;

  return (
    <ProfileMobile
      pets={pets}
      dueTodayRecords={dueTodayRecords}
      records={filteredRecords}
      loading={recordsLoading}
      deletingRecordId={deletingRecordId}
      selectedPetFilter={selectedPetFilter}
      onFilterChange={setSelectedPetFilter}
      onAddRecord={handleAddRecord}
      onDeleteRecord={handleDeleteRecord}
      onBack={onBackHome}
      onTestNotification={handleTestNotification}
    />
  );
}
