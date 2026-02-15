"use client";

import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import ImagePickerCard from "../_components/pet-ai/imagePickerCard";
import ResultPanel from "../_components/pet-ai/resultPanel";
import { usePetAnalyze } from "../_components/pet-ai/usePetAnalyz";

export default function PetAiAssistantSection() {
  const {
    preview,
    setPreview,
    loading,
    canAnalyze,
    result,
    statusText,
    clearAll,
    analyze,
  } = usePetAnalyze();

  return (
  <section className="w-full">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="leading-tight"
  >
    <div className="p-6 md:p-8">
      {/* Top-right button (өмнөх байрлал) */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={clearAll}
          className="border-orange-200 text-orange-700 hover:bg-orange-50 rounded-xl"
          type="button"
        >
          Цэвэрлэх
        </Button>
      </div>

      {/* Header (төвлөрсөн хэвээр) */}
      <div className="mb-8 mt-4 text-center">
        <div className="mb-2 inline-flex items-center align-center gap-2 rounded-full px-4 py-1.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            🐾
          </span>

          <span
            className="block text-2xl md:text-4xl font-bold text-black drop-shadow-sm"
            style={{
              fontFamily:
                "'Comic Sans MS', 'Marker Felt', 'Chalkboard SE', cursive",
              color: "#43342D",
            }}
          >
            AI <span>туслах</span>
          </span>
        </div>

        <p
          className="block text-sm md:text-base drop-shadow-sm mx-auto max-w-2xl"
          style={{
            fontFamily:
              "'Comic Sans MS', 'Marker Felt', 'Chalkboard SE', cursive",
            color: "#E8B07E",
          }}
        >
          Амьтныхаа зургийг оруулснаар AI нь төрөл, үүлдэр (таамаг), ойролцоох нас,
          арчилгаа, хооллох зөвлөгөө, вакцины ерөнхий мэдээллийг гаргана.
        </p>

        <div className="mt-3 text-xs text-slate-500">
          * Энэ нь зураг дээр суурилсан ерөнхий зөвлөгөө бөгөөд онош биш болно.
        </div>
      </div>

      {/* Body (хуучнаараа) */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImagePickerCard
          preview={preview}
          setPreview={setPreview}
          loading={loading}
          canAnalyze={canAnalyze}
          onAnalyze={analyze}
          onClear={clearAll}
        />

        <ResultPanel loading={loading} result={result} statusText={statusText} />
      </div>
    </div>
  </motion.div>
</section>

 );
}
