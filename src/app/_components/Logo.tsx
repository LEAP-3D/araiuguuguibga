import { motion } from "framer-motion";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="text-3xl"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        🐾
      </motion.div>
      <span className="text-xl font-bold text-[#f06e42]">
        PetCare
      </span>
    </div>
  );
}
