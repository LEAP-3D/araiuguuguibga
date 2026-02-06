'use client';

<<<<<<< HEAD
import Image from 'next/image';
=======
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { MessageCircle, Heart } from 'lucide-react';
>>>>>>> origin/115-hero-zaya
import { motion } from 'framer-motion';
import Image from 'next/image';


<<<<<<< HEAD
export function HeroSection() {
  return (
    <section id="hero" className="relative w-full min-h-[950px] flex flex-col items-center pt-40 overflow-hidden">
      <div className="relative w-full max-w-6xl px-10">
        <motion.h1 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, ease: 'easeOut' }} className="leading-tight">
          <div className="relative z-0 text-center md:text-left select-none pointer-events-none mb-20">
            <h1 className="text-[80px] md:text-[150px] font-black leading-[0.8] text-black tracking-tighter">Your Pet Care</h1>
            <h2 className="text-[70px] md:text-[130px] font-bold leading-none -mt-4 text-[#E8B07E]/90">Center</h2>
          </div>

          {/* 2. Төвийн Муур болон Шар тойрог - Байрлалыг доошлуулав */}
          <div className="absolute top-[115%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              {/* Шар тойрог фон */}
              <div className="absolute bottom-10 w-[200px] h-[200px] md:w-[320px] md:h-[320px] bg-[#F3D5B5] rounded-full -z-10" />

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
            <div className="mt-[600px] ml-4 md:ml-12">
              <div className="w-50 h-70 rounded-[100px] overflow-hidden shadow-2xl  pointer-events-auto bg-white">
                <Image src="/dog-left.jpg" alt="Dog" width={300} height={400} className="object-cover h-full w-full scale-110" />
              </div>
            </div>

            {/* Баруун тал: Муур (Бөөрөнхий) */}
            <div className="mt-[700px] mr-6 md:mr-17">
              <div className="w-60 h-70 rounded-full overflow-hidden shadow-2xl  pointer-events-auto bg-white">
                <Image src="/cat-right.jpg" alt="Small Cat" width={200} height={200} className="object-cover h-full w-full scale-110" />
              </div>
            </div>
          </div>

          {/* 4. Тайлбар болон товчлуур - Байрлалыг баруун талын муурны дээд талд */}
          <div className="absolute right-[5%] top-[72%] z-40 max-w-fit space-y-3 hidden md:block">
            {/* Тайлбар текст */}
            <p className="text-black text-[14px] font-semibold ml-1">Таны 24/7 туслах</p>

            {/* Товчнууд - Хажуу хажуугаараа цуварсан */}
            <div className="flex flex-row items-center gap-3">
              <button className="bg-[#E8B07E] text-white cursor-pointer px-4 py-2.5 rounded-full text-[13px] font-bold hover:bg-[#d49a6a] transition-all shadow-md shadow-orange-100/50 w-[150px] text-center whitespace-nowrap">
                Ask AI Assistant
              </button>

              <button className="bg-[#E8B07E] text-white cursor-pointer px-4 py-2.5 rounded-full text-[13px] font-bold hover:bg-[#d49a6a] transition-all shadow-md shadow-orange-100/50 w-[150px] text-center whitespace-nowrap">
                AI generate
              </button>
            </div>
          </div>
        </motion.h1>
=======

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
            <span className="text-xs sm:text-sm font-medium text-[#8e4585]">Your Pet&apos;s Magical Journey Starts Here</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="leading-tight text-3xl sm:text-5xl md:text-7xl">
            <span
              className="block font-bold text-white drop-shadow-sm"
              style={{
                fontFamily: "'Comic Sans MS', 'Marker Felt', 'Chalkboard SE', cursive",
                color: '#43342D',
              }}
            >
              Where Every Pet
            </span>
            <span
              className="block font-bold drop-shadow-sm"
              style={{
                fontFamily: "'Comic Sans MS', 'Marker Felt', 'Chalkboard SE', cursive",
                color: '#86D2D9',
              }}
            >
              Finds Their Home
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
                Ask AI Assistant
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
                  Our Services
                </span>
              </Link>
            </motion.div>
          </motion.div>

          
>>>>>>> origin/115-hero-zaya
      </div>
    </section>
  );
}
