// 🚀 CRITICAL: Web Worker Manager for offloading heavy tasks from main thread

/**
 * Web Worker Manager to reduce main thread work
 * Handles data processing, image optimization, and heavy computations
 */
class WebWorkerManager {
  constructor() {
    this.workers = new Map();
    this.taskQueue = [];
    this.maxWorkers = navigator.hardwareConcurrency || 4;
  }

  /**
   * Create a Web Worker for specific tasks
   * @param {string} workerName - Unique name for the worker
   * @param {string} workerCode - Worker code as string
   * @returns {Worker} - Web Worker instance
   */
  createWorker(workerName, workerCode) {
    if (this.workers.has(workerName)) {
      return this.workers.get(workerName);
    }

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    const worker = new Worker(workerUrl);
    
    this.workers.set(workerName, worker);
    
    // Cleanup URL after worker is created
    worker.addEventListener('message', () => {
      URL.revokeObjectURL(workerUrl);
    }, { once: true });

    return worker;
  }

  /**
   * Process tour data in a Web Worker
   * @param {Array} tourData - Raw tour data
   * @returns {Promise} - Processed data
   */
  processTourData(tourData) {
    const workerCode = `
      self.addEventListener('message', function(e) {
        const { tourData } = e.data;
        
        try {
          // Heavy data processing
          const processed = tourData.map(tour => {
            // Keep image URLs as-is to avoid breaking Cloudflare Image Resizing
            const optimizedImages = tour.slideImg?.map(img => {
              // Return original URLs - let Cloudflare handle optimization via server config
              return img;
            }) || [];

            return {
              ...tour,
              slideImg: optimizedImages,
              // Pre-calculate commonly used values
              hasImages: optimizedImages.length > 0,
              firstImage: optimizedImages[0] || '/placeholder.svg',
              imageCount: optimizedImages.length,
              // Clean description for SEO
              cleanDescription: tour.description?.replace(/<[^>]*>/g, '').substring(0, 160) || '',
            };
          });

          self.postMessage({ 
            success: true, 
            data: processed,
            timestamp: Date.now()
          });
        } catch (error) {
          self.postMessage({ 
            success: false, 
            error: error.message 
          });
        }
      });
    `;

    return new Promise((resolve, reject) => {
      const worker = this.createWorker('tourProcessor', workerCode);
      
      worker.postMessage({ tourData });
      
      worker.addEventListener('message', function(e) {
        const { success, data, error } = e.data;
        
        if (success) {
          resolve(data);
        } else {
          reject(new Error(error));
        }
        
        // Terminate worker after use
        worker.terminate();
      }, { once: true });

      // Timeout after 5 seconds
      setTimeout(() => {
        worker.terminate();
        reject(new Error('Worker timeout'));
      }, 5000);
    });
  }

  /**
   * Generate image metadata in Web Worker
   * @param {Array} images - Image URLs
   * @returns {Promise} - Image metadata
   */
  generateImageMetadata(images) {
    const workerCode = `
      self.addEventListener('message', function(e) {
        const { images } = e.data;
        
        try {
          const metadata = images.map((src, index) => {
            // Extract dimensions from URL if available
            const urlParams = src.match(/w=(\\d+),h=(\\d+)/);
            const width = urlParams ? parseInt(urlParams[1]) : 800;
            const height = urlParams ? parseInt(urlParams[2]) : 600;
            
            return {
              src,
              index,
              width,
              height,
              aspectRatio: width / height,
              // Generate optimized variants
              variants: {
                thumbnail: src.replace(/w=\\d+,h=\\d+/, 'w=300,h=200'),
                medium: src.replace(/w=\\d+,h=\\d+/, 'w=600,h=400'),
                large: src.replace(/w=\\d+,h=\\d+/, 'w=1200,h=800'),
              },
              // Generate responsive sizes
              sizes: index < 2 
                ? '(max-width: 768px) 100vw, 50vw' 
                : '(max-width: 768px) 100vw, 25vw'
            };
          });

          self.postMessage({ 
            success: true, 
            data: metadata 
          });
        } catch (error) {
          self.postMessage({ 
            success: false, 
            error: error.message 
          });
        }
      });
    `;

    return new Promise((resolve, reject) => {
      const worker = this.createWorker('imageProcessor', workerCode);
      
      worker.postMessage({ images });
      
      worker.addEventListener('message', function(e) {
        const { success, data, error } = e.data;
        
        if (success) {
          resolve(data);
        } else {
          reject(new Error(error));
        }
        
        worker.terminate();
      }, { once: true });

      setTimeout(() => {
        worker.terminate();
        reject(new Error('Image processing timeout'));
      }, 3000);
    });
  }

  /**
   * Process structured data in Web Worker
   * @param {Object} tour - Tour data
   * @returns {Promise} - Structured data
   */
  generateStructuredData(tour) {
    const workerCode = `
      self.addEventListener('message', function(e) {
        const { tour } = e.data;
        
        try {
          const structuredData = {
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            "name": tour.title || "Tour",
            "description": tour.description?.replace(/<[^>]*>/g, "").substring(0, 160) || "",
            "image": tour.slideImg?.[0] || "",
            "url": typeof window !== 'undefined' ? window.location.href : "",
            "address": tour.location ? {
              "@type": "PostalAddress",
              "addressLocality": tour.location,
            } : undefined,
            "aggregateRating": tour.numberOfReviews ? {
              "@type": "AggregateRating",
              "ratingValue": "4.5",
              "reviewCount": tour.numberOfReviews,
            } : undefined,
            "offers": tour.price ? {
              "@type": "Offer",
              "price": tour.price,
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            } : undefined,
          };

          // Remove undefined properties
          const cleanData = JSON.parse(JSON.stringify(structuredData, (key, value) => {
            return value === undefined ? null : value;
          }));

          self.postMessage({ 
            success: true, 
            data: cleanData 
          });
        } catch (error) {
          self.postMessage({ 
            success: false, 
            error: error.message 
          });
        }
      });
    `;

    return new Promise((resolve, reject) => {
      const worker = this.createWorker('structuredDataProcessor', workerCode);
      
      worker.postMessage({ tour });
      
      worker.addEventListener('message', function(e) {
        const { success, data, error } = e.data;
        
        if (success) {
          resolve(data);
        } else {
          reject(new Error(error));
        }
        
        worker.terminate();
      }, { once: true });

      setTimeout(() => {
        worker.terminate();
        reject(new Error('Structured data processing timeout'));
      }, 2000);
    });
  }

  /**
   * Clean up all workers
   */
  cleanup() {
    this.workers.forEach(worker => {
      worker.terminate();
    });
    this.workers.clear();
    this.taskQueue = [];
  }

  /**
   * Check if Web Workers are supported
   * @returns {boolean}
   */
  isSupported() {
    return typeof Worker !== 'undefined';
  }
}

// Create singleton instance
const webWorkerManager = new WebWorkerManager();

// Cleanup workers when page is about to unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    webWorkerManager.cleanup();
  });
}

export default webWorkerManager;