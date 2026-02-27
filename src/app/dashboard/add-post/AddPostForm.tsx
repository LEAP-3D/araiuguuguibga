'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Upload } from 'lucide-react';
import { usePosts } from '@/lib/postsContext';
import { compressImage } from '@/lib/compressImage';
import { Button } from '@/components/ui/button';
import type { AnimalSize } from './Details';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Details from './Details';
import Location from './Location';
import Contact from './Contact';
import { CatShelter } from '@/app/_icons/CatShelter';
export type FormState = {
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
  const [form, setForm] = useState({
    petName: '',
    breed: '',
    age: '',
    size: 'medium' as AnimalSize,
    color: '',
    type: 'dog' as 'dog' | 'cat' | 'other',
    description: '',
    location: null as { lat: number; lng: number } | null,
    imagePreviews: [] as string[],
    contactName: '',
    contactPhone: '',
    contactNotes: '',
  });
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const compressedImages = await Promise.all(Array.from(files).map((file) => compressImage(file, 400)));

    setForm((prev) => ({
      ...prev,
      imagePreviews: [...prev.imagePreviews, ...(compressedImages.filter(Boolean) as string[])],
    }));

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
    setIsSubmitting(true);
    try {
      const success = await addPost({
        name: form.petName.trim(),
        breed: form.breed.trim(),
        age: form.age.trim(),
        type: form.type,
        description: form.description.trim(),
        location: `${form.location.lat.toFixed(4)}, ${form.location.lng.toFixed(4)}`,
        image: form.imagePreviews[0] ?? '',

        // 🔥 ADD CONTACT INFO
        contactName: form.contactName.trim(),
        contactPhone: form.contactPhone.trim(),
        contactNotes: form.contactNotes?.trim() ?? '',
      });

      if (success) {
        await fetch('/api/send-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'New rescue post',
            body: `${form.petName.trim() || 'Animal'} — Location: ${form.location.lat.toFixed(4)}, ${form.location.lng.toFixed(4)}`,
            data: { url: '/dashboard/find-animals' },
          }),
        }).catch(() => {});
        router.push('/dashboard/find-animals');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const canPost = form.location !== null;
  return (
    <div className="mx-auto w-full max-w-[450px] md:max-w-2xl lg:max-w-4xl" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div className="flex flex-col gap-6 ">
        <div className="flex flex-col items-start text-center" style={{ fontFamily: 'Tahoma, Veerdana, Segoe, sans-serif' }}>
          <div className="flex items-center gap-3">
            <CatShelter className="w-10 h-10 sm:w-14 sm:h-14" />
            <p className="text-xl sm:text-3xl font-bold leading-none">Амьтан постлох</p>
          </div>
          <p className="mt-2 text-muted-foreground">Энэ амьтныг дахин нэгтгэхэд туслахын тулд дэлгэрэнгүй мэдээллийг бөглөнө үү</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {step === 0 && 'Photos'}
                {step === 1 && 'Details'}
                {step === 2 && 'Location'}
                {step === 3 && 'Contact'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {step === 0 && (
                <div>
                    <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-6 sm:p-10 md:p-16 text-center transition-colors hover:bg-gray-50">                    
                      <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                    <Upload className="h-10 w-10 text-[#f18912]" />
                    <p className="font-medium">Upload Photos</p>
                    <p className="text-sm text-gray-500">Дарна уу</p>
                    <span className="mt-2 rounded-md border px-4 py-1.5 text-sm font-medium">Файлуудыг сонгох</span>
                  </label>
                  {form.imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {form.imagePreviews.map((img, index) => (
                        <div key={index} className="relative rounded-lg ">
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt="Preview" className="max-h-60 md:max-h-96 w-full rounded-lg object-contain" />
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
          <div className="flex justify-end gap-2">
            {step > 0 && (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="mt-6 mb-2 sm:mt-10 sm:mb-0">
                Буцах
              </Button>
            )}
            {step < 3 && (
              <Button type="button" onClick={() => setStep(step + 1)} className="bg-amber-500 mt-6 mb-2 sm:mt-10 sm:mb-0">
                Дараах
              </Button>
            )}
            {step === 3 && (
              <div>
                <Button type="submit" disabled={isSubmitting || !canPost} className="bg-amber-500 hover:bg-[#f1a210] disabled:opacity-50 mt-6 mb-2 sm:mt-10 sm:mb-0 px-7">
                  {isSubmitting ? 'Боловсруулж байна...' : 'Пост'}
                </Button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
