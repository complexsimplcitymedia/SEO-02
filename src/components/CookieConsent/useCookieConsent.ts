import { useState, useEffect } from 'react';

const COOKIE_CONSENT_KEY = 'cookie_consent';

export function useCookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
    // Here you could initialize optional analytics/tracking
  };

  const declineCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setIsVisible(false);
    // Here you could disable optional cookies/tracking
  };

  return {
    isVisible,
    acceptCookies,
    declineCookies
  };
}