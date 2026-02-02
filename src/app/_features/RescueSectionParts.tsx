'use client';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function RescueEmptyState() {
  return (
    <section id="adopt" className="min-h-[70vh] px-4 py-12">
      <div className="mb-8 text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="leading-tight"
        >
          <span
            className="block text-3xl md:text-6xl font-bold text-gray-700 drop-shadow-sm"
            style={{
              fontFamily: "'Comic Sans MS', 'Marker Felt', 'Chalkboard SE', cursive",
            }}
          >
            Тусламж хэрэгтэй амьтад
          </span>

          <span
            className="block text-1xl md:text-3xl font-bold drop-shadow-sm"
            style={{
              fontFamily: "'Comic Sans MS', 'Marker Felt', 'Chalkboard SE', cursive",
              color: '#5ECB8A',
            }}
          >
            Эдгээр амьтад үүрдийн гэрээ хайж байна
          </span>
        </motion.h1>
      </div>
      <div className="mx-auto flex h-[600px] max-w-7xl flex-col items-center justify-center rounded-2xl border-2 border-dashed border-amber-200 bg-white/50">
        <PlusCircle className="mb-4 h-12 w-12 text-amber-400" />
        <p className="mb-2 text-center text-gray-700">Одоогоор пост байхгүй байна</p>
        <p className="mb-6 text-center text-sm text-gray-500">Анхны пост оруулаад эхлээрэй</p>
        <Link href="/dashboard/add-post" className="inline-flex items-center gap-2 rounded-full bg-[#6b9b6e] px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#5d8a60]">
          <PlusCircle className="h-5 w-5" />
          Пост оруулах
        </Link>
      </div>
    </section>
  );
}

export function RescueHeader() {
  return (
    <div className="mb-8 text-center">
      <p className="mb-1 text-xs font-medium uppercase tracking-widest text-amber-800/60" />
      <h2 className="mb-2 text-3xl font-bold text-gray-800 md:text-4xl">Хайр хайж буй амьтад</h2>
      <p className="mx-auto max-w-2xl text-gray-800">Эдгээр эвлүүлэг амьтад мөнхийн гэрийг хүлээж байна. Та тэдний хувьд байж болох уу?</p>
    </div>
  );
}
