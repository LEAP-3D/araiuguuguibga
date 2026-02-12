'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PawPrint, PlusSquare, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Logo from '../_components/Logo';
import { useUser } from '@clerk/nextjs';
import { TestNotificationButton } from '@/components/TestNotificationButton';
import { useNotification } from '@/hooks/useNotification';

const sidebarItems = [
  { href: '/dashboard/find-animals', label: 'Find Animals', icon: Home },
  { href: '/dashboard/add-post', label: 'Post Animals', icon: PlusSquare },
  { href: '/dashboard/map', label: 'Map', icon: PawPrint },
];

export function DashboardClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();
  const { permission, requestPermission, loading } = useNotification();

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

            <div className="flex flex-col items-end gap-0.5">
              <div className="flex items-center gap-2">
                {permission !== 'granted' ? (
                  <button
                    type="button"
                    onClick={() => requestPermission()}
                    disabled={loading}
                    className="rounded-lg bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
                  >
                    {loading ? '…' : 'Мэдэгдэл идэвхжүүлэх'}
                  </button>
                ) : null}
                <TestNotificationButton />
              </div>
              <p className="text-[10px] text-gray-500 max-w-[200px] text-right" title="Demo: бүгд эхлээд Мэдэгдэл идэвхжүүлэх дарна, дараа нь Test Notification дарбал бүгд мэдэгдэл авна">
                Demo: эхлээд бүгд идэвхжүүлнэ, дараа нь Test дарна
              </p>
            </div>
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
