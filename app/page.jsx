import MainHome from "@/components/home/index";
import { GET_METADATA_BY_CONTENT_NAME } from "@/constant/constants";
import { GoogleAnalytics } from "@next/third-parties/google";
import Head from "next/head";

const fetchMetadata = async () => {
  try {
    const res = await fetch(`${GET_METADATA_BY_CONTENT_NAME}/home`);
    if (!res.ok) {
      throw new Error("Failed to fetch metadata");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    return {
      meta_title:
        "Dream Tourism SRLS - Your Place for Amazing Travel Adventure",
      meta_description:
        "Start your dream vacation with Dream Tourism SRLS. Explore fantastic destinations and enjoy unforgettable adventures. Your perfect getaway is just a click away!",
      image:
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/5dbac07d-cbd4-4694-9a38-615bf832f800/public", // Default image
    };
  }
};

// Define the generateMetadata function
export async function generateMetadata() {
  const metadata = await fetchMetadata();
  return {
    title: metadata.meta_title,
    description: metadata.meta_description,
    openGraph: {
      title: metadata.meta_title,
      description: metadata.meta_description,
      images: [
        {
          url: metadata?.cloudflare_image,
          width: 100,
          height: 100,
          alt: metadata?.meta_title,
        },
      ],
      type: "website",
    },
    twitter: {
      title: metadata.meta_title,
      description: metadata.meta_description,
      image: metadata?.cloudflare_image,
    },
    alternates: {
      canonical: `https://dreamtourism.it/`, // Canonical without query params
    },
  };
}
export default function Home() {
  return (
    <div>
      <MainHome />
      <GoogleAnalytics gaId="G-TXJZSJCPCZ" />
    </div>
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
