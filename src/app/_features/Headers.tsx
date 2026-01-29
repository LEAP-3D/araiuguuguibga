import { motion } from "framer-motion";
import { Heart, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../_components/Logo";
import LanguageSwitcher from "../_components/LanguageSwitcher";

export default function Headers() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-orange-200 shadow-sm"
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
            <a className="flex items-center gap-2 text-black hover:text-[#f06e42] font-medium transition-all duration-200 hover:scale-105">
              <Heart className="w-4 h-4 transition-colors duration-200" />
              Үрчлэх
            </a>
            <a className="flex items-center gap-2 text-black hover:text-[#f06e42] font-medium transition-all duration-200 hover:scale-105">
              <MapPin className="w-4 h-4 transition-colors duration-200" />
              Байршил
            </a>
            <a className="flex items-center gap-2 text-black hover:text-[#f06e42] font-medium transition-all duration-200 hover:scale-105">
              <MessageCircle className="w-4 h-4 transition-colors duration-200" />
              Community
            </a>
            <a className="flex items-center gap-2 text-black hover:text-[#f06e42] font-medium transition-all duration-200 hover:scale-105">
              <MessageCircle className="w-4 h-4 transition-colors duration-200" />
              Пост оруулах
            </a>
          </div>

          {/* Right Side UI (Static User Look) */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              className="text-black hover:bg-[#f06e42]/10 hover:text-[#f06e42] rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Нэвтрэх
            </Button>
            <Button className="rounded-xl bg-[#f06e42] hover:bg-[#d85a2f] text-white shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95">
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
