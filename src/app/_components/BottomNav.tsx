'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Search, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChatOpen } from '../_contexts/ChatContext';

const items = [
  { href: '/', label: 'Home', icon: Heart, match: (path: string) => path === '/', scrollToHero: true },
  { href: '/dashboard/find-animals', label: 'Raadi', icon: Search, match: (path: string) => path.startsWith('/dashboard/find-animals') },
  { label: 'Chat', icon: MessageCircle, isChat: true },
  { href: '/profile', label: 'Profile', icon: User, match: (path: string) => path.startsWith('/profile') },
];

function scrollToHero() {
  const hero = document.getElementById('hero');
  if (hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function BottomNav() {
  const pathname = usePathname();
  const { open: chatOpen, setOpen: setChatOpen } = useChatOpen();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 flex items-center justify-around py-2 safe-area-inset-bottom"
      aria-label="Үндсэн цэс"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isChat = 'isChat' in item && item.isChat;
        const isActive = isChat ? chatOpen : 'match' in item && item.match(pathname);

        if (isChat) {
          return (
            <button
              key="chat"
              type="button"
              onClick={() => setChatOpen(true)}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 min-w-[64px] py-2 rounded-xl text-xs font-medium transition-colors touch-manipulation',
                isActive ? 'text-[#0d9488]' : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <Icon className={cn('h-6 w-6', isActive && 'stroke-[2.5]')} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
            </button>
          );
        }

        const href = 'href' in item ? item.href : '#';
        const scrollToHeroOnClick = 'scrollToHero' in item && item.scrollToHero && pathname === '/';

        if (scrollToHeroOnClick) {
          return (
            <button
              key={href}
              type="button"
              onClick={scrollToHero}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 min-w-[64px] py-2 rounded-xl text-xs font-medium transition-colors touch-manipulation',
                isActive ? 'text-[#0d9488]' : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <Icon
                className={cn('h-6 w-6', isActive && item.label === 'Home' && 'fill-[#0d9488]')}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span>{item.label}</span>
            </button>
          );
        }

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex flex-col items-center justify-center gap-0.5 min-w-[64px] py-2 rounded-xl text-xs font-medium transition-colors touch-manipulation',
              isActive ? 'text-[#0d9488]' : 'text-gray-500 hover:text-gray-700'
            )}
          >
            <Icon
              className={cn('h-6 w-6', isActive && item.label === 'Home' && 'fill-[#0d9488]')}
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
