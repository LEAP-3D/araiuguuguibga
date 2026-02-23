"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  preview: string | null;
  setPreview: (v: string | null) => void;
  loading: boolean;
  canAnalyze: boolean;
  onAnalyze: () => void;
  onClear: () => void;
};

export default function ImagePickerCard({
  preview,
  setPreview,
  loading,
  canAnalyze,
  onAnalyze,
  onClear,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearLocal = () => {
    onClear();
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="rounded-2xl border border-orange-100 bg-orange-50/40 p-4">
      <div className="text-sm font-medium text-slate-900">Зураг оруулах</div>
      <p className="mt-1 text-xs text-slate-600">
        Камераар авсан зураг байж болно, эсвэл галлерейгаас сонгож болно.
      </p>

      <div className="mt-4">
        <Input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onPickFile}
          className="cursor-pointer bg-white"
        />
      </div>

      {preview ? (
        <div className="mt-4 rounded-2xl bg-white border border-orange-100 p-3">
          <div className="relative w-full aspect-square overflow-hidden rounded-xl">
            <Image
              src={preview}
              alt="Pet preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="mt-3 flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={clearLocal}
              className="border-orange-200 text-orange-700 hover:bg-orange-50 rounded-xl"
              type="button"
            >
              Арилгах
            </Button>

            <Button
              onClick={onAnalyze}
              disabled={!canAnalyze}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
              type="button"
            >
              {loading ? "Шинжилж байна..." : "AI-р шинжлэх"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-orange-200 bg-white p-8 text-center">
          <div className="text-sm text-slate-600">
            Энд таны зураг preview болж харагдана.
          </div>
        </div>
      )}
    </div>
  );
}
