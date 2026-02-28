'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { MessageCircle, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShinyButton } from '@/components/ui/shiny-button';
export function HeroSection({ onOpenChat }: { onOpenChat?: () => void }) {
  const { isSignedIn } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  const servicesHref = mounted && isSignedIn ? '/dashboard' : '/sign-up';
  return (
    <section
      id="hero"
      className="relative w-full min-h-[90vh] flex items-center justify-center bg-[#FFFEF9] overflow-hidden px-6 pt-24
             pb-[calc(env(safe-area-inset-bottom)+96px)]"
      style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
    >
      <div className="absolute top-[15%] right-[20%] w-125 h-125 bg-[#e99d40] rounded-full blur-[150px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-75 h-75 bg-[#e6b740] rounded-full blur-[100px] opacity-30 pointer-events-none" />
      <div className="absolute top-[20%] left-[5%] w-50 h-50 bg-[#FFF4D9] rounded-full blur-[80px] opacity-20 pointer-events-none" />
      <div className="absolute top-[5%] right-[10%] w-80 h-80 bg-[#FFE4B8] rounded-full blur-[120px] opacity-25 pointer-events-none" />
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center md:items-start space-y-8 text-center md:text-left relative z-20 md:-mt-16"
        >
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#FFF4D9] border border-[#FFD98A] text-[#B8740A] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <span className="w-2 h-2 rounded-full bg-[#21da00] animate-pulse inline-block" />
              24/7 AI Туслах
            </motion.div>
            <h1
              className="w-full max-w-[36rem] text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#2D2D2D] leading-[1.08] break-words"
              style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Бид Таны <br />{' '}
              <div style={{ fontFamily: 'var(--font-great-vibes)' }} className="text-[#fd9f9f] text-[90px] mt-5 ">
                Хайртай
              </div>
              Амьтдын <br />
              <span className="relative inline-block" style={{ color: '#FFBE98', fontStyle: 'italic', fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: '-0.01em' }}>
                Эрхэм Хамгаалагч
                {/* Animated underline squiggle */}
                <svg className="absolute -bottom-2 left-0 w-120" height="7" viewBox="0 0 340 7" fill="none" preserveAspectRatio="none">
                  <motion.path
                    d="M0 5 Q42.5 1 85 5 Q127.5 9 170 5 Q212.5 1 255 5 Q297.5 9 340 5"
                    stroke="#FFB070"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.85, duration: 0.9, ease: 'easeOut' }}
                  />
                </svg>
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="hidden md:block text-[#685a4a] text-lg md:text-xl max-w-lg leading-relaxed mt-4"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400 }}
            >
              Вакцин сануулах, ойролцоох мал эмнэлэг олох, AI зөвлөгөө авах — бүгд нэг дор.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.55 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-5"
          >
            <ShinyButton onClick={onOpenChat} className="font-[Outfit,sans-serif]">
              <MessageCircle className="h-5 w-5 shrink-0" />
              AI туслах
            </ShinyButton>
            <ShinyButton href={servicesHref} className="font-[Outfit,sans-serif]">
              <Heart className="h-5 w-5 shrink-0" />
              Манай үйлчилгээ
            </ShinyButton>
          </motion.div>
          <div className="flex flex-row gap-6 pt-4">
            {[
              { src: '/clinic.png', delay: 1.0, label: 'Клиник' },
              { src: '/vaccine.png', delay: 1.1, label: 'Вакцин' },
              { src: '/pet-care.png', delay: 1.2, label: 'Арчилгаа' },
            ].map((icon, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: icon.delay, duration: 0.5, type: 'spring', bounce: 0.4 }}
                whileHover={{ y: -5, scale: 1.1 }}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full border-4 border-[#FFE8B5] overflow-hidden flex items-center justify-center p-1 transition-shadow duration-300"
                  style={{ boxShadow: '0 4px 16px rgba(237,169,43,0.18)' }}
                >
                  <Image src={icon.src} alt={`pet-icon-${index}`} width={70} height={70} className="object-cover rounded-full" />
                </div>
                <span className="text-[10px] font-semibold tracking-wider uppercase text-[#B8740A]/70" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {icon.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative flex justify-center md:justify-end items-center">
          <div className="relative z-10 w-full max-w-137.5 md:ml-auto">
            <Image src="/cat.png" alt="Beloved Cat" width={800} height={900} className="object-contain ml-auto md:scale-150" priority />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="absolute top-[-9%] right-[27%] z-10 hidden md:block">
          <svg width="200" height="350" viewBox="0 0 120 120" fill="none">
            <g transform="translate(55, 90) rotate(-90) scale(0.5, 1.1) translate(-12, -26)">
              <path d="M12 0C7.58 0 4 3.58 4 8C4 14 12 26 12 26C12 26 20 14 20 8C20 3.58 16.42 0 12 0Z" stroke="#eda92b" strokeWidth="1.3" opacity="0.6" />
            </g>
            <g transform="translate(55, 80) rotate(-50) scale(1.1, 1.4) translate(-12, -26)">
              <path d="M12 0C7.58 0 4 3.58 4 8C4 14 12 26 12 26C12 26 20 14 20 8C20 3.58 16.42 0 12 0Z" stroke="#eda92b" strokeWidth="1.1" opacity="0.6" />
            </g>
            <g transform="translate(65, 70) rotate(-10) scale(1.1, 1.6) translate(-12, -26)">
              <path d="M12 0C7.58 0 4 3.58 4 8C4 14 12 26 12 26C12 26 20 14 20 8C20 3.58 16.42 0 12 0Z" stroke="#eda92b" strokeWidth="1.1" opacity="0.6" />
            </g>
          </svg>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="absolute top-[2%] right-[5%] z-10 hidden md:block">
          <svg width="150" height="150" viewBox="0 0 120 120" fill="none">
            <g transform="translate(75, 90) rotate(90) scale(0.6, 1.1) translate(-12, -26)">
              <path d="M12 0C7.58 0 4 3.58 4 8C4 14 12 26 12 26C12 26 20 14 20 8C20 3.58 16.42 0 12 0Z" stroke="#eda92b" strokeWidth="1.6" opacity="0.6" />
            </g>
            <g transform="translate(68, 80) rotate(45) scale(0.9, 1.6) translate(-12, -26)">
              <path d="M12 0C7.58 0 4 3.58 4 8C4 14 12 26 12 26C12 26 20 14 20 8C20 3.58 16.42 0 12 0Z" stroke="#eda92b" strokeWidth="1.5" opacity="0.6" />
            </g>
            <g transform="translate(55, 70) rotate(5) scale(0.9, 1.9) translate(-12, -26)">
              <path d="M12 0C7.58 0 4 3.58 4 8C4 14 12 26 12 26C12 26 20 14 20 8C20 3.58 16.42 0 12 0Z" stroke="#eda92b" strokeWidth="1.5" opacity="0.6" />
            </g>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
