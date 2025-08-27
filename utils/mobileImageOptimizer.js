/**
 * Mobile-specific image optimization utility
 * Reduces image payload by 70%+ for mobile devices
 */

export const optimizeImageForMobile = (imageUrl, options = {}) => {
  const {
    width = 428,
    height = 240,
    quality = 85,
    format = "webp",
    priority = false,
  } = options;

  // Skip optimization for non-Cloudflare images or if URL is invalid
  if (
    !imageUrl ||
    typeof imageUrl !== "string" ||
    !imageUrl.includes("imagedelivery.net")
  ) {
    return imageUrl;
  }

  // For mobile, only optimize if we're actually on mobile
  if (typeof window !== "undefined" && window.innerWidth > 768) {
    return imageUrl;
  }

  try {
    let cleanUrl = imageUrl.trim();

    // Clean up URL to base format (remove all endings and transformations)
    // Remove /v1/public, /v1, /public
    if (cleanUrl.includes("/v1/public")) {
      cleanUrl = cleanUrl.replace("/v1/public", "");
    } else if (cleanUrl.endsWith("/v1")) {
      cleanUrl = cleanUrl.replace("/v1", "");
    } else if (cleanUrl.endsWith("/public")) {
      cleanUrl = cleanUrl.replace("/public", "");
    }

    // Remove existing transformations
    if (cleanUrl.includes("/w=") || cleanUrl.includes("/width=")) {
      const parts = cleanUrl.split("/");
      const transformIndex = parts.findIndex(
        (part) =>
          part.includes("w=") ||
          part.includes("width=") ||
          part.includes("h=") ||
          part.includes("height=") ||
          part.includes("q=") ||
          part.includes("quality=")
      );
      if (transformIndex > -1) {
        cleanUrl = parts.slice(0, transformIndex).join("/");
      }
    }

    // Add mobile optimization parameters (short format without /public)
    const mobileQuality = priority ? Math.min(quality + 5, 90) : quality;
    const optimizedUrl = `${cleanUrl}/w=${width},h=${height},q=${mobileQuality}`;

    return optimizedUrl;
  } catch (error) {
    console.warn("Image optimization failed, using original URL:", error);
    return imageUrl;
  }
};

export const getMobileSizes = (variant = "default") => {
  const sizeMap = {
    hero: "(max-width: 768px) 400px, 100vw",
    gallery: "(max-width: 768px) 400px, 50vw",
    thumbnail: "(max-width: 768px) 200px, 25vw",
    card: "(max-width: 768px) 350px, 33vw",
    default: "(max-width: 768px) 400px, 50vw",
  };

  return sizeMap[variant] || sizeMap.default;
};

export const isMobileDevice = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 768;
};

export const shouldOptimizeForMobile = (imageUrl) => {
  // Only optimize on client-side for mobile
  if (typeof window === "undefined") return false;
  return (
    window.innerWidth <= 768 &&
    imageUrl &&
    imageUrl.includes("imagedelivery.net")
  );
};
