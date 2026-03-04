'use client';

import Image from 'next/image';
import { Loader2 } from 'lucide-react';

export type ChatMessage = { role: 'user' | 'assistant'; content: string };

const WELCOME_MESSAGE = '👋 Сайн уу! Би танд туслахад бэлэн байна. Өнөөдөр юунд туслах вэ?';

type Props = {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  variant?: 'default' | 'messenger';
};

export function ChatMessageList({ messages, loading, error, variant = 'default' }: Props) {
  const isMessenger = variant === 'messenger';
  const userBubbleClass = isMessenger ? 'bg-[#f28a50] text-white' : 'bg-[#ff8037] text-white';
  const assistantBubbleClass = isMessenger ? 'bg-[#fffaf4] border border-[#f3dbc7] text-[#3f2e23]' : 'bg-white border border-gray-100 text-gray-800';

  return (
    <div className="space-y-4">
      <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
          <Image src="/caticon.png" alt="" width={32} height={32} className="w-8 h-8 object-contain" />
        </div>
        <div className={`rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[82%] ${assistantBubbleClass}`}>
          <p className="text-sm">{WELCOME_MESSAGE}</p>
        </div>
      </div>
      {messages.map((msg, i) =>
        msg.role === 'user' ? (
          <div key={i} className="flex justify-end">
            <div className={`rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm max-w-[82%] ${userBubbleClass}`}>
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ) : (
          <div key={i} className="flex gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <Image src="/caticon.png" alt="" width={32} height={32} className="w-8 h-8 object-contain" />
            </div>
            <div className={`rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[82%] ${assistantBubbleClass}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        )
      )}
      {loading && (
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <Image src="/caticon.png" alt="" width={32} height={32} className="w-8 h-8 object-contain" />
          </div>
          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 flex items-center gap-2 text-gray-500 text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Бодож байна…</span>
          </div>
        </div>
      )}
      {error && <p className="text-sm text-red-600 px-1">{error}</p>}
    </div>
  );
}
