import React from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface StreamControlsProps {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export default function StreamControls({ isFullscreen, onToggleFullscreen }: StreamControlsProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggleFullscreen}
      className="p-2 rounded-full bg-gray-600/80 hover:bg-gray-600 transition-colors backdrop-blur-sm"
      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
    >
      {isFullscreen ? (
        <Minimize2 className="w-5 h-5 text-white" />
      ) : (
        <Maximize2 className="w-5 h-5 text-white" />
      )}
    </motion.button>
  );
}