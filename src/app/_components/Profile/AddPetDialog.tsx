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
    microchip: 0, // number instead of string
  });
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('File selected:', file); // Debug log

    if (file) {
      const compressed = await compressImage(file, 400);
      console.log('Compressed result:', compressed); // Debug log

      setForm((f) => ({ ...f, imagePreview: compressed || null }));
    }
    e.target.value = '';
  };
  const removeImage = () => setForm((f) => ({ ...f, imagePreview: null }));
  const handleAddPet = () => {
    if (!form.name || !form.type) return;

    addPet({
      id: crypto.randomUUID(),
      name: form.name,
      type: form.type,
      breed: form.breed,
      age: form.age ? form.age.toString() : '',
      weight: form.weight ? form.weight.toString() : '',
      gender: form.gender,
      note: form.note,
      allergies: form.allergies,
      microchip: form.microchip ? form.microchip.toString() : '',
      image: form.imagePreview || '',
    });

    // Reset form
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
      microchip: 0,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-4 h-80 rounded-xl border w-60 border-dashed border-[#5e493a] text-center hover:border-[#5e493a] hover:bg-[#8e7f7236] ">
          <div className="flex justify-center mb-3">
            <div className="text-5xl font-bold w-13 h-13 rounded-2xl bg-[#5e493a32] flex items-center justify-center ">
              <PlusIcon className="text-[#5e493a]" />
            </div>
          </div>
          <div className="font-semibold text-gray-700">Add Pet</div>
          <div className="text-xs text-gray-500">Register new pet</div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-[#fefdfc] rounded-3xl border border-[#f1e6d9] p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#3b2f2f]">🐾 Тэжээвэр амьтан нэмэх</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">Fill in the information below to add a new pet to your profile.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center ">
          {/* Image Upload */}
          {form.imagePreview ? (
            <div className="relative rounded-lg border border-gray-200 bg-gray-50 ">
              <button
                type="button"
                onClick={removeImage}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-green-800/70"
              >
                <X className="h-4 w-4" />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element -- dynamic data URL preview */}
              <img src={form.imagePreview || ''} alt="Preview" className="rounded-lg object-contain" />
            </div>
          ) : (
            <div className="w-25 h-25 pt-3 rounded-xl border-2 border-dashed border-[#48805b] hover:border-[#51986a] hover:bg-[#58b97a2c] outline-none ">
              <label className="flex flex-col cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors ">
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                <Upload className="h-8 w-8 text-[#2b6440]" />
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
            <Button onClick={handleAddPet} className="rounded-xl px-8 py-2 bg-linear-to-r from-[#09712e] to-[#51986a] text-white shadow-md hover:opacity-90">
              Нэмэх
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
