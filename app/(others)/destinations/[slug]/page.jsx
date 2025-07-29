import React from "react";
import {
  BLOG_CATEGORIES,
  GET_ALL_COUNTRIES,
  GET_CMS_BLOG_BY_TITLE,
  GET_CONTENT_BY_MENU_NAME,
  GET_IMAGE_BY_MENU_NAME,
  GET_METADATA_BY_CONTENT_NAME,
} from "@/constant/constants";
import { dataFetcher } from "@/utils/dataFetcher";

import DestinationSinglePage from "@/components/destinations/destinationSinglePage/DestinationSinglePage";
import notFound from "@/app/not-found";

export async function generateMetadata({ params }) {
  const { slug } = params;

  const [destinationData] = await Promise.all([
    dataFetcher(`${GET_METADATA_BY_CONTENT_NAME}/${slug}`),
  ]);

  if (destinationData && destinationData.meta_title) {
    return {
      metadataBase: new URL("https://dreamtourism.it"),
      title: destinationData.meta_title,
      description: destinationData.meta_description,
      openGraph: {
        title: destinationData.meta_title,
        description: destinationData.meta_description,
        images: [
          {
            url: destinationData?.cloudflare_image,
            width: 800,
            height: 600,
            alt: destinationData?.meta_title,
          },
        ],
        url: `/${slug}`,
        type: "website",
      },
      twitter: {
        title: destinationData.meta_title,
        description: destinationData.meta_description,
        image: destinationData?.cloudflare_image,
      },
      alternates: {
        canonical: `/${slug}`, // Canonical without query params
      },
      robots: "index, follow", // Allow indexing and following links on destination pages
    };
  }

  return {
    robots: "noindex, nofollow", // Prevent crawling and following on invalid pages
  };
}

const Destinations = async ({ params }) => {
  const { slug } = params;

  // Fetch data in parallel
  const [destinationContent, destinationImages] = await Promise.all([
    dataFetcher(`${GET_CONTENT_BY_MENU_NAME}/${slug}`),
    dataFetcher(`${GET_IMAGE_BY_MENU_NAME}/${slug}`),
  ]);

  // Check if it's a destination page
  if (destinationContent && Object.keys(destinationContent).length > 0) {
    return (
      <>
        <div className="header-margin"></div>
        <DestinationSinglePage
          slug={slug}
          content={destinationContent}
          contentImagesData={destinationImages}
        />
      </>
    );
  }

  return notFound();
};

export default Destinations;
