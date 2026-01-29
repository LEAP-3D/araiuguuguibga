"use client";

<<<<<<< HEAD
import { HeroSection } from "./_features/heroSection";
import { RescuePetsSection } from "./_features/rescueSection";
import { VeterinarySection } from "./_features/veterinarySection";
import { ParallaxBackground } from "./_components/ParallaxBackground";

import Footer from "./_features/Footer";
import Headers from "./_features/Headers";

const Home = () => {
  return (
    <>
      <Headers />

      <div className="relative">
        <ParallaxBackground>
          <HeroSection />
          <RescuePetsSection />
          <VeterinarySection />
        </ParallaxBackground>
      </div>

      <div className="w-screen h-30 bg-amber-50"></div>

      <Footer />
    </>
=======
import Footer from "./_features/Footer";
import Headers from "./_features/Headers";
 
const Home = () => {
  return (
    <div className="flex flex-col">
      <Headers />
      <div className="w-screen h-30 bg-amber-50"></div>
      
      <Footer />
    </div>
>>>>>>> 293de27 (commit login)
  );
};

export default Home;
