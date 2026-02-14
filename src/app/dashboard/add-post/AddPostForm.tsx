'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Upload } from 'lucide-react';
import { usePosts } from '@/lib/postsContext';
import { compressImage } from '@/lib/compressImage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Details from './Details';
import Location from './Location';
import Contact from './Contact';
import { CatShelter } from '@/app/_icons/CatShelter';
export function AddPostForm() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const { addPost } = usePosts();
  const [selected, setSelected] = useState<'lost' | 'found'>('lost');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    petName: '',
    breed: '',
    age: '',
    type: 'dog' as 'dog' | 'cat' | 'other',
    description: '',
    location: '',
    imagePreviews: [] as string[],
  });
  type PostForm = {
    petName: string;
    breed: string;
    age: string;
    type: 'dog' | 'cat' | 'other';
    description: string;
    location: string;
    imagePreviews: string[];
  };

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
    if (!form.location.trim()) return;
    setIsSubmitting(true);
    try {
      const success = await addPost({
        name: form.petName.trim(),
        breed: form.breed.trim(),
        age: form.age.trim(),
        type: form.type,
        description: form.description.trim(),
        location: form.location.trim(),
        // backend currently expects a single image string; send the first selected preview if any
        images: form.imagePreviews,
      });
      if (success) {
        await fetch('/api/send-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'New rescue post',
            body: `${form.petName.trim() || 'Animal'} — ${form.location.trim()}`,
            data: { url: '/dashboard/find-animals' },
          }),
        }).catch(() => {});
        router.push('/dashboard/find-animals');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const canPost = form.location.trim().length > 0;
  return (
    <div className="mx-auto max-w-2xl" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div className="flex flex-col gap-6 ">
        <div className="flex flex-col items-start text-center" style={{ fontFamily: 'Tahoma, Veerdana, Segoe, sans-serif' }}>
          <div className="flex items-center gap-3">
            <CatShelter className="w-14 h-14" />
            <p className="text-3xl font-bold leading-none">Амьтан постлох</p>
          </div>
          <p className="mt-2 text-muted-foreground">Энэ амьтныг дахин нэгтгэхэд туслахын тулд дэлгэрэнгүй мэдээллийг бөглөнө үү</p>
        </div>
        <div className="flex gap-4 font-medium">
          <div
            onClick={() => setSelected('lost')}
            className={`px-5 py-1.5 rounded-xl cursor-pointer transition
          ${selected === 'lost' ? 'bg-orange-400 text-white' : 'border border-orange-400 text-black'}`}
          >
            Би амьтнаа алдсан
          </div>
          <div
            onClick={() => setSelected('found')}
            className={`px-5 py-1.5 rounded-xl cursor-pointer transition
          ${selected === 'found' ? 'bg-orange-400 text-white' : 'border border-orange-400 text-black'}`}
          >
            Би амьтан оллоо
          </div>
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
            <CardContent className="space-y-4 w-150">
              {step === 0 && (
                <div>
                  {form.imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {form.imagePreviews.map((img, index) => (
                        <div key={index} className="relative rounded-lg border border-gray-200 bg-gray-50 p-2">
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          {/* next/image doesn't support data-urls well for local previews; allow plain <img> here */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt="Preview" className="max-h-60 w-full rounded-lg object-contain" />
                        </div>
                      ))}
                    </div>
                  )}
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-10 text-center transition-colors hover:bg-gray-50">
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />

                    <Upload className="h-10 w-10 text-[#f18912]" />

                    <p className="font-medium">Upload Photos</p>
                    <p className="text-sm text-gray-500">Дарна уу</p>

                    <span className="mt-2 rounded-md border px-4 py-1.5 text-sm font-medium">Файлуудыг сонгох</span>
                  </label>
                </div>
              )}
              {step === 1 && <Details form={form} setForm={setForm} />}
              {step === 2 && <Location form={form} setForm={setForm} />}
              {step === 3 && <Contact form={form} setForm={setForm} />}
            </CardContent>
          </Card>
          <div className="flex justify-end gap-2">
            {step > 0 && (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="my-10">
                Буцах
              </Button>
            )}
            {step < 3 && (
              <Button type="button" onClick={() => setStep(step + 1)} className="bg-amber-500 my-10">
                Дараах
              </Button>
            )}
            {step === 3 && (
              <div>
                <Button type="submit" disabled={isSubmitting || !canPost} className=" bg-amber-500  hover:bg-[#f1a210] disabled:opacity-50 my-10 px-7">
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
