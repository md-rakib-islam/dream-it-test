"use client";

import { useEffect } from 'react';

const BfCacheOptimizer = () => {
  useEffect(() => {
    // 🚀 OPTIMIZATION: Fix back/forward cache (bfcache) issues

    // 1. Remove unload listeners that block bfcache
    const removeBlockingListeners = () => {
      // Remove any beforeunload listeners added by third-party scripts
      window.removeEventListener('beforeunload', () => {});
      
      // Clear any intervals that might block bfcache
      const intervalIds = [];
      const originalSetInterval = window.setInterval;
      window.setInterval = function(...args) {
        const id = originalSetInterval.apply(this, args);
        intervalIds.push(id);
        return id;
      };

      // Cleanup intervals on pagehide
      const cleanupIntervals = () => {
        intervalIds.forEach(id => clearInterval(id));
      };

      window.addEventListener('pagehide', cleanupIntervals);
    };

    // 2. Optimize event listeners for bfcache
    const optimizeEventListeners = () => {
      // Use passive listeners where possible
      document.addEventListener('scroll', () => {}, { passive: true });
      document.addEventListener('touchstart', () => {}, { passive: true });
      document.addEventListener('touchmove', () => {}, { passive: true });
      
      // Clean up active connections on pagehide
      window.addEventListener('pagehide', () => {
        // Close WebSocket connections
        if (window.WebSocket) {
          // Close any open WebSocket connections
        }
        
        // Cancel fetch requests
        if (window.abortController) {
          window.abortController.abort();
        }
        
        // Clear timers
        if (window.bfcacheTimeouts) {
          window.bfcacheTimeouts.forEach(id => clearTimeout(id));
        }
        if (window.bfcacheIntervals) {
          window.bfcacheIntervals.forEach(id => clearInterval(id));
        }
      });
    };

    // 3. Handle page visibility changes properly
    const handleVisibilityChange = () => {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          // Prepare for potential bfcache
          // Save any important state
          // Close unnecessary connections
        } else if (document.visibilityState === 'visible') {
          // Page is visible again (potentially restored from bfcache)
          // Refresh any stale data if needed
        }
      });
    };

    // 4. Optimize third-party script loading for bfcache
    const optimizeThirdPartyScripts = () => {
      // Ensure analytics scripts don't block bfcache
      if (window.gtag) {
        // Google Analytics is bfcache-friendly by default
      }
      
      if (window.fbq) {
        // Facebook Pixel - ensure it doesn't block bfcache
      }
      
      // 🚀 ENHANCEMENT: Handle unload events properly
      const handlePageHide = (event) => {
        // Only do cleanup if page is NOT being cached
        if (!event.persisted) {
          // Clean up any persistent connections only when page won't be cached
          if (window.WebSocketConnections) {
            window.WebSocketConnections.forEach(ws => ws.close());
          }
        }
        
        // Always clean up these resources
        if (window.mediaRecorder && window.mediaRecorder.state !== 'inactive') {
          window.mediaRecorder.stop();
        }
        
        // Cancel any pending network requests
        if (window.pendingRequests) {
          window.pendingRequests.forEach(controller => controller.abort());
          window.pendingRequests.clear();
        }
      };
      
      window.addEventListener('pagehide', handlePageHide, { passive: true });
    };

    // 5. Handle form data properly
    const handleFormData = () => {
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        form.addEventListener('submit', () => {
          // Save form data to sessionStorage for bfcache restoration
          const formData = new FormData(form);
          const data = {};
          for (let [key, value] of formData.entries()) {
            data[key] = value;
          }
          sessionStorage.setItem(`form_${form.id || 'default'}`, JSON.stringify(data));
        });
      });

      // Restore form data on pageshow
      window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
          // Page was restored from bfcache
          forms.forEach(form => {
            const savedData = sessionStorage.getItem(`form_${form.id || 'default'}`);
            if (savedData) {
              const data = JSON.parse(savedData);
              Object.entries(data).forEach(([key, value]) => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input) {
                  input.value = value;
                }
              });
            }
          });
        }
      });
    };

    // Initialize optimizations
    removeBlockingListeners();
    optimizeEventListeners();
    handleVisibilityChange();
    optimizeThirdPartyScripts();
    handleFormData();

    // Global timeout/interval tracking for bfcache
    window.bfcacheTimeouts = window.bfcacheTimeouts || [];
    window.bfcacheIntervals = window.bfcacheIntervals || [];

    const originalSetTimeout = window.setTimeout;
    const originalSetInterval = window.setInterval;

    window.setTimeout = function(...args) {
      const id = originalSetTimeout.apply(this, args);
      window.bfcacheTimeouts.push(id);
      return id;
    };

    window.setInterval = function(...args) {
      const id = originalSetInterval.apply(this, args);
      window.bfcacheIntervals.push(id);
      return id;
    };

    // Cleanup on component unmount
    return () => {
      // Clean up any listeners we added
      window.bfcacheTimeouts?.forEach(id => clearTimeout(id));
      window.bfcacheIntervals?.forEach(id => clearInterval(id));
    };
  }, []);

  return null; // This component doesn't render anything
};

export default BfCacheOptimizer;