'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PawPrint, PlusSquare, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Logo from '../_components/Logo';
import { useUser } from '@clerk/nextjs';

const sidebarItems = [
  { href: '/dashboard/find-animals', label: 'Find Animals', icon: Home },
  { href: '/dashboard/add-post', label: 'Post Animals', icon: PlusSquare },
  { href: '/dashboard/map', label: 'Map', icon: PawPrint },
];

export function DashboardClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="flex flex-col font-sans">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card/80 backdrop-blur-md ">
        <div className="flex justify-between items-center px-10 h-16 border-b border-amber-400">
          <Logo />

          <nav className="flex items-center gap-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                    isActive ? 'bg-[#f18912]/10 text-[#f18912]' : 'text-gray-600 hover:bg-orange-400 hover:text-white'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}

            <Avatar className="h-10 w-10 rounded-full border-2 border-gray-100">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback className="bg-[#f18912] text-white">U</AvatarFallback>
            </Avatar>
          </nav>
        </div>

        <div className="px-10 ">
          <Link href="/" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
            Нүүр рүү буцах
          </Link>
        </div>
      </div>

      {/* Main content */}
      <main className="p-6 flex justify-center">{children}</main>
    </div>
  );
}
