"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "./_feature/home/herosection";
import { RescuePetsSection } from "./_feature/home/rescueSection";
import { VeterinarySection } from "./_feature/home/veterinarySection";

export default function HomePage() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      setScrollPercent((scrollY / totalHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      className="transition-colors duration-700"
      style={{
        background: `linear-gradient(
          to bottom,
          #FFF7ED 0%,
          #FFE4E1 ${scrollPercent}%,
          #FFFFFF 100%
        )`,
      }}
    >
      <HeroSection />
      <RescuePetsSection />
      <VeterinarySection />
    </main>
  );
}
