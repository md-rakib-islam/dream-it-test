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
      {/* <GoogleAnalytics gaId="G-TXJZSJCPCZ" /> */}
    </div>
  );
}
