import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioControlsProps {
  isMuted: boolean;
  volume: number;
  onVolumeChange: (value: number) => void;
  onToggleMute: () => void;
}

export default function AudioControls({
  isMuted,
  volume,
  onVolumeChange,
  onToggleMute
}: AudioControlsProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onToggleMute}
        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white" />
        ) : (
          <Volume2 className="w-5 h-5 text-white" />
        )}
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={isMuted ? 0 : volume * 100}
        onChange={(e) => onVolumeChange(Number(e.target.value) / 100)}
        className="w-24 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
        aria-label="Volume control"
      />
    </div>
  );
}