import React from 'react';
import type { IconType } from 'react-icons';

interface GradientButtonProps {
  label: string;
  icon: IconType;
  gradient: string; // Tailwind gradient class
  onClick?: () => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({ label, icon: Icon, gradient, onClick }) => {
  return (
    <button
      className={`w-full max-w-md flex items-center gap-4 px-6 py-4 rounded-2xl text-white font-semibold text-lg md:text-xl shadow-lg transition-transform active:scale-95 ${gradient}`}
      style={{ backdropFilter: 'blur(4px)' }}
      onClick={onClick}
    >
      <Icon className="text-2xl md:text-3xl" />
      <span className="flex-1 text-left">{label}</span>
    </button>
  );
};

export default GradientButton; 