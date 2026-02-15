'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { MessageCircle, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function HeroSection({ onOpenChat }: { onOpenChat?: () => void }) {
  const { isSignedIn } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  const servicesHref = mounted && isSignedIn ? '/dashboard' : '/sign-up';

  return (
    <section id="hero" className="relative w-full min-h-[90vh] flex items-center justify-center bg-[#FFFEF9] overflow-hidden px-6 py-12 pt-24">
      {/* Арын фонны туяанууд */}
      <div className="absolute top-[15%] right-[20%] w-125 h-125 bg-[#e99d40] rounded-full blur-[150px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-75 h-75 bg-[#e6b740] rounded-full blur-[100px] opacity-30 pointer-events-none" />
      <div className="absolute top-[20%] left-[5%] w-50 h-50 bg-[#FFF4D9] rounded-full blur-[80px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center z-10 relative">
        {/* --- ЗҮҮН ТАЛ: Текст, Button болон Icons --- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center md:items-start space-y-8 text-center md:text-left relative z-20 md:-mt-16" // -mt-16-аар дээшлүүлэв
        >
          {/* Гарчиг */}
          <div className="space-y-2">
            <h1 className="text-6xl md:text-7xl font-extrabold text-[#2D2D2D] leading-[1.1] w-240">
              Бид Таны Хайртай Амьтдын <br />
              <span className="text-[#eda92b]" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                Эрхэм Хамгаалагч
              </span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-lg leading-relaxed mt-4">Таны бяцхан савруудад зориулсан 24/7 AI туслах</p>
          </div>

          {/* Товчлуурууд */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenChat}
              className="relative flex items-center gap-2 cursor-pointer rounded-full px-8 py-4 text-base font-bold bg-[#FF782D] text-white shadow-lg overflow-hidden group transition-all duration-500"
            >
              <MessageCircle className="h-5 w-5" />
              AI туслах
            </motion.button>

            <Link href={servicesHref}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center gap-2 cursor-pointer rounded-full px-8 py-4 text-base font-bold border-2 border-[#FF782D] text-[#FF782D] bg-transparent overflow-hidden group transition-all duration-300"
              >
                <Heart className="h-5 w-5" />
                Манай үйлчилгээ
              </motion.div>
            </Link>
          </div>

          {/* Гурван икон - Товчлууруудын доор голлосон */}
          <div className="flex flex-row gap-6 pt-4">
            {[
              { src: '/clinic.png', delay: 1.0 },
              { src: '/vaccine.png', delay: 1.1 },
              { src: '/pet-care.png', delay: 1.2 },
            ].map((icon, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: icon.delay, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.1 }}
                className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-xl border-4 border-[#FFE8B5] overflow-hidden flex items-center justify-center p-1"
              >
                <Image src={icon.src} alt={`pet-icon-${index}`} width={70} height={70} className="object-cover rounded-full" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- БАРУУН ТАЛ: Муурны зураг --- */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative flex justify-center md:justify-end items-center">
          <div className="relative z-10 w-full max-w-137.5 md:ml-auto">
            <Image src="/cat.png" alt="Beloved Cat" width={800} height={900} className="object-contain ml-auto md:scale-150" priority />
          </div>
        </motion.div>

        {/* 1. ЗҮҮН ТАЛЫН ЦАЦРАГ (Дээд талын 2 нь том) */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="absolute top-[-9%] right-[27%] z-10 hidden md:block">
          <svg width="200" height="350" viewBox="0 0 120 120" fill="none">
            {/* 1. Доод талын жижиг дусал */}
            <g transform="translate(55, 90) rotate(-90) scale(0.5, 1.1) translate(-12, -26)">
              <path d="M12 0C7.58 0 4 3.58 4 8C4 14 12 26 12 26C12 26 20 14 20 8C20 3.58 16.42 0 12 0Z" stroke="#eda92b" strokeWidth="1.3" opacity="0.6" />
            </g>

            {/* 2. Дээд талын том дусал (Дунд) */}
            <g transform="translate(55, 80) rotate(-50) scale(1.1, 1.4) translate(-12, -26)">
              <path d="M12 0C7.58 0 4 3.58 4 8C4 14 12 26 12 26C12 26 20 14 20 8C20 3.58 16.42 0 12 0Z" stroke="#eda92b" strokeWidth="1.1" opacity="0.6" />
            </g>

            {/* 3. Дээд талын том дусал (Босоо) - Илүү урт болгов */}
            <g transform="translate(65, 70) rotate(-10) scale(1.1, 1.6) translate(-12, -26)">
              <path d="M12 0C7.58 0 4 3.58 4 8C4 14 12 26 12 26C12 26 20 14 20 8C20 3.58 16.42 0 12 0Z" stroke="#eda92b" strokeWidth="1.1" opacity="0.6" />
            </g>
          </svg>
        </motion.div>

        {/* 2. БАРУУН ТАЛЫН ЦАЦРАГ (Дээд талын 2 нь том) */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="absolute top-[2%] right-[5%] z-10 hidden md:block">
          <svg width="150" height="150" viewBox="0 0 120 120" fill="none">
            {/* 1. Доод талын жижиг дусал */}
            <g transform="translate(75, 90) rotate(90) scale(0.6, 1.1) translate(-12, -26)">
              <path d="M12 0C7.58 0 4 3.58 4 8C4 14 12 26 12 26C12 26 20 14 20 8C20 3.58 16.42 0 12 0Z" stroke="#eda92b" strokeWidth="1.6" opacity="0.6" />
            </g>

            {/* 2. Дээд талын том дусал (Дунд) */}
            <g transform="translate(68, 80) rotate(45) scale(0.9, 1.6) translate(-12, -26)">
              <path d="M12 0C7.58 0 4 3.58 4 8C4 14 12 26 12 26C12 26 20 14 20 8C20 3.58 16.42 0 12 0Z" stroke="#eda92b" strokeWidth="1.5" opacity="0.6" />
            </g>

            {/* 3. Дээд талын том дусал (Босоо) */}
            <g transform="translate(55, 70) rotate(5) scale(0.9, 1.9) translate(-12, -26)">
              <path d="M12 0C7.58 0 4 3.58 4 8C4 14 12 26 12 26C12 26 20 14 20 8C20 3.58 16.42 0 12 0Z" stroke="#eda92b" strokeWidth="1.5" opacity="0.6" />
            </g>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
