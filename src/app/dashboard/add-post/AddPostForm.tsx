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
        image: form.imagePreview ?? '',
      });
      if (success) router.push('/dashboard/feed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canPost = form.location.trim().length > 0;

  return (
    <div className="mx-auto max-w-2xl" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div className="flex flex-col gap-6 ">
        <div className="flex flex-col">
          <p className="text-3xl font-semibold text-orange-400">Post an Animal</p>
          <p>Fill in the details to help reunite this animal</p>
        </div>
        <div className="flex gap-4">
          <div
            onClick={() => setSelected('lost')}
            className={`px-8 py-2 rounded-xl cursor-pointer transition
          ${selected === 'lost' ? 'bg-orange-400 text-white' : 'border border-orange-400 text-black'}`}
          >
            I Lost My Animal
          </div>

          <div
            onClick={() => setSelected('found')}
            className={`px-8 py-2 rounded-xl cursor-pointer transition
          ${selected === 'found' ? 'bg-orange-400 text-white' : 'border border-orange-400 text-black'}`}
          >
            I Found An Animal
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
                  {form.imagePreview && (
                    <div className="relative mt-4 rounded-lg border border-gray-200 bg-gray-50 p-2">
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      {/* eslint-disable-next-line @next/next/no-img-element -- dynamic data URL preview */}
                      <img src={form.imagePreview} alt="Preview" className="max-h-80 w-full rounded-lg object-contain" />
                    </div>
                  )}
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-10 text-center transition-colors hover:bg-gray-50">
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

                    <Upload className="h-10 w-10 text-[#f18912]" />

                    <p className="font-medium">Upload Photos</p>
                    <p className="text-sm text-gray-500">Drag & drop or click to browse</p>

                    <span className="mt-2 rounded-md border px-4 py-1.5 text-sm font-medium">Choose Files</span>
                  </label>
                </div>
              )}
              {step === 1 && <Details />}
              {step === 2 && <Location />}
              {step === 3 && <Contact />}
            </CardContent>
          </Card>
          <div className="flex justify-end gap-2">
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} className=" my-10">
                Back
              </Button>
            )}
            {step < 3 && (
              <Button onClick={() => setStep(step + 1)} className="bg-amber-500 my-10">
                Continue
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
