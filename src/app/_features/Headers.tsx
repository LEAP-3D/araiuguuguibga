"use client";
/* eslint-disable max-lines */

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { Heart, MapPin, MessageCircle, StickyNote, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Logo from "../_components/Logo";
import LanguageSwitcher from "../_components/LanguageSwitcher";

export default function Headers() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    const homeUrl = typeof window !== "undefined" ? window.location.origin + "/" : "/";
    await signOut({ redirectUrl: homeUrl });
    router.push("/");
  };

  const displayName =
    user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "Хэрэглэгч";
  const initial = (displayName as string).charAt(0).toUpperCase();
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/50 border-b border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with enhanced glow */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div
              className="absolute -inset-2 bg-linear-to-r from-orange-300 via-pink-300 to-orange-300 blur-xl rounded-full opacity-60"
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <Logo />
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a className="group relative flex items-center gap-2 text-gray-700 font-medium transition-all duration-300 hover:text-[#f06e42] cursor-pointer">
              <Heart className="w-4 h-4 transition-transform duration-300 group-hover:scale-125 group-hover:text-[#f06e42]" />
              Үрчлэх
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#f06e42] transition-all duration-300 group-hover:w-full" />
            </a>
            <a className="group relative flex items-center gap-2 text-gray-700 font-medium transition-all duration-300 hover:text-[#f06e42] cursor-pointer">
              <MapPin className="w-4 h-4 transition-transform duration-300 group-hover:scale-125 group-hover:text-[#f06e42]" />
              Байршил
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#f06e42] transition-all duration-300 group-hover:w-full" />
            </a>
            <a className="group relative flex items-center gap-2 text-gray-700 font-medium transition-all duration-300 hover:text-[#f06e42] cursor-pointer">
              <MessageCircle className="w-4 h-4 transition-transform duration-300 group-hover:scale-125 group-hover:text-[#f06e42]" />
              Community
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#f06e42] transition-all duration-300 group-hover:w-full" />
            </a>
            <a className="group relative flex items-center gap-2 text-gray-700 font-medium transition-all duration-300 hover:text-[#f06e42] cursor-pointer">
              <StickyNote className="w-4 h-4 transition-transform duration-300 group-hover:scale-125 group-hover:text-[#f06e42]" />
              Пост оруулах
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#f06e42] transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {/* Right Side UI */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />

            {isSignedIn ? (
              <Popover>
                <PopoverTrigger asChild>
                  <motion.button
                    type="button"
                    className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-orange-100/60 transition-all duration-300 cursor-pointer outline-none border-0"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Avatar className="size-9 rounded-full bg-[#f06e42] text-white border-2 border-white/80 shadow-md">
                      <AvatarImage src={user?.imageUrl} alt={displayName as string} />
                      <AvatarFallback className="bg-[#f06e42] text-white text-sm font-semibold">
                        {initial}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-gray-800 font-medium max-w-[120px] truncate">
                      {displayName as string}
                    </span>
                  </motion.button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-56 rounded-xl shadow-lg border-gray-200/80 p-0">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-900">My Account</p>
                  </div>
                  <div className="py-2">
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 transition-colors">
                      <User className="w-4 h-4 text-[#f06e42]" />
                      <span>Profile</span>
                    </Link>
                    <button
                      type="button"
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 transition-colors text-left"
                    >
                      <Heart className="w-4 h-4 text-[#f06e42]" />
                      <span>Saved Pets</span>
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-orange-50 transition-colors text-left"
                    >
                      <Settings className="w-4 h-4 text-[#f06e42]" />
                      <span>Settings</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/sign-in">
                    <Button
                      variant="ghost"
                      className="relative text-gray-700 hover:bg-orange-100/60 hover:text-[#f06e42] rounded-xl transition-all duration-300 overflow-hidden group"
                    >
                      <span className="relative z-10">Нэвтрэх</span>
                      <motion.span
                        className="absolute inset-0 bg-linear-to-r from-orange-100 to-pink-100"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/sign-up">
                    <Button className="relative rounded-xl bg-linear-to-r from-[#f06e42] via-orange-500 to-[#f06e42] text-white shadow-lg shadow-orange-300/40 overflow-hidden group bg-[length:200%_100%] hover:bg-right transition-all duration-500">
                      <motion.span
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      />
                      <span className="relative z-10 flex items-center gap-2">
                        Бүртгүүлэх
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
