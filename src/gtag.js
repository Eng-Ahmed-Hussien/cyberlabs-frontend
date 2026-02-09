/* ========================================
   Google Analytics Setup
   ======================================== */

export const GA_ID = import.meta.env.VITE_GA_ID || 'G-CMGVN78MHV';

// Load Google Analytics script
export const loadGA = () => {
  if (document.getElementById('gtag-script')) return;

  const script = document.createElement('script');
  script.id = 'gtag-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  return () => {
    window.removeEventListener('resize', handleResize);
  };
};

// Initialize Google Analytics
export const initGA = () => {
  if (window.gtag) {
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }
};

// Track page view
export const trackPageView = (url) => {
  if (window.gtag) {
    window.gtag('config', GA_ID, {
      page_path: url,
    });
  }
};

// Track event
export const trackEvent = (action, category, label, value) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
