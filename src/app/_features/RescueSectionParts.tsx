'use client';
import Link from 'next/link';
import { ArrowRight, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function RescueEmptyState() {
  return (
    <section id="adopt" className="scroll-mt-28 min-h-[70vh] px-4 py-12" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div className="flex justify-center">
        <div className="mb-8 text-left w-345">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="leading-tight"
          >
            <span
              className="block text-3xl md:text-6xl font-bold text-gray-700 "
              style={{ color: '#FFBE98', fontStyle: 'italic', fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: '-0.01em' }}
            >
              Тусламж хэрэгтэй амьтад
            </span>

            <span className="block text-1xl md:text-3xl font-bold ">Эдгээр амьтад үүрдийн гэрээ хайж байна</span>
          </motion.h1>
        </div>
        <div className="mx-auto flex h-[600px] max-w-7xl flex-col items-center justify-center rounded-2xl border-2 border-dashed border-amber-200 bg-white/50">
          <PlusCircle className="mb-4 h-12 w-12 text-amber-400" />
          <p className="mb-2 text-center text-gray-700">Одоогоор пост байхгүй байна</p>
          <p className="mb-6 text-center text-sm text-gray-500">Анхны пост оруулаад эхлээрэй</p>
          <Link
            href="/dashboard/add-post"
            className="inline-flex items-center gap-2 rounded-full bg-[#fff0e3] px-6 py-3 text-sm font-medium text-[#a25a2f] shadow-sm transition-colors hover:bg-[#f89d35]"
          >
            <PlusCircle className="h-5 w-5" />
            Пост оруулах
          </Link>
        </div>
      </div>
    </section>
  );
}

export function RescueHeader() {
  return (
    <div className="flex justify-center">
      <div className="mb-8 px-11 w-345">
        <motion.div
          style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between gap-4"
        >
          {/* Left text */}
          <div className="flex flex-col gap-1">
            <span className="text-2xl md:text-4xl font-black">Тусламж хэрэгтэй амьтад</span>
            <span className="text-sm md:text-base font-semibold pl-1 text-[#fbb2a3]">Эдгээр амьтад үүрдийн гэрээ хайж байна</span>
          </div>

          {/* Right action */}
          <Link
            href="/dashboard/find-animals"
            className="font-black
    relative inline-block px-3 py-2
    text-black text-base
    rounded-md
    transition-all duration-300
    hover:after:w-full
    hover:bg-[#ff944c] hover:text-white
  "
          >
            <ArrowRight />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
