import { MessageCircle, X, Send, Bot, PawPrint } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useState } from 'react';

type ChatProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function Chat({ open: controlledOpen, onOpenChange }: ChatProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined && onOpenChange !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setIsOpen = isControlled ? onOpenChange : setInternalOpen;
  const [message, setMessage] = useState('');

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <motion.div
            className="rounded-full bg-green-500 w-16 h-16 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              boxShadow: isOpen ? '0 0 0 0 rgba(75, 134, 98, 0)' : ['0 0 0 0 rgba(75, 134, 98, 0.5)', '0 0 0 20px rgba(75, 134, 98, 0)'],
            }}
            transition={{
              boxShadow: {
                duration: 1.5,
                repeat: isOpen ? 0 : Infinity,
              },
            }}
          >
            <Button className="group relative w-16 h-16 bg-gradient-to-br from-[#51986a] to-[#51986a] hover:from-[#51986a] hover:to-[#51986a] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105 active:scale-95">
              <MessageCircle className="w-8 h-8 text-white transition-transform duration-300 group-hover:rotate-12" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full  animate-pulse"></span>
            </Button>
          </motion.div>
        </PopoverTrigger>
        <PopoverContent className="w-95 h-130 flex flex-col p-0 mr-4 mb-2 shadow-2xl border-0 rounded-2xl overflow-hidden bg-white" sideOffset={8}>
          <div className="relative h-16 flex justify-between items-center px-5 bg-linear-to-r from-[#51986a] to-[#51986a]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white text-base">Chat Assistant</p>
                <p className="text-xs text-white/90">Always here to help</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="w-9 h-9 rounded-full text-white transition-colors">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 bg-linear-to-b from-gray-50 to-white">
            <div className="space-y-4">
              <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#51986a] to-[#51986a] flex items-center justify-center flex-shrink-0">
                  <PawPrint className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 max-w-[260px]">
                  <p className="text-sm text-gray-800">👋 Hi! Im here to help. What can I do for you today?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-4 bg-white border-t border-gray-100">
            <div className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="pr-3 py-6 rounded-xl border-gray-200 focus:border-[#51986a] focus:ring-[#51986a] resize-none transition-all"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      setMessage('');
                    }
                  }}
                />
              </div>
              <Button
                size="icon"
                disabled={!message.trim()}
                className="w-12 h-12 bg-linear-to-br from-[#51986a] to-[#51986a] hover:from-[#51986a] hover:to-[#51986a] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                onClick={() => {
                  setMessage('');
                }}
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
