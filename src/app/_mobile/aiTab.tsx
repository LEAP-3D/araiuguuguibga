'use client';

import { useState } from 'react';
import Chat from '@/app/_components/Chat';
import AiGenerator from '@/app/_features/aiGenerator';

type AiMobileSection = 'chat' | 'assistant';

export default function MobileAiTab() {
  const [activeSection, setActiveSection] = useState<AiMobileSection>('chat');

  return (
    <section className="flex h-[calc(100dvh-88px)] min-h-0 flex-col px-3 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-3" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div className="mb-3 grid grid-cols-2 gap-2 rounded-2xl bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={() => setActiveSection('chat')}
          className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${activeSection === 'chat' ? 'bg-[#f28a50] text-white' : 'text-[#7f6a5a]'}`}
        >
          AI Chat
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('assistant')}
          className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${activeSection === 'assistant' ? 'bg-[#f28a50] text-white' : 'text-[#7f6a5a]'}`}
        >
          AI Assistant
        </button>
      </div>

      {activeSection === 'chat' ? (
        <div className="flex-1 min-h-0">
          <Chat variant="mobile-full" />
        </div>
      ) : (
        <div className="flex-1 min-h-0 overflow-y-auto rounded-2xl bg-white/70 p-2">
          <AiGenerator compact />
        </div>
      )}
    </section>
  );
}
