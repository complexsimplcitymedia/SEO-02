import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mic, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PixelStreamViewerProps {
  streamUrl: string;
  width?: string | number;
  height?: string | number;
}

export default function PixelStreamViewer({ 
  streamUrl,
  width = '100%', 
  height = '100%' 
}: PixelStreamViewerProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsRecording(true);
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'keyEvent',
        eventType: 'keydown',
        key: 'T',
        code: 'KeyT'
      }, '*');
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsRecording(false);
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'keyEvent',
        eventType: 'keyup',
        key: 'T',
        code: 'KeyT'
      }, '*');
    }
  };

  const handleInputFocus = () => {
    // When input is focused, simulate T key press
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'keyEvent',
        eventType: 'keydown',
        key: 'T',
        code: 'KeyT'
      }, '*');
      setIsRecording(true);
    }
  };

  const handleInputBlur = () => {
    // When input loses focus, simulate T key release
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'keyEvent',
        eventType: 'keyup',
        key: 'T',
        code: 'KeyT'
      }, '*');
      setIsRecording(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyT' && document.activeElement === iframeRef.current) {
        setIsRecording(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'KeyT') {
        setIsRecording(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Interactive AI Experience | Kustom Auto Wrx</title>
        <meta name="description" content="Experience our interactive AI assistant for real-time auto customization guidance." />
      </Helmet>

      <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
        <iframe
          ref={iframeRef}
          src={streamUrl}
          className="w-full h-full border-0"
          style={{ width, height }}
          allow="microphone; camera; fullscreen; autoplay; clipboard-write"
          allowFullScreen
          loading="eager"
          importance="high"
          fetchpriority="high"
        />

        <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-0"
            placeholder="Tap here to talk..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <motion.button
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg transition-colors ${
              isRecording ? 'bg-red-600' : 'bg-blue-600'
            }`}
            aria-label="Hold to talk"
          >
            <Mic className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-4 right-4 flex items-center space-x-2 bg-red-500/20 backdrop-blur-sm px-3 py-2 rounded-full"
            >
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm text-white">Recording...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}