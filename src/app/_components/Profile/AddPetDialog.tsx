'use client';
import { PlusIcon, Upload, X } from 'lucide-react';
import { PetFormFields } from './PetFormFields';
import type { PetForm } from './PetFormFields';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { compressImage } from '@/lib/compressImage';
import { useState } from 'react';
import { usePets } from '@/lib/petsContext';

export default function AddPetDialog() {
  const { addPet } = usePets();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<PetForm>({
    imagePreview: null,
    name: '',
    type: '',
    breed: '',
    age: 0, // number instead of string
    weight: 0, // number instead of string
    gender: '',
    note: '',
    allergies: '',
  });
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressed = await compressImage(file, 400);
      setForm((f) => ({ ...f, imagePreview: compressed || null }));
    }
    e.target.value = '';
  };
  const removeImage = () => setForm((f) => ({ ...f, imagePreview: null }));

  const handleAddPet = async () => {
    if (!form.name || !form.type) return;

    let imageUrl = form.imagePreview || '';
    if (imageUrl.startsWith('data:')) {
      try {
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        const file = new File([blob], 'pet.jpg', { type: blob.type || 'image/jpeg' });
        const fd = new FormData();
        fd.append('file', file);
        const uploadRes = await fetch('/api/upload/cloudinary', { method: 'POST', body: fd });
        if (uploadRes.ok) {
          const { url } = await uploadRes.json();
          imageUrl = url;
        }
      } catch {
        imageUrl = '';
      }
    }

    await addPet({
      name: form.name,
      type: form.type,
      breed: form.breed,
      age: form.age ? form.age.toString() : '',
      weight: form.weight ? form.weight.toString() : '',
      gender: form.gender,
      note: form.note,
      allergies: form.allergies,
      image: imageUrl,
    });

    setOpen(false);
    setForm({
      imagePreview: null,
      name: '',
      type: '',
      breed: '',
      age: 0,
      weight: 0,
      gender: '',
      note: '',
      allergies: '',
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="relative cursor-pointer p-4 h-80 w-60 rounded-3xl text-center overflow-hidden group transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
          style={{
            background: 'linear-gradient(145deg, #fff8f0 0%, #fff3e8 100%)',
            border: '2px solid #ffd4a8',
            boxShadow: '0 4px 16px rgba(255, 140, 50, 0.1)',
          }}
        >
          {/* Decorative blobs */}
          <div
            style={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(255, 160, 60, 0.15)',
              transition: 'transform 0.3s',
            }}
            className="group-hover:scale-125"
          />
          <div
            style={{
              position: 'absolute',
              bottom: -16,
              left: -16,
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'rgba(100, 200, 130, 0.15)',
              transition: 'transform 0.3s',
            }}
            className="group-hover:scale-125"
          />

          <div className="relative flex flex-col items-center justify-center h-full gap-3">
            {/* Icon bubble */}
            <div
              className="group-hover:rotate-12 transition-transform duration-300"
              style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                background: 'linear-gradient(135deg, #ff9a3c, #ff6b35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(255, 107, 53, 0.4)',
              }}
            >
              <PlusIcon style={{ color: 'white', width: 28, height: 28, strokeWidth: 2.5 }} />
            </div>
            {/* Text */}
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#3d2c1e' }}>Амьтан нэмэх</div>
              <div style={{ fontSize: 12, color: '#b08060', marginTop: 3, fontWeight: 500 }}>Шинэ тэжээвэр амьтан бүртгэх</div>
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className=" bg-[#fefdfc] rounded-3xl border border-[#f1e6d9] px-6 pb-6 pt-1" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#3b2f2f] mt-3 ">🐾 Тэжээвэр амьтан нэмэх</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 ">доорх мэдээллийг бөглөнө үү.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center">
          {/* Image Upload */}
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
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                <Upload className="h-8 w-8 text-[#ffa303]" />
                <p className="text-[9px]">Зураг оруулах</p>
              </label>
            </div>
          )}
        </div>
        <PetFormFields form={form} setForm={setForm} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="rounded-xl px-8 py-2">
              Болих
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button onClick={handleAddPet} className="rounded-xl px-8 py-2 bg-linear-to-r from-[#ff9203] to-[#ffaa00] text-white shadow-md hover:opacity-90">
              Нэмэх
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
