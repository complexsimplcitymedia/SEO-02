import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface VoiceButtonProps {
  isRecording: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function VoiceButton({ isRecording, onClick, disabled }: VoiceButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-lg transition-colors ${
        isRecording
          ? 'bg-red-600 hover:bg-red-700'
          : 'bg-blue-600 hover:bg-blue-700'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      aria-label={isRecording ? 'Stop recording' : 'Start recording'}
    >
      {isRecording ? (
        <MicOff className="w-5 h-5 text-white" />
      ) : (
        <Mic className="w-5 h-5 text-white" />
      )}
    </motion.button>
  );
}