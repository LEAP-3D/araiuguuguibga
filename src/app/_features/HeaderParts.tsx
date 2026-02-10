'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, User, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Logo from '../_components/Logo';

const navLinkClass = `
  relative font-bold text-lg text-gray-600 cursor-pointer
  transition-colors duration-300 hover:text-black
  after:content-['']
  after:absolute after:left-0 after:-bottom-1
  after:h-[2px] after:w-full
  after:bg-[#fd8c3e]
  after:scale-x-0
  after:origin-left
  after:transition-transform after:duration-500 after:ease-out
  hover:after:scale-x-100
  `;

export function HeaderLogo() {
  return (
    <motion.div className="relative flex items-center pl-5" whileHover={{ scale: 1.02 }}>
      {/* Өнгөт blur-ийг устгаж, зөвхөн логог үлдээв */}
      <Logo />
    </motion.div>
  );
}

export function HeaderNavLinks({ isSignedIn: _isSignedIn = false }: { isSignedIn?: boolean }) {
  return (
    <div className="hidden md:flex items-center gap-8" style={{ fontFamily: "'Comic Sans MS', 'Marker Felt', 'Chalkboard SE', cursive" }}>
      <a style={{ color: '#43342D' }} href="#adopt" className={navLinkClass}>
        Амьтны мэдээлэл
      </a>
      <a style={{ color: '#43342D' }} href="#vets" className={navLinkClass}>
        Эмнэлэг байршил
      </a>
      {/* <a style={{ color: '#43342D' }} className={navLinkClass}>Community</a> */}
      {/* <Link style={{ color: '#43342D' }} href={isSignedIn ? '/dashboard' : '/sign-in'} className={navLinkClass}>
        Dashboard
      </Link> */}
    </div>
  );
}

export function HeaderAuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link href="/sign-in">
          <Button variant="ghost" className="relative text-gray-700 hover:bg-[#86D2D9] hover:text-gray-800 rounded-xl transition-all duration-300 overflow-hidden group">
            <span className="relative z-10">Нэвтрэх</span>
            <motion.span className="absolute inset-0 bg-[#86D2D9]/20" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
          </Button>
        </Link>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link href="/sign-up">
          <Button className="rounded-full bg-[#43342D] hover:bg-[#524a3d] text-white px-8 py-5 shadow-none transition-all duration-300 font-semibold border-0">
            <motion.span
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <span className="relative z-10 flex items-center gap-2">Бүртгүүлэх</span>
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

type HeaderUserMenuProps = {
  displayName: string;
  initial: string;
  imageUrl: string | undefined;
  onSignOut: () => void;
};

export function HeaderUserMenu({ displayName, initial, imageUrl, onSignOut }: HeaderUserMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <motion.button
          type="button"
          className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-all duration-300 cursor-pointer outline-none border-0"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Avatar className="size-9 rounded-full bg-[#fc8d0e] text-white border-2 border-white/80 shadow-md">
            <AvatarImage src={imageUrl} alt={displayName} />
            <AvatarFallback className="bg-[#fc8d0e] text-white text-sm font-semibold">{initial}</AvatarFallback>
          </Avatar>
          <span className="text-gray-800 font-medium truncate pr-5">{displayName}</span>
        </motion.button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 rounded-xl shadow-lg border-gray-200/80 p-0">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="font-semibold text-gray-900">My Account</p>
        </div>
        <div className="py-2">
          <Link href="/dashboard" className="flex gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 transition-colors">
            <LayoutDashboard className="w-4 h-4 text-[#fc8d0e]" />
            <span>Dashboard</span>
          </Link>
          <Link href="/profile" className="flex gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 transition-colors">
            <User className="w-4 h-4 text-[#fc8d0e]" />
            <span>Profile</span>
          </Link>
          <button type="button" className="w-full flex gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 transition-colors text-left">
            <Heart className="w-4 h-4 text-[#fc8d0e]" />
            <span>Saved Pets</span>
          </button>
          <button type="button" className="w-full flex gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 transition-colors text-left">
            <Settings className="w-4 h-4 text-[#fc8d0e]" />
            <span>Settings</span>
          </button>
          <button type="button" onClick={onSignOut} className="w-full flex gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors text-left">
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const navClassName = 'relative w-full z-50 pt-7 bg-transparent';
const navMotion = {
  initial: { y: -80, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

export function HeaderShell({ children, isSignedIn = false }: { children: React.ReactNode; isSignedIn?: boolean }) {
  return (
    <motion.nav className={navClassName} {...navMotion}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <HeaderLogo />
          <HeaderNavLinks isSignedIn={isSignedIn} />
          <div className="hidden md:flex items-center gap-4">{children}</div>
        </div>
      </div>
    </motion.nav>
  );
}
