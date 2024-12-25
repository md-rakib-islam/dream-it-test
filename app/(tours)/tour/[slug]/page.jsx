import Wrapper from "@/components/tourLayout/Wrapper";
import TourHeading from "@/components/tours/singleTour/TourHeading";
import TourSingleV1Dynamic from "@/components/tours/singleTour/TourSingle";
import { GET_METADATA_BY_CONTENT_NAME } from "@/constant/constants";
import getAllContentByMenuId from "@/services/contentService";
import getAllMenuItem from "@/services/menuService";
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
function getFullUrl(params) {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://dreamtourism.it";
  const fullPath = `${baseUrl}/tour/${params.name}`;
  return fullPath;
}
export async function generateStaticParams() {
  const data = await getAllMenuItem();
  const homeId = data?.menus?.find((item) => item.name === "Home")?.id;

  const tourContents = await getAllContentByMenuId(homeId);

  const modifiedContents = tourContents?.filter((item) => {
    if (
      item.name === "Title" ||
      item.name === "Our Tour" ||
      item.name === "Our Tour Image" ||
      item.name === "About" ||
      item.name === "Switzerland" ||
      item.name === "Italy" ||
      item.name === "France" ||
      item.name === "Belgium" ||
      item.name === "Netherlands" ||
      item.name === "United States" ||
      item.name === "Germany"
    )
      return false;
    return true;
  });

  return modifiedContents?.map((item) => ({
    name: item?.name?.toLowerCase()?.split(" ")?.join("-"),
  }));
}

export async function generateMetadata({ params }) {
  const { name } = params;
  const metaTitle = name;
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
          width: 200,
          height: 200,
          alt: metadata?.meta_title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata?.meta_title,
      description: metadata?.meta_description,
      image: metadata?.cloudflare_image,
    },
  };
}

export default async function Tour({ params }) {
  const fullUrl = getFullUrl(params);

  // Fetch metadata
  const metadata = await fetchMetadata(params.name);
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
      <TourSingleV1Dynamic params={{ ...params, fullUrl }}>
        <TourHeading params={{ ...params, fullUrl }} />
      </TourSingleV1Dynamic>
    </Wrapper>
  );
}
