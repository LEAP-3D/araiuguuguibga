import { motion } from "framer-motion";
import { Heart, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "../_components/Logo";
import { LanguageSwitcher } from "../_components/LanguageSwitcher";

export default function Headers() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-linear-to-r from-amber-100/70 via-orange-100/70 to-yellow-100/70 border-b border-orange-200 shadow-sm"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a className="flex items-center gap-2 text-orange-700/80 hover:text-orange-600 font-medium transition">
              <Heart className="w-4 h-4" />
              Үрчлэх
            </a>
            <a className="flex items-center gap-2 text-orange-700/80 hover:text-orange-600 font-medium transition">
              <MapPin className="w-4 h-4" />
              Байршил
            </a>
            <a className="flex items-center gap-2 text-orange-700/80 hover:text-orange-600 font-medium transition">
              <MessageCircle className="w-4 h-4" />
              Community
            </a>
            <a className="flex items-center gap-2 text-orange-700/80 hover:text-orange-600 font-medium transition">
              <MessageCircle className="w-4 h-4" />
              Пост оруулах
            </a>
          </div>

          {/* Right Side UI (Static User Look) */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              className="text-orange-700 hover:bg-orange-200/50 rounded-xl"
            >
              Нэвтрэх
            </Button>
            <Button className="rounded-xl bg-linear-to-r from-orange-400 to-amber-400 hover:opacity-90 text-white shadow-md">
              Бүртгүүлэх
            </Button>

            {/* Fake profile display for UI */}
            {/* <div className="flex items-center gap-2 ml-2">
              <Avatar className="w-9 h-9 ring-2 ring-orange-300">
                <AvatarImage  />
                <AvatarFallback className="bg-orange-400 text-white">U</AvatarFallback>
              </Avatar>
              <User className="w-4 h-4 text-orange-600" />
            </div> */}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
