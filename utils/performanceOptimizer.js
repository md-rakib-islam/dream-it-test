// 🚀 CRITICAL: Performance utilities to minimize main-thread work

/**
 * Schedule non-critical work during idle time
 * @param {Function} task - The task to execute
 * @param {Object} options - Options for the task
 * @returns {Promise} - Promise that resolves when task is complete
 */
export const scheduleIdleWork = (task, options = {}) => {
  const { timeout = 2000 } = options;
  
  return new Promise((resolve) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback((deadline) => {
        try {
          const result = task(deadline);
          resolve(result);
        } catch (error) {
          console.warn('Idle task failed:', error);
          resolve(null);
        }
      }, { timeout });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        try {
          const result = task();
          resolve(result);
        } catch (error) {
          console.warn('Fallback task failed:', error);
          resolve(null);
        }
      }, 16); // ~1 frame delay
    }
  });
};

/**
 * Batch DOM operations to minimize layout thrashing
 * @param {Function[]} operations - Array of DOM operations
 */
export const batchDOMOperations = (operations) => {
  requestAnimationFrame(() => {
    // Read phase - gather all DOM measurements
    const measurements = [];
    operations.forEach((op, index) => {
      if (op.read) {
        measurements[index] = op.read();
      }
    });

    // Write phase - apply all DOM changes
    operations.forEach((op, index) => {
      if (op.write) {
        op.write(measurements[index]);
      }
    });
  });
};

/**
 * Throttle function with RAF for smooth animations
 * @param {Function} func - Function to throttle
 * @returns {Function} - Throttled function
 */
export const throttleRAF = (func) => {
  let rafId;
  let lastArgs;

  return function throttledFunction(...args) {
    lastArgs = args;

    if (rafId) return;

    rafId = requestAnimationFrame(() => {
      func.apply(this, lastArgs);
      rafId = null;
    });
  };
};

/**
 * Break up long tasks into smaller chunks
 * @param {Array} items - Items to process
 * @param {Function} processor - Function to process each item
 * @param {Object} options - Configuration options
 * @returns {Promise} - Promise that resolves when all items are processed
 */
export const processInChunks = async (items, processor, options = {}) => {
  const { chunkSize = 10, delay = 0 } = options;
  const results = [];

  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    
    // Process chunk synchronously
    for (const item of chunk) {
      results.push(await processor(item));
    }

    // Yield control back to the browser
    if (delay > 0 && i + chunkSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, delay));
    } else if (i + chunkSize < items.length) {
      await new Promise(resolve => {
        if ('scheduler' in window && 'postTask' in window.scheduler) {
          window.scheduler.postTask(resolve, { priority: 'background' });
        } else {
          setTimeout(resolve, 0);
        }
      });
    }
  }

  return results;
};

/**
 * Optimize image processing off the main thread
 * @param {HTMLImageElement} img - Image element
 * @param {Object} options - Processing options
 * @returns {Promise<string>} - Promise that resolves with optimized image data URL
 */
export const optimizeImageOffMainThread = (img, options = {}) => {
  return new Promise((resolve, reject) => {
    const canvas = new OffscreenCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(img, 0, 0);
    
    const { quality = 0.8, format = 'image/webp' } = options;
    
    canvas.convertToBlob({ type: format, quality }).then(blob => {
      const url = URL.createObjectURL(blob);
      resolve(url);
    }).catch(reject);
  });
};

/**
 * Debounce with immediate execution option
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately on first call
 * @returns {Function} - Debounced function
 */
export const debounceOptimized = (func, wait, immediate = false) => {
  let timeout;
  let result;
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) {
        result = func.apply(this, args);
      }
    };
    
    const callNow = immediate && !timeout;
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) {
      result = func.apply(this, args);
    }
    
    return result;
  };
};

/**
 * Memory-efficient object pool
 */
export class ObjectPool {
  constructor(createFn, resetFn, maxSize = 100) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.maxSize = maxSize;
    this.pool = [];
  }

  acquire() {
    if (this.pool.length > 0) {
      return this.pool.pop();
    }
    return this.createFn();
  }

  release(obj) {
    if (this.pool.length < this.maxSize) {
      this.resetFn(obj);
      this.pool.push(obj);
    }
  }

  clear() {
    this.pool.length = 0;
  }
}

/**
 * Efficient event delegation
 * @param {Element} container - Container element
 * @param {string} selector - CSS selector for target elements
 * @param {string} eventType - Event type
 * @param {Function} handler - Event handler
 * @returns {Function} - Cleanup function
 */
export const delegateEvent = (container, selector, eventType, handler) => {
  const delegatedHandler = (event) => {
    if (event.target.matches(selector)) {
      handler(event);
    }
  };

  container.addEventListener(eventType, delegatedHandler, { passive: true });

  // Return cleanup function
  return () => {
    container.removeEventListener(eventType, delegatedHandler);
  };
};