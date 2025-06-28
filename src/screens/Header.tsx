import React from "react";
import { User, BrainCircuit, Apple } from "lucide-react"; // Or use any icon lib you like

const GameHeader = ({ brainpoints = 1200, brainberry = 5 }) => {
  return (
    <div className="w-full flex items-center justify-between px-4 py-2 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] shadow-md text-white">
      {/* Profile Button */}
      <button className="flex items-center space-x-2 hover:opacity-80 transition">
        <User size={22} />
        <span className="hidden sm:inline text-sm font-medium">Profile</span>
      </button>

      {/* Center Logo or Icon */}
      <div className="text-xl font-bold tracking-wide text-cyan-300 select-none">
        🎓 Edumon
      </div>

      {/* Resources */}
      <div className="flex items-center space-x-4">
        {/* BrainPoints */}
        <div className="flex items-center space-x-1">
          <BrainCircuit size={18} className="text-cyan-400" />
          <span className="text-sm font-semibold">{brainpoints}</span>
        </div>

        {/* BrainBerries */}
        <div className="flex items-center space-x-1">
          <Apple size={18} className="text-pink-400" />
          <span className="text-sm font-semibold">{brainberry}</span>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
