import { Suspense } from "react";
import dynamic from "next/dynamic";
import { GET_METADATA_BY_CONTENT_NAME } from "@/constant/constants";
import BfCacheOptimizer from "@/components/common/BfCacheOptimizer";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { GoogleAnalytics } from "@next/third-parties/google";

// 🚀 OPTIMIZATION: Simple loading skeleton for Server Component
const SimpleLoadingSkeleton = () => (
  <div
    className="simple-loading"
    style={{
      minHeight: "100vh",
      background: "#fafafa",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    }}
  >
    <div className="header-margin" style={{ height: "80px" }}></div>
    <div
      style={{
        width: "300px",
        height: "40px",
        background: "#e2e8f0",
        borderRadius: "8px",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    ></div>
    <div style={{ marginTop: "20px", color: "#6b7280" }}>Loading...</div>
  </div>
);

// 🚀 CRITICAL: Dynamic import MainHome to reduce initial bundle size
const MainHome = dynamic(() => import("@/components/home/index"), {
  ssr: true,
  loading: SimpleLoadingSkeleton,
});

// 🚀 OPTIMIZATION: Enhanced metadata fetching with better caching and error handling
const fetchMetadata = async () => {
  try {
    const res = await fetch(`${GET_METADATA_BY_CONTENT_NAME}/home`, {
      next: {
        revalidate: 3600, // Cache for 1 hour
        tags: ["home-metadata"],
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
      meta_title:
        data.meta_title ||
        "Dream Tourism SRLS - Your Place for Amazing Travel Adventure",
      meta_description:
        data.meta_description ||
        "Start your dream vacation with Dream Tourism SRLS. Explore fantastic destinations and enjoy unforgettable adventures. Your perfect getaway is just a click away!",
      cloudflare_image:
        data.cloudflare_image ||
        data.image ||
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/5dbac07d-cbd4-4694-9a38-615bf832f800/public",
      keywords:
        data.keywords ||
        "Italy tours, Rome tours, Vatican tours, Tuscany tours, Amalfi Coast, skip-the-line tickets, day trips from Rome, Florence tours, Venice tours",
      ...data,
    };
  } catch (error) {
    console.error("Home metadata fetch error:", error);

    // SEO-optimized fallback
    return {
      meta_title:
        "Dream Tourism SRLS - Your Place for Amazing Travel Adventure | Italy Tours",
      meta_description:
        "Start your dream vacation with Dream Tourism SRLS. Explore fantastic destinations including Rome, Vatican, Tuscany, and Amalfi Coast. Skip-the-line tickets, expert guides, unforgettable adventures. Your perfect Italy getaway is just a click away!",
      cloudflare_image:
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/5dbac07d-cbd4-4694-9a38-615bf832f800/public",
      keywords:
        "Italy tours, Rome tours, Vatican tours, Tuscany tours, Amalfi Coast tours, skip-the-line tickets, day trips from Rome, Florence tours, Venice tours, Pompeii tours, Cinque Terre tours",
    };
  }
};

// 🚀 OPTIMIZATION: Enhanced metadata generation with better SEO
export async function generateMetadata() {
  const metadata = await fetchMetadata();

  return {
    metadataBase: new URL("https://dreamtourism.it"),
    title: metadata.meta_title,
    description: metadata.meta_description,
    keywords: metadata.keywords,

    // Enhanced Open Graph
    openGraph: {
      title: metadata.meta_title,
      description: metadata.meta_description,
      url: "https://dreamtourism.it/",
      siteName: "Dream Tourism SRLS",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: metadata?.cloudflare_image,
          width: 1200, // Proper OG image dimensions
          height: 630,
          alt: metadata?.meta_title,
          type: "image/webp",
        },
      ],
    },

    // Enhanced Twitter Cards
    twitter: {
      card: "summary_large_image",
      title: metadata.meta_title,
      description: metadata.meta_description,
      images: [metadata?.cloudflare_image],
      creator: "@dreamtourismit",
    },

    // SEO Enhancements
    alternates: {
      canonical: "https://dreamtourism.it/",
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

    // Geo metadata
    other: {
      "geo.region": "IT",
      "geo.country": "Italy",
      ICBM: "41.9028, 12.4964", // Rome coordinates
    },
  };
}
export default function Home() {
  return (
    <>
      {/* 🚀 CRITICAL: Inline critical CSS to eliminate render-blocking */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .header-margin{margin-top:80px}
          .hero-skeleton{min-height:500px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}
          .home-loading-skeleton{min-height:100vh;background:#fafafa}
          .d-flex{display:flex}
          .align-items-center{align-items:center}
          .justify-content-center{justify-content:center}
          .text-center{text-align:center}
          .container{max-width:1200px;margin:0 auto;padding:0 15px}
          .btn-primary{background:#007bff;border:1px solid #007bff;color:#fff;padding:10px 20px;border-radius:5px;text-decoration:none;display:inline-block}
          .section-title{font-size:2.5rem;font-weight:700;margin-bottom:1rem}
          .error-fallback{min-height:50vh;display:flex;align-items:center;justify-content:center}
          @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.7}}
          @media(max-width:768px){
            .hero-skeleton{min-height:240px}
            .section-title{font-size:2rem}
            .container{padding:0 10px}
          }
          @media(max-width:576px){
            .hero-skeleton{min-height:350px}
            .section-title{font-size:1.75rem}
          }
        `,
        }}
      />

      {/* 🚀 OPTIMIZATION: BfCache optimization for better performance */}
      <BfCacheOptimizer />

      {/* 🚀 OPTIMIZATION: Error boundary for graceful error handling */}
      <ErrorBoundary
        fallback={
          <div className="error-fallback">
            <div className="container">
              <div className="text-center" style={{ padding: "100px 20px" }}>
                <h1>Something went wrong</h1>
                <p>Please refresh the page or try again later.</p>
                <a
                  href="/"
                  className="btn-primary"
                  style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    textDecoration: "none",
                    backgroundColor: "#3554d1",
                    color: "white",
                    borderRadius: "6px",
                  }}
                >
                  Go Home
                </a>
              </div>
            </div>
          </div>
        }
      >
        {/* 🚀 OPTIMIZATION: Suspense boundary for better loading UX */}
        <Suspense fallback={<SimpleLoadingSkeleton />}>
          <MainHome />
        </Suspense>
      </ErrorBoundary>

      {/* 🚀 OPTIMIZATION: Lazy load Google Analytics */}
      <GoogleAnalytics gaId="G-TXJZSJCPCZ" />
    </>
  );
}

// app/page.jsx
// import { Suspense } from "react";
// import dynamic from "next/dynamic";
// import { GET_METADATA_BY_CONTENT_NAME } from "@/constant/constants";

// // ✅ Dynamic imports with SSR for non-critical sections
// const OptimizedMainHome = dynamic(
//   () => import("@/components/home/OptimizedIndex"),
//   {
//     ssr: true, // Keep SSR for SEO
//     loading: () => (
//       <div className="loading-placeholder">Loading content...</div>
//     ),
//   }
// );

// // ✅ Optimized metadata fetching with caching
// const fetchMetadata = async () => {
//   try {
//     const res = await fetch(`${GET_METADATA_BY_CONTENT_NAME}/home`, {
//       next: { revalidate: 3600 }, // Cache for 1 hour
//     });

//     if (!res.ok) {
//       throw new Error(`Failed to fetch metadata: ${res.status}`);
//     }

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Metadata fetch error:", error);
//     return {
//       meta_title:
//         "Dream Tourism SRLS - Your Place for Amazing Travel Adventure",
//       meta_description:
//         "Start your dream vacation with Dream Tourism SRLS. Explore fantastic destinations and enjoy unforgettable adventures. Your perfect getaway is just a click away!",
//       cloudflare_image:
//         "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/5dbac07d-cbd4-4694-9a38-615bf832f800/public",
//     };
//   }
// };

// // ✅ Enhanced metadata with better SEO
// export async function generateMetadata() {
//   const metadata = await fetchMetadata();

//   return {
//     title: metadata.meta_title,
//     description: metadata.meta_description,
//     keywords:
//       "Italy tours, Rome tours, Vatican tours, Tuscany tours, Amalfi Coast, skip-the-line tickets, day trips from Rome",
//     openGraph: {
//       title: metadata.meta_title,
//       description: metadata.meta_description,
//       images: [
//         {
//           url: metadata?.cloudflare_image,
//           width: 1200, // ✅ Proper OG image dimensions
//           height: 630,
//           alt: metadata?.meta_title,
//         },
//       ],
//       type: "website",
//       siteName: "Dream Tourism SRLS",
//       locale: "en_US",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: metadata.meta_title,
//       description: metadata.meta_description,
//       images: [metadata?.cloudflare_image],
//     },
//     alternates: {
//       canonical: "https://dreamtourism.it/",
//     },
//     robots: {
//       index: true,
//       follow: true,
//       googleBot: {
//         index: true,
//         follow: true,
//         "max-video-preview": -1,
//         "max-image-preview": "large",
//         "max-snippet": -1,
//       },
//     },
//   };
// }

// export default function Home() {
//   return (
//     <>
//       {/* ✅ Main content with Suspense for better loading */}
//       <Suspense
//         fallback={
//           <div className="home-loading">
//             <div className="header-margin"></div>
//             <div className="hero-placeholder">Loading amazing tours...</div>
//           </div>
//         }
//       >
//         <OptimizedMainHome />
//       </Suspense>
//     </>
//   );
// }
