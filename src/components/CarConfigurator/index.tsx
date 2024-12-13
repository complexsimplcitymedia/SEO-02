import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import DeviceDetection from './DeviceDetection';
import ConfiguratorViewer from './ConfiguratorViewer';
import MobileMessage from './MobileMessage';

export default function CarConfigurator() {
  return (
    <motion.div 
      className="min-h-screen bg-gray-900 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>Interactive Car Configurator | Kustom Auto Wrx</title>
        <meta name="description" content="Customize your vehicle in real-time with our interactive 3D car configurator. Explore different colors, finishes, and modifications." />
      </Helmet>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.h1 
            className="text-3xl font-bold text-white mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Interactive Car Configurator
          </motion.h1>
          
          <DeviceDetection fallback={<MobileMessage />}>
            <motion.div 
              className="bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ConfiguratorViewer />
            </motion.div>

            <motion.div 
              className="mt-6 text-gray-400 text-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p>
                Use your mouse to interact with the 3D model:
              </p>
              <ul className="mt-2 space-y-1">
                <li>• Left click + drag to rotate</li>
                <li>• Right click + drag to pan</li>
                <li>• Mouse wheel to zoom</li>
                <li>• Use the menu to customize colors and options</li>
              </ul>
            </motion.div>
          </DeviceDetection>
        </div>
      </main>
    </motion.div>
  );
}