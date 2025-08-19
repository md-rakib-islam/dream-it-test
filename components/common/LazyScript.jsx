"use client";

import { useEffect } from 'react';

// Optimized script loader that loads scripts in idle time
const LazyScript = ({ src, strategy = 'idle', onLoad, onError, ...props }) => {
  useEffect(() => {
    // Check if script already exists
    if (document.querySelector(`script[src="${src}"]`)) {
      onLoad?.();
      return;
    }

    const loadScript = () => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.defer = true;
      
      // Add all additional props
      Object.entries(props).forEach(([key, value]) => {
        script[key] = value;
      });

      script.onload = () => {
        onLoad?.();
      };

      script.onerror = () => {
        onError?.(new Error(`Failed to load script: ${src}`));
      };

      document.head.appendChild(script);
    };

    if (strategy === 'idle') {
      // Load during idle time
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadScript, { timeout: 2000 });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(loadScript, 100);
      }
    } else if (strategy === 'afterInteraction') {
      // Load after user interaction
      const events = ['click', 'scroll', 'keydown', 'touchstart'];
      
      const loadOnce = () => {
        events.forEach(event => {
          document.removeEventListener(event, loadOnce, { passive: true });
        });
        loadScript();
      };

      events.forEach(event => {
        document.addEventListener(event, loadOnce, { passive: true, once: true });
      });

      // Fallback timeout
      setTimeout(loadOnce, 5000);
    } else {
      // Immediate load
      loadScript();
    }

    return () => {
      // Cleanup: remove script if component unmounts
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [src, strategy, onLoad, onError, props]);

  return null; // This component doesn't render anything
};

export default LazyScript;