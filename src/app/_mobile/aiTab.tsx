'use client';

import { useState } from 'react';
import Chat from '@/app/_components/Chat';
import AiGenerator from '@/app/_features/aiGenerator';

type AiMobileSection = 'chat' | 'assistant';

export default function MobileAiTab() {
  const [activeSection, setActiveSection] = useState<AiMobileSection>('chat');

  return (
    <section className="px-3 pb-4 pt-6" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
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

      {activeSection === 'chat' ? <Chat variant="embedded" /> : <AiGenerator compact />}
    </section>
  );
}
