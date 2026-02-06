'use client';

import { Camera, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ProfileDetails from './ProfileDetails';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { usePets } from '@/lib/petsContext';

type UserProfile = {
  id: string;
  email: string;
  name: string | null;
  image: string;
  phone: string | null;
  bio: string | null;
};

export default function ProfileCard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/user/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) setUser(data);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload/cloudinary', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const { url } = await res.json();
      const patchRes = await fetch('/api/user/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: url }),
      });
      if (patchRes.ok) {
        const updated = await patchRes.json();
        setUser(updated);
      }
    } catch {
      // ignore
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleSaveDetails = async (data: { name: string; phone: string; bio: string }) => {
    const res = await fetch('/api/user/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name.trim() || null,
        phone: data.phone.trim() || null,
        bio: data.bio.trim() || null,
      }),
    });
    if (res.ok) {
      const updated = await res.json();
      setUser(updated);
    }
  };

  const { pets } = usePets();
  const initialName = user?.name ?? '';
  const initialImage = user?.image ?? '';
  const displayName = user?.name || user?.email?.split('@')[0] || 'User';
  const petCount = pets.length;

  return (
    <div className="bg-[#fefdfc] w-100 h-60 rounded-2xl shadow-lg flex justify-between pr-6 items-center">
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={uploading} />
      <div className="flex flex-col gap-3 items-center">
        <div className="p-6 flex gap-4 ">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-[#51986a] text-white text-3xl flex items-center justify-center ring-4 ring-white">
              {loading ? (
                <span className="animate-pulse">...</span>
              ) : initialImage ? (
                <Image src={initialImage} alt="" width={96} height={96} className="object-cover w-full h-full" />
              ) : (
                displayName.charAt(0).toUpperCase()
              )}
            </div>
            <button
              type="button"
              onClick={handleAvatarClick}
              disabled={uploading}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shadow-lg hover:bg-gray-300 disabled:opacity-50"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-xl font-bold mt-4">{loading ? '...' : displayName}</h2>
            <div className="flex gap-1 text-sm text-gray-600">
              <p>Тэжээвэр амьтны эзэн</p>.<p>{petCount} pets</p>
            </div>
            {user?.email && <div className="text-sm text-gray-600">{user.email}</div>}
          </div>
        </div>
        {/* <div className="px-5">
          <Dialog>
            <DialogTrigger asChild>
              <div className="w-90 h-12 bg-[#f6f2e9] text-[#5e493a] font-semibold rounded-2xl p-3 border-2 border-[#eae4dc] flex justify-center gap-2 cursor-pointer">
                <Eye />
                <p>Дэлгэрэнгүй харах</p>
              </div>
            </DialogTrigger>

            <DialogContent className="w-120 bg-[#fefdfc] rounded-3xl border border-[#f1e6d9] p-8">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold text-[#3b2f2f]">Профайл засах</DialogTitle>
              </DialogHeader>
              <ProfileDetails initialName={initialName} initialPhone={user?.phone ?? ''} initialBio={user?.bio ?? ''} onSave={handleSaveDetails} />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="rounded-xl px-8 py-2">
                    Цуцлах
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="submit" form="profile-details-form" className="rounded-xl px-8 py-2 bg-linear-to-r from-[#09712e] to-[#51986a] text-white shadow-md hover:opacity-90">
                    Өөрчлөлтийг хадгалах
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div> */}
      </div>
    </div>
  );
}
