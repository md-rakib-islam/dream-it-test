// import "../styles/index.scss";
// import { contentFetcher, dataFetcher } from "@/utils/dataFetcher";
// import {
//   BLOG_CATEGORIES,
//   GET_ALL_REVIEWS,
//   GET_CMS_BLOGS,
//   GET_CONTENTS_WITH_URL_BY_MENU_ID,
//   GET_IMAGE_BY_MENU_ID,
//   GET_MENUS_ALL_NESTED,
//   GET_SITESETTINGS,
// } from "@/constant/constants";
// import Header from "@/components/header";
// import Footer from "@/components/footer/default";
// import LayoutProvider from "./LayoutProvider";
// import { GoogleAnalytics } from "@next/third-parties/google";
// import AddBootstrap from "./AddBootstrap";
// import ScrollToTop from "@/components/common/ScrollTop";
// import OrganizationSchema from "./organization-schema";
// import TourProductsSchema from "./tour-products-schema";
// import FAQSchema from "./faq-schema";
// import Script from "next/script";
// import ChatWidget from "@/components/common/ChatWidget";
// import MetaPixel from "@/components/metaPixel/MetaPixel";

// export default async function RootLayout({ children }) {
//   const data = await dataFetcher(GET_MENUS_ALL_NESTED, {
//     next: { tags: ["blog-list"] },
//   });
//   const siteSetting = (
//     await dataFetcher(GET_SITESETTINGS, { next: { tags: ["blog-list"] } })
//   )?.general_settings;
//   const reviewsData = await dataFetcher(GET_ALL_REVIEWS, {
//     next: { tags: ["blog-list"] },
//   });
//   const contentBlogData = await dataFetcher(`${GET_CMS_BLOGS}`, {
//     next: { tags: ["blog-list"] },
//   });
//   const categoryData = await dataFetcher(`${BLOG_CATEGORIES}`, {
//     next: { tags: ["blog-list"] },
//   });
//   const homeId = data?.menus?.find((menu) => menu?.name === "Home")?.id;
//   const tourId = data?.menus?.find((item) => item.name === "Tours")?.id;
//   const destinations = data?.menus?.find(
//     (item) => item.name === "Destinations"
//   )?.children;

//   let tourContent = null,
//     tourImages = [],
//     toursMainData = [],
//     toursFAQ = [],
//     topDestinations = [],
//     imageContentsForTours = {},
//     blogData = { blogs: contentBlogData || [], categories: categoryData };

//   if (tourId) {
//     const contentImages = await contentFetcher(
//       `${GET_IMAGE_BY_MENU_ID}/${tourId}`,
//       { next: { tags: ["blog-list"] } }
//     );
//     imageContentsForTours = contentImages;
//   }

//   if (homeId) {
//     const contentData = await contentFetcher(
//       `${GET_CONTENTS_WITH_URL_BY_MENU_ID}/${homeId}`,
//       {
//         next: { tags: ["blog-list"] },
//       }
//     );
//     const contentImages = await contentFetcher(
//       `${GET_IMAGE_BY_MENU_ID}/${homeId}`,
//       { next: { tags: ["blog-list"] } }
//     );
//     tourContent = contentData;
//     tourImages = contentImages;

//     if (contentData) {
//       const tours = contentData
//         .filter((item) => item.name === "FAQ")
//         .map((tour) => ({
//           description: tour?.description,
//         }));
//       toursFAQ = tours;
//     }

//     if (contentData) {
//       const tours = contentData
//         .filter((item) => item.published !== false)
//         .map((tour) => ({
//           id: tour.id,
//           tag: "",
//           slideImg: [`${contentImages?.content_images[tour.name]}`],
//           title: tour.name,
//           location: tour?.location,
//           duration: tour?.duration,
//           numberOfReviews: tour?.reviews ?? "0",
//           trip_url: tour?.trip_url,
//           slug: tour?.slug,
//           price: tour?.price,
//           tourType: "Full-day Tours",
//           delayAnimation: "100",
//           position: tour?.position,
//         }));

//       tours.sort((a, b) => a.position - b.position);
//       toursMainData = tours;
//     }

