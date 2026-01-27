"use client";

import Footer from "./_features/footer";
import Headers from "./_features/headers";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Headers />
      <div className="w-screen h-30 bg-amber-50"></div>
      <Footer />
    </div>
  );
};

export default Home;
