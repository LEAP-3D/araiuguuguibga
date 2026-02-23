'use client';

import Image from 'next/image';
import { X, Send, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useId, useState, useEffect, useRef } from 'react';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const WELCOME_MESSAGE = "👋 Hi! I'm here to help. What can I do for you today?";

type ChatProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};
export default function Chat({ open: controlledOpen, onOpenChange }: ChatProps = {}) {
  const contentId = useId();
  const [mounted, setMounted] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined && onOpenChange !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setIsOpen = isControlled ? onOpenChange : setInternalOpen;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);
  const sendMessage = async () => {
    const text = message.trim();
    if (!text || loading) return;
    setError(null);
    setMessage('');
    const userMsg: ChatMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      const assistantContent = data.message?.content ?? '';
      setMessages((prev) => [...prev, { role: 'assistant', content: assistantContent }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get response');
    } finally {
      setLoading(false);
    }
  };
  if (!mounted) {
    return <div className="fixed right-6 z-50 w-14 h-14 bottom-[calc(env(safe-area-inset-bottom)+96px)]" />;
  }
  return (
    <div className="fixed right-6 z-50 bottom-[calc(env(safe-area-inset-bottom)+96px)]">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <motion.div
            className="rounded-full w-14 h-14 flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: isOpen ? '0 4px 14px rgba(0,0,0,0.12)' : ['0 4px 14px rgba(0,0,0,0.12)', '0 6px 20px rgba(0,0,0,0.15)'],
            }}
            transition={{
              boxShadow: { duration: 1.5, repeat: isOpen ? 0 : Infinity, repeatType: 'reverse' },
            }}
          >
            <Button className="group relative w-14 h-14 rounded-full bg-transparent hover:bg-transparent shadow-md hover:shadow-lg transition-shadow overflow-hidden p-0">
              <Image src="/caticon.png" alt="Chat" width={56} height={56} className="w-14 h-14 object-contain transition-transform duration-300 group-hover:scale-105" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
            </Button>
          </motion.div>
        </PopoverTrigger>
        <PopoverContent id={contentId} className="w-95 h-130 flex flex-col p-0 mr-4 shadow-2xl border-0 rounded-2xl overflow-hidden bg-white" sideOffset={12}>
          <div className="relative h-16 flex justify-between items-center px-5 bg-[#ff8037]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center overflow-hidden flex-shrink-0 rounded-full">
                <Image src="/caticon.png" alt="" width={36} height={36} className="w-9 h-9 object-contain" />
              </div>
              <div>
                <p className="font-semibold text-white text-base">Chat Assistant</p>
                <p className="text-xs text-white/90">Always here to help</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="w-9 h-9 rounded-full text-white transition-colors hover:bg-[#f47d46]">
              <X className="w-5 h-5 text-white" />
            </Button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 bg-linear-to-b from-gray-50 to-white min-h-0">
            <div className="space-y-4">
              <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                  <Image src="/caticon.png" alt="" width={32} height={32} className="w-8 h-8 object-contain" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 max-w-[260px]">
                  <p className="text-sm text-gray-800">{WELCOME_MESSAGE}</p>
                </div>
              </div>
              {messages.map((msg, i) =>
                msg.role === 'user' ? (
                  <div key={i} className="flex justify-end">
                    <div className="bg-[#ff8037] text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm max-w-[260px]">
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image src="/caticon.png" alt="" width={32} height={32} className="w-8 h-8 object-contain" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 max-w-[260px]">
                      <p className="text-sm text-gray-800 whitespace-pre-wrap">{msg.content}</p>
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
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
              {error && <p className="text-sm text-red-600 px-1">{error}</p>}
            </div>
          </div>
          <div className="px-4 py-4 bg-white border-t border-gray-100">
            <div className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="pr-3 py-6 rounded-xl border-gray-200 focus:border-[#ff8037] focus:ring-[#ff8037] resize-none transition-all"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      void sendMessage();
                    }
                  }}
                  disabled={loading}
                />
              </div>
              <Button
                size="icon"
                disabled={!message.trim() || loading}
                className="w-12 h-12 bg-[#ff8037] hover:bg-[#f47d46] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                onClick={() => void sendMessage()}
              >
                <Send className="w-5 h-5 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">Press Enter to send</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
