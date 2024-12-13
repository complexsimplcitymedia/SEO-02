// Google Analytics Configuration
const GA_TRACKING_ID = 'G-468460573';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function initializeGA() {
  // Add Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID);
}

export function trackPageView(path: string) {
  window.gtag?.('event', 'page_view', {
    page_path: path
  });
}

export function trackEvent(category: string, action: string, label?: string, value?: number) {
  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });
}