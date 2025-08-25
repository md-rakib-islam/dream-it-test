// 🚀 CRITICAL: Third-party script manager to reduce main thread blocking

/**
 * Manages third-party scripts with performance optimizations
 */
class ThirdPartyScriptManager {
  constructor() {
    this.loadedScripts = new Set();
    this.pendingScripts = new Map();
    this.observers = new Map();
  }

  /**
   * Load a third-party script with optimization strategies
   * @param {Object} config - Script configuration
   * @returns {Promise} - Promise that resolves when script is loaded
   */
  loadScript(config) {
    const {
      id,
      src,
      async = true,
      defer = true,
      crossOrigin = 'anonymous',
      integrity,
      onLoad,
      onError,
      loadStrategy = 'idle', // 'idle', 'intersection', 'delay', 'immediate'
      container, // For intersection strategy
      delay = 0, // For delay strategy
      priority = 'background' // 'background', 'user-blocking', 'user-visible'
    } = config;

    // Check if script is already loaded
    if (this.loadedScripts.has(id)) {
      return Promise.resolve();
    }

    // Check if script is already pending
    if (this.pendingScripts.has(id)) {
      return this.pendingScripts.get(id);
    }

    const promise = new Promise((resolve, reject) => {
      const loadScriptElement = () => {
        const script = document.createElement('script');
        script.src = src;
        script.async = async;
        script.defer = defer;
        
        if (crossOrigin) {
          script.crossOrigin = crossOrigin;
        }
        
        if (integrity) {
          script.integrity = integrity;
        }

        // Add timeout for script loading
        const timeoutId = setTimeout(() => {
          this.pendingScripts.delete(id);
          const timeoutError = {
            message: `Script loading timeout: ${src}`,
            source: src,
            id: id,
            error: 'TIMEOUT'
          };
          if (onError) onError(timeoutError);
          reject(timeoutError);
        }, 10000); // 10 second timeout

        script.onload = () => {
          clearTimeout(timeoutId);
          this.loadedScripts.add(id);
          this.pendingScripts.delete(id);
          console.log(`✅ Script loaded successfully: ${id}`);
          if (onLoad) onLoad();
          resolve();
        };

        script.onerror = (error) => {
          clearTimeout(timeoutId);
          this.pendingScripts.delete(id);
          const errorDetails = {
            message: `Failed to load script: ${src}`,
            source: src,
            id: id,
            originalError: error,
            timestamp: new Date().toISOString()
          };
          console.error(`❌ Script failed to load: ${id}`, errorDetails);
          if (onError) onError(errorDetails);
          reject(errorDetails);
        };

        // Add preconnect link for the domain
        try {
          this.addPreconnect(new URL(src).origin);
        } catch (urlError) {
          console.warn(`Invalid URL for preconnect: ${src}`, urlError);
        }

        console.log(`📥 Loading script: ${id} from ${src}`);
        document.head.appendChild(script);
      };

      // Apply loading strategy
      switch (loadStrategy) {
        case 'immediate':
          loadScriptElement();
          break;

        case 'idle':
          if ('requestIdleCallback' in window) {
            requestIdleCallback(loadScriptElement, { timeout: 2000 });
          } else {
            setTimeout(loadScriptElement, 16);
          }
          break;

        case 'intersection':
          if (container) {
            this.loadOnIntersection(container, loadScriptElement);
          } else {
            console.warn(`Intersection strategy requires container element for script: ${id}`);
            loadScriptElement();
          }
          break;

        case 'delay':
          setTimeout(loadScriptElement, delay);
          break;

        default:
          loadScriptElement();
      }
    });

    this.pendingScripts.set(id, promise);
    return promise;
  }

  /**
   * Load script when element becomes visible
   * @param {Element} element - Element to observe
   * @param {Function} callback - Callback to execute when visible
   */
  loadOnIntersection(element, callback) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            observer.disconnect();
          }
        });
      },
      { 
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    observer.observe(element);
  }

  /**
   * Add preconnect link for better loading performance
   * @param {string} origin - Origin to preconnect to
   */
  addPreconnect(origin) {
    if (document.querySelector(`link[rel="preconnect"][href="${origin}"]`)) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }

  /**
   * Load multiple scripts in sequence or parallel
   * @param {Object[]} scripts - Array of script configurations
   * @param {string} mode - 'sequence' or 'parallel'
   * @returns {Promise} - Promise that resolves when all scripts are loaded
   */
  loadMultiple(scripts, mode = 'parallel') {
    if (mode === 'sequence') {
      return scripts.reduce((promise, script) => {
        return promise.then(() => this.loadScript(script));
      }, Promise.resolve());
    } else {
      return Promise.all(scripts.map(script => this.loadScript(script)));
    }
  }

  /**
   * Preload a script without executing it
   * @param {string} src - Script source URL
   */
  preloadScript(src) {
    if (document.querySelector(`link[rel="preload"][href="${src}"]`)) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'script';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }

  /**
   * Check if a script is loaded
   * @param {string} id - Script ID
   * @returns {boolean} - Whether script is loaded
   */
  isLoaded(id) {
    return this.loadedScripts.has(id);
  }

  /**
   * Clean up resources
   */
  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.pendingScripts.clear();
  }
}

// Create singleton instance
const thirdPartyManager = new ThirdPartyScriptManager();

// Predefined configurations for common third-party scripts
export const THIRD_PARTY_CONFIGS = {
  bokun: {
    id: 'bokun-widget',
    src: 'https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js',
    loadStrategy: 'intersection',
    priority: 'background'
  },
  
  googleAnalytics: {
    id: 'google-analytics',
    src: 'https://www.googletagmanager.com/gtag/js',
    loadStrategy: 'idle',
    priority: 'background'
  },
  
  facebookPixel: {
    id: 'facebook-pixel',
    src: 'https://connect.facebook.net/en_US/fbevents.js',
    loadStrategy: 'idle',
    priority: 'background'
  },
  
  recaptcha: {
    id: 'recaptcha',
    src: 'https://www.google.com/recaptcha/api.js',
    loadStrategy: 'intersection',
    priority: 'user-visible'
  }
};

export default thirdPartyManager;