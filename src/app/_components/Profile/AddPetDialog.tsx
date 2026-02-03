'use client';
import { Upload, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { compressImage } from '@/lib/compressImage';
import { useState } from 'react';

export default function AddPetDialog() {
  const [form, setForm] = useState({
    imagePreview: '' as string | null,
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-4 h-80 rounded-xl border-2 w-60 border-dashed border-[#76a988] text-center hover:border-[#3f915c] hover:bg-green-50/30 transition-colors">
          <div className="text-5xl mb-2">➕</div>
          <div className="font-semibold text-gray-700">Add Pet</div>
          <div className="text-xs text-gray-500">Register new pet</div>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-lg bg-[#fefdfc] rounded-3xl border border-[#f1e6d9] p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#3b2f2f]">🐾 Тэжээвэр амьтан нэмэх</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center ">
          {/* Image Upload */}
          {form.imagePreview && (
            <div className="relative rounded-lg border border-gray-200 bg-gray-50 mb-8">
              <button
                type="button"
                onClick={removeImage}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-green-800/70"
              >
                <X className="h-4 w-4" />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element -- dynamic data URL preview */}
              <img src={form.imagePreview} alt="Preview" className="rounded-lg object-contain" />
            </div>
          )}
          <div className="w-25 h-25 pt-3 rounded-xl border-2 border-dashed border-[#48805b] hover:border-[#51986a] hover:bg-[#58b97a2c] outline-none ">
            <label className="flex flex-col cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors ">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <Upload className="h-8 w-8 text-[#2b6440]" />
              <p className="text-[9px]">Зураг оруулах</p>
            </label>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-lg font-medium mb-1">Амьтны нэр *</label>
          <input className="w-full px-5 py-2 rounded-xl border-2 border-[#51986a] bg-[#f9fff370] outline-none" />
        </div>

        {/* Species + Breed */}
        <div className="flex justify-between">
          <div className=" flex flex-col gap-1">
            <label className="block text-sm font-medium ">төрөл *</label>
            <Select>
              <SelectTrigger className="px-5 py-5 rounded-xl border bg-[#f7fff3]">
                <SelectValue placeholder="Төрөл" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dog">Нохой</SelectItem>
                <SelectItem value="cat">Муур</SelectItem>
                <SelectItem value="bird">Шувуу</SelectItem>
                <SelectItem value="other">Бусад</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className=" flex flex-col gap-1">
            <label className="block text-sm font-medium ">үүлдэр *</label>
            <input placeholder="Үүлдэр" className="px-5 py-2 rounded-xl border bg-[#f7fff3] outline-none" />
          </div>
        </div>

        {/* Age + Weight */}
        <div className="flex justify-between">
          <div className=" flex flex-col gap-1">
            <label className="block text-sm font-medium ">нас *</label>
            <input placeholder="Нас" className="px-5 py-2 rounded-xl border bg-[#f7fff3] outline-none w-30" />
          </div>

          <div className=" flex flex-col gap-1">
            <label className="block text-sm font-medium ">жин *</label>
            <input placeholder="Жин (кг)" className="px-5 py-2 rounded-xl border bg-[#f7fff3] outline-none w-40" />
          </div>
          <div className=" flex flex-col gap-1">
            <label className="block text-sm font-medium ">huis *</label>
            <Select>
              <SelectTrigger className="px-5 py-5 rounded-xl border bg-[#f7fff3]">
                <SelectValue placeholder="Huis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Em">Em</SelectItem>
                <SelectItem value="Er">Er</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Тэмдэглэл*/}
        <div className=" flex flex-col gap-1">
          <label className="block text-sm font-medium ">Тэмдэглэл *</label>
          <textarea
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-[#f7fff3] border-2 focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none"
            placeholder="Тэмдэглэл..."
          />
        </div>

        <div className="flex justify-between">
          <div className=" flex flex-col gap-1">
            <label className="block text-sm font-medium ">Allergies</label>
            <input placeholder="Allergies" className="px-5 py-2 rounded-xl border bg-[#f7fff3] outline-none " />
          </div>

          <div className=" flex flex-col gap-1 mb-2">
            <label className="block text-sm font-medium ">Microchip ID</label>
            <input placeholder="ID number" className="px-5 py-2 rounded-xl border bg-[#f7fff3] outline-none " />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="rounded-xl px-8 py-2">
              Болих
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button className="rounded-xl px-8 py-2 bg-linear-to-r from-[#09712e] to-[#51986a] text-white shadow-md hover:opacity-90">Нэмэх</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
