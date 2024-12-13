import React from 'react';

export default function PoweredBy() {
  return (
    <a
      href="https://convai.com"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2 hover:bg-white/20 transition-colors backdrop-blur-sm"
      title="Powered by Convai"
    >
      <img
        src="https://pbs.twimg.com/profile_images/1630613772405559296/cDfl82Lp_400x400.jpg"
        alt="Powered by Convai"
        className="h-8 w-8 rounded-full"
      />
      <span className="text-white text-sm font-medium">Powered by Convai</span>
    </a>
  );
}