import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import LoadingSpinner from './ui/LoadingSpinner';

const CONFIGURATOR_URL = 'https://103.91.247.12/webclient/?appliId=1316909947753070592&codeRate=10000&frameRate=60&language=en';

export default function ConfiguratorPage() {
  const openConfigurator = () => {
    window.open(CONFIGURATOR_URL, '_blank');
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      <Helmet>
        <title>Interactive Car Configurator | Kustom Auto Wrx</title>
        <meta name="description" content="Design your dream vehicle with our interactive 3D car configurator. Explore colors, finishes, and modifications in real-time." />
        <meta property="og:title" content="Interactive Car Configurator | Kustom Auto Wrx" />
        <meta property="og:description" content="Design your dream vehicle with our interactive 3D car configurator. Explore colors, finishes, and modifications in real-time." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kustomautowrx.com/configurator" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Interactive Car Configurator | Kustom Auto Wrx" />
        <meta name="twitter:description" content="Design your dream vehicle with our interactive 3D car configurator." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80" />
        <link rel="canonical" href="https://kustomautowrx.com/configurator" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Interactive Car Configurator
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Design your dream vehicle in real-time with our advanced 3D configurator
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openConfigurator}
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Launch Configurator
            <ExternalLink className="ml-2 w-5 h-5" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Real-time Visualization',
              description: 'See changes instantly as you customize your vehicle'
            },
            {
              title: 'Multiple Angles',
              description: 'View your design from any angle in 3D space'
            },
            {
              title: 'Professional Tools',
              description: 'Industry-standard configuration tools at your fingertips'
            }
          ].map((feature) => (
            <div key={feature.title} className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}