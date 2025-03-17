import dynamic from "next/dynamic";
import TermsConent from "@/components/terms/TermsConent";
import { GET_METADATA_BY_CONTENT_NAME } from "@/constant/constants";

const fetchMetadata = async (params) => {
  try {
    const res = await fetch(
      `${GET_METADATA_BY_CONTENT_NAME}/terms-and-conditions`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch metadata");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    return {
      meta_title: "Immerse in Exceptional Tours by Dream Tourism SRLS",
      meta_description: "Immerse in Exceptional Tours by Dream Tourism SRLS",
      meta_image:
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/5dbac07d-cbd4-4694-9a38-615bf832f800/public", // Default image
    };
  }
};
export async function generateMetadata({ params, searchParams }, parent) {
  const metadata = await fetchMetadata(params);
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
          width: 100,
          height: 100,
          alt: metadata?.meta_title,
        },
      ],
      url: `/terms-and-conditions`, // Open Graph URL

      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.meta_title,
      description: metadata.meta_description,
      image: metadata?.cloudflare_image,
    },
    // alternates: {
    //   canonical: `/terms-and-conditions`, // Canonical without query params
    // },
  };
}

const Terms = ({ params }) => {
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      {/* End Header 1 */}

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="tabs js-tabs">
            <h1 className="text-30 fw-600 mb-15 text-center">
              Terms and Conditions of Use
            </h1>

            <TermsConent params={params} />
          </div>
        </div>
      </section>
      {/* End terms section */}

      {/* <DefaultFooter /> */}
      {/* End Call To Actions Section */}
    </>
  );
};

export default dynamic(() => Promise.resolve(Terms), { ssr: true });