//     if (destinations) {
//       topDestinations = destinations.map((item) => ({
//         id: item.id,
//         colClass: "col-xl-auto col-md-4 col-sm-6",
//         img: `${contentImages?.content_images[item?.name]}`,
//         name: item.name,
//         numberOfProperties: "1714",
//         delayAnimation: "200",
//       }));
//     }
//   }

//   const siteData = {
//     menus: data?.menus,
//     logo: siteSetting,
//     toursMainData,
//     toursFAQ,
//     topDestinations,
//     reviewsData,
//     blogs: blogData,
//     imageContentsForTours,
//   };

//   return (
//     <html lang="en">
//       <head>
//         <link rel="preconnect" href="https://imagedelivery.net" crossorigin />

//         <link
//           rel="preload"
//           as="image"
//           href="https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/05544d7c-e074-4142-d37d-6965369ad600/public"
//           fetchPriority="high"
//         />
//         {/* Preconnect to external domains for faster loading */}
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link
//           rel="preconnect"
//           href="https://fonts.gstatic.com"
//           crossOrigin="true"
//         />
//         <link rel="preconnect" href="https://www.googletagmanager.com" />
//         <link rel="preconnect" href="https://connect.facebook.net" />
//         <link rel="preconnect" href="https://www.clarity.ms" />

//         {/* DNS prefetch for other domains */}
//         <link rel="dns-prefetch" href="https://imagedelivery.net" />

//         {/* Google Site Verification */}
//         <meta
//           name="google-site-verification"
//           content="VfIPoE7rawdeEL2yng_KgkSMWi1LPMPxB1-KgFVutIA"
//         />

//         {/* Optimized font loading with font-display: swap */}
//         <link
//           href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
//           rel="stylesheet"
//           media="print"
//           onLoad="this.media='all'"
//         />
//         <noscript>
//           <link
//             href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
//             rel="stylesheet"
//           />
//         </noscript>

//         <link
//           href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
//           rel="stylesheet"
//           media="print"
//           onLoad="this.media='all'"
//         />
//         <noscript>
//           <link
//             href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
//             rel="stylesheet"
//           />
//         </noscript>

//         <link
//           href="https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,100..900;1,100..900&display=swap"
//           rel="stylesheet"
//           media="print"
//           onLoad="this.media='all'"
//         />
//         <noscript>
//           <link
//             href="https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,100..900;1,100..900&display=swap"
//             rel="stylesheet"
//           />
//         </noscript>

//         {/* Preload critical resources */}
//         <link
//           rel="preload"
//           href="/sass/main.scss"
//           as="style"
//           onLoad="this.onload=null;this.rel='stylesheet'"
//         />

//         {/* Structured Data - moved to head for better SEO */}
//         <OrganizationSchema />
//         <TourProductsSchema />
//         <FAQSchema />
//       </head>
//       <body>
//         {/* Critical above-the-fold content */}
//         <AddBootstrap />
//         <main>
//           <LayoutProvider data={siteData}>
//             <Header />
//             {children}
//             <ScrollToTop />
//             <Footer />
//           </LayoutProvider>
//         </main>

//         {/* Non-critical scripts loaded after page load */}
//         <Script
//           src="https://www.googletagmanager.com/gtag/js?id=G-TXJZSJCPCZ"
//           strategy="afterInteractive"
//         />
//         <Script id="google-analytics" strategy="afterInteractive">
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', 'G-TXJZSJCPCZ', {
//               page_title: document.title,
//               page_location: window.location.href
//             });
//           `}
//         </Script>

//         {/* Google Tag Manager */}
//         <Script id="google-tag-manager" strategy="afterInteractive">
//           {`
//             (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//             new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//             j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//             'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
//             })(window,document,'script','dataLayer','AW-16851202879');
//           `}
//         </Script>

//         {/* Microsoft Clarity */}
//         <Script id="microsoft-clarity" strategy="lazyOnload">
//           {`
//             (function(c,l,a,r,i,t,y){
//                 c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
//                 t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
//                 y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
//             })(window, document, "clarity", "script", "r1wiwwxv9l");
//           `}
//         </Script>

