'use client';

import { usePathname } from 'next/navigation';
import BottomNav from './BottomNav';
import Chat from './Chat';
import { useChatOpen } from '../_contexts/ChatContext';
import { useEffect, useState } from 'react';

const HIDE_BOTTOM_NAV_PREFIXES = ['/dashboard', '/sign-in', '/sign-up'];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { open: chatOpen, setOpen: setChatOpen } = useChatOpen();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const hide =
    HIDE_BOTTOM_NAV_PREFIXES.some((p) => pathname.startsWith(p)) || pathname === '/';
  const showBottomNav = !hide;
  const useSharedBackground = pathname !== '/';

  return (
    <>
      <div
        className={`${showBottomNav ? 'pb-20' : ''} ${
          useSharedBackground
            ? 'relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_8%_12%,#ffc891_0%,transparent_30%),radial-gradient(circle_at_92%_10%,#ffe2be_0%,transparent_28%),radial-gradient(circle_at_54%_88%,#ffd9b3_0%,transparent_36%),linear-gradient(160deg,#fff6ec_0%,#fff2e4_48%,#fffaf3_100%)]'
            : ''
        }`}
      >
        {useSharedBackground && (
          <>
            <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:repeating-linear-gradient(125deg,rgba(251,146,60,0.08)_0px,rgba(251,146,60,0.08)_1px,transparent_1px,transparent_16px)]" />
            <div className="pointer-events-none absolute -left-28 -top-28 h-96 w-96 rounded-full bg-orange-300/25 blur-3xl" />
            <div className="pointer-events-none absolute -right-28 top-20 h-[28rem] w-[28rem] rounded-full bg-amber-200/40 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-120px] left-1/2 h-[360px] w-[700px] -translate-x-1/2 rounded-full bg-orange-100/60 blur-3xl" />
            <div className="pointer-events-none absolute left-[8%] top-[28%] h-44 w-44 rounded-full border border-amber-200/70 bg-white/20 backdrop-blur-sm" />
            <div className="pointer-events-none absolute right-[10%] top-[42%] h-36 w-36 rounded-full border border-white/70 bg-white/35 backdrop-blur-sm" />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-white/45" />
          </>
        )}
        <div className={useSharedBackground ? 'relative z-10' : ''}>{children}</div>
      </div>
      {showBottomNav && <BottomNav />}
      {!isMobile && <Chat open={chatOpen} onOpenChange={setChatOpen} />}
    </>
  );
}
