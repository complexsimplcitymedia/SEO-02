import React from 'react';
import { Loader2, Desktop } from 'lucide-react';

interface QueueSystemProps {
  position: number;
}

export default function QueueSystem({ position }: QueueSystemProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <Desktop className="w-12 h-12 text-blue-400 mb-4" />
      <h2 className="text-xl font-semibold text-white mb-4">
        Please Use a Desktop Browser
      </h2>
      <p className="text-gray-300 mb-6">
        Our car configurator requires a desktop browser for the best experience.
      </p>
      {position > 0 && (
        <div className="bg-blue-600/20 rounded-lg p-4 flex items-center space-x-3">
          <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
          <span className="text-blue-300">
            Queue position: {position}
          </span>
        </div>
      )}
    </div>
  );
}