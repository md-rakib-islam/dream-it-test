import Wrapper from "@/components/tourLayout/Wrapper";
import TourHeading from "@/components/tours/singleTour/TourHeading";
import TourSingleV1Dynamic from "@/components/tours/singleTour/TourSingle";
import {
  GET_CONTENT_BY_TITLE,
  GET_IMAGE_BY_MENU_ID,
  GET_ITENARIES_BY_CONTENT_ID,
  GET_METADATA_BY_CONTENT_NAME,
} from "@/constant/constants";
// import getAllContentByMenuId from "@/services/contentService";
// import getAllMenuItem from "@/services/menuService";
import { dataFetcher } from "@/utils/dataFetcher";
import Head from "next/head";

const fetchMetadata = async (tourTitle) => {
  try {
    const res = await fetch(`${GET_METADATA_BY_CONTENT_NAME}/${tourTitle}`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch metadata");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    return {
      meta_title: `${tourTitle} by Dream Tourism SRLS`,
      meta_description: `${tourTitle} by Dream Tourism SRLS`,
      meta_image:
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/5dbac07d-cbd4-4694-9a38-615bf832f800/public", // Default image
    };
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

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const metaTitle = slug;
  const metadata = await fetchMetadata(metaTitle);

  if (!metadata) {
    return {
      title: "Tour Not Found",
      description: "The tour you are looking for does not exist.",
    };
  }

  return {
    metadataBase: new URL("https://dreamtourism.it"),
    title: metadata?.meta_title,
    description: metadata?.meta_description,
    openGraph: {
      title: metadata?.meta_title,
      description: metadata?.meta_description,
      images: [
        {
          url: metadata?.cloudflare_image,
          width: 800,
          height: 600,
          alt: metadata?.meta_title,
        },
      ],
      url: `/tours/${slug}`, // Open Graph URL
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata?.meta_title,
      description: metadata?.meta_description,
      image: metadata?.cloudflare_image,
    },
    alternates: {
      canonical: `/tours/${slug}`, // Canonical without query params
    },
    robots: "index, follow", // Allow indexing and following links on destination pages
  };
}

export default async function Tour({ params }) {
  const { slug } = await params;
  const contentData = await dataFetcher(`${GET_CONTENT_BY_TITLE}/${slug}`);
  let itenarayItems = [];
  if (contentData) {
    const getItinerary = await dataFetcher(
      `${GET_ITENARIES_BY_CONTENT_ID}/${contentData.id}`
    );
    itenarayItems = getItinerary;
  }
  const fullUrl = getFullUrl(slug);

  // Fetch metadata
  const metadata = await fetchMetadata(slug);
  return (
    <Wrapper>
      <Head>
        <title>{metadata.meta_title}</title>
        <meta name="description" content={metadata.meta_description} />
        <meta property="og:title" content={metadata.meta_title} />
        <meta property="og:description" content={metadata.meta_description} />
        <meta property="og:image" content={metadata.cloudflare_image} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:type" content="website" />

        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.meta_title} />
        <meta name="twitter:description" content={metadata.meta_description} />
        <meta name="twitter:image" content={metadata.cloudflare_image} />
      </Head>
      <TourSingleV1Dynamic
        itenarayItems={itenarayItems}
        data={contentData}
        fullUrl={fullUrl}
      >
        <TourHeading data={contentData} />
      </TourSingleV1Dynamic>
    </Wrapper>
  );
}
