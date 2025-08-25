"use client";

import { useEffect } from "react";

// 🚀 CRITICAL: Preload LCP and critical resources to improve performance
const CriticalResourcePreloader = ({ tour }) => {
  useEffect(() => {
    if (typeof window === "undefined" || !tour?.slideImg?.[0]) return;

    // 🚀 CRITICAL: Immediate LCP image preload with multiple strategies
    const preloadLcpImage = () => {
      const lcpImageUrl = tour.slideImg[0];
      
      // Strategy 1: High-priority preload link (inserted first for maximum priority)
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = lcpImageUrl;
      link.fetchPriority = "high";
      link.crossOrigin = "anonymous";
      document.head.insertBefore(link, document.head.firstChild);

      // Strategy 2: Immediate image object for instant loading
      const img = new Image();
      img.onload = () => console.log('LCP image preloaded successfully');
      img.onerror = () => console.warn('LCP image preload failed');
      img.fetchPriority = "high";
      img.loading = "eager";
      img.src = lcpImageUrl;

      // Strategy 3: Handle /v1 removal and ensure /public URL
      if (lcpImageUrl.includes('imagedelivery.net')) {
        let publicUrl = lcpImageUrl;
        
        // Step 1: Remove /v1 if it exists
        if (publicUrl.includes('/v1')) {
          publicUrl = publicUrl.replace('/v1', '');
        }
        
        // Step 2: Remove any custom parameters
        if (publicUrl.includes('/w=')) {
          const parts = publicUrl.split('/');
          if (parts.length >= 5) {
            publicUrl = parts.slice(0, 5).join('/');
          }
        }
        
        // Step 3: Ensure URL ends with /public
        if (!publicUrl.endsWith('/public')) {
          publicUrl = publicUrl.replace(/\/$/, '');
          publicUrl = `${publicUrl}/public`;
        }
        
        // Only preload the public URL that we know works
        const publicLink = document.createElement("link");
        publicLink.rel = "preload";
        publicLink.as = "image";
        publicLink.href = publicUrl;
        publicLink.fetchPriority = "high";
        publicLink.crossOrigin = "anonymous";
        document.head.insertBefore(publicLink, document.head.children[1]);
      }
    };

    // 🚀 OPTIMIZATION: Preload second image for gallery
    const preloadSecondaryImages = () => {
      if (tour.slideImg.length > 1) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = tour.slideImg[1];
        link.fetchPriority = "low";
        document.head.appendChild(link);
      }
    };

    // 🚀 CRITICAL: DNS prefetch for external domains
    const prefetchDomains = () => {
      const domains = [
        "https://imagedelivery.net",
        "https://widgets.bokun.io",
        "https://www.cloudflare.com",
      ];

      domains.forEach((domain) => {
        if (!document.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`)) {
          const link = document.createElement("link");
          link.rel = "dns-prefetch";
          link.href = domain;
          document.head.appendChild(link);
        }
      });
    };

    // Execute preloading
    preloadLcpImage();
    prefetchDomains();

    // Delay secondary preloads to prioritize LCP
    setTimeout(preloadSecondaryImages, 100);

    // Cleanup function
    return () => {
      // Remove preload links to prevent memory leaks
      const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
      preloadLinks.forEach((link) => {
        if (tour.slideImg.includes(link.href)) {
          link.parentNode?.removeChild(link);
        }
      });
    };
  }, [tour?.slideImg]);

  // 🚀 OPTIMIZATION: Resource hints in HTML head
  useEffect(() => {
    // Add resource hints
    const addResourceHint = (rel, href, options = {}) => {
      if (document.querySelector(`link[rel="${rel}"][href="${href}"]`)) return;
      
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      Object.assign(link, options);
      document.head.appendChild(link);
    };

    // Critical resource hints
    addResourceHint("preconnect", "https://imagedelivery.net", { crossOrigin: "anonymous" });
    addResourceHint("preconnect", "https://fonts.googleapis.com");
    addResourceHint("preconnect", "https://fonts.gstatic.com", { crossOrigin: "anonymous" });

    return () => {
      // Cleanup resource hints if needed
    };
  }, []);

  return null; // This component doesn't render anything
};

export default CriticalResourcePreloader;