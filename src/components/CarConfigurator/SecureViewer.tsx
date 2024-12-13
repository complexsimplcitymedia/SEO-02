import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, Minimize2, Languages } from 'lucide-react';
import { motion } from 'framer-motion';

interface SecureViewerProps {
  streamUrl?: string;
  className?: string;
}

export default function SecureViewer({ 
  streamUrl = 'https://share.streampixel.io/674ace125b329980e86ba9e5',
  className = ''
}: SecureViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const handleMessage = (event: MessageEvent) => {
    // Handle incoming messages from the iframe
    if (event.data.type === 'translation-needed') {
      // Translate message using your translation service
      const translatedMessage = translateMessage(event.data.message);
      
      // Send translated message back to iframe
      iframeRef.current?.contentWindow?.postMessage({
        type: 'translated-message',
        message: translatedMessage
      }, '*');
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Temporary translation function - replace with your translation service
  const translateMessage = (message: string): string => {
    // Add your translation logic here
    return message;
  };

  return (
    <div 
      ref={containerRef}
      className={`relative aspect-video w-full bg-black rounded-xl overflow-hidden ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <iframe
        ref={iframeRef}
        src={streamUrl}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute top-4 right-4 flex items-center space-x-2"
      >
        <button
          onClick={toggleFullscreen}
          className="p-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-lg text-white transition-colors"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5" />
          ) : (
            <Maximize2 className="w-5 h-5" />
          )}
        </button>
      </motion.div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center">
        <p className="text-xs bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
          Use the on-screen controls or keyboard to navigate. Press 'T' to talk with the AI assistant.
        </p>
      </div>
    </div>
  );
}