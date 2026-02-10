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
    <section id="hero" className="relative w-full min-h-238 flex flex-col items-center pt-50 overflow-hidden">
      <div className="relative w-full max-w-6xl  px-10">
        {/* Headline */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, ease: 'easeOut' }} className="leading-tight">
          <div className="relative z-0 text-center md:text-left select-none pointer-events-none mb-20">
            <h1 className="text-[80px] md:text-[150px] font-black leading-[0.8] text-black tracking-tighter">Your Pet Care</h1>
            <h2 className="text-[70px] md:text-[130px] font-bold leading-none -mt-4 text-[#E8B07E]/90">Center</h2>
          </div>
          <div className="absolute top-[115%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              {/* Шар тойрог фон */}
              <div className="absolute bottom-10 w-50 h-50 md:w-[320px] md:h-80 bg-[#F3D5B5] rounded-full -z-10" />

              {/* Муурны зураг - Скриншот шиг толгой нь текстийн доор байхаар тохируулав */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative -mt-24 md:-mt-32" // Муурны толгойг текстийн доор байлгах гол тохиргоо
              >
                <Image
                  src="/cat.png"
                  alt="Main Cat"
                  width={600} // Хэт том биш, текстийг дарахгүй хэмжээтэй болгов
                  height={600}
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>
          </div>

          {/* 3. Хажуугийн зургууд - Байршлыг төв мууртайгаа уялдуулан доошлуулав */}
          <div className="absolute inset-0 flex justify-between items-center px-4 pointer-events-none z-30">
            {/* Зүүн тал: Нохой (Өндөг хэлбэртэй) */}
            <div className="mt-160 ml-4 md:ml-14">
              <div className="w-50 h-70 rounded-full overflow-hidden shadow-2xl  pointer-events-auto bg-white">
                <Image src="/dog.jpg" alt="Dog" width={300} height={400} className="object-cover h-full w-full scale-110" />
              </div>
            </div>

            {/* Баруун тал: Муур (Бөөрөнхий) */}
            <div className="mt-160 mr-4 md:mr-14">
              <div className="w-60 h-70 rounded-full overflow-hidden shadow-2xl  pointer-events-auto bg-white">
                <Image src="/caaat.jpg" alt="Small Cat" width={200} height={200} className="object-cover h-full w-full scale-110" />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute right-[5%] top-[55%] z-40 max-w-fit space-y-3 hidden md:block"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenChat}
              className="
  relative flex items-center gap-2 cursor-pointer
  rounded-xl px-3 py-2.5 sm:px-6 sm:py-3
  text-sm sm:text-base font-medium

  bg-[#E8B07E]
  text-white
  shadow-lg

  overflow-hidden
  group

  transition-all duration-500
  hover:shadow-[0_16px_50px_rgba(232,176,126,0.55)]
  hover:-translate-y-0.5
"
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
                className="relative flex items-center gap-2 cursor-pointer rounded-xl px-3 py-2.5 sm:px-6 sm:py-3
                text-sm sm:text-base font-medium border border-[#f0c49f] text-[#E8B07E] bg-transparent overflow-hidden group
                transition-all duration-300 hover:text-white hover:border-[#E8B07E] 
                hover:shadow-[0_12px_40px_rgba(232,176,126,0.45)] hover:-translate-y-0.5"
              >
                <motion.span className="absolute inset-0 bg-[#86D2D9]/10" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
                <span className="relative z-10 flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Манай үйлчилгээ
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
