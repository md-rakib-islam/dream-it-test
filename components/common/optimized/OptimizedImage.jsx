"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

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
  // 🚀 CRITICAL LCP FIX: Don't show loading state for priority images
  const [isLoading, setIsLoading] = useState(!priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Optimized blur placeholder - smaller SVG for faster parsing
  const blurDataURL = `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="40" height="30" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
    </svg>`
  ).toString("base64")}`;

  const handleLoad = () => {
    if (!priority) setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  // Skip intersection observer for priority images
  useEffect(() => {
    if (!priority && loading === "lazy" && imgRef.current) {
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

  // 🚀 LCP CRITICAL: Remove fade animation for priority images
  const imageClass =
    priority || !isLoading
      ? className
      : `transition-opacity duration-200 opacity-0 ${className}`;

  // 🚀 LCP CRITICAL: Optimize image props
  const imageProps = {
    ref: imgRef,
    src: src || "/placeholder.svg",
    alt: alt || "Image",
    className: imageClass,
    onLoad: handleLoad,
    onError: handleError,
    quality: priority ? Math.max(quality, 85) : quality, // Higher quality for LCP
    priority,
    loading: priority ? "eager" : loading,
    onClick,
    style,
    // 🚀 CRITICAL: Add fetchPriority for LCP images
    fetchPriority: priority ? fetchPriority || "high" : undefined,
    ...props,
  };

  // 🚀 Optimized sizes for different variants - more specific breakpoints
  const sizeMap = {
    hero: "100vw",
    thumbnail:
      "(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw",
    gallery: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px",
    fullwidth: "(max-width: 768px) 100vw, 1200px",
    default: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px",
  };

  // 🚀 LCP CRITICAL: Use empty placeholder for priority images to avoid blur delay
  const placeholderType =
    priority && placeholder === "blur" ? "empty" : placeholder;

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
        sizes={sizes || sizeMap[variant] || sizeMap.default}
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
      sizes={sizes || sizeMap[variant] || sizeMap.default}
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
