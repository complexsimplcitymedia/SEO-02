import React from 'react';
import { Desktop } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MobileMessage() {
  return (
    <motion.div 
      className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Desktop className="w-16 h-16 text-blue-400 mb-6" />
      <h2 className="text-2xl font-bold text-white mb-4">
        Desktop Browser Required
      </h2>
      <p className="text-gray-300 max-w-md mx-auto">
        Our interactive car configurator is optimized for desktop browsers to provide 
        the best customization experience. Please visit this page on your computer.
      </p>
      <div className="mt-8 p-4 bg-blue-600/20 rounded-lg">
        <p className="text-blue-300 text-sm">
          Tip: Bookmark this page to easily access it later on your desktop
        </p>
      </div>
    </motion.div>
  );
}