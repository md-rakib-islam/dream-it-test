"use client";

import { useEffect, useRef } from 'react';

const ThirdPartyLoader = ({ 
  gtag = null, 
  metaPixel = null, 
  clarity = null,
  enabled = true 
}) => {
  const workerRef = useRef(null);
  const loadedScripts = useRef(new Set());

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Check if web workers are supported
    if (!window.Worker) {
      console.warn('Web Workers not supported, loading scripts on main thread');
      loadScriptsMainThread();
      return;
    }

    // Create web worker
    try {
      workerRef.current = new Worker('/analytics-worker.js');
      
      workerRef.current.onmessage = function(e) {
        const { type, success, error } = e.data;
        
        if (!success && error) {
          console.error(`Failed to load ${type}:`, error);
          // Fallback to main thread loading
          loadScriptsMainThread();
        } else {
          console.log(`Successfully loaded ${type} in web worker`);
        }
      };

      workerRef.current.onerror = function(error) {
        console.error('Web Worker error:', error);
        // Fallback to main thread loading
        loadScriptsMainThread();
      };

      // Load scripts in web worker with delay to not block initial page load
      const loadDelay = 2000; // 2 seconds after page load
      
      setTimeout(() => {
        if (gtag && !loadedScripts.current.has('gtag')) {
          workerRef.current.postMessage({
            type: 'LOAD_GTAG',
            data: { measurementId: gtag }
          });
          loadedScripts.current.add('gtag');
        }

        if (metaPixel && !loadedScripts.current.has('metaPixel')) {
          workerRef.current.postMessage({
            type: 'LOAD_META_PIXEL',
            data: { pixelId: metaPixel }
          });
          loadedScripts.current.add('metaPixel');
        }

        if (clarity && !loadedScripts.current.has('clarity')) {
          workerRef.current.postMessage({
            type: 'LOAD_CLARITY',
            data: { clarityId: clarity }
          });
          loadedScripts.current.add('clarity');
        }
      }, loadDelay);

    } catch (error) {
      console.error('Failed to create web worker:', error);
      loadScriptsMainThread();
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, [gtag, metaPixel, clarity, enabled]);

  // Fallback: Load scripts on main thread during idle time
  const loadScriptsMainThread = () => {
    const loadScript = (src, onLoad, onError) => {
      if (document.querySelector(`script[src*="${src.split('?')[0]}"]`)) {
        onLoad?.();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.defer = true;
      script.onload = onLoad;
      script.onerror = onError;
      document.head.appendChild(script);
    };

    const scheduleLoad = (callback) => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(callback, { timeout: 3000 });
      } else {
        setTimeout(callback, 100);
      }
    };

    // Load Google Analytics
    if (gtag && !loadedScripts.current.has('gtag-main')) {
      scheduleLoad(() => {
        loadScript(
          `https://www.googletagmanager.com/gtag/js?id=${gtag}`,
          () => {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function() {
              window.dataLayer.push(arguments);
            };
            window.gtag('js', new Date());
            window.gtag('config', gtag, {
              page_title: document.title,
              page_location: window.location.href,
            });
            loadedScripts.current.add('gtag-main');
          },
          (error) => console.error('Failed to load Google Analytics:', error)
        );
      });
    }

    // Load Meta Pixel
    if (metaPixel && !loadedScripts.current.has('metaPixel-main')) {
      scheduleLoad(() => {
        window.fbq = function() {
          if (window.fbq.callMethod) {
            window.fbq.callMethod.apply(window.fbq, arguments);
          } else {
            window.fbq.queue = window.fbq.queue || [];
            window.fbq.queue.push(arguments);
          }
        };
        window.fbq.push = window.fbq;
        window.fbq.loaded = true;
        window.fbq.version = '2.0';
        window.fbq.queue = [];

        loadScript(
          'https://connect.facebook.net/en_US/fbevents.js',
          () => {
            window.fbq('init', metaPixel);
            window.fbq('track', 'PageView');
            loadedScripts.current.add('metaPixel-main');
          },
          (error) => console.error('Failed to load Meta Pixel:', error)
        );
      });
    }

    // Load Microsoft Clarity
    if (clarity && !loadedScripts.current.has('clarity-main')) {
      scheduleLoad(() => {
        window.clarity = function() {
          (window.clarity.q = window.clarity.q || []).push(arguments);
        };

        loadScript(
          `https://www.clarity.ms/tag/${clarity}`,
          () => {
            loadedScripts.current.add('clarity-main');
          },
          (error) => console.error('Failed to load Microsoft Clarity:', error)
        );
      });
    }
  };

  return null; // This component doesn't render anything
};

export default ThirdPartyLoader;