import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2, MousePointer, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ConfiguratorViewer() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const CONFIGURATOR_URL = 'https://103.91.247.12/';

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="relative aspect-w-16 bg-black rounded-lg overflow-hidden">
      <iframe
        src={CONFIGURATOR_URL}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; touch-action"
        allowFullScreen
        style={{
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          cursor: 'default'
        }}
      />
      
      <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
        {isMobile ? (
          <>
            <Smartphone className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-300">Touch enabled</span>
          </>
        ) : (
          <>
            <MousePointer className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-300">Mouse & keyboard enabled</span>
          </>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-colors"
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