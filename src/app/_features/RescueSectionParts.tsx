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
<<<<<<< HEAD
          <span className="block text-3xl md:text-6xl font-bold text-black drop-shadow-sm">Тусламж хэрэгтэй амьтад</span>

          <span className="block text-1xl md:text-3xl font-bold text-[#E8B07E] drop-shadow-sm">Эдгээр амьтад үүрдийн гэрээ хайж байна</span>
=======
          <span
            className="block text-3xl md:text-6xl font-bold text-gray-700 drop-shadow-sm"
            style={{
              fontFamily: "'Comic Sans MS', 'Marker Felt', 'Chalkboard SE', cursive",
              color: '#43342D',
            }}
          >
            Тусламж хэрэгтэй амьтад
          </span>

          <span
            className="block text-1xl md:text-3xl font-bold drop-shadow-sm"
            style={{
              fontFamily: "'Comic Sans MS', 'Marker Felt', 'Chalkboard SE', cursive",
              color: '#86D2D9',
            }}
          >
            Эдгээр амьтад үүрдийн гэрээ хайж байна
          </span>
>>>>>>> origin/115-hero-zaya
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
            color: '#43342D',
          }}
        >
          Тусламж хэрэгтэй амьтад
        </span>
        <span
          className="block text-1xl md:text-3xl font-bold drop-shadow-sm"
          style={{
            fontFamily: "'Comic Sans MS', 'Marker Felt', 'Chalkboard SE', cursive",
            color: '#86D2D9',
          }}
        >
          Эдгээр амьтад үүрдийн гэрээ хайж байна
        </span>
      </motion.h1>
    </div>
  );
}
