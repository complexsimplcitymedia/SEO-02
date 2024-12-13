import React from 'react';
import { Keyboard } from 'lucide-react';

export default function KeyboardGuide() {
  return (
    <div className="absolute top-4 left-4 z-[9999]">
      <button
        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors group relative"
        aria-label="Show keyboard controls"
      >
        <Keyboard className="w-5 h-5 text-white" />
        <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900/95 backdrop-blur-sm rounded-lg p-4 hidden group-hover:block">
          <h3 className="text-white font-semibold mb-2">Keyboard Controls</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center justify-between">
              <span>Hold to Talk</span>
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">T</kbd>
            </li>
            <li className="flex items-center justify-between">
              <span>Toggle Fullscreen</span>
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">F</kbd>
            </li>
            <li className="flex items-center justify-between">
              <span>Mute/Unmute</span>
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">M</kbd>
            </li>
          </ul>
        </div>
      </button>
    </div>
  );
}