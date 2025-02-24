import Sidebar from "@/components/tours/toursPage/Sidebar";
import TopHeaderFilter from "@/components/tours/toursPage/TopHeaderFilter";
import TourProperties from "@/components/tours/toursPage/TourProperties";
import { GET_METADATA_BY_CONTENT_NAME } from "@/constant/constants";

const fetchMetadata = async () => {
  try {
    const res = await fetch(`${GET_METADATA_BY_CONTENT_NAME}/tours`);
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
      url: `/tours`, // Open Graph URL

      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.meta_title,
      description: metadata.meta_description,
      image: metadata?.cloudflare_image,
    },
    // alternates: {
    //   canonical: `/tours`, // Canonical without query params
    // },
  };
}

const index = () => {
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      {/* End Header 1 */}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-3">
              <aside className="sidebar y-gap-40 xl:d-none">
                <Sidebar />
              </aside>
              {/* End sidebar for desktop */}

              <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="listingSidebar"
              >
                <div className="offcanvas-header">
                  <span className="offcanvas-title" id="offcanvasLabel">
                    Filter Tours
                  </span>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                {/* End offcanvas header */}

                <div className="offcanvas-body">
                  <aside className="sidebar y-gap-40  xl:d-block">
                    <Sidebar />
                  </aside>
                </div>
                {/* End offcanvas body */}
              </div>
              {/* End mobile menu sidebar */}
            </div>
            {/* End col */}

            <div className="col-xl-9 col-sm-12">
              <TopHeaderFilter />
              <div className="mt-30"></div>
              {/* End mt--30 */}

              <TourProperties />

              {/* End .row */}
              {/* <Pagination /> */}
            </div>
            {/* End .col for right content */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End layout for listing sidebar and content */}
    </>
  );
};

export default index;
