import React from 'react';
import { Sidebar } from 'lucide-react';

type PhoneHeaderProps = {
  logoSrc: string;
  onMenuClick: () => void;
};

const PhoneHeader = ({ logoSrc, onMenuClick }: PhoneHeaderProps) => (
  <header className="w-full h-16 flex items-center justify-between px-4 bg-white shadow-md fixed top-0 z-50">
    {/* Logo */}
    <div className="flex items-center">
      <img src={logoSrc} alt="PetWorld Logo" className="h-10 w-auto" />
      <span className="ml-2 font-bold text-lg text-orange-500">PetWorld</span>
    </div>

    {/* Sidebar / Menu Button */}
    <button type="button" onClick={onMenuClick} className="p-2 rounded-lg hover:bg-gray-100 transition">
      <Sidebar />
    </button>
  </header>
);

export default PhoneHeader;
