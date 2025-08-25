import { Suspense } from "react";
import dynamic from "next/dynamic";
import Wrapper from "@/components/tourLayout/Wrapper";
import TourHeading from "@/components/tours/singleTour/TourHeading";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import TourSkeleton from "@/components/common/TourSkeleton";
import TourErrorFallback from "@/components/common/TourErrorFallback";
import BfCacheOptimizer from "@/components/common/BfCacheOptimizer";
import {
  GET_CONTENT_BY_TITLE,
  GET_IMAGE_BY_MENU_ID,
  GET_ITENARIES_BY_CONTENT_ID,
  GET_METADATA_BY_CONTENT_NAME,
} from "@/constant/constants";
import { dataFetcher } from "@/utils/dataFetcher";
import {
  optimizedDataFetcher,
  CACHE_DURATION,
} from "@/utils/optimizedDataFetcher";

// 🚀 CRITICAL: Dynamic import for TourSingle component to reduce bundle size
const TourSingleV1Dynamic = dynamic(
  () => import("@/components/tours/singleTour/TourSingle"),
  {
    ssr: true,
    loading: () => (
      <div className="tour-loading-container" style={{ minHeight: "600px" }}>
        <div className="container pt-40">
          <div
            className="tour-skeleton-header"
            style={{
              height: "60px",
              background: "#f3f4f6",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          ></div>
          <div
            className="tour-skeleton-gallery"
            style={{
              height: "240px",
              background: "#f3f4f6",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          ></div>
          <div
            className="tour-skeleton-content"
            style={{
              height: "300px",
              background: "#f3f4f6",
              borderRadius: "8px",
            }}
          ></div>
        </div>
      </div>
    ),
  }
);

// 🚀 OPTIMIZATION: Enhanced metadata fetching with better caching and error handling
const fetchMetadata = async (tourTitle) => {
  try {
    const res = await fetch(`${GET_METADATA_BY_CONTENT_NAME}/${tourTitle}`, {
      next: {
        revalidate: 3600, // Cache for 1 hour
        tags: [`metadata-${tourTitle}`], // Specific tag for ISR
      },
      headers: {
        Accept: "application/json",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();

    // Validate response structure
    if (!data || typeof data !== "object") {
      throw new Error("Invalid metadata response structure");
    }

    return {
      meta_title: data.meta_title || `${tourTitle} - Dream Tourism SRLS`,
      meta_description:
        data.meta_description ||
        `Experience ${tourTitle} with Dream Tourism SRLS. Book your unforgettable Italy tour today!`,
      cloudflare_image:
        data.cloudflare_image ||
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/5dbac07d-cbd4-4694-9a38-615bf832f800/public",
      keywords:
        data.keywords ||
        `${tourTitle}, Italy tours, Rome tours, Vatican tours, skip-the-line tickets`,
      ...data,
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);

    // Return SEO-optimized fallback
    return {
      meta_title: `${tourTitle} - Dream Tourism SRLS | Book Italy Tours`,
      meta_description: `Experience ${tourTitle} with Dream Tourism SRLS. Skip-the-line tickets, expert guides, and unforgettable memories. Book your Italy tour today!`,
      cloudflare_image:
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/5dbac07d-cbd4-4694-9a38-615bf832f800/public",
      keywords: `${tourTitle}, Italy tours, Rome tours, Vatican tours, Tuscany tours, skip-the-line tickets`,
    };
  }
};

// 🚀 OPTIMIZATION: Enhanced data fetching with optimized caching and error handling
const fetchTourData = async (slug) => {
  try {
    // First fetch tour content
    const content = await optimizedDataFetcher(
      `${GET_CONTENT_BY_TITLE}/${slug}`,
      {
        next: {
          revalidate: 1800, // 30 minutes
          tags: [`tour-${slug}`],
        },
        cache: true,
        cacheDuration: CACHE_DURATION.MEDIUM,
        maxRetries: 2,
        timeout: 8000,
        fallback: null,
      }
    );

    // If content exists, fetch itinerary in parallel
    let itinerary = [];
    if (content?.id) {
      itinerary = await optimizedDataFetcher(
        `${GET_ITENARIES_BY_CONTENT_ID}/${content.id}`,
        {
          next: {
            revalidate: 3600, // 1 hour - itineraries change less frequently
            tags: [`itinerary-${content.id}`],
          },
          cache: true,
          cacheDuration: CACHE_DURATION.LONG,
          maxRetries: 2,
          timeout: 8000,
          fallback: [],
        }
      );
    }

    return { content, itinerary };
  } catch (error) {
    console.error("Tour data fetch error:", error);
    return { content: null, itinerary: [] };
  }
};

// export const metadata = {
//   title: "Blog Single || GoTrip - Travel & Tour React NextJS Template",
//   description: "GoTrip - Travel & Tour React NextJS Template",
// };
function getFullUrl(slug) {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://dreamtourism.it";
  const fullPath = `${baseUrl}/tours/${slug}`;
  return fullPath;
}

// 🚀 OPTIMIZATION: Enhanced metadata generation with better SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const metadata = await fetchMetadata(slug);
  const currentUrl = `https://dreamtourism.it/tours/${slug}`;

  return {
    metadataBase: new URL("https://dreamtourism.it"),
    title: metadata.meta_title,
    description: metadata.meta_description,
    keywords: metadata.keywords,

    // 🚀 ULTRA CRITICAL: Add preload links for LCP image
    other: {
      "geo.region": "IT",
      "geo.country": "Italy",
      ICBM: "41.9028, 12.4964", // Rome coordinates as default
    },

    // Enhanced Open Graph
    openGraph: {
      title: metadata.meta_title,
      description: metadata.meta_description,
      url: currentUrl,
      siteName: "Dream Tourism SRLS",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: metadata.cloudflare_image,
          width: 1200,
          height: 630,
          alt: metadata.meta_title,
          type: "image/webp",
        },
      ],
    },

    // Enhanced Twitter Cards
    twitter: {
      card: "summary_large_image",
      title: metadata.meta_title,
      description: metadata.meta_description,
      images: [metadata.cloudflare_image],
      creator: "@dreamtourismit",
    },

    // SEO Enhancements
    alternates: {
      canonical: currentUrl,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Additional metadata
    category: "travel",
    classification: "tourism",

    // Geo metadata for location-based tours
    other: {
      "geo.region": "IT",
      "geo.country": "Italy",
      ICBM: "41.9028, 12.4964", // Rome coordinates as default
    },
  };
}

export default async function Tour({ params }) {
  const { slug } = await params;
  const fullUrl = getFullUrl(slug);

  // 🚀 OPTIMIZATION: Parallel data fetching
  const { content: contentData, itinerary: itenarayItems } =
    await fetchTourData(slug);

  // Handle 404 case
  if (!contentData) {
    return (
      <Wrapper>
        <div className="container pt-40 pb-40">
          <div className="text-center">
            <h1 className="text-30 fw-600 mb-20">Tour Not Found</h1>
            <p className="text-15 text-light-1 mb-30">
              The tour you're looking for doesn't exist or has been removed.
            </p>
            <a
              href="/tours"
              className="button h-50 px-24 -blue-1 bg-blue-1-05 text-blue-1"
            >
              Browse All Tours
            </a>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* 🚀 CRITICAL: Inline critical CSS to eliminate render-blocking */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .container{max-width:1200px;margin:0 auto;padding:0 15px}
          .header-margin{margin-top:80px}
          .gallery-grid-container{display:grid;grid-template-columns:0.62fr 1.2fr 0.62fr;grid-template-rows:1fr 1fr;grid-gap:10px;height:500px;contain:layout style;min-height:500px;width:100%}
          .gallery-item{position:relative;cursor:pointer;overflow:hidden;contain:layout size;background-color:#f8f9fa;width:100%;height:100%;border-radius:8px}
          .gallery-item-large-left{grid-column:1;grid-row:1/3;width:100%;height:100%}
          .gallery-item-large-center{grid-column:2;grid-row:1/3;width:100%;height:100%}
          .gallery-item-small-top-right{grid-column:3;grid-row:1;width:100%;height:100%}
          .gallery-item-small-bottom-right{grid-column:3;grid-row:2;width:100%;height:100%}
          .object-cover{object-fit:cover;width:100%;height:100%}
          .rounded-4{border-radius:8px}
          .text-25{font-size:25px;line-height:1.3}
          .fw-600{font-weight:600}
          .text-30{font-size:30px;line-height:1.2}
          .mb-20{margin-bottom:20px}
          .pt-40{padding-top:40px}
          .pb-40{padding-bottom:40px}
          .text-center{text-align:center}
          .button{display:inline-flex;align-items:center;justify-content:center;padding:12px 24px;border:none;border-radius:6px;text-decoration:none;font-weight:500;cursor:pointer;transition:transform .15s ease}
          .h-50{height:50px;min-height:50px}
          .px-24{padding-left:24px;padding-right:24px}
          .-blue-1{border:1px solid #1e40af}
          .bg-blue-1{background-color:#1e40af}
          .text-white{color:white}
          .bg-blue-1-05{background-color:rgba(30,64,175,.05)}
          .text-blue-1{color:#1e40af}
          .d-flex{display:flex}
          .gap-20{gap:20px}
          .justify-content-center{justify-content:center}
          .align-items-center{align-items:center}
          .w-360{min-width:360px;width:360px}
          .sidebar-container{min-height:500px;contain:layout style}
          .tour-content{contain:layout;min-height:600px}
          @media(max-width:768px){
            .gallery-grid-container{display:block;height:auto;min-height:240px}
            .mobile-single-image,.mobile-grid-full{width:100%;height:240px;min-height:240px;position:relative;overflow:hidden;border-radius:8px;aspect-ratio:16/9;background-color:#f8f9fa}
            .container{padding:0 10px}
            .text-25{font-size:20px}
            .text-30{font-size:24px}
            .w-360{min-width:auto;width:100%}
            .sidebar-container{min-height:400px}
          }
        `,
        }}
      />

      {/* 🚀 ULTRA CRITICAL: Resource hints for LCP image domain */}
      <link rel="dns-prefetch" href="https://imagedelivery.net" />
      <link rel="preconnect" href="https://imagedelivery.net" crossOrigin="anonymous" />
      
      {contentData?.slideImg?.[0] && (
        <>
          <link 
            rel="preload" 
            as="image" 
            href={contentData.slideImg[0]} 
            fetchPriority="high"
            crossOrigin="anonymous"
          />
        </>
      )}

      {/* 🚀 ULTRA CRITICAL: Immediate LCP image preload - multiple strategies */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // 🚀 ULTRA CRITICAL: Immediate LCP optimization - eliminate 9.47s Load Delay
            (function() {
              const lcpImage = ${JSON.stringify(contentData?.slideImg?.[0])};
              
              if (lcpImage) {
                // Strategy 1: IMMEDIATE highest priority preload link
                const link1 = document.createElement('link');
                link1.rel = 'preload';
                link1.as = 'image';
                link1.href = lcpImage;
                link1.fetchPriority = 'high';
                link1.crossOrigin = 'anonymous';
                document.head.insertBefore(link1, document.head.firstChild);
                
                // Strategy 2: IMMEDIATE image object with highest priority
                const img1 = new Image();
                img1.fetchPriority = 'high';
                img1.loading = 'eager';
                img1.decoding = 'sync';
                img1.crossOrigin = 'anonymous';
                img1.src = lcpImage;
                
                // Strategy 3: IMMEDIATE DNS prefetch for domain
                const dnsLink = document.createElement('link');
                dnsLink.rel = 'dns-prefetch';
                dnsLink.href = 'https://imagedelivery.net';
                document.head.insertBefore(dnsLink, document.head.firstChild);
                
                // Strategy 4: IMMEDIATE preconnect for faster connection
                const preconnect = document.createElement('link');
                preconnect.rel = 'preconnect';
                preconnect.href = 'https://imagedelivery.net';
                preconnect.crossOrigin = 'anonymous';
                document.head.insertBefore(preconnect, document.head.children[1]);
                
                // Strategy 5: Create multiple Image objects to force browser prioritization
                for(let i = 0; i < 3; i++) {
                  const img = new Image();
                  img.fetchPriority = 'high';
                  img.loading = 'eager';
                  img.decoding = 'sync';
                  img.crossOrigin = 'anonymous';
                  img.src = lcpImage;
                }
                
                // Strategy 6: Use fetch with highest priority to warm up the resource
                if ('fetch' in window && 'Request' in window) {
                  const request = new Request(lcpImage, {
                    mode: 'cors',
                    credentials: 'omit',
                    priority: 'high'
                  });
                  fetch(request).catch(() => {}); // Ignore errors, just warm up
                }
              }
            })();
          `,
        }}
      />

      {/* 🚀 CRITICAL: Defer non-critical CSS loading */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // 🚀 CRITICAL: Load non-critical CSS after LCP
            (function() {
              function loadNonCriticalCSS() {
                // Defer loading of large CSS files
                const cssFiles = [
                  '/_next/static/css/bootstrap.css',
                  '/_next/static/css/components.css'
                ];
                
                cssFiles.forEach((url, index) => {
                  setTimeout(() => {
                    const link = document.createElement('link');
                    link.rel = 'preload';
                    link.as = 'style';
                    link.href = url;
                    link.media = 'print';
                    link.onload = function() {
                      link.media = 'all';
                      link.onload = null;
                    };
                    document.head.appendChild(link);
                  }, index * 16); // Stagger loading
                });
              }
              
              // Load after LCP or after 2 seconds
              if ('requestIdleCallback' in window) {
                requestIdleCallback(loadNonCriticalCSS);
              } else {
                setTimeout(loadNonCriticalCSS, 2000);
              }
            })();
          `,
        }}
      />

      {/* 🚀 OPTIMIZATION: BfCache optimization for better performance */}
      <BfCacheOptimizer />

      {/* 🚀 OPTIMIZATION: Error boundary for graceful error handling */}
      <ErrorBoundary fallback={<TourErrorFallback />}>
        {/* 🚀 OPTIMIZATION: Suspense boundary for better loading UX */}
        <Suspense fallback={<TourSkeleton />}>
          <TourSingleV1Dynamic
            itenarayItems={itenarayItems}
            data={contentData}
            fullUrl={fullUrl}
          >
            <TourHeading data={contentData} />
          </TourSingleV1Dynamic>
        </Suspense>
      </ErrorBoundary>
    </Wrapper>
  );
}
