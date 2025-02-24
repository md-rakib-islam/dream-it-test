import dynamic from "next/dynamic";
import AboutPage from "@/components/about/About";
import { GET_METADATA_BY_CONTENT_NAME } from "@/constant/constants";

const fetchMetadata = async () => {
  try {
    const res = await fetch(`${GET_METADATA_BY_CONTENT_NAME}/about`);
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
    metadataBase: new URL("https://dreamtourism.it"),
    title: metadata.meta_title,
    description: metadata.meta_description,
    openGraph: {
      title: metadata.meta_title,
      description: metadata.meta_description,
      images: [
        {
          url: metadata?.cloudflare_image,
          width: 800,
          height: 600,
          alt: metadata?.meta_title,
        },
      ],
      url: `/about`, // Open Graph URL

      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.meta_title,
      description: metadata.meta_description,
      image: metadata?.cloudflare_image,
    },
    // alternates: {
    //   canonical: `/about`, // Canonical without query params
    // },
  };
}

const About = () => {
  return (
    <>
      <div className="header-margin"></div>
      {/* header top margin */}

      {/* End About Banner Section */}

      {/* <section className="layout-pt-md">
        <div className="container">
          <div className="row y-gap-30 ">
            <h1 className="text-30 fw-500 pb-0">About Dream Tourism SRLS</h1>
            <p className="pt-0 pb-0">
              Where Journeys Become Spiritual Narratives
            </p> */}

      <AboutPage />
      {/* </div>
        </div>
      </section> */}
      {/* End about block section */}
    </>
  );
};

export default dynamic(() => Promise.resolve(About), { ssr: true });
