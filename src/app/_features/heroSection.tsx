'use client';

import { MessageCircle, Heart } from 'lucide-react';
import type { Stats } from '../_components/types';
import { motion } from 'framer-motion';

const stats: Stats[] = [
  { value: '2,500+', label: 'Happy Pets', icon: '' },
  { value: '1,200+', label: 'Families United', icon: '' },
  { value: '98%', label: 'Satisfaction', icon: '' },
];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center"
    >
      <div className="w-full max-w-4xl px-10">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-cyan-400/50 bg-white/95 backdrop-blur-sm px-3 py-1.5 shadow-sm"
          >
            <svg className="h-4 w-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Your Pet&apos;s Magical Journey Starts Here</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="leading-tight">
            <span
              className="block text-5xl md:text-7xl font-bold text-gray-800 drop-shadow-sm"
              style={{
                fontFamily: "'Comic Sans MS', 'Marker Felt', 'Chalkboard SE', cursive",
              }}
            >
              Where Every Pet
            </span>
            <span
              className="block text-5xl md:text-7xl font-bold drop-shadow-sm"
              style={{
                fontFamily: "'Comic Sans MS', 'Marker Felt', 'Chalkboard SE', cursive",
                color: '#5ab9b3',
              }}
            >
              Finds Their Home
            </span>
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-wrap justify-center gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-2 cursor-pointer rounded-xl px-6 py-3 font-medium text-white shadow-lg shadow-cyan-300/40 overflow-hidden group transition-all duration-500"
              style={{
                backgroundColor: '#5ab9b3',
              }}
            >
              <motion.span
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)',
                }}
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Ask AI Assistant
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-2 cursor-pointer rounded-xl px-6 py-3 font-medium text-gray-700 bg-white border border-gray-200 overflow-hidden group transition-all duration-300 hover:text-cyan-600"
            >
              <motion.span className="absolute inset-0 bg-linear-to-r from-cyan-50 to-teal-50" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
              <span className="relative z-10 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Our Services
              </span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-wrap justify-center gap-8 pt-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold" style={{ color: '#5ab9b3' }}>
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
