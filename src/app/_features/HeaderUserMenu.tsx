import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, User, Settings, LogOut, LayoutDashboard } from 'lucide-react';

type HeaderUserMenuProps = {
  displayName: string;
  initial: string;
  imageUrl: string | undefined;
  onSignOut: () => void;
};

export function HeaderUserMenu({ displayName, initial, imageUrl, onSignOut }: HeaderUserMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <motion.button
          type="button"
          className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-all duration-300 cursor-pointer outline-none border-0"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Avatar className="size-10 rounded-full bg-[#fc8d0e] text-white border-2 border-white/80 shadow-md">
            <AvatarImage src={imageUrl} alt={displayName} />
            <AvatarFallback className="bg-[#fc8d0e] text-white text-sm font-semibold">{initial}</AvatarFallback>
          </Avatar>
        </motion.button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 rounded-xl shadow-lg border-gray-200/80 p-0" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="font-semibold text-gray-900">My Account</p>
        </div>
        <div className="py-2">
          <Link href="/dashboard" className="flex gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 transition-colors">
            <LayoutDashboard className="w-4 h-4 text-[#fc8d0e]" />
            <span>Dashboard</span>
          </Link>
          <Link href="/profile" className="flex gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 transition-colors">
            <User className="w-4 h-4 text-[#fc8d0e]" />
            <span>Profile</span>
          </Link>
          <button type="button" className="w-full flex gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 transition-colors text-left">
            <Heart className="w-4 h-4 text-[#fc8d0e]" />
            <span>Saved Pets</span>
          </button>
          <button type="button" className="w-full flex gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 transition-colors text-left">
            <Settings className="w-4 h-4 text-[#fc8d0e]" />
            <span>Settings</span>
          </button>
          <button type="button" onClick={onSignOut} className="w-full flex gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors text-left">
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
