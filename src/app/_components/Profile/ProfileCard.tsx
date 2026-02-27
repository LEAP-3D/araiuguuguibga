'use client';
/* eslint-disable max-lines */
import { Camera, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ProfileDetails from './ProfileDetails';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { usePets } from '@/lib/petsContext';
import ProfileDetailsDialog from './ProfileDetailsDialog';
import { toast } from 'sonner';
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
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  useEffect(() => {
    let cancelled = false;
    fetch('/api/user/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) setUser(data);
      })
      .catch(() => {
        if (!cancelled) toast.error('Профайлын мэдээлэл ачаалахад алдаа гарлаа.');
      })
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
        toast.success('Профайл зураг шинэчлэгдлээ.');
      } else {
        toast.error('Зургийг хадгалах үед алдаа гарлаа.');
      }
    } catch {
      toast.error('Зураг upload хийх үед алдаа гарлаа.');
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
      toast.success('Профайл амжилттай шинэчлэгдлээ.');
    } else {
      toast.error('Профайл шинэчлэх үед алдаа гарлаа.');
    }
  };
  const { pets } = usePets();
  const initialName = user?.name ?? '';
  const initialImage = user?.image ?? '';
  const displayName = user?.name || user?.email?.split('@')[0] || 'User';
  const petCount = pets.length;
  return (
    <>
      <div className="bg-[#fefdfc] w-100 h-60 rounded-2xl shadow-lg flex justify-between pr-6 items-center" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
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
                <Camera className="w-4 h-4 cursor-pointer" />
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
          <div className="px-5">
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="w-90 h-12 flex justify-center gap-2 items-center rounded-2xl p-3 border-[#eae4dc] bg-[#f6f2e9] text-sm font-semibold text-[#5e493a] transition-all duration-200 cursor-pointer hover:bg-[#5e493a] hover:text-white"
            >
              <Eye />
              <p>Дэлгэрэнгүй харах</p>
            </button>
          </div>
        </div>
      </div>
      {user && (
        <ProfileDetailsDialog
          owner={{
            name: displayName,
            avatar: user.image,
            phone: user.phone ?? '',
            notes: user.bio ?? '',
          }}
          open={showDetails}
          onOpenChange={setShowDetails}
          onEdit={() => {
            setShowDetails(false);
            setShowEdit(true);
          }}
        />
      )}
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="max-w-xl overflow-hidden rounded-3xl border border-[#f1e6d9] bg-[#fefdfc] p-0" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div className="border-b border-[#f1e6d9] bg-gradient-to-r from-[#fff7ef] to-[#fffdf9] px-6 py-5">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-[#3b2f2f]">Профайл засах</DialogTitle>
            </DialogHeader>
            <p className="mt-1 text-sm text-[#9b8b7b]">Өөрийн мэдээллээ шинэчилнэ үү.</p>
          </div>
          <div className="px-6 pb-6 pt-5">
            <ProfileDetails
              initialName={initialName}
              initialPhone={user?.phone ?? ''}
              initialBio={user?.bio ?? ''}
              onSave={async (data) => {
                await handleSaveDetails(data);
                setShowEdit(false);
              }}
            />
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
