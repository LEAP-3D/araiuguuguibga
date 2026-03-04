'use client';
import { useEffect, useMemo, useState } from 'react';
import { SignIn, SignUp, useClerk, useUser } from '@clerk/nextjs';
import type { PetMedicalForm } from '@/app/_components/Profile/AddMedicalRecord';
import { usePets } from '@/lib/petsContext';
import { toast } from 'sonner';
import ProfileMobile from './profileMobile';
import { getTodayStr, toDateOnlyStr } from '@/app/profile/profileDateUtils';
import { triggerTestMedicalNotification, useMedicalNotifications } from '@/app/profile/useMedicalNotifications';
import type { MedicalRecordItem } from '@/app/profile/ProfileMedicalSection';
import { CuteSleepingCatLoader } from '@/app/_components/loading/CuteSleepingCatLoader';
import { signInAppearance, signUpAppearance } from '@/app/_components/clerkAppearance';

export default function UserTab() {
  const { signOut } = useClerk();
  const { isSignedIn, isLoaded } = useUser();
  const { pets, refetchPets, petsLoading } = usePets();
  const [authView, setAuthView] = useState<'sign-in' | 'sign-up'>('sign-in');

  const [medicalRecords, setMedicalRecords] = useState<MedicalRecordItem[]>([]);
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [deletingRecordId, setDeletingRecordId] = useState<string | null>(null);
  const [selectedPetFilter, setSelectedPetFilter] = useState<string>('all');

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
    const selectedPet = pets.find((p) => p.id === selectedPetFilter);
    return selectedPet ? medicalRecords.filter((record) => record.pet === selectedPet.name) : medicalRecords;
  }, [medicalRecords, selectedPetFilter, pets]);

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
    const confirmed = window.confirm('Та энэ эрүүл мэндийн бүртгэлийг устгахдаа итгэлтэй байна уу?');
    if (!confirmed) return;
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

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Та системээс гарлаа.');
    } catch {
      toast.error('Гарах үед алдаа гарлаа.');
    }
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

  if (!isSignedIn) {
    return (
      <section className=" pb-5 pt-4 flex justify-center">
        <div className="rounded-3xl border border-[#f1d5be] bg-[#fff7ef] shadow-sm flex flex-col items-center py-6">
          <p className="mt-1 text-center text-sm text-[#7a5b43]">Нэвтэрч орсноор та өөрийн амьтнаа нэмэх, эмчилгээний мэдээллээ оруулах, AI туслах ашиглах боломжтой.</p>
          <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-white p-1 shadow-inner ">
            <button
              type="button"
              onClick={() => setAuthView('sign-in')}
              className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${authView === 'sign-in' ? 'bg-[#f28a50] text-white' : 'text-[#6d5644]'}`}
            >
              Нэвтрэх
            </button>
            <button
              type="button"
              onClick={() => setAuthView('sign-up')}
              className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${authView === 'sign-up' ? 'bg-[#f28a50] text-white' : 'text-[#6d5644]'}`}
            >
              Бүртгүүлэх
            </button>
          </div>
          <div className="mt-4 ">
            {authView === 'sign-in' ? <SignIn routing="hash" signUpUrl="#sign-up" appearance={signInAppearance} /> : <SignUp routing="hash" signInUrl="#sign-in" appearance={signUpAppearance} />}
          </div>
        </div>
      </section>
    );
  }

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
      onLogout={handleLogout}
      onTestNotification={handleTestNotification}
    />
  );
}
