'use client';

import { usePathname } from 'next/navigation';
import BottomNav from './BottomNav';
import Chat from './Chat';
import { useChatOpen } from '../_contexts/ChatContext';

const HIDE_BOTTOM_NAV_PREFIXES = ['/dashboard', '/sign-in', '/sign-up'];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { open: chatOpen, setOpen: setChatOpen } = useChatOpen();

  const hide =
    HIDE_BOTTOM_NAV_PREFIXES.some((p) => pathname.startsWith(p)) || pathname === '/';
  const showBottomNav = !hide;

  return (
    <>
      <div className={showBottomNav ? 'pb-20' : ''}>{children}</div>
      {showBottomNav && <BottomNav />}
      <Chat open={chatOpen} onOpenChange={setChatOpen} />
    </>
  );
}
