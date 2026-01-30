import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="text-3xl"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <div className="w-10 h-10 bg-[#51986a] rounded-full flex items-center justify-center shadow-lg shadow-green-300/40">
          <PawPrint className="text-white w-6 h-6" />
        </div>
      </motion.div>
      <span className="text-xl font-bold text-[#51986a]">PetWorld</span>
    </div>
  );
}
