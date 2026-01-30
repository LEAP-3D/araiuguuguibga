import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer group">
      {/* Floating Paw Icon */}
      <motion.div
        className="w-12 h-12 bg-gradient-to-br from-[#5fbf8f] to-[#4f9769] rounded-2xl flex justify-center items-center shadow-lg"
        animate={{ y: [0, -6, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.15, rotate: 15 }}
      >
        <PawPrint className="text-white w-6 h-6" />
      </motion.div>

      {/* Text */}
      <motion.span
        className="text-2xl font-extrabold bg-gradient-to-r from-[#4f9769] to-[#7bd3a6] bg-clip-text text-transparent tracking-tight"
        whileHover={{ scale: 1.05 }}
      >
        PetWorld
      </motion.span>

      {/* Subtle Glow Behind */}
      <div className="absolute w-16 h-16 bg-[#4f9769]/20 blur-2xl rounded-full -z-10 group-hover:bg-[#4f9769]/30 transition" />
    </div>
  );
}
