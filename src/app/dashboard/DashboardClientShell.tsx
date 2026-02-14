'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PawPrint, PlusSquare, ArrowLeft, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

import Logo from '../_components/Logo';
import { useUser } from '@clerk/nextjs';
import { TestNotificationButton } from '@/components/TestNotificationButton';
import { useNotification } from '@/hooks/useNotification';
import { HeaderUserMenu } from '../_features/HeaderUserMenu';

const sidebarItems = [
  { href: '/dashboard/find-animals', label: 'Find Animals', shortLabel: 'Feed', icon: Home },
  { href: '/dashboard/add-post', label: 'Post Animals', shortLabel: 'Post', icon: PlusSquare },
  { href: '/dashboard/map', label: 'Map', shortLabel: 'Map', icon: PawPrint },
];

export function DashboardClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();
  const { permission, requestPermission, loading } = useNotification();

  return (
    <div className="flex flex-col font-sans min-h-[100dvh]">
      {/* Header — mobile: logo + back + user; desktop: full nav */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-amber-400 safe-area-inset-top">
        <div className="flex justify-between items-center px-4 md:px-10 h-14 md:h-16">
          <div className="flex items-center gap-2">
            <Logo />
            <Link href="/" className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-foreground hover:bg-amber-100" aria-label="Нүүр лүү">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                    isActive ? 'bg-[#f18912]/15 text-[#f18912]' : 'text-gray-600 hover:bg-amber-100 hover:text-amber-800'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Mobile: мэдэгдэл идэвхжүүлэх товч — апп нээхэд харагдана */}
            {permission !== 'granted' && (
              <button
                type="button"
                onClick={() => requestPermission()}
                disabled={loading}
                className="md:hidden flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50 touch-manipulation"
                aria-label="Мэдэгдэл идэвхжүүлэх"
              >
                <Bell className="h-4 w-4" />
                {loading ? '…' : 'Мэдэгдэл'}
              </button>
            )}
            {/* Desktop: мэдэгдэл + Test */}
            <div className="hidden md:flex flex-col items-end gap-0.5">
              <div className="flex items-center gap-2">
                {permission !== 'granted' ? (
                  <button type="button" onClick={() => requestPermission()} disabled={loading} className="rounded-lg bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700 disabled:opacity-50">
                    {loading ? '…' : 'Мэдэгдэл идэвхжүүлэх'}
                  </button>
                ) : null}
                <TestNotificationButton />
              </div>
              <p className="text-[10px] text-gray-500 max-w-[200px] text-right" title="Demo: эхлээд идэвхжүүлнэ, дараа нь Test">
                Demo: идэвхжүүлнэ → Test
              </p>
            </div>
            <HeaderUserMenu displayName={user?.fullName || 'User'} initial={user?.firstName?.charAt(0) || 'U'} imageUrl={user?.imageUrl} onSignOut={() => {}} />
          </div>
        </div>

        {/* Desktop only: back to home link */}
      </header>
      <div className="hidden md:block px-10 w-fit mt-2 pb-2">
        <Link href="/" className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-amber-50 hover:text-amber-700">
          <ArrowLeft className="h-4 w-4" />
          Нүүр лүү буцах
        </Link>
      </div>

      {/* Main content — extra bottom padding on mobile for bottom nav */}
      <main className="flex-1 p-4 md:p-6 flex flex-col items-center pb-24 md:pb-6">
        {/* Mobile: мэдэгдэл идэвхжүүлэх санал — dashboard руу ормогц харагдана */}
        {permission !== 'granted' && permission !== 'denied' && (
          <div className="md:hidden w-full max-w-[450px] mb-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 flex items-center justify-between gap-3">
            <p className="text-sm text-amber-900 flex-1 min-w-0">
              Шинэ постын мэдэгдэл авахыг хүсч байна уу?
            </p>
            <button
              type="button"
              onClick={() => requestPermission()}
              disabled={loading}
              className="shrink-0 rounded-lg bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50 touch-manipulation"
            >
              {loading ? '…' : 'Идэвхжүүлэх'}
            </button>
          </div>
        )}
        <div className="w-full flex justify-center">{children}</div>
      </main>

      {/* Mobile bottom nav — апп шиг доод цэс */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-amber-400/50 flex items-center justify-around py-2 safe-area-inset-bottom"
        aria-label="Үндсэн цэс"
      >
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 min-w-[64px] py-2 rounded-xl text-xs font-medium transition-colors touch-manipulation',
                isActive ? 'text-[#f18912] bg-amber-100/80' : 'text-muted-foreground hover:bg-amber-50 hover:text-amber-800'
              )}
            >
              <Icon className={cn('h-6 w-6', isActive && 'stroke-[2.5]')} />
              <span>{item.shortLabel}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
