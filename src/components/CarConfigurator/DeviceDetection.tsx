import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DeviceDetectionProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

export default function DeviceDetection({ children, fallback }: DeviceDetectionProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(mobile);
      setIsLoaded(true);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (!isLoaded) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isMobile ? 'mobile' : 'desktop'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isMobile ? fallback : children}
      </motion.div>
    </AnimatePresence>
  );
}