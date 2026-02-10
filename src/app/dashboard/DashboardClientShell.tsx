'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {  Home, PawPrint, PlusSquare, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Logo from '../_components/Logo';

const sidebarItems = [
  { href: '/dashboard/find-animals', label: 'Find Animals', icon: Home },
  { href: '/dashboard/post-animals', label: 'Post Animals', icon: PlusSquare },
  { href: '/dashboard/map', label: 'map', icon: PawPrint },
];


export function DashboardClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      <div className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="flex justify-between items-center px-10 pl-10 h-15 border-b-amber-400 border"  style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
          <Logo/>
          <nav className="space-y-1 gap-4 flex">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                    isActive ? 'bg-[#f18912]/10 text-[#f18912]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
             <Avatar className="size-10 rounded-full bg-[#fc8d0e] text-white border-2 border-white/80 shadow-md">
            <AvatarImage />
            <AvatarFallback className="bg-[#fc8d0e] text-white text-sm font-semibold"></AvatarFallback>
          </Avatar>
          </nav>
         
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <Link href="/" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
            Нүүр рүү буцах
          </Link>
        </div>

        <main className="ml-64 flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
