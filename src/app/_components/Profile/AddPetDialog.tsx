'use client';
import { Loader2, Upload, X } from 'lucide-react';
import { PetFormFields } from './PetFormFields';
import type { PetForm } from './PetFormFields';
import { AddPetTriggerCard } from './AddPetTriggerCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { compressImage } from '@/lib/compressImage';
import { useState } from 'react';
import { usePets } from '@/lib/petsContext';
import { toast } from 'sonner';

export default function AddPetDialog() {
  const { addPet } = usePets();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [objectPreviewUrl, setObjectPreviewUrl] = useState<string | null>(null);
  const [form, setForm] = useState<PetForm>({
    imagePreview: null,
    name: '',
    type: '',
    breed: '',
    age: 0, // number instead of string
    weight: 0, // number instead of string
    gender: '',
    note: '',
  });

  const clearImageState = () => {
    if (objectPreviewUrl) {
      URL.revokeObjectURL(objectPreviewUrl);
      setObjectPreviewUrl(null);
    }
    setSelectedImageFile(null);
    setForm((f) => ({ ...f, imagePreview: null }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      const compressed = await compressImage(file, 400);
      if (compressed) {
        if (objectPreviewUrl) {
          URL.revokeObjectURL(objectPreviewUrl);
          setObjectPreviewUrl(null);
        }
        setForm((f) => ({ ...f, imagePreview: compressed }));
      } else {
        const objectUrl = URL.createObjectURL(file);
        if (objectPreviewUrl) URL.revokeObjectURL(objectPreviewUrl);
        setObjectPreviewUrl(objectUrl);
        setForm((f) => ({ ...f, imagePreview: objectUrl }));
        toast.info('HEIC/HEIF зураг сонгогдлоо. Preview харагдахгүй байж болно, гэхдээ upload хийгдэнэ.');
      }
    }
    e.target.value = '';
  };
  const removeImage = () => clearImageState();

  const handleAddPet = async () => {
    if (saving) return;
    if (!form.name || !form.type) {
      toast.error('Нэр болон төрлөө бөглөнө үү.');
      return;
    }
    setSaving(true);
    let imageUrl = '';
    if (selectedImageFile) {
      try {
        let fileToUpload = selectedImageFile;
        if (form.imagePreview?.startsWith('data:')) {
          const res = await fetch(form.imagePreview);
          const blob = await res.blob();
          fileToUpload = new File([blob], 'pet.jpg', { type: blob.type || 'image/jpeg' });
        }
        const fd = new FormData();
        fd.append('file', fileToUpload);
        const uploadRes = await fetch('/api/upload/cloudinary', { method: 'POST', body: fd });
        if (uploadRes.ok) {
          const { url } = await uploadRes.json();
          imageUrl = url;
        } else {
          const err = (await uploadRes.json().catch(() => null)) as { error?: string } | null;
          toast.error(err?.error ? `Зураг байршуулахад алдаа: ${err.error}` : 'Зураг байршуулахад алдаа гарлаа.');
          setSaving(false);
          return;
        }
      } catch {
        toast.error('Зураг боловсруулах үед алдаа гарлаа.');
        setSaving(false);
        return;
      }
    }
    try {
      await addPet({
        name: form.name,
        type: form.type,
        breed: form.breed,
        age: form.age ? form.age.toString() : '',
        weight: form.weight ? form.weight.toString() : '',
        gender: form.gender,
        note: form.note,
        image: imageUrl,
      });

      toast.success('Амжилттай амьтнаа нэмлээ.');
      setOpen(false);
      clearImageState();
      setForm({
        imagePreview: null,
        name: '',
        type: '',
        breed: '',
        age: 0,
        weight: 0,
        gender: '',
        note: '',
      });
    } catch {
      toast.error('Амьтан нэмэхэд алдаа гарлаа.');
    } finally {
      setSaving(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AddPetTriggerCard />
      </DialogTrigger>
      <DialogContent className=" bg-[#fefdfc] rounded-3xl border border-[#f1e6d9] px-6 pb-6 pt-1" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#3b2f2f] mt-3 ">🐾 Тэжээвэр амьтан нэмэх</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 ">доорх мэдээллийг бөглөнө үү.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center">
          {form.imagePreview ? (
            <div className="relative rounded-lg  border border-gray-200 bg-gray-50 ">
              <button
                type="button"
                onClick={removeImage}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-orange-800/70"
              >
                <X className="h-4 w-4" />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element -- dynamic data URL preview */}
              <img src={form.imagePreview || ''} alt="Preview" className=" object-contain h-50 w-auto" />
            </div>
          ) : (
            <div className="w-25 h-25 pt-3 rounded-xl border-2 border-dashed border-[#ff9900] hover:border-[#fc9a07] hover:bg-[#ffc1051f] outline-none ">
              <label className="flex flex-col cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors ">
                <input type="file" accept="image/*,.heic,.heif,image/heic,image/heif" className="hidden" onChange={handleImageChange} />
                <Upload className="h-8 w-8 text-[#ffa303]" />
                <p className="text-[9px]">Зураг оруулах</p>
              </label>
            </div>
          )}
        </div>
        <PetFormFields form={form} setForm={setForm} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="rounded-xl px-8 py-2" disabled={saving}>
              Болих
            </Button>
          </DialogClose>

          <Button onClick={handleAddPet} disabled={saving} className="rounded-xl px-8 py-2 bg-linear-to-r from-[#ff9203] to-[#ffaa00] text-white shadow-md hover:opacity-90 disabled:opacity-60">
            {saving ? <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Нэмж байна...</span> : 'Нэмэх'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
