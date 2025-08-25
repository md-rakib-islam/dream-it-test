"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { optimizeImageForMobile, shouldOptimizeForMobile } from '../../../utils/mobileImageOptimizer';
import { generateOptimizedImageUrl, IMAGE_OPTIMIZATION_PRESETS, preloadCriticalImages } from '../../../utils/imageOptimizer';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 75,
  placeholder = "blur",
  sizes,
  fill = false,
  style = {},
  onClick,
  loading = "lazy",
  variant = "default",
  fetchPriority, // Add explicit fetchPriority support
  ...props
}) => {
  // 🚀 CRITICAL LCP FIX: Skip loading state entirely for priority images
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Optimized blur placeholder - smaller SVG for faster parsing
  const blurDataURL = `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="40" height="30" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
    </svg>`
  ).toString("base64")}`;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (event) => {
    // If Cloudflare optimized image fails, try original URL
    if (finalSrc !== src && src && src.includes('imagedelivery.net')) {
      console.log('Cloudflare optimized image failed, trying original URL');
      event.target.src = src;
      return;
    }
    
    setHasError(true);
    setIsLoading(false);
  };

  // Skip intersection observer for priority images
  useEffect(() => {
    if (!priority && loading === "lazy" && imgRef.current && typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: "100px", // Increased preload distance
        }
      );
      observer.observe(imgRef.current);
      return () => observer.disconnect();
    }
  }, [priority, loading]);

  if (hasError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{
          width: fill ? "100%" : width,
          height: fill ? "100%" : height,
          ...style,
        }}
      >
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    );
  }

  // 🚀 OPTIMIZATION: Use preset sizes with enhanced mobile-first approach
  const getOptimizedSizes = (variant) => {
    const presetConfig = IMAGE_OPTIMIZATION_PRESETS[variant];
    if (presetConfig?.sizes) {
      return presetConfig.sizes;
    }
    
    // Enhanced mobile-first responsive sizes (90KiB+ savings)
    const sizeMap = {
      hero: "(max-width: 428px) 428px, (max-width: 768px) 428px, 100vw",
      thumbnail: "(max-width: 428px) 120px, (max-width: 768px) 150px, 200px",
      gallery: "(max-width: 428px) 320px, (max-width: 768px) 428px, 50vw", 
      gallery_large: "(max-width: 428px) 320px, (max-width: 768px) 428px, (max-width: 1200px) 600px, 45vw",
      gallery_small: "(max-width: 428px) 160px, (max-width: 768px) 200px, 25vw",
      fullwidth: "(max-width: 428px) 320px, (max-width: 768px) 428px, 100vw",
      card: "(max-width: 428px) 280px, (max-width: 768px) 350px, 33vw",
      avatar: "(max-width: 428px) 32px, (max-width: 768px) 40px, 60px",
      default: "(max-width: 428px) 320px, (max-width: 768px) 428px, 50vw",
    };
    
    return sizeMap[variant] || sizeMap.default;
  };

  // 🚀 CLOUDFLARE: Direct parameter optimization
  const optimizeImageUrl = (url) => {
    if (!url || typeof url !== 'string') return url;
    
    // Skip if it doesn't look like a Cloudflare image URL
    if (!url.includes('imagedelivery.net')) return url;
    
    try {
      let processedUrl = url.trim();
      
      // Clean up existing formats to base URL
      // Remove /v1/public, /v1, /public, or any existing transformations
      if (processedUrl.includes('/v1/public')) {
        processedUrl = processedUrl.replace('/v1/public', '');
      } else if (processedUrl.endsWith('/v1')) {
        processedUrl = processedUrl.replace('/v1', '');
      } else if (processedUrl.endsWith('/public')) {
        processedUrl = processedUrl.replace('/public', '');
      }
      
      // Remove existing transformations and /public endings
      if (processedUrl.includes('/w=') || processedUrl.includes('/width=')) {
        const parts = processedUrl.split('/');
        const transformIndex = parts.findIndex(part => 
          part.includes('w=') || part.includes('width=') || 
          part.includes('h=') || part.includes('height=') ||
          part.includes('q=') || part.includes('quality=')
        );
        if (transformIndex > -1) {
          // Remove everything from transformation onwards (including /public)
          processedUrl = parts.slice(0, transformIndex).join('/');
        }
      }
      
      // For mobile devices, add responsive optimization
      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        const isMobile = window.innerWidth <= 428;
        const optimalWidth = isMobile ? 428 : 768;
        const optimalHeight = isMobile ? 240 : 400;
        const optimalQuality = priority ? 90 : 85;
        
        processedUrl += `/w=${optimalWidth},h=${optimalHeight},q=${optimalQuality}`;
      }
      
      return processedUrl;
    } catch (error) {
      console.warn('URL optimization failed:', error);
      return url;
    }
  };

  // 🚀 OPTIMIZATION: Use advanced optimization with presets
  let finalSrc = src;
  
  try {
    // Get preset configuration
    const presetConfig = IMAGE_OPTIMIZATION_PRESETS[variant] || IMAGE_OPTIMIZATION_PRESETS.gallery_large;
    
    // First apply advanced URL optimization using imageOptimizer
    const optimizedSrc = generateOptimizedImageUrl(src, {
      width: width || 800,
      height: height || 600,
      quality: priority ? Math.max(presetConfig.quality, 90) : presetConfig.quality,
      format: 'webp'
    });
    
    if (optimizedSrc && optimizedSrc !== src) {
      finalSrc = optimizedSrc;
    } else {
      // Fallback to manual optimization
      const cleanedSrc = optimizeImageUrl(src);
      if (cleanedSrc && cleanedSrc !== src) {
        finalSrc = cleanedSrc;
      }
    }
    
    // Apply mobile-specific optimization for mobile devices
    if (shouldOptimizeForMobile(finalSrc)) {
      const mobileSrc = optimizeImageForMobile(finalSrc, { 
        width: width || 428, 
        height: height || 240, 
        quality: priority ? Math.max(presetConfig.quality, 85) : presetConfig.quality, 
        priority 
      });
      if (mobileSrc && mobileSrc !== finalSrc) {
        finalSrc = mobileSrc;
      }
    }
  } catch (error) {
    console.warn('Image optimization failed, using original src:', error);
    finalSrc = src || "/placeholder.svg";
  }

  // 🚀 CRITICAL: Preload priority images for better performance
  useEffect(() => {
    if (priority && finalSrc && finalSrc !== "/placeholder.svg") {
      preloadCriticalImages([finalSrc], {
        priority: 'high',
        media: typeof window !== 'undefined' && window.innerWidth <= 768 ? 
          '(max-width: 768px)' : '(min-width: 769px)'
      });
    }
  }, [priority, finalSrc]);

  // 🚀 LCP CRITICAL: Remove fade animation for priority images
  const imageClass =
    priority || !isLoading
      ? className
      : `transition-opacity duration-200 opacity-0 ${className}`;

  // 🚀 LCP CRITICAL: Optimize image props with optimized URL
  const imageProps = {
    ref: imgRef,
    src: finalSrc || src || "/placeholder.svg",
    alt: alt || "Image",
    className: imageClass,
    onLoad: handleLoad,
    onError: handleError,
    quality: priority ? Math.min(Math.max(quality, 90), 95) : Math.min(quality, 85), // Higher quality for better UX
    priority,
    loading: priority ? "eager" : loading,
    onClick,
    style,
    // 🚀 CRITICAL: Add fetchPriority for LCP images
    fetchPriority: priority ? fetchPriority || "high" : undefined,
    // 🚀 CRITICAL: Add decoding hint for faster rendering
    decoding: priority ? "sync" : "async",
    ...props,
  };

  // 🚀 LCP CRITICAL: Use empty placeholder for priority images to avoid blur delay
  const placeholderType =
    priority && placeholder === "blur" ? "empty" : placeholder;

  // 🚀 CRITICAL: Use native img tag for Cloudflare Images to avoid CORS issues
  if (src && src.includes('imagedelivery.net')) {
    const nativeImageProps = {
      ref: imgRef,
      src: finalSrc || src || "/placeholder.svg",
      alt: alt || "Image",
      className: imageClass,
      onLoad: handleLoad,
      onError: handleError,
      loading: priority ? "eager" : loading,
      onClick,
      decoding: priority ? "sync" : "async",
      fetchPriority: priority ? fetchPriority || "high" : undefined,
      crossOrigin: "anonymous",
      ...props,
    };
    
    if (fill) {
      return (
        <img
          {...nativeImageProps}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            objectFit: 'cover',
            color: 'transparent',
            ...style,
          }}
        />
      );
    }

    return (
      <img
        {...nativeImageProps}
        width={width}
        height={height}
        style={{
          maxWidth: '100%',
          height: 'auto',
          ...style,
        }}
      />
    );
  }

  // For non-Cloudflare images, use Next.js Image component
  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
        sizes={sizes || getOptimizedSizes(variant)}
        placeholder={placeholderType}
        blurDataURL={placeholderType === "blur" ? blurDataURL : undefined}
      />
    );
  }

  return (
    <Image
      {...imageProps}
      width={width}
      height={height}
      sizes={sizes || getOptimizedSizes(variant)}
      placeholder={placeholderType}
      blurDataURL={placeholderType === "blur" ? blurDataURL : undefined}
    />
  );
};

export default OptimizedImage;

// "use client";

// import Image from "next/image";
// import { useState, useRef, useEffect } from "react";

// const OptimizedImage = ({
//   src,
//   alt,
//   width,
//   height,
//   className = "",
//   priority = false,
//   quality = 75,
//   placeholder = "blur",
//   sizes,
//   fill = false,
//   style = {},
//   onClick,
//   loading = "lazy",
//   variant = "default",

//   ...props
// }) => {
//   const [isLoading, setIsLoading] = useState(!priority); // Don't wait if priority
//   const [hasError, setHasError] = useState(false);
//   const imgRef = useRef(null);

//   const blurDataURL = `data:image/svg+xml;base64,${Buffer.from(
//     `<svg width="${width || 400}" height="${
//       height || 300
//     }" xmlns="http://www.w3.org/2000/svg">
//       <rect width="100%" height="100%" fill="#f3f4f6"/>
//       <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#9ca3af" fontFamily="Arial, sans-serif" fontSize="14">Loading...</text>
//     </svg>`
//   ).toString("base64")}`;

//   const handleLoad = () => {
//     if (!priority) setIsLoading(false);
//   };

//   const handleError = () => {
//     setHasError(true);
//     setIsLoading(false);
//   };

//   // Intersection Observer for lazy loading (skip for priority images)
//   useEffect(() => {
//     if (!priority && loading === "lazy" && imgRef.current) {
//       const observer = new IntersectionObserver(
//         (entries) => {
//           entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//               observer.unobserve(entry.target);
//             }
//           });
//         },
//         {
//           rootMargin: "50px",
//         }
//       );
//       observer.observe(imgRef.current);
//       return () => observer.disconnect();
//     }
//   }, [priority, loading]);

//   if (hasError) {
//     return (
//       <div
//         className={`bg-gray-200 flex items-center justify-center ${className}`}
//         style={{
//           width: fill ? "100%" : width,
//           height: fill ? "100%" : height,
//           ...style,
//         }}
//       >
//         <span className="text-gray-500 text-sm">Image not available</span>
//       </div>
//     );
//   }

//   const imageClass =
//     priority || !isLoading
//       ? className // no fade for priority image
//       : `skeleton ${className}`;

//   const imageProps = {
//     ref: imgRef,
//     src: src || "/placeholder.svg",
//     alt: alt || "Image",
//     className: imageClass,
//     onLoad: handleLoad,
//     onError: handleError,
//     quality,
//     priority,
//     loading: priority ? "eager" : loading,
//     onClick,
//     style,
//     fetchPriority: priority ? "high" : undefined, // LCP fix
//     ...props,
//   };

//   // Define different sizes for different use cases
//   const sizeMap = {
//     thumbnail:
//       "(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw",
//     hero: "100vw", // Always full width
//     fullwidth: "(max-width: 768px) 100vw, 1200px", // Mobile full, desktop fixed
//     default: "(max-width: 768px) 100vw, 50vw", // Fallback
//   };

//   if (fill) {
//     return (
//       <Image
//         {...imageProps}
//         fill
//         sizes={sizeMap[variant] || sizeMap.default}
//         placeholder={placeholder}
//         blurDataURL={blurDataURL}
//       />
//     );
//   }

//   return (
//     <Image
//       {...imageProps}
//       width={width}
//       height={height}
//       sizes={sizeMap[variant] || sizeMap.default}
//       placeholder={placeholder}
//       blurDataURL={blurDataURL}
//     />
//   );
// };

// export default OptimizedImage;
