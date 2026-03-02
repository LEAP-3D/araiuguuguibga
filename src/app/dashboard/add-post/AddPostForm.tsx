'use client';
/* eslint-disable max-lines */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Upload } from 'lucide-react';
import { toast } from 'sonner';

import { usePosts } from '@/lib/postsContext';
import { compressImage } from '@/lib/compressImage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { AnimalSize } from './Details';
import Details from './Details';
import Location from './Location';
import Contact from './Contact';
import { CatShelter } from '@/app/_icons/CatShelter';

export type FormState = {
  status: 'lost' | 'found';
  petName: string;
  breed: string;
  age: string;
  size: AnimalSize;
  color: string;
  type: 'dog' | 'cat' | 'other';
  description: string;
  location: { lat: number; lng: number } | null;
  imagePreviews: string[];
  contactName: string;
  contactPhone: string;
  contactNotes: string;
};

export function AddPostForm() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const { addPost } = usePosts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<FormState>({
    status: 'lost',
    petName: '',
    breed: '',
    age: '',
    size: 'medium',
    color: '',
    type: 'dog',
    description: '',
    location: null,
    imagePreviews: [],
    contactName: '',
    contactPhone: '',
    contactNotes: '',
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const compressedImages = await Promise.all(Array.from(files).map((file) => compressImage(file, 400)));
    const validImages = compressedImages.filter(Boolean) as string[];

    setForm((prev) => ({
      ...prev,
      imagePreviews: [...prev.imagePreviews, ...validImages],
    }));

    if (validImages.length > 0) toast.success(`${validImages.length} зураг амжилттай нэмэгдлээ.`);
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      imagePreviews: prev.imagePreviews.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.location) return;

    if (form.status === 'lost' && !form.petName.trim()) {
      toast.error('Алдагдсан амьтны нэрийг оруулна уу.');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await addPost({
        status: form.status,
        name: form.petName.trim() || (form.status === 'found' ? 'Олдсон амьтан' : 'Нэргүй'),
        breed: form.breed.trim(),
        age: form.age.trim(),
        type: form.type,
        description: form.description.trim(),
        location: `${form.location.lat.toFixed(4)}, ${form.location.lng.toFixed(4)}`,
        image: form.imagePreviews[0] ?? '',
        contactName: form.contactName.trim(),
        contactPhone: form.contactPhone.trim(),
        contactNotes: form.contactNotes?.trim() ?? '',
      });

      if (success) {
        toast.success('Пост амжилттай нэмэгдлээ.');

        const postName = form.petName.trim() || (form.status === 'found' ? 'Олдсон амьтан' : 'Амьтан');
        await fetch('/api/notify-new-post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: form.status === 'lost' ? 'Алдагдсан амьтны шинэ пост' : 'Олдсон амьтны шинэ пост',
            body: `${postName} — байршил: ${form.location.lat.toFixed(4)}, ${form.location.lng.toFixed(4)}`,
            postName,
          }),
        }).catch(() => {});

        router.push('/dashboard/find-animals');
      } else {
        toast.error('Пост нэмэх үед алдаа гарлаа.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const canPost = form.location !== null && (form.status === 'found' || form.petName.trim().length > 0);

  return (
    <div
      //  DESKTOP
      className="mx-auto max-w-2xl
                 // ✅ MOBILE ONLY
                 max-md:w-full max-md:px-4 max-md:pb-[calc(env(safe-area-inset-bottom)+120px)]"
      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}
    >
      <div className="flex flex-col gap-6 max-md:gap-4">
        <div
          //  DESKTOP ORIGINAL
          className="flex flex-col items-start text-center
                     // ✅ MOBILE ONLY tweaks
                     max-md:items-center max-md:text-center"
          style={{ fontFamily: 'Tahoma, Veerdana, Segoe, sans-serif' }}
        >
          <div className="flex items-center gap-3">
            <CatShelter className="w-14 h-14" />
            <p className="text-3xl font-bold leading-none max-md:text-2xl">Амьтан постлох</p>
          </div>
          <p className="mt-2 text-muted-foreground">Алдагдсан эсвэл олдсон амьтны мэдээллийг зөв төрлөөр нь оруулна уу</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {step === 0 && 'Зураг'}
                {step === 1 && 'Дэлгэрэнгүй'}
                {step === 2 && 'Байршил'}
                {step === 3 && 'Холбоо барих'}
              </CardTitle>

              <div className="mt-3 inline-flex w-full rounded-xl border border-[#f2d6c0] bg-[#fff8f3] p-1">
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, status: 'lost' }))}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${form.status === 'lost' ? 'bg-[#f18912] text-white shadow-sm' : 'text-[#7a5a45] hover:bg-[#ffe8d6]'}`}
                >
                  Алдсан
                </button>

                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, status: 'found' }))}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${form.status === 'found' ? 'bg-[#f18912] text-white shadow-sm' : 'text-[#7a5a45] hover:bg-[#ffe8d6]'}`}
                >
                  Олсон
                </button>
              </div>
            </CardHeader>

            <CardContent
              //   DESKTOP
              className="space-y-4 w-150
                         // ✅ MOBILE ONLY fit
                         max-md:w-full max-md:px-4"
            >
              {step === 0 && (
                <div>
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-10 text-center transition-colors hover:bg-gray-50 max-md:p-6">
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                    <Upload className="h-10 w-10 text-[#f18912]" />
                    <p className="font-medium">Зураг оруулах</p>
                    <p className="text-sm text-gray-500">Дарна уу</p>
                    <span className="mt-2 rounded-md border px-4 py-1.5 text-sm font-medium">Файлуудыг сонгох</span>
                  </label>

                  {form.imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mt-4 max-md:grid-cols-1">
                      {form.imagePreviews.map((img, index) => (
                        <div key={index} className="relative rounded-lg">
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                          >
                            <X className="h-4 w-4" />
                          </button>

                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt="Preview" className="max-h-60 w-full rounded-lg object-contain" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {step === 1 && <Details form={form} setForm={setForm} />}
              {step === 2 && <Location form={form} setForm={setForm} />}
              {step === 3 && <Contact form={form} setForm={setForm} />}
            </CardContent>
          </Card>

          <div
            //  DESKTOP ORIGINAL (right aligned row)
            className="flex justify-end gap-2
                       // ✅ MOBILE ONLY stacked full-width
                       max-md:flex-col max-md:items-stretch"
          >
            {step > 0 && (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="my-10 max-md:my-4 max-md:w-full">
                Буцах
              </Button>
            )}

            {step < 3 && (
              <Button type="button" onClick={() => setStep(step + 1)} className="bg-amber-500 my-10 max-md:my-4 max-md:w-full">
                Дараах
              </Button>
            )}

            {step === 3 && (
              <Button type="submit" disabled={isSubmitting || !canPost} className="bg-amber-500 hover:bg-[#f1a210] disabled:opacity-50 my-10 px-7 max-md:my-4 max-md:w-full">
                {isSubmitting ? 'Боловсруулж байна...' : 'Пост'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
