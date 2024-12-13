import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export default function FAQAIPage() {
  useEffect(() => {
    // Check if mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Redirect to pixel stream URL with mobile parameter
    const baseUrl = 'https://share.streampixel.io/674ace125b329980e86ba9e5';
    const url = isMobile ? `${baseUrl}?autoTalk=true` : baseUrl;
    
    // Replace current URL to maintain navigation state
    window.location.replace(url);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <Helmet>
        <title>Interactive AI Experience | Kustom Auto Wrx</title>
        <meta name="description" content="Experience our interactive AI assistant for real-time auto customization guidance." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Connecting to AI Assistant...
          </h1>
          <p className="text-gray-300">
            Please wait while we optimize your experience.
          </p>
        </div>
      </div>
    </div>
  );
}