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

  ...props
}) => {
  const [isLoading, setIsLoading] = useState(!priority); // Don't wait if priority
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  const blurDataURL = `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width || 400}" height="${
      height || 300
    }" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#9ca3af" fontFamily="Arial, sans-serif" fontSize="14">Loading...</text>
    </svg>`
  ).toString("base64")}`;

  const handleLoad = () => {
    if (!priority) setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  // Intersection Observer for lazy loading (skip for priority images)
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
          rootMargin: "50px",
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

  const imageClass =
    priority || !isLoading
      ? className // no fade for priority image
      : `transition-opacity duration-300 opacity-0 ${className}`;

  const imageProps = {
    ref: imgRef,
    src: src || "/placeholder.svg",
    alt: alt || "Image",
    className: imageClass,
    onLoad: handleLoad,
    onError: handleError,
    quality,
    priority,
    loading: priority ? "eager" : loading,
    onClick,
    style,
    fetchPriority: priority ? "high" : undefined, // LCP fix
    ...props,
  };

  // Define different sizes for different use cases
  const sizeMap = {
    thumbnail:
      "(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw",
    hero: "100vw", // Always full width
    fullwidth: "(max-width: 768px) 100vw, 1200px", // Mobile full, desktop fixed
    default: "(max-width: 768px) 100vw, 50vw", // Fallback
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
        sizes={sizeMap[variant] || sizeMap.default}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
      />
    );
  }

  return (
    <Image
      {...imageProps}
      width={width}
      height={height}
      sizes={sizeMap[variant] || sizeMap.default}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
    />
  );
};

export default OptimizedImage;

//***** old code */
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
//   ...props
// }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [hasError, setHasError] = useState(false);
//   const imgRef = useRef(null);

//   // Generate blur data URL for placeholder
//   const generateBlurDataURL = (w, h) => {
//     const canvas = document.createElement("canvas");
//     canvas.width = w || 10;
//     canvas.height = h || 10;
//     const ctx = canvas.getContext("2d");
//     ctx.fillStyle = "#f3f4f6";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     return canvas.toDataURL();
//   };

//   const blurDataURL = `data:image/svg+xml;base64,${Buffer.from(
//     `<svg width="${width || 400}" height="${
//       height || 300
//     }" xmlns="http://www.w3.org/2000/svg">
//       <rect width="100%" height="100%" fill="#f3f4f6"/>
//       <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#9ca3af" fontFamily="Arial, sans-serif" fontSize="14">Loading...</text>
//     </svg>`
//   ).toString("base64")}`;

//   const handleLoad = () => {
//     setIsLoading(false);
//   };

//   const handleError = () => {
//     setHasError(true);
//     setIsLoading(false);
//   };

//   // Intersection Observer for lazy loading
//   useEffect(() => {
//     if (!priority && loading === "lazy" && imgRef.current) {
//       const observer = new IntersectionObserver(
//         (entries) => {
//           entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//               // Image is in viewport, start loading
//               observer.unobserve(entry.target);
//             }
//           });
//         },
//         {
//           rootMargin: "50px", // Start loading 50px before image enters viewport
//         }
//       );

//       observer.observe(imgRef.current);

//       return () => {
//         if (imgRef.current) {
//           observer.unobserve(imgRef.current);
//         }
//       };
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

//   const imageProps = {
//     ref: imgRef,
//     src: src || "/placeholder.svg",
//     alt: alt || "Image",
//     className: `transition-opacity duration-300 ${
//       isLoading ? "opacity-0" : "opacity-100"
//     } ${className}`,
//     onLoad: handleLoad,
//     onError: handleError,
//     quality,
//     priority,
//     loading: priority ? "eager" : loading,
//     onClick,
//     style,
//     ...props,
//   };

//   if (fill) {
//     return (
//       <Image
//         {...imageProps}
//         fill
//         sizes={sizes || "100vw"}
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
//       sizes={sizes}
//       placeholder={placeholder}
//       blurDataURL={blurDataURL}
//     />
//   );
// };

// export default OptimizedImage;
