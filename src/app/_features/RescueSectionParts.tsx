'use client';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function RescueEmptyState() {
  return (
    <section id="adopt" className="min-h-[70vh] px-4 pt-6 pb-12">
      {' '}
      <div className="mb-8 text-left">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="leading-tight"
        >
          <span className="block text-3xl md:text-6xl font-bold text-gray-700 " style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif', color: '#43342D' }}>
            Тусламж хэрэгтэй амьтад
          </span>

          <span
            className="block text-1xl md:text-3xl font-bold "
            style={{
              fontFamily: "'Comic Sans MS', 'Marker Felt', 'Chalkboard SE', cursive",
              color: '#86D2D9',
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
        <Link href="/dashboard/add-post" className="inline-flex items-center gap-2 rounded-full bg-[#fc8d0e] px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#f89d35]">
          <PlusCircle className="h-5 w-5" />
          Пост оруулах
        </Link>
      </div>
    </section>
  );
}

export function RescueHeader() {
  return (
    <div className="mb-6 px-6 md:px-11 -mt-4 md:mt-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-2"
      >
        {/* Left text */}
        <div className="flex flex-col gap-1">
          <span className="text-2xl md:text-4xl font-black whitespace-nowrap text-[#fc8d0e]">Тусламж хэрэгтэй амьтад</span>

          <span className="text-sm md:text-base font-semibold pl-1 whitespace-nowrap text-[#43342D]">Эдгээр амьтад үүрдийн гэрээ хайж байна</span>
        </div>

        {/* Right  */}
        <Link href="/dashboard/find-animals" className="self-start md:self-auto mt-2 md:mt-0 text-base hover:text-[#ff944c]">
          Бүгдийг харах →
        </Link>
      </motion.div>
    </div>
  );
}
