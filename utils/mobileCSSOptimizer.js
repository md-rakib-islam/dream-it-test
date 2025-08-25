/**
 * Mobile CSS optimization utility
 * Removes unused CSS rules for mobile devices
 */

export const removeUnusedMobileCSS = () => {
  if (typeof window === 'undefined' || window.innerWidth > 768) return;

  const unusedSelectors = [
    // Desktop-only hover states
    ':hover:not(a)',
    ':focus-visible',
    // Desktop animations
    '@keyframes',
    'animation:',
    'transition: all',
    'transition: transform',
    // Desktop-only layout
    'grid-template-columns: repeat(',
    'grid-auto-flow',
    // Large screen breakpoints
    '@media (min-width: 1200px)',
    '@media (min-width: 1024px)',
    // Print styles
    '@media print',
    // Desktop-only utilities
    '.d-lg-',
    '.d-xl-',
    '.d-xxl-',
    // Complex selectors
    'nth-child(n+4)',
    'nth-of-type',
    // Desktop form styles
    'input[type="range"]::-webkit-slider',
    'select::-ms-expand'
  ];

  const stylesheets = document.querySelectorAll('style, link[rel="stylesheet"]');
  
  stylesheets.forEach(sheet => {
    try {
      if (sheet.tagName === 'STYLE' && sheet.textContent) {
        let css = sheet.textContent;
        
        unusedSelectors.forEach(selector => {
          // Remove rules containing these selectors
          const pattern = new RegExp(`[^}]*${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^{]*\\{[^}]*\\}`, 'gi');
          css = css.replace(pattern, '');
        });
        
        // Remove empty media queries
        css = css.replace(/@media[^{]*{\s*}/gi, '');
        
        // Minify CSS
        css = css
          .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
          .replace(/\s+/g, ' ') // Collapse whitespace
          .replace(/;\s*}/g, '}') // Remove last semicolon
          .replace(/\s*{\s*/g, '{') // Clean brackets
          .replace(/\s*}\s*/g, '}')
          .replace(/;\s*/g, ';')
          .trim();
        
        if (css !== sheet.textContent) {
          sheet.textContent = css;
        }
      }
    } catch (error) {
      // Ignore cross-origin stylesheet errors
    }
  });
};

export const deferNonCriticalCSS = () => {
  if (typeof window === 'undefined') return;

  const nonCriticalFiles = [
    'bootstrap',
    'slick',
    'lightbox',
    'components'
  ];

  // Find and defer non-critical stylesheets
  const links = document.querySelectorAll('link[rel="stylesheet"]');
  
  links.forEach(link => {
    const href = link.href || '';
    const isNonCritical = nonCriticalFiles.some(file => href.includes(file));
    
    if (isNonCritical) {
      // Convert to preload then switch to stylesheet
      link.rel = 'preload';
      link.as = 'style';
      link.onload = function() {
        this.rel = 'stylesheet';
        this.onload = null;
      };
    }
  });
};

export const injectCriticalMobileCSS = () => {
  if (typeof window === 'undefined' || window.innerWidth > 768) return;

  const criticalCSS = `
    /* Mobile-only critical styles */
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;line-height:1.6;color:#333}
    .container{max-width:100%;padding:0 10px;margin:0 auto}
    .mobile-slider-container{height:240px!important;min-height:240px!important;background:#f8f9fa;border-radius:8px;overflow:hidden;contain:layout size style paint}
    .mobile-single-slide{height:240px!important;width:100%!important;display:flex!important;align-items:center;justify-content:center;position:relative!important;transform:translateZ(0)!important}
    .object-cover{object-fit:cover;width:100%;height:100%}
    .rounded-4{border-radius:8px}
    .slick-slider,.slick-list,.slick-track{height:240px!important;min-height:240px!important;max-height:240px!important}
    .slick-track{transition:none!important;transform:translateZ(0)!important}
    .slick-slide{transition:none!important;opacity:1!important;height:240px!important;contain:layout size paint}
    .text-center{text-align:center}
    .pt-40{padding-top:40px}
    .pb-40{padding-bottom:40px}
    .mb-20{margin-bottom:20px}
    .button{display:inline-flex;align-items:center;justify-content:center;padding:12px 24px;border:none;border-radius:6px;text-decoration:none;font-weight:500;cursor:pointer;background:#1e40af;color:white}
    @media (max-width:768px){.container{padding:0 10px}.text-25{font-size:20px}.text-30{font-size:24px}}
  `;

  const style = document.createElement('style');
  style.id = 'critical-mobile-css';
  style.textContent = criticalCSS;
  document.head.insertBefore(style, document.head.firstChild);
};