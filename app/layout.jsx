import { Geist, Geist_Mono } from "next/font/google";
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

if (typeof window !== "undefined") {
  import("bootstrap/dist/js/bootstrap").then((bootstrap) => {});
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  };
}

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="canonical" href="https://dreamtourism.it" />

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
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LayoutProvider data={siteData}>
          <Header />
          <main>{children}</main>
          <Footer />
        </LayoutProvider>
      </body>
    </html>
  );
}
