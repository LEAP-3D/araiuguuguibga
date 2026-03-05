'use client';

import { useEffect, useMemo, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { UserCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Pet } from '@/lib/petsContext';
import ProfileDetailsDialog from '@/app/_components/Profile/ProfileDetailsDialog';
import ProfileDetails from '@/app/_components/Profile/ProfileDetails';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type UserProfile = {
  name: string;
  image: string;
  phone: string;
  bio: string;
};

export default function UserProfileCardMobile({ pets }: { pets: Pet[] }) {
  const { user } = useUser();
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    image: '',
    phone: '',
    bio: '',
  });
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/user/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        setProfile({
          name: data.name ?? '',
          image: data.image ?? '',
          phone: data.phone ?? '',
          bio: data.bio ?? '',
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const displayName = useMemo(() => {
    return profile.name || user?.username || user?.fullName || user?.firstName || 'user';
  }, [profile.name, user]);

  const imageUrl = profile.image || user?.imageUrl || '';
  const petTypeCounts = pets.reduce<Record<string, number>>((acc, pet) => {
    const key = pet.type || 'other';
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
  const petTypeEntries = Object.entries(petTypeCounts);
  const getTypeEmoji = (type: string) => (type === 'dog' ? '🐶' : type === 'cat' ? '🐱' : '🐾');

  const handleSaveDetails = async (data: { name: string; phone: string; bio: string }) => {
    try {
      const res = await fetch('/api/user/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name.trim() || null,
          phone: data.phone.trim() || null,
          bio: data.bio.trim() || null,
        }),
      });
      if (!res.ok) {
        toast.error('Профайл шинэчлэх үед алдаа гарлаа.');
        return;
      }
      const updated = await res.json();
      setProfile({
        name: updated.name ?? '',
        image: updated.image ?? '',
        phone: updated.phone ?? '',
        bio: updated.bio ?? '',
      });
      setShowEdit(false);
      toast.success('Профайл амжилттай шинэчлэгдлээ.');
    } catch {
      toast.error('Профайл шинэчлэх үед алдаа гарлаа.');
    }
  };

  return (
    <>
      <section className="rounded-3xl border border-[#e5e7eb] bg-white p-3 shadow-sm">
        <div className="p-1 flex items-start gap-3">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[#d6d7da] p-0.5">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- external Clerk image URL
              <img src={imageUrl} alt="profile" className="h-full w-full rounded-full object-cover" />
            ) : (
              <UserCircle2 className="h-full w-full text-[#f3f4f6]" />
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xl font-semibold leading-none">{displayName}</p>
            <p className="mt-1 text-sm font-semibold text-[#4b5563]">{user?.firstName || 'user'}</p>
            <p className="mt-2 text-lg font-semibold">Тэжээвэр амьтны эзэн</p>
            <div className="mt-1.5 flex items-center gap-2">
              {petTypeEntries.length === 0 && <span className="rounded-full border border-gray-200 bg-white px-2 py-1 text-sm">🐾</span>}
              {petTypeEntries.flatMap(([type, count]) =>
                Array.from({ length: count }, (_, idx) => (
                  <span key={`${type}-${idx}`} className="rounded-full border border-gray-200 bg-white px-2 py-1 text-lg">
                    {getTypeEmoji(type)}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button type="button" onClick={() => setShowDetails(true)} className="rounded-xl border border-[#f0e4d8] bg-[#f7efe5] px-3 py-2 text-sm font-semibold text-[#5e493a]">
            Дэлгэрэнгүй
          </button>
          <button type="button" onClick={() => setShowEdit(true)} className="rounded-xl border border-[#f7cfa9] bg-[#fff2e5] px-3 py-2 text-sm font-semibold text-[#cc6f1d]">
            Профайл өөрчлөх
          </button>
        </div>
      </section>

      <ProfileDetailsDialog
        owner={{
          name: displayName,
          avatar: imageUrl,
          phone: profile.phone,
          notes: profile.bio,
        }}
        open={showDetails}
        onOpenChange={setShowDetails}
        onEdit={() => {
          setShowDetails(false);
          setShowEdit(true);
        }}
      />

      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="mobile-system-font max-w-xl overflow-hidden rounded-3xl border border-[#f1e6d9] bg-[#fefdfc] p-0">
          <div className="border-b border-[#f1e6d9] bg-gradient-to-r from-[#fff7ef] to-[#fffdf9] px-6 py-5">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-[#3b2f2f]">Хувийн мэдээлэл</DialogTitle>
            </DialogHeader>
            <p className="mt-1 text-sm text-[#9b8b7b]">Өөрийн мэдээллээ шинэчилнэ үү.</p>
          </div>
          <div className="px-6 pb-6 pt-5">
            <ProfileDetails initialName={displayName} initialPhone={profile.phone} initialBio={profile.bio} onSave={handleSaveDetails} />
          </div>
          <DialogFooter className="gap-3 px-6 pb-6 pt-0 sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline" className="rounded-xl px-7 py-2.5 border-[#e8dccd]">
                Цуцлах
              </Button>
            </DialogClose>
            <Button type="submit" form="profile-details-form" className="rounded-xl px-7 py-2.5 bg-[#ef9241] text-white shadow-md hover:bg-[#e6842f]">
              Өөрчлөлтийг хадгалах
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