//         {/* Facebook Meta Pixel */}
//         <Script id="meta-pixel" strategy="lazyOnload">
//           {`
//           !function(f,b,e,v,n,t,s)
//           {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
//           n.callMethod.apply(n,arguments):n.queue.push(arguments)};
//           if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
//           n.queue=[];t=b.createElement(e);t.async=!0;
//           t.src=v;s=b.getElementsByTagName(e)[0];
//           s.parentNode.insertBefore(t,s)}(window, document,'script',
//           'https://connect.facebook.net/en_US/fbevents.js');

//           fbq('init', '551593183083152');
//           fbq('init', '1943853973058055');
//           fbq('track', 'PageView');
//         `}
//         </Script>

//         {/* Non-critical components loaded after main content */}
//         <MetaPixel />
//         <ChatWidget />
//         <GoogleAnalytics gaId="G-TXJZSJCPCZ" />

//         {/* Facebook Pixel (noscript) */}
//         <noscript>
//           <img
//             height="1"
//             width="1"
//             style={{ display: "none" }}
//             src="https://www.facebook.com/tr?id=551593183083152&ev=PageView&noscript=1"
//             alt="fb-pixel-1"
//           />
//           <img
//             height="1"
//             width="1"
//             style={{ display: "none" }}
//             src="https://www.facebook.com/tr?id=1943853973058055&ev=PageView&noscript=1"
//             alt="fb-pixel-2"
//           />
//         </noscript>

//         {/* Google Tag Manager (noscript) */}
//         <noscript>
//           <iframe
//             src="https://www.googletagmanager.com/ns.html?id=AW-16851202879"
//             height="0"
//             width="0"
//             style={{ display: "none", visibility: "hidden" }}
//           ></iframe>
//         </noscript>
//       </body>
//     </html>
//   );
// }

import "../styles/index.scss";
import { contentFetcher, dataFetcher } from "@/utils/dataFetcher";
import {
  BLOG_CATEGORIES,
  GET_ALL_REVIEWS,
  GET_CMS_BLOGS,
  GET_CONTENTS_WITH_URL_BY_MENU_ID,
  GET_IMAGE_BY_MENU_ID,
  GET_MENUS_ALL_NESTED,
  GET_SITESETTINGS,
} from "@/constant/constants";
import Header from "@/components/header";
import Footer from "@/components/footer/default";
import LayoutProvider from "./LayoutProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import AddBootstrap from "./AddBootstrap";
import ScrollToTop from "@/components/common/ScrollTop";
import OrganizationSchema from "./organization-schema";
import TourProductsSchema from "./tour-products-schema";
import FAQSchema from "./faq-schema";
import Script from "next/script";
import ChatWidget from "@/components/common/ChatWidget";
import MetaPixel from "@/components/metaPixel/MetaPixel";
import {
  processToursDataMemo,
  processFAQDataMemo,
  processDestinationsDataMemo,
  createMenuMapMemo,
  batchProcessDataMemo,
  clearProcessingCache,
} from "@/utils/dataProcessing";

// Error boundary component for better error handling
const ErrorFallback = ({ error, resetError }) => (
  <html lang="en">
    <head>
      <title>Error - Dream Tourism</title>
      <meta name="robots" content="noindex" />
    </head>
    <body>
      <main style={{ padding: "20px", textAlign: "center" }}>
        <h1>Something went wrong</h1>
        <p>
          We're experiencing technical difficulties. Please try again later.
        </p>
        <button
          onClick={resetError}
          style={{ padding: "10px 20px", marginTop: "10px" }}
        >
          Try again
        </button>
      </main>
    </body>
  </html>
);

// Optimized data fetching with proper error handling
const fetchDataWithFallback = async (fetchFn, fallback = null) => {
  try {
    return await fetchFn();
  } catch (error) {
    console.error("Data fetch error:", error);
    return fallback;
  }
};

