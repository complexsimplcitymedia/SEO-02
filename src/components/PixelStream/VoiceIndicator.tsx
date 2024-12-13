import React from 'react';
import { Mic } from 'lucide-react';
import { motion } from 'framer-motion';

interface VoiceIndicatorProps {
  isRecording: boolean;
}

export default function VoiceIndicator({ isRecording }: VoiceIndicatorProps) {
  if (!isRecording) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-center space-x-2 bg-red-500/20 backdrop-blur-sm px-3 py-2 rounded-full"
    >
      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
      <span className="text-sm text-white font-medium">Recording...</span>
      <Mic className="w-4 h-4 text-red-500" />
    </motion.div>
  );
}