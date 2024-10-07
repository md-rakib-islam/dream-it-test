import dynamic from "next/dynamic";
import TermsConent from "@/components/common/TermsConent";
import { GET_METADATA_BY_CONTENT_NAME } from "@/constant/constants";

const fetchMetadata = async (type) => {
  try {
    const res = await fetch(
      `${GET_METADATA_BY_CONTENT_NAME}/${
        type == "general_terms_of_use"
          ? "terms-and-conditions"
          : "privacy-policy"
      }`
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
  const { type } = searchParams;

  const metadata = await fetchMetadata(type);
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

const Terms = () => {
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      {/* <DefaultHeader /> */}
      {/* End Header 1 */}

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="tabs js-tabs">
            <TermsConent />
          </div>
        </div>
      </section>
      {/* End terms section */}

      {/* <DefaultFooter /> */}
      {/* End Call To Actions Section */}
    </>
  );
};

export default dynamic(() => Promise.resolve(Terms), { ssr: false });