export default async function RootLayout({ children }) {
  try {
    // Parallel data fetching with optimized cache tags and revalidation
    const [
      menusData,
      siteSettingsData,
      reviewsData,
      contentBlogData,
      categoryData,
    ] = await Promise.allSettled([
      fetchDataWithFallback(
        () =>
          dataFetcher(GET_MENUS_ALL_NESTED, {
            next: { tags: ["blog-list"], revalidate: 3600 },
          }),
        { menus: [] }
      ),
      fetchDataWithFallback(
        () =>
          dataFetcher(GET_SITESETTINGS, {
            next: { tags: ["blog-list"], revalidate: 3600 },
          }),
        { general_settings: null }
      ),
      fetchDataWithFallback(
        () =>
          dataFetcher(GET_ALL_REVIEWS, {
            next: { tags: ["blog-list"], revalidate: 1800 },
          }),
        []
      ),
      fetchDataWithFallback(
        () =>
          dataFetcher(GET_CMS_BLOGS, {
            next: { tags: ["blog-list"], revalidate: 900 },
          }),
        []
      ),
      fetchDataWithFallback(
        () =>
          dataFetcher(BLOG_CATEGORIES, {
            next: { tags: ["blog-list"], revalidate: 3600 },
          }),
        []
      ),
    ]);
    // Extract data from Promise.allSettled results
    const extractData = (result) =>
      result.status === "fulfilled" ? result.value : null;

    const menus = extractData(menusData)?.menus || [];
    const siteSetting = extractData(siteSettingsData)?.general_settings;
    const reviews = extractData(reviewsData) || [];
    const blogs = extractData(contentBlogData) || [];
    const categories = extractData(categoryData) || [];

    // Early return with minimal layout if no menus data
    if (!menus.length) {
      return (
        <html lang="en">
          <head>
            <title>Loading - Dream Tourism</title>
            <meta name="robots" content="noindex" />
          </head>
          <body>
            <main style={{ padding: "20px", textAlign: "center" }}>
              <div>Loading...</div>
            </main>
          </body>
        </html>
      );
    }

    // Use memoized menu map for better performance
    const menuMap = createMenuMapMemo(menus);
    const homeId = menuMap.get("Home")?.id;
    const tourId = menuMap.get("Tours")?.id;
    const destinations = menuMap.get("Destinations")?.children;

    // Initialize data containers
    let tourContent = null;
    let tourImages = [];
    let toursMainData = [];
    let toursFAQ = [];
    let topDestinations = [];
    let imageContentsForTours = {};

    const blogData = {
      blogs: blogs || [],
      categories: categories || [],
    };

    // Conditional parallel fetching with better error handling
    const fetchPromises = [];

    if (tourId) {
      fetchPromises.push(
        fetchDataWithFallback(
          () =>
            contentFetcher(`${GET_IMAGE_BY_MENU_ID}/${tourId}`, {
              next: { tags: ["tour-images"], revalidate: 1800 },
            }),
          {}
        ).then((data) => ({ type: "tourImages", data }))
      );
    }

    if (homeId) {
      fetchPromises.push(
        fetchDataWithFallback(
          () =>
            contentFetcher(`${GET_CONTENTS_WITH_URL_BY_MENU_ID}/${homeId}`, {
              next: { tags: ["home-content"], revalidate: 1800 },
            }),
          []
        ).then((data) => ({ type: "homeContent", data })),

        fetchDataWithFallback(
          () =>
            contentFetcher(`${GET_IMAGE_BY_MENU_ID}/${homeId}`, {
              next: { tags: ["home-images"], revalidate: 1800 },
            }),
          {}
        ).then((data) => ({ type: "homeImages", data }))
      );
    }

    // Execute all fetches in parallel with proper error handling
    if (fetchPromises.length > 0) {
      const results = await Promise.allSettled(fetchPromises);

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          const { type, data } = result.value;
          switch (type) {
            case "tourImages":
              imageContentsForTours = data || {};
              break;
            case "homeContent":
              tourContent = data || [];
              break;
            case "homeImages":
              tourImages = data || {};
              break;
          }
        }
      });
    }

    // Use memoized batch processing for better performance
    if (tourContent && tourImages) {
      try {
        const processedData = batchProcessDataMemo(
          tourContent,
          tourImages,
          destinations
        );
        toursFAQ = processedData.faq;
        toursMainData = processedData.tours;
        topDestinations = processedData.destinations;
      } catch (error) {
        console.error("Error processing data:", error);
        // Fallback to individual processing
        toursFAQ = processFAQDataMemo(tourContent);
        toursMainData = processToursDataMemo(tourContent, tourImages);
        topDestinations = processDestinationsDataMemo(destinations, tourImages);
      }
    }

    const siteData = {
      menus,
      logo: siteSetting,
      toursMainData,
      toursFAQ,
      topDestinations,
      reviewsData: reviews,
      blogs: blogData,
      imageContentsForTours,
    };

    return (
      <html lang="en">
        <head>
          {/* Critical resource hints */}
          <link
            rel="preconnect"
            href="https://imagedelivery.net"
            crossOrigin=""
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          <link rel="dns-prefetch" href="https://connect.facebook.net" />
          <link rel="dns-prefetch" href="https://www.clarity.ms" />

          {/* Critical image preload */}
          <link
            rel="preload"
            as="image"
            href="https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/05544d7c-e074-4142-d37d-6965369ad600/public"
            fetchPriority="high"
          />

          {/* Google Site Verification */}
          <meta
            name="google-site-verification"
            content="VfIPoE7rawdeEL2yng_KgkSMWi1LPMPxB1-KgFVutIA"
          />

          {/* Optimized font loading - combined into single request */}
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Rubik:ital,wght@0,300..900;1,300..900&family=Libre+Franklin:ital,wght@0,100..900;1,100..900&display=swap"
            rel="stylesheet"
            media="print"
            // onLoad="this.media='all'"
          />
          <noscript>
            <link
              href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Rubik:ital,wght@0,300..900;1,300..900&family=Libre+Franklin:ital,wght@0,100..900;1,100..900&display=swap"
              rel="stylesheet"
            />
          </noscript>

          {/* Structured Data */}
          <OrganizationSchema />
          <TourProductsSchema />
          <FAQSchema />
        </head>
        <body>
          <AddBootstrap />
          <main>
            <LayoutProvider data={siteData}>
              <Header />
              {children}
              <ScrollToTop />
              <Footer />
            </LayoutProvider>
          </main>

          {/* Optimized script loading */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-TXJZSJCPCZ"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TXJZSJCPCZ', {
                page_title: document.title,
                page_location: window.location.href
              });
            `}
          </Script>

          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','AW-16851202879');
            `}
          </Script>

          {/* Lazy load non-critical scripts */}
          <Script id="microsoft-clarity" strategy="lazyOnload">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "r1wiwwxv9l");
            `}
          </Script>

          <Script id="meta-pixel" strategy="lazyOnload">
            {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '551593183083152');
            fbq('init', '1943853973058055');
            fbq('track', 'PageView');
          `}
          </Script>

          {/* Lazy load components */}
          <MetaPixel />
          <ChatWidget />
          <GoogleAnalytics gaId="G-TXJZSJCPCZ" />

          {/* Noscript fallbacks */}
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=551593183083152&ev=PageView&noscript=1"
              alt="fb-pixel-1"
            />
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=1943853973058055&ev=PageView&noscript=1"
              alt="fb-pixel-2"
            />
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=AW-16851202879"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        </body>
      </html>
    );
  } catch (error) {
    console.error("Critical layout error:", error);

    // Clear cache on critical errors to prevent stale data
    clearProcessingCache();

    return (
      <html lang="en">
        <head>
          <title>Error - Dream Tourism</title>
          <meta name="robots" content="noindex" />
        </head>
        <body>
          <main style={{ padding: "20px", textAlign: "center" }}>
            <h1>Something went wrong</h1>
            <p>
              We're experiencing technical difficulties. Please try again later.
            </p>
            <details style={{ marginTop: "20px", textAlign: "left" }}>
              <summary>Technical Details</summary>
              <pre
                style={{
                  background: "#f5f5f5",
                  padding: "10px",
                  overflow: "auto",
                }}
              >
                {error.message}
              </pre>
            </details>
          </main>
        </body>
      </html>
    );
  }
}
