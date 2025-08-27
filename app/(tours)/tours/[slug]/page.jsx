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
  const baseUrl = "https://dreamtourism.it";
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
          .gallery-item{position:relative;cursor:pointer;overflow:hidden;contain:layout size style;background-color:#f8f9fa;width:100%;height:100%;border-radius:8px}
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
          .button{display:inline-flex;align-items:center;justify-content:center;padding:12px 24px;border:none;border-radius:6px;text-decoration:none;font-weight:500;cursor:pointer;will-change:transform;transform:translateZ(0)}
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
          .sidebar-container{min-height:300px;contain:layout style}
          .tour-content{contain:layout style;min-height:600px}
          @media(max-width:768px){
            .gallery-grid-container{display:block;height:auto;min-height:240px}
            .mobile-single-image,.mobile-grid-full{width:100%;height:240px;min-height:240px;position:relative;overflow:hidden;border-radius:8px;aspect-ratio:16/9;background-color:#f8f9fa;contain:layout size style}
            .container{padding:0 10px}
            .text-25{font-size:20px}
            .text-30{font-size:24px}
            .w-360{min-width:auto;width:100%}
            .sidebar-container{min-height:300px}
            .button{transform:none;will-change:auto}
          }
        `,
        }}
      />

      {/* 🚀 ULTRA CRITICAL: Resource hints for LCP image domain */}
      <link rel="dns-prefetch" href="https://imagedelivery.net" />
      <link
        rel="preconnect"
        href="https://imagedelivery.net"
        crossOrigin="anonymous"
      />

      {contentData?.slideImg?.[0] && (
        <link
          key="lcp-preload"
          rel="preload"
          as="image"
          href={contentData.slideImg[0]}
          fetchPriority="high"
          crossOrigin="anonymous"
        />
      )}

      {/* 🚀 ULTRA CRITICAL: Immediate LCP image preload - multiple strategies */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function() {
              var lcpImage = ${JSON.stringify(
                contentData?.slideImg?.[0] || null
              )};
              var isMobile = window.innerWidth <= 768;
              
              if (lcpImage && isMobile) {
                // Clean URL to base format
                var optimizedUrl = lcpImage;
                
                // Remove all endings and transformations
                if (lcpImage.includes('/v1/public')) {
                  optimizedUrl = lcpImage.replace('/v1/public', '');
                } else if (lcpImage.endsWith('/v1')) {
                  optimizedUrl = lcpImage.replace('/v1', '');
                } else if (lcpImage.endsWith('/public')) {
                  optimizedUrl = lcpImage.replace('/public', '');
                }
                
                // Remove existing transformations
                if (optimizedUrl.includes('/w=') || optimizedUrl.includes('/width=')) {
                  var parts = optimizedUrl.split('/');
                  var transformIndex = -1;
                  for (var i = 0; i < parts.length; i++) {
                    if (parts[i].includes('w=') || parts[i].includes('width=') || 
                        parts[i].includes('h=') || parts[i].includes('height=') ||
                        parts[i].includes('q=') || parts[i].includes('quality=')) {
                      transformIndex = i;
                      break;
                    }
                  }
                  if (transformIndex > -1) {
                    optimizedUrl = parts.slice(0, transformIndex).join('/');
                  }
                }
                
                // Add mobile optimization for Cloudflare images (short format)
                if (lcpImage.indexOf('imagedelivery.net') > -1) {
                  optimizedUrl += '/w=400,h=240,q=90';
                }
                
                // Preconnect to image domain
                if (!document.querySelector('link[rel="preconnect"][href*="imagedelivery.net"]')) {
                  var preconnect = document.createElement('link');
                  preconnect.rel = 'preconnect';
                  preconnect.href = 'https://imagedelivery.net';
                  preconnect.crossOrigin = 'anonymous';
                  document.head.insertBefore(preconnect, document.head.firstChild);
                }
                
                // Preload LCP image
                var link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = optimizedUrl;
                link.fetchPriority = 'high';
                link.crossOrigin = 'anonymous';
                link.media = '(max-width: 768px)';
                document.head.insertBefore(link, document.head.children[1]);
                
                // Warm up with Image object
                var img = new Image();
                img.fetchPriority = 'high';
                img.loading = 'eager';
                img.decoding = 'sync';
                img.crossOrigin = 'anonymous';
                img.src = optimizedUrl;
              }
            })();
          `,
        }}
      />

      {/* 🚀 CRITICAL: Defer non-critical CSS loading */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // 🚀 CRITICAL: Defer all non-critical resources for mobile
(function() {
              var isMobile = window.innerWidth <= 768;
              
              function optimizeForMobile() {
                if (!isMobile) return;
                
                // Remove unused CSS for mobile
                var unusedPatterns = [
                  /[^}]*:hover[^{]*\{[^}]*\}/gi,
                  /[^}]*animation[^{]*\{[^}]*\}/gi,
                  /[^}]*@keyframes[^{]*\{[^}]*\}/gi,
                  /@media\s*\(min-width:\s*1024px\)[^{]*\{[^}]*\}/gi,
                  /@media\s*\(min-width:\s*1200px\)[^{]*\{[^}]*\}/gi,
                  /\/\*[\s\S]*?\*\//g
                ];
                
                var styles = document.querySelectorAll('style');
                for (var i = 0; i < styles.length; i++) {
                  var style = styles[i];
                  if (style.textContent && !style.id.includes('critical')) {
                    var css = style.textContent;
                    for (var j = 0; j < unusedPatterns.length; j++) {
                      css = css.replace(unusedPatterns[j], '');
                    }
                    // Minify CSS
                    css = css
                      .replace(/\s+/g, ' ')
                      .replace(/;\s*\}/g, '}')
                      .replace(/\s*\{\s*/g, '{')
                      .replace(/\s*\}\s*/g, '}')
                      .trim();
                    style.textContent = css;
                  }
                }
                
                // Defer non-critical stylesheets
                var links = document.querySelectorAll('link[rel="stylesheet"]');
                var nonCriticalFiles = ['bootstrap', 'components', 'slick'];
                
                for (var k = 0; k < links.length; k++) {
                  var link = links[k];
                  var href = link.href || '';
                  var isNonCritical = false;
                  
                  for (var l = 0; l < nonCriticalFiles.length; l++) {
                    if (href.indexOf(nonCriticalFiles[l]) > -1) {
                      isNonCritical = true;
                      break;
                    }
                  }
                  
                  if (isNonCritical) {
                    link.rel = 'preload';
                    link.as = 'style';
                    link.onload = function() {
                      this.rel = 'stylesheet';
                      this.onload = null;
                    };
                  }
                }
              }
              
              // Run optimization
              if (window.requestIdleCallback) {
                window.requestIdleCallback(optimizeForMobile, { timeout: 500 });
              } else {
                setTimeout(optimizeForMobile, isMobile ? 100 : 1000);
              }
            })();
            
            if (window.innerWidth <= 768 && 'serviceWorker' in navigator) {
              navigator.serviceWorker.register('/sw-mobile-cache.js')
                .then(function() { console.log('Mobile SW registered'); })
                .catch(function() {});
            }
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
