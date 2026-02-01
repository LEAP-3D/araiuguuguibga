"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ImagePlus,
  MapPin,
  X,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { usePosts } from "@/lib/postsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PET_TYPES = [
  { value: "dog", label: "Нохой" },
  { value: "cat", label: "Муур" },
  { value: "other", label: "Бусад" },
] as const;

const MAX_IMAGE_SIZE = 400;

function compressImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      let { width, height } = img;
      if (width > height) {
        if (width > MAX_IMAGE_SIZE) {
          height = (height * MAX_IMAGE_SIZE) / width;
          width = MAX_IMAGE_SIZE;
        }
      } else {
        if (height > MAX_IMAGE_SIZE) {
          width = (width * MAX_IMAGE_SIZE) / height;
          height = MAX_IMAGE_SIZE;
        }
      }
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.7));
    };

    img.onerror = () => resolve("");
    img.src = URL.createObjectURL(file);
  });
}

export default function AddPostPage() {
  const router = useRouter();
  const { user } = useUser();
  const { addPost } = usePosts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExtra, setShowExtra] = useState(false);
  const [form, setForm] = useState({
    petName: "",
    breed: "",
    age: "",
    type: "dog" as "dog" | "cat" | "other",
    description: "",
    location: "",
    imagePreview: "" as string | null,
  });

  const displayName =
    user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "Хэрэглэгч";
  const userInitial = (displayName as string).charAt(0).toUpperCase();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressed = await compressImage(file);
      setForm((f) => ({ ...f, imagePreview: compressed || null }));
    }
    e.target.value = "";
  };

  const removeImage = () => setForm((f) => ({ ...f, imagePreview: null }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.location.trim()) return;
    setIsSubmitting(true);
    addPost({
      name: form.petName.trim(),
      breed: form.breed.trim(),
      age: form.age.trim(),
      type: form.type,
      description: form.description.trim(),
      location: form.location.trim(),
      image: form.imagePreview ?? "",
    });
    setIsSubmitting(false);
    router.push("/dashboard/feed");
  };

  const canPost = form.location.trim().length > 0;

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/dashboard/feed"
        className="mb-6 inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Буцах
      </Link>

      {/* Facebook-style Create Post card */}
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
      >
        {/* Header - like Facebook */}
        <div className="border-b border-gray-100 px-4 py-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Шинэ пост үүсгэх
            </h2>
          </div>
        </div>

        {/* User + Main content */}
        <div className="p-4">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10 shrink-0 rounded-full border-2 border-gray-100">
              <AvatarImage src={user?.imageUrl} alt={displayName as string} />
              <AvatarFallback className="bg-[#4f9669] text-white">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">{displayName}</p>
              <Textarea
                placeholder="Юу бодож байна вэ? Олдсон амьтны тухай бичээрэй..."
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                className="mt-2 min-h-[80px] resize-none border-0 bg-transparent p-0 text-gray-900 placeholder:text-gray-500 focus-visible:ring-0"
                rows={3}
              />
            </div>
          </div>

          {/* Image preview - Facebook style */}
          {form.imagePreview && (
            <div className="relative mt-4 rounded-lg border border-gray-200 bg-gray-50 p-2">
              <button
                type="button"
                onClick={removeImage}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
              >
                <X className="h-4 w-4" />
              </button>
              <img
                src={form.imagePreview}
                alt="Preview"
                className="max-h-80 w-full rounded-lg object-contain"
              />
            </div>
          )}

          {/* Add to your post - Facebook style toolbar */}
          <div className="mt-4 rounded-lg border border-gray-200 p-2">
            <p className="mb-2 px-2 text-xs font-medium text-gray-500">
              Постонд нэмэх
            </p>
            <div className="flex flex-wrap gap-2">
              <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <ImagePlus className="h-5 w-5 text-[#4f9669]" />
                Зураг
              </label>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setShowExtra(!showExtra)}
                onKeyDown={(e) => e.key === "Enter" && setShowExtra(!showExtra)}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                <MapPin className="h-5 w-5 text-red-500" />
                Байршил
                {showExtra ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </div>

            {/* Expanded extra fields */}
            {showExtra && (
              <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">
                      Амьтны төрөл
                    </label>
                    <div className="flex gap-1">
                      {PET_TYPES.map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() =>
                            setForm((f) => ({ ...f, type: t.value }))
                          }
                          className={`flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition-all ${
                            form.type === t.value
                              ? "border-[#4f9669] bg-[#4f9669]/10 text-[#4f9669]"
                              : "border-gray-200 text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">
                      Нэр
                    </label>
                    <Input
                      placeholder="Buddy"
                      value={form.petName}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, petName: e.target.value }))
                      }
                      className="h-10"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">
                      Үүлдэр
                    </label>
                    <Input
                      placeholder="Golden Retriever"
                      value={form.breed}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, breed: e.target.value }))
                      }
                      className="h-10"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">
                      Нас
                    </label>
                    <Input
                      placeholder="2 жил"
                      value={form.age}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, age: e.target.value }))
                      }
                      className="h-10"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Location - always required */}
          <div className="mt-4">
            <Input
              placeholder="Олдсон байршил * (заавал бөглөнө)"
              value={form.location}
              onChange={(e) =>
                setForm((f) => ({ ...f, location: e.target.value }))
              }
              required
              className="h-10"
            />
          </div>
        </div>

        {/* Post button - Facebook style */}
        <div className="border-t border-gray-100 p-4">
          <Button
            type="submit"
            disabled={isSubmitting || !canPost}
            className="w-full bg-[#4f9669] py-6 text-base font-semibold hover:bg-[#458559] disabled:opacity-50"
          >
            {isSubmitting ? "Боловсруулж байна..." : "Пост"}
          </Button>
        </div>
      </form>
    </div>
  );
}
