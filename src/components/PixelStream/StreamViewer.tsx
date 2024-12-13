import React, { useRef, useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePixelStream } from '../../lib/pixelStream/usePixelStream';

interface StreamViewerProps {
  url: string;
  className?: string;
}

export default function StreamViewer({ url, className = '' }: StreamViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { isLoading, error } = usePixelStream(url);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 bg-red-500/10 rounded-xl">
        <p className="text-red-400">Failed to connect to stream: {error}</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative aspect-video w-full bg-black rounded-xl overflow-hidden ${className}`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={url}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-lg text-white transition-colors"
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen ? (
          <Minimize2 className="w-5 h-5" />
        ) : (
          <Maximize2 className="w-5 h-5" />
        )}
      </motion.button>
    </div>
  );
}