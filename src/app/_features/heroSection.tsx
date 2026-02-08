'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { MessageCircle, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type HeroSectionProps = {
  onOpenChat?: () => void;
};

export function HeroSection({ onOpenChat }: HeroSectionProps) {
  const { isSignedIn } = useUser();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);
  const servicesHref = mounted && isSignedIn ? '/dashboard' : '/sign-up';

  return (
    <section id="hero" className="relative flex min-h-screen items-start justify-start px-4 sm:px-6 pt-16 sm:pt-[100px] pb-6 sm:pb-[30px]">
      <div className="flex flex-col items-start text-center space-y-5 ml-35  sm:space-y-6 w-full max-w-4xl pl-0 pr-4 sm:pl-6 sm:pr-[50px] md:pl-[200px] md:pr-[50px]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center mt-8 sm:mt-[95px] gap-2 rounded-full border border-white/50 bg-white/20 backdrop-blur-md px-3 py-1.5 shadow-sm"
        >
          <Image src="/caticon.png" alt="" width={20} height={20} className="h-4 w-4 sm:h-5 sm:w-5 object-contain" />
          <span className="text-xs sm:text-sm font-medium text-[#8e4585]">Таны тэжээвэр амьтны ид шидийн аялал эндээс эхэлнэ</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="leading-tight text-3xl sm:text-5xl md:text-7xl">
          <span
            className="block font-bold text-white drop-shadow-sm w-210 justify-start"
            style={{
              fontFamily: "'Comic Sans MS', 'Marker Felt', 'Chalkboard SE', cursive",
              color: '#43342D',
            }}
          >
            Бүх тэжээвэр амьтан
          </span>
          <span
            className="block font-bold drop-shadow-sm"
            style={{
              fontFamily: "'Comic Sans MS', 'Marker Felt', 'Chalkboard SE', cursive",
              color: '#86D2D9',
            }}
          >
            өөрийн гэрээ энд олдог
          </span>
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-wrap justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenChat}
            className="relative flex items-center gap-2 cursor-pointer rounded-xl px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium bg-[#43342D] text-white shadow-lg overflow-hidden group transition-all duration-500 hover:bg-[#524a3d]"
          >
            <motion.span
              className="absolute inset-0 "
              style={{
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)',
              }}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <span className="relative z-10 flex  items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              AI туслах
            </span>
          </motion.button>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={servicesHref}
              className="relative flex items-center gap-2 cursor-pointer rounded-xl px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium border-2 border-[#86D2D9] text-[#86D2D9] bg-transparent overflow-hidden group transition-all duration-300 hover:bg-[#86D2D9]/10"
            >
              <motion.span className="absolute inset-0 bg-[#86D2D9]/10" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
              <span className="relative z-10 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Манай үйлчилгээ
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
