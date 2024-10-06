import Wrapper from "@/components/layout/Wrapper";
import TourHeading from "@/components/tour-single/TourHeading";
import TourSingle from "@/components/tour-single/TourSingle";
import { GET_METADATA_BY_CONTENT_NAME } from "@/constant/constants";
import getAllContentByMenuId from "@/services/contentService";
import getAllMenuItem from "@/services/menuService";
import Head from "next/head";

export const tourUrlsMap = {
  "rome-colosseum-hosted-entry-roman-forum-and-palatine-hills-with-arena-ticket":
    "Rome: Colosseum Hosted entry, Roman Forum and Palatine hills with Arena Ticket",
  "rome-colosseum-roman-forum-and-palatine-hills-ticket-with-hosted-entry":
    "Rome: Colosseum, Roman Forum, and Palatine Hills Ticket with Hosted Entry",
  "switzerland-by-bernina-express-visit-milan-lake-como":
    "Switzerland by Bernina Express & Visit Milan Lake Como",
  "colosseum-roman-forum-and-palatine-hills-priority-ticket-skip-the-ticket-line":
    "Colosseum, Roman Forum And Palatine Hills Priority Ticket- Skip The Ticket Line",
  "skip-the-line-ticket-colosseum-forum-%26-palatine-hills-with-audio-%26-video-guide":
    "Skip the Line ticket Colosseum, Forum & Palatine Hills with Audio & Video Guide",
  "full-experience-colosseum-with-arena":
    "Full Experience Colosseum with Arena",
  "capri-island-day-trip-from-rome": "Capri Island Day Trip From Rome",
  "capri-island-day-trip-from-rome-with-blue-grotto":
    "Capri Island Day Trip From Rome With Blue Grotto",
  "celebrate-new-year-in-paris-a-3-night-4-day-tour-from-london":
    "Celebrate New Year In Paris: A 3-Night, 4-Day Tour From London",
  "visit-europe-in-summer-holiday-switzerland-venice-austria-and-liechtenstein":
    "Visit Europe In Summer Holiday: Switzerland, Venice, Austria And Liechtenstein",
  "dream-meets-the-blue-at-santorini": "Dream Meets The Blue At Santorini",
  "valentine-s-day-in-venice-and-bernina-express-journey-to-switzerland":
    "Valentine's Day In Venice And Bernina Express Journey To Switzerland",
  "tulip-garden-tour-from-london-by-eurostar":
    "Tulip Garden Tour From London By Eurostar",
};

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
  const metaTitle = tourUrlsMap[name];
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
  const metaTitle = tourUrlsMap[params.name];
  const metadata = await fetchMetadata(metaTitle);
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
      <TourSingle params={{ ...params, fullUrl }}>
        <TourHeading params={{ ...params, fullUrl }} />
      </TourSingle>
    </Wrapper>
  );
}
