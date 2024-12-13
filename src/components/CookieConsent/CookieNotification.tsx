import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { useCookieConsent } from './useCookieConsent';

export default function CookieNotification() {
  const { isVisible, acceptCookies, declineCookies } = useCookieConsent();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-xl p-4 md:p-6 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <Cookie className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">Cookie Preferences</h3>
                    <p className="text-gray-300 text-sm md:text-base">
                      We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                      By clicking "Accept All", you consent to our use of cookies. Visit our{' '}
                      <button
                        onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'privacy' }))}
                        className="text-blue-400 hover:text-blue-300 underline transition-colors"
                      >
                        Privacy Policy
                      </button>{' '}
                      to learn more.
                    </p>
                  </div>
                </div>
                <button
                  onClick={declineCookies}
                  className="text-gray-400 hover:text-gray-300 p-1"
                  aria-label="Close cookie notification"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  onClick={declineCookies}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Decline Optional
                </button>
                <button
                  onClick={acceptCookies}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}