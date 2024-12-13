import React from 'react';
import { motion } from 'framer-motion';

interface AudioIndicatorProps {
  isRecording: boolean;
  isTalking: boolean;
}

export default function AudioIndicator({ isRecording, isTalking }: AudioIndicatorProps) {
  if (!isRecording && !isTalking) return null;

  return (
    <div className="absolute top-4 right-4 flex items-center space-x-2">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className={`w-3 h-3 rounded-full ${
          isRecording ? 'bg-red-500' : 'bg-blue-500'
        }`}
      />
      <span className="text-sm text-gray-400">
        {isRecording ? 'Recording...' : 'Speaking...'}
      </span>
    </div>
  );
}