// 🚀 CRITICAL: CSS optimization utilities for reducing unused styles

/**
 * Critical CSS extractor for tour pages
 * Identifies the most important styles for above-the-fold content
 */
export const CRITICAL_CSS_TOUR_PAGE = `
/* 🚀 CRITICAL: Tour page critical styles */
.container { max-width: 1200px; margin: 0 auto; padding: 0 15px; }
.row { display: flex; flex-wrap: wrap; margin: 0 -15px; }
.col-xl-8 { flex: 0 0 66.666667%; max-width: 66.666667%; padding: 0 15px; }
.col-xl-4 { flex: 0 0 33.333333%; max-width: 33.333333%; padding: 0 15px; }

/* Gallery critical styles */
.gallery-grid-container { 
  display: grid; 
  grid-template-columns: 1fr 2fr 1fr; 
  grid-template-rows: repeat(2, 250px); 
  grid-gap: 10px; 
  height: 510px; 
  aspect-ratio: 2.35;
  contain: layout style;
}

.gallery-item { 
  position: relative; 
  cursor: pointer; 
  overflow: hidden; 
  contain: layout size;
  background-color: #f8f9fa;
}

/* Typography critical styles */
.text-22 { font-size: 22px; line-height: 1.4; }
.text-18 { font-size: 18px; line-height: 1.4; }
.fw-600 { font-weight: 600; }
.pt-40 { padding-top: 40px; }
.mb-20 { margin-bottom: 20px; }

/* Mobile critical styles */
@media (max-width: 768px) {
  .col-xl-8, .col-xl-4 { 
    flex: 0 0 100%; 
    max-width: 100%; 
  }
  .gallery-grid-container { 
    display: block; 
    height: auto; 
    min-height: 240px; 
  }
  .container { padding: 0 10px; }
  .text-22 { font-size: 20px; }
  .sm\\:text-18 { font-size: 18px; }
}

/* Prevent FOUT */
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-display: swap;
}
`;

/**
 * Utility to defer non-critical CSS loading
 * @param {string} href - CSS file path
 * @param {string} media - Media query for the CSS (optional)
 */
export const loadCSS = (href, media = 'all') => {
  if (typeof window === 'undefined') return;

  // Check if CSS is already loaded
  if (document.querySelector(`link[href="${href}"]`)) {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  link.media = 'print'; // Load as non-render-blocking
  
  link.onload = function() {
    link.media = media;
    link.onload = null;
  };

  // Fallback for browsers without preload support
  link.onerror = function() {
    link.rel = 'stylesheet';
    link.media = media;
  };

  document.head.appendChild(link);
};

/**
 * Load multiple CSS files with priority
 * @param {Array} cssFiles - Array of CSS file objects { href, media?, priority? }
 */
export const loadMultipleCSS = (cssFiles) => {
  if (typeof window === 'undefined') return;

  // Sort by priority (higher number = higher priority)
  cssFiles.sort((a, b) => (b.priority || 0) - (a.priority || 0));

  cssFiles.forEach((file, index) => {
    // Stagger loading to prevent blocking
    setTimeout(() => {
      loadCSS(file.href, file.media);
    }, index * 16); // ~1 frame delay between each
  });
};

/**
 * Remove unused Bootstrap components
 * This should be done at build time, but can help identify unused classes
 */
export const UNUSED_BOOTSTRAP_COMPONENTS = [
  // Grid system components we don't use
  '.col-xxl-', '.col-xl-1', '.col-xl-2', '.col-xl-3', '.col-xl-5', 
  '.col-xl-6', '.col-xl-7', '.col-xl-9', '.col-xl-10', '.col-xl-11', '.col-xl-12',
  
  // Form components we don't use heavily
  '.form-select', '.form-check', '.form-range', '.form-floating',
  
  // Components we might not use
  '.carousel', '.modal', '.toast', '.popover', '.tooltip',
  '.offcanvas', '.collapse', '.dropdown-menu',
  
  // Utility classes we might not use
  '.text-decoration-', '.text-wrap', '.text-nowrap', '.text-break',
  '.text-transform-', '.font-monospace',
];

/**
 * Critical CSS for different page types
 */
export const CRITICAL_CSS_BY_PAGE = {
  tour: CRITICAL_CSS_TOUR_PAGE,
  
  home: \`
    /* Home page critical styles */
    .hero-section { min-height: 60vh; }
    .search-box { background: white; border-radius: 8px; }
  \`,
  
  tours: \`
    /* Tours listing page critical styles */
    .tours-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
    .tour-card { border-radius: 12px; overflow: hidden; }
  \`,
};

/**
 * Inject critical CSS immediately
 * @param {string} pageType - Type of page (tour, home, tours, etc.)
 */
export const injectCriticalCSS = (pageType = 'tour') => {
  if (typeof window === 'undefined') return;
  
  const criticalCSS = CRITICAL_CSS_BY_PAGE[pageType];
  if (!criticalCSS) return;

  // Check if critical CSS is already injected
  if (document.querySelector('#critical-css-' + pageType)) return;

  const style = document.createElement('style');
  style.id = 'critical-css-' + pageType;
  style.textContent = criticalCSS;
  
  // Insert at the beginning of head for highest priority
  document.head.insertBefore(style, document.head.firstChild);
};

/**
 * Preload CSS files for better performance
 * @param {Array} cssUrls - Array of CSS URLs to preload
 */
export const preloadCSS = (cssUrls) => {
  if (typeof window === 'undefined') return;

  cssUrls.forEach(url => {
    if (document.querySelector(\`link[href="\${url}"][rel="preload"]\`)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

/**
 * Monitor CSS usage and report unused styles
 * This is for development only - should not be used in production
 */
export const monitorCSSUsage = () => {
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'production') return;

  const usedSelectors = new Set();
  
  // Monitor which CSS selectors are actually used
  const observer = new MutationObserver(() => {
    document.querySelectorAll('*').forEach(el => {
      const computedStyle = window.getComputedStyle(el);
      // This is a simplified version - a full implementation would be much more complex
      usedSelectors.add(el.tagName.toLowerCase());
      if (el.className) {
        el.className.split(' ').forEach(cls => {
          if (cls.trim()) usedSelectors.add('.' + cls.trim());
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  });

  // Log used selectors after 5 seconds
  setTimeout(() => {
    console.log('Used CSS selectors:', Array.from(usedSelectors).sort());
    observer.disconnect();
  }, 5000);
};