import React from 'react';
import { Mic } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileTouchButtonProps {
  isPressed: boolean;
  onTouchStart: () => void;
  onTouchEnd: () => void;
}

export default function MobileTouchButton({
  isPressed,
  onTouchStart,
  onTouchEnd
}: MobileTouchButtonProps) {
  return (
    <motion.button
      className={`md:hidden fixed bottom-20 right-4 z-[9999] w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
        isPressed 
          ? 'bg-red-600 text-white' 
          : 'bg-blue-600 text-white'
      }`}
      whileTap={{ scale: 0.95 }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label="Hold to talk"
    >
      <Mic className="w-6 h-6" />
    </motion.button>
  );
}