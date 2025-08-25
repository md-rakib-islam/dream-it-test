// 🚀 CRITICAL: Image optimization utilities for better performance

/**
 * Generate optimized image URLs with proper sizing
 * @param {string} src - Original image URL
 * @param {Object} options - Optimization options
 * @returns {string} - Optimized image URL
 */
export const generateOptimizedImageUrl = (src, options = {}) => {
  const {
    width = 800,
    height = 600,
    quality = 80,
    format = 'webp',
    fit = 'cover'
  } = options;

  // Handle Cloudflare Image Resizing for imagedelivery.net URLs
  if (src?.includes('imagedelivery.net')) {
    // Extract the image ID and current variant from the URL
    const match = src.match(/imagedelivery\.net\/([^\/]+)\/([^\/]+)\/([^\/\?]*)/);
    
    if (match) {
      const [, accountId, imageId, currentVariant] = match;
      
      // Create optimized variant based on dimensions and quality
      const optimizedVariant = `w=${width},h=${height},q=${quality},f=${format},fit=${fit}`;
      
      return `https://imagedelivery.net/${accountId}/${imageId}/${optimizedVariant}`;
    }
  }
  
  // Fallback for other CDNs or local images
  return src;
};

/**
 * Preload critical images with proper prioritization
 * @param {Array} imageUrls - Array of image URLs to preload
 * @param {Object} options - Preload options
 */
export const preloadCriticalImages = (imageUrls, options = {}) => {
  if (typeof window === 'undefined') return;
  
  const { 
    priority = 'high',
    as = 'image',
    crossOrigin = 'anonymous',
    media = '(min-width: 769px)' // Desktop only by default
  } = options;

  imageUrls.forEach((url, index) => {
    // Limit to first 3 images to avoid overwhelming the browser
    if (index >= 3) return;
    
    // Check if already preloaded
    if (document.querySelector(`link[href="${url}"][rel="preload"]`)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = url;
    link.fetchPriority = index === 0 ? 'high' : priority;
    if (crossOrigin) link.crossOrigin = crossOrigin;
    if (media) link.media = media;
    
    document.head.appendChild(link);
  });
};

/**
 * Responsive image breakpoints configuration
 */
export const RESPONSIVE_BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1200,
  large: 1920
};

/**
 * Generate responsive image sizes based on breakpoints
 * @param {Object} sizes - Size configuration for different breakpoints
 * @returns {string} - Sizes attribute string
 */
export const generateResponsiveSizes = (sizes = {}) => {
  const {
    mobile = '100vw',
    tablet = '90vw', 
    desktop = '800px',
    large = '1000px',
    default: defaultSize = '100vw'
  } = sizes;

  return [
    `(max-width: ${RESPONSIVE_BREAKPOINTS.mobile}px) ${mobile}`,
    `(max-width: ${RESPONSIVE_BREAKPOINTS.tablet}px) ${tablet}`,
    `(max-width: ${RESPONSIVE_BREAKPOINTS.desktop}px) ${desktop}`,
    `(max-width: ${RESPONSIVE_BREAKPOINTS.large}px) ${large}`,
    defaultSize
  ].join(', ');
};

/**
 * Lazy load images with Intersection Observer
 * @param {Array|NodeList} images - Images to lazy load
 * @param {Object} options - Observer options
 */
export const lazyLoadImages = (images, options = {}) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    // Fallback: load all images immediately
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    });
    return;
  }

  const {
    rootMargin = '50px',
    threshold = 0.1,
    loadingClass = 'lazy-loading',
    loadedClass = 'lazy-loaded'
  } = options;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Add loading class
        img.classList.add(loadingClass);
        
        // Load the image
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          
          img.onload = () => {
            img.classList.remove(loadingClass);
            img.classList.add(loadedClass);
          };
          
          img.onerror = () => {
            img.classList.remove(loadingClass);
            img.classList.add('lazy-error');
          };
        }
        
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin,
    threshold
  });

  images.forEach(img => imageObserver.observe(img));
};

/**
 * Optimize images for different use cases
 */
