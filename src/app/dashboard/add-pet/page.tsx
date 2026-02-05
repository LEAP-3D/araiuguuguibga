'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImagePlus } from 'lucide-react';
import { usePosts } from '@/lib/postsContext';
import { compressImage } from '@/lib/compressImage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

const PET_TYPES = [
  { value: 'dog', label: 'Нохой' },
  { value: 'cat', label: 'Муур' },
  { value: 'other', label: 'Бусад' },
] as const;

export default function AddPetPage() {
  const router = useRouter();
  const { addMyPet } = usePosts();
  const [form, setForm] = useState({
    name: '',
    breed: '',
    age: '',
    type: 'dog' as 'dog' | 'cat' | 'other',
    imagePreview: '' as string | null,
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressed = await compressImage(file, 200);
      setForm((f) => ({ ...f, imagePreview: compressed || null }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMyPet({
      name: form.name.trim(),
      breed: form.breed.trim(),
      age: form.age.trim(),
      type: form.type,
      image: form.imagePreview ?? '',
    });
    router.push('/dashboard/my-pets');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Амьтан нэмэх</h1>
        <p className="text-gray-600">Таны эзэмшлийн амьтны мэдээллийг бүртгэнэ үү</p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="space-y-2">
          <Label htmlFor="image">Зураг</Label>
          <label
            htmlFor="image"
            className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 transition-colors hover:border-[#4f9669]/50 hover:bg-[#4f9669]/5"
          >
            {form.imagePreview ? (
              /* eslint-disable-next-line @next/next/no-img-element -- dynamic data URL preview */
              <Image src={form.imagePreview} alt="Preview" className="h-full w-full rounded-xl object-cover" />
            ) : (
              <>
                <ImagePlus className="h-12 w-12 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">Зураг сонгох</span>
              </>
            )}
            <input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        </div>

        <div className="space-y-2">
          <Label>Төрөл</Label>
          <div className="flex gap-3">
            {PET_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setForm((f) => ({ ...f, type: t.value }))}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 transition-all ${
                  form.type === t.value ? 'border-[#4f9669] bg-[#4f9669]/10 text-[#4f9669]' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Нэр *</Label>
          <Input id="name" placeholder="Жишээ: Buddy" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required className="h-11" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="breed">Үүлдэр</Label>
            <Input id="breed" placeholder="Жишээ: Golden Retriever" value={form.breed} onChange={(e) => setForm((f) => ({ ...f, breed: e.target.value }))} className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Нас</Label>
            <Input id="age" placeholder="Жишээ: 2 жил" value={form.age} onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))} className="h-11" />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1 bg-[#4f9669] hover:bg-[#458559]">
            Хадгалах
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Буцах
          </Button>
        </div>
      </form>
    </div>
  );
}
