import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
        <Image
          src="/caticon.png"
          alt="PetWorld"
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
        />
      </motion.div>
      <span className="text-2xl font-bold" style={{ fontFamily: "'Comic Sans MS', 'Marker Felt', 'Chalkboard SE', cursive" }}>
        <span className="text-[#9400d3]">Pet</span><span className="text-[#e08f1d]">World</span>
      </span>
    </div>
  );
}
