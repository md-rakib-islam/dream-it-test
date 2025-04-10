import "../styles/index.scss";
import { contentFetcher, dataFetcher } from "@/utils/dataFetcher";
import {
  BLOG_CATEGORIES,
  GET_ALL_REVIEWS,
  GET_CMS_BLOGS,
  GET_CONTENTS_WITH_URL_BY_MENU_ID,
  GET_IMAGE_BY_MENU_ID,
  GET_MENUS_ALL_NESTED,
  GET_METADATA_BY_CONTENT_NAME,
  GET_SITESETTINGS,
} from "@/constant/constants";
import Header from "@/components/header";
import Footer from "@/components/footer/default";
import LayoutProvider from "./LayoutProvider";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { GoogleAnalytics } from "@next/third-parties/google";
import AddBootstrap from "./AddBootstrap";
import ScrollToTop from "@/components/common/ScrollTop";
import OrganizationSchema from "./organization-schema";
import TourProductsSchema from "./tour-products-schema";
import FAQSchema from "./faq-schema";

export default async function RootLayout({ children }) {
  const data = await dataFetcher(GET_MENUS_ALL_NESTED);
  const siteSetting = (await dataFetcher(GET_SITESETTINGS))?.general_settings;
  const reviewsData = await dataFetcher(GET_ALL_REVIEWS);
  const contentBlogData = await dataFetcher(`${GET_CMS_BLOGS}`);
  const categoryData = await dataFetcher(`${BLOG_CATEGORIES}`);
  const homeId = data?.menus?.find((menu) => menu?.name === "Home")?.id;
  const tourId = data?.menus?.find((item) => item.name === "Tours")?.id;
  const destinations = data?.menus?.find(
    (item) => item.name === "Destinations"
  )?.children;

  let tourContent = null,
    tourImages = [],
    toursMainData = [],
    topDestinations = [],
    imageContentsForTours = {},
    blogData = { blogs: contentBlogData || [], categories: categoryData };

  if (tourId) {
    const contentImages = await contentFetcher(
      `${GET_IMAGE_BY_MENU_ID}/${tourId}`
    );

    imageContentsForTours = contentImages;
  }
  if (homeId) {
    const contentData = await contentFetcher(
      `${GET_CONTENTS_WITH_URL_BY_MENU_ID}/${homeId}`
    );
    const contentImages = await contentFetcher(
      `${GET_IMAGE_BY_MENU_ID}/${homeId}`
    );

    tourContent = contentData;
    tourImages = contentImages;

    if (contentData) {
      //for tours
      let tours = contentData
        .filter((item) => {
          if (item.published == false) return false;
          return true;
        })
        .map((tour) => ({
          id: tour.id,
          tag: "",
          slideImg: [`${contentImages?.content_images[tour.name]}`],
          title: tour.name,
          location: tour?.location,
          duration: tour?.duration,
          numberOfReviews: tour?.reviews ? tour?.reviews : "0",
          trip_url: tour?.trip_url,
          slug: tour?.slug,
          price: tour?.price,
          tourType: "Full-day Tours",
          delayAnimation: "100",
          position: tour?.position,
        }));

      tours?.sort((a, b) => a?.position - b?.position);
      toursMainData = tours;
      // top destinations
    }
    if (destinations) {
      topDestinations = destinations?.map((item, indx) => ({
        id: item.id,
        colClass: "col-xl-auto col-md-4 col-sm-6",
        img: `${contentImages?.content_images[item?.name]}`,
        name: item.name,
        numberOfProperties: "1714",
        delayAnimation: "200",
      }));
    }
  }

  const siteData = {
    menus: data?.menus,
    logo: siteSetting,
    toursMainData: toursMainData,
    topDestinations: topDestinations,
    reviewsData: reviewsData,
    blogs: blogData,
    imageContentsForTours: imageContentsForTours,
  };

  return (
    <html lang="en">
      <head>
        {/* google search console */}
        <meta
          name="google-site-verification"
          content="VfIPoE7rawdeEL2yng_KgkSMWi1LPMPxB1-KgFVutIA"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        ></link>

        {/* Google Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-TXJZSJCPCZ');
              `,
          }}
        ></script>

        {/* Google Tag Manager */}
        <script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-THMNLX34');
          `,
          }}
        />
        {/* End Google Tag Manager */}
        <OrganizationSchema />
        <TourProductsSchema />
        <FAQSchema />

        {/* end*/}
      </head>
      <body>
        <AddBootstrap />
        <main>
          <LayoutProvider data={siteData}>
            <Header />
            {children}
            <ScrollToTop />

            <Footer />
            <GoogleAnalytics gaId="G-TXJZSJCPCZ" />
            {/* Google Tag Manager (noscript) */}
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-THMNLX34"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              }}
            />
            {/* End Google Tag Manager (noscript) */}
          </LayoutProvider>
        </main>
      </body>
    </html>
  );
}