export const IMAGE_OPTIMIZATION_PRESETS = {
  hero: {
    quality: 90,
    format: 'webp',
    sizes: generateResponsiveSizes({
      mobile: '100vw',
      tablet: '100vw', 
      desktop: '100vw',
      large: '100vw'
    })
  },
  
  gallery_large: {
    quality: 85,
    format: 'webp',
    sizes: generateResponsiveSizes({
      mobile: '100vw',
      tablet: '100vw',
      desktop: '50vw',
      large: '800px'
    })
  },
  
  gallery_small: {
    quality: 80,
    format: 'webp',
    sizes: generateResponsiveSizes({
      mobile: '50vw',
      tablet: '50vw',
      desktop: '300px',
      large: '400px'
    })
  },
  
  thumbnail: {
    quality: 75,
    format: 'webp',
    sizes: generateResponsiveSizes({
      mobile: '160px',
      tablet: '200px',
      desktop: '250px',
      large: '300px'
    })
  },
  
  avatar: {
    quality: 80,
    format: 'webp',
    sizes: generateResponsiveSizes({
      mobile: '60px',
      tablet: '80px',
      desktop: '80px',
      large: '100px'
    })
  }
};

/**
 * Calculate optimal image dimensions based on container and device
 * @param {HTMLElement} container - Container element
 * @param {number} devicePixelRatio - Device pixel ratio
 * @returns {Object} - Optimal width and height
 */
export const calculateOptimalDimensions = (container, devicePixelRatio = 1) => {
  if (!container) return { width: 800, height: 600 };

  const rect = container.getBoundingClientRect();
  const width = Math.ceil(rect.width * devicePixelRatio);
  const height = Math.ceil(rect.height * devicePixelRatio);
  
  // Cap at reasonable maximums to prevent excessive memory usage
  return {
    width: Math.min(width, 2048),
    height: Math.min(height, 2048)
  };
};

/**
 * Monitor image loading performance
 * @param {HTMLImageElement} img - Image element
 * @returns {Promise} - Performance metrics
 */
export const monitorImagePerformance = (img) => {
  return new Promise((resolve) => {
    const startTime = performance.now();
    
    const cleanup = () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
    
    const handleLoad = () => {
      const loadTime = performance.now() - startTime;
      cleanup();
      
      resolve({
        success: true,
        loadTime,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        src: img.src
      });
    };
    
    const handleError = () => {
      const loadTime = performance.now() - startTime;
      cleanup();
      
      resolve({
        success: false,
        loadTime,
        error: 'Image failed to load',
        src: img.src
      });
    };
    
    img.addEventListener('load', handleLoad, { once: true });
    img.addEventListener('error', handleError, { once: true });
    
    // If image is already loaded
    if (img.complete && img.naturalWidth > 0) {
      handleLoad();
    }
  });
};

/**
 * Create optimized image with progressive enhancement
 * @param {Object} config - Image configuration
 * @returns {HTMLImageElement} - Optimized image element
 */
export const createOptimizedImage = (config) => {
  const {
    src,
    alt = '',
    width,
    height,
    className = '',
    loading = 'lazy',
    priority = false,
    preset = 'default'
  } = config;

  const img = document.createElement('img');
  const optimization = IMAGE_OPTIMIZATION_PRESETS[preset] || IMAGE_OPTIMIZATION_PRESETS.default;
  
  // Set basic attributes
  img.alt = alt;
  img.className = className;
  img.loading = priority ? 'eager' : loading;
  
  // Set dimensions if provided
  if (width) img.width = width;
  if (height) img.height = height;
  
  // Set responsive attributes
  img.sizes = optimization.sizes;
  
  // Generate optimized source
  const optimizedSrc = generateOptimizedImageUrl(src, {
    width: width || 800,
    height: height || 600,
    quality: optimization.quality,
    format: optimization.format
  });
  
  if (priority) {
    img.src = optimizedSrc;
    img.fetchPriority = 'high';
  } else {
    img.dataset.src = optimizedSrc;
    img.src = 'data:image/svg+xml;base64,' + 
      btoa('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="30"><rect width="100%" height="100%" fill="#f3f4f6"/></svg>');
  }
  
  return img;
};