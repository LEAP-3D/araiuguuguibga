'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

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
      </div>
    </section>
  );
}
