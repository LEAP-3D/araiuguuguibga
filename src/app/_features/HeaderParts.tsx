'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Logo from '../_components/Logo';

const navLinkClass = `
  group relative inline-flex items-center  bg-transparent px-4 py-2
  text-[15px] font-medium leading-none text-[#43342D] cursor-pointer
  transition-all duration-300  hover:text-[#2f241f]
  after:content-['']
  after:absolute after:left-3 after:right-3 after:-bottom-[2px]
  after:h-[2px] after:w-full
  after:bg-[#f28a3f]
  after:scale-x-0
  after:origin-center
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

export function HeaderNavLinks({ isSignedIn = false }: { isSignedIn?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (id: string) => {
    if (pathname !== '/') {
      router.push(`/#${id}`);
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 96;
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' });
  };

  return (
    <div className="hidden md:flex items-center gap-2   backdrop-blur-sm" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      {isSignedIn ? (
        <>
          <Link href="/profile" className={navLinkClass}>
            Миний амьтан
          </Link>
          <Link href="/dashboard/add-post" className={navLinkClass}>
            Пост оруулах
          </Link>
        </>
      ) : null}
      <button type="button" onClick={() => scrollToSection('adopt')} className={navLinkClass}>
        Амьтны мэдээлэл
      </button>
      <button type="button" onClick={() => scrollToSection('vets')} className={navLinkClass}>
        Эмнэлэг байршил
      </button>

      {/* <a style={{ color: '#43342D' }} className={navLinkClass}>Community</a> */}
      {/* <Link style={{ color: '#43342D' }} href={isSignedIn ? '/dashboard' : '/sign-in'} className={navLinkClass}>
        Dashboard
      </Link> */}
    </div>
  );
}

export function HeaderAuthButtons() {
  return (
    <div className="flex items-center gap-4" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link href="/sign-in">
          <Button variant="ghost" className="relative text-gray-700 hover:bg-[#ffcea8] hover:text-gray-800 rounded-xl transition-all duration-300 overflow-hidden group">
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
          className="flex items-center cursor-pointer gap-2 rounded-xl px-2 py-1.5 transition-all duration-300 cursor-pointer outline-none border-0"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Avatar className="size-10 rounded-full bg-[#fc8d0e] text-white border-2 border-white/80 shadow-md">
            <AvatarImage src={imageUrl} alt={displayName} />
            <AvatarFallback className="bg-[#fc8d0e] text-white text-sm font-semibold">{initial}</AvatarFallback>
          </Avatar>
          <span className="text-gray-800 font-medium truncate pr-5" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
            {displayName}
          </span>
        </motion.button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 rounded-xl shadow-lg border-gray-200/80 p-0" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="font-semibold text-gray-900">Миний аккаунт</p>
        </div>
        <div className="">
          <Link href="/dashboard" className="flex gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 cursor-pointer transition-colors items-center">
            <LayoutDashboard className="w-4 h-4 text-[#fc8d0e]" />
            <span>Аврах</span>
          </Link>
          <Link href="/profile" className="flex cursor-pointer gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 transition-colors items-center">
            <User className="w-4 h-4 text-[#fc8d0e]" />
            <span>Профайл</span>
          </Link>
          <button type="button" onClick={onSignOut} className="w-full cursor-pointer flex gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors text-left">
            <LogOut className="w-4 h-4" />
            <span>Гарах</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const navMotion = {
  initial: { y: 0, opacity: 1 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.2, ease: 'easeOut' as const },
};

export function HeaderShell({ children, isSignedIn = false }: { children: React.ReactNode; isSignedIn?: boolean }) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  const navClassName = `${isLandingPage ? 'sticky top-0' : 'relative'} w-full z-50 bg-white/75 backdrop-blur-md border-b border-white/70`;

  return (
    <motion.nav className={navClassName} {...navMotion}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <HeaderLogo />
          <HeaderNavLinks isSignedIn={isSignedIn} />
          <div className="hidden md:flex items-center gap-4">{children}</div>
        </div>
      </div>
    </motion.nav>
  );
}
