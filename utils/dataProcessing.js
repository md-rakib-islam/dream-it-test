// utils/dataProcessing.js

// Basic memoization function
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// Advanced memoization with TTL (Time To Live)
const memoizeWithTTL = (fn, ttlMs = 300000) => {
  // 5 minutes default
  const cache = new Map();

  return (...args) => {
    const key = JSON.stringify(args);
    const now = Date.now();

    if (cache.has(key)) {
      const { result, timestamp } = cache.get(key);

      if (now - timestamp < ttlMs) {
        return result;
      } else {
        cache.delete(key);
      }
    }

    const result = fn(...args);
    cache.set(key, { result, timestamp: now });
    return result;
  };
};

// Memoized data processing functions
export const processToursDataMemo = memoize((contentData, contentImages) => {
  if (!contentData || !Array.isArray(contentData)) return [];

  try {
    return contentData
      .filter((item) => item && item.published !== false)
      .map((tour) => ({
        id: tour.id,
        tag: "",
        slideImg: [`${contentImages?.content_images?.[tour.name] || ""}`],
        title: tour.name || "",
        location: tour?.location || "",
        duration: tour?.duration || "",
        numberOfReviews: tour?.reviews ?? "0",
        trip_url: tour?.trip_url || "",
        slug: tour?.slug || "",
        price: tour?.price || "",
        tourType: "Full-day Tours",
        delayAnimation: "100",
        position: tour?.position || 0,
      }))
      .sort((a, b) => (a.position || 0) - (b.position || 0));
  } catch (error) {
    console.error("Error processing tours data:", error);
    return [];
  }
});

export const processFAQDataMemo = memoize((contentData) => {
  if (!contentData || !Array.isArray(contentData)) return [];

  try {
    return contentData
      .filter((item) => item && item.name === "FAQ")
      .map((tour) => ({
        description: tour?.description || "",
      }));
  } catch (error) {
    console.error("Error processing FAQ data:", error);
    return [];
  }
});

export const processDestinationsDataMemo = memoize(
  (destinations, contentImages) => {
    if (!destinations || !Array.isArray(destinations)) return [];

    try {
      return destinations.map((item) => ({
        id: item.id,
        colClass: "col-xl-auto col-md-4 col-sm-6",
        img: `${contentImages?.content_images?.[item?.name] || ""}`,
        name: item.name || "",
        numberOfProperties: "1714",
        delayAnimation: "200",
      }));
    } catch (error) {
      console.error("Error processing destinations data:", error);
      return [];
    }
  }
);

// TTL versions for frequently changing data
export const processToursDataWithTTL = memoizeWithTTL(
  (contentData, contentImages) => {
    return processToursDataMemo.cache
      ? processToursDataMemo(contentData, contentImages)
      : processToursDataMemo(contentData, contentImages);
  },
  600000
); // 10 minutes TTL

export const processFAQDataWithTTL = memoizeWithTTL((contentData) => {
  return processFAQDataMemo.cache
    ? processFAQDataMemo(contentData)
    : processFAQDataMemo(contentData);
}, 600000); // 10 minutes TTL

export const processDestinationsDataWithTTL = memoizeWithTTL(
  (destinations, contentImages) => {
    return processDestinationsDataMemo.cache
      ? processDestinationsDataMemo(destinations, contentImages)
      : processDestinationsDataMemo(destinations, contentImages);
  },
  600000
); // 10 minutes TTL

// Cache management utilities
export const clearProcessingCache = () => {
  try {
    // Clear memoized function caches
    if (processToursDataMemo.cache) processToursDataMemo.cache.clear();
    if (processFAQDataMemo.cache) processFAQDataMemo.cache.clear();
    if (processDestinationsDataMemo.cache)
      processDestinationsDataMemo.cache.clear();
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
};

export const getCacheStats = () => {
  return {
    toursCache: processToursDataMemo.cache?.size || 0,
    faqCache: processFAQDataMemo.cache?.size || 0,
    destinationsCache: processDestinationsDataMemo.cache?.size || 0,
  };
};

// Utility function to create menu map for better performance
export const createMenuMapMemo = memoize((menus) => {
  if (!menus || !Array.isArray(menus)) return new Map();

  try {
    return new Map(menus.map((menu) => [menu.name, menu]));
  } catch (error) {
    console.error("Error creating menu map:", error);
    return new Map();
  }
});

// Batch processing function for multiple data types
export const batchProcessDataMemo = memoize(
  (contentData, contentImages, destinations) => {
    try {
      return {
        tours: processToursDataMemo(contentData, contentImages),
        faq: processFAQDataMemo(contentData),
        destinations: processDestinationsDataMemo(destinations, contentImages),
      };
    } catch (error) {
      console.error("Error in batch processing:", error);
      return {
        tours: [],
        faq: [],
        destinations: [],
      };
    }
  }
);
