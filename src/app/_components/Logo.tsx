import { motion } from "framer-motion";
export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="text-3xl"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        🐾
      </motion.div>
      <span className="text-xl font-bold bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
        PetCare
      </span>
    </div>
  );
}
