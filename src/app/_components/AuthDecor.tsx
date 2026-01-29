import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AuthDecor() {
  return (
    <motion.aside
      className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden p-8 bg-gradient-to-br from-orange-400 via-orange-300 to-orange-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20"
            style={{
              top: `${10 + i * 12}%`,
              left: `${5 + i * 12}%`,
              fontSize: `${30 + i * 10}px`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            🐾
          </motion.div>
        ))}
      </div>

      {/* content */}
      <div className="text-center text-white z-10 px-8">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Join 50,000+ pet lovers</span>
        </motion.div>

        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Find Your Perfect
          <br />
          Furry Friend
        </motion.h2>

        <motion.p
          className="text-white/80 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Connect with rescue pets, find trusted vets, and get AI-powered pet
          care advice — all in one place.
        </motion.p>

        <motion.div
          className="mt-12 flex justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {["🐕", "🐱", "🐰"].map((emoji, i) => (
            <motion.div
              key={i}
              className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.aside>
  );
}
