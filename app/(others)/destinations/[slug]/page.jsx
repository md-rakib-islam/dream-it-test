import dynamic from "next/dynamic";
import Slights from "@/components/block/Slights";
import TopDestinations2 from "@/components/destinations/TopDestinations2";
import Banner from "@/components/destinations/components/Banner";
import IntroTown from "@/components/destinations/components/IntroTown";
import Weather from "@/components/destinations/components/Weather";
import Faq from "@/components/faq/Faq";
import Tours from "@/components/tours/Tours";
import { slightContent } from "@/data/desinations";
import getAllMenuItem from "@/services/menuService";
import Link from "next/link";
import { GET_METADATA_BY_CONTENT_NAME } from "@/constant/constants";

export async function generateStaticParams() {
  const data = await getAllMenuItem();

  return data?.menus
    .find((item) => item.name === "Destinations")
    ?.children?.map((item) => ({
      slug: item.name,
    }));
}

const fetchMetadata = async (slug) => {
  try {
    const res = await fetch(`${GET_METADATA_BY_CONTENT_NAME}/${slug}`);
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
  const slug = params.slug;

  const metadata = await fetchMetadata(slug);
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

const Destinations = ({ params }) => {
  const slug = params.slug;

  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}
      <section className="layout-pb-md">
        <div className="container">
          <div className="row">
            <div
              className="absolute z-2 px-50 py-30 md:py-20 md:px-30 "
              style={{ width: "fit-content" }}
            >
              <h1
                className="text-50 fw-600 text-white lg:text-40 md:text-30"
                style={{
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                Explore {slug.charAt(0).toUpperCase() + slug.slice(1)}
              </h1>
              <div
                className="text-white"
                style={{
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  overflow: "hidden",
                }}
              >
                Explore deals, travel guides and things to do in{" "}
                {slug.charAt(0).toUpperCase() + slug.slice(1)}
              </div>
            </div>
            <Banner slug={slug} />
          </div>
          {/* End .row */}

          <div className="row y-gap-20 pt-40">
            <IntroTown slug={slug} />
          </div>
          {/* End .row */}

          <div className="pt-30 mt-30 border-top-light" />
          {/* border separation */}

          <div className="row y-gap-20">
            <div className="col-12">
              <h2 className="text-22 fw-600">Local weather</h2>
            </div>
            {/* End. col-12 */}

            <Weather slug={slug} />
          </div>
          {/* End local weather */}

          <div className="pt-30 mt-30 border-top-light" />

          {/* <div className="mt-30 border-top-light" /> */}
        </div>
        {/* End .container */}
      </section>
      {/* End Top Banner,categorie,intro,weather, generic info section */}

      {slug === "italy" ||
      slug === "netherlands" ||
      slug === "switzerland" ||
      slug === "france" ? (
        <section className="layout-pt-md layout-pb-md">
          <div className="container">
            <div className="row y-gap-22 justify-between items-start">
              <div className="col-8 col-lg-auto">
                <div className="sectionTitle -md">
                  <h2 className="sectionTitle__title">Most Popular Tours</h2>
                  <p className=" sectionTitle__text mt-5 sm:mt-0">
                    Explore Our Best Sellers: Unmatched Experiences in Every
                    Journey
                  </p>
                </div>
              </div>
              {/* End .col */}

              <div className="col-4 col-lg-auto">
                <Link
                  href="/tours"
                  className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                >
                  More <div className="icon-arrow-top-right ml-15" />
                </Link>
              </div>
              {/* End .col */}
            </div>
            {/* End .row */}

            <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
              <Tours
                destination={slug
                  ?.split("_")
                  ?.map(
                    (word) => word?.charAt(0).toUpperCase() + word?.slice(1)
                  )
                  ?.join(" ")}
              />
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
        </section>
      ) : (
        ""
      )}
      {/* End Tours Sections */}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Top sights in{" "}
                  {slug
                    ?.split("_")
                    ?.map(
                      (word) => word?.charAt(0).toUpperCase() + word?.slice(1)
                    )
                    ?.join(" ")}
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  {slightContent[slug]?.title}
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row y-gap-30 pt-40">
            <Slights slug={slug} />
          </div>
          {/* End .row */}

          <div className="row justify-center mt-40">
            <div className="col-auto">
              <Link
                href="#"
                className="button h-50 w-250 -outline-blue-1 text-blue-1"
              >
                Explore more <div className="icon-arrow-top-right ml-15" />
              </Link>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Top sights in London */}

      <section className="layout-pt-lg layout-pb-md">
        <div className="container">
          <div className="row y-gap-20">
            <div className="col-lg-4">
              <h2 className="text-30 fw-600">
                FAQs about
                <br />
                {slug
                  ?.split("_")
                  ?.map(
                    (word) => word?.charAt(0).toUpperCase() + word?.slice(1)
                  )
                  ?.join(" ")}
              </h2>
            </div>
            {/* End .col */}

            <div className="col-lg-8">
              <div className="accordion -simple row y-gap-20 js-accordion">
                <Faq slug={slug} />
              </div>
            </div>
            {/* End .col-lg-8 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Faq Section */}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-20">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Destinations near{" "}
                  {slug.charAt(0).toUpperCase() + slug.slice(1)}
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular destinations have a lot to offer
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="pt-40 relative">
            <TopDestinations2 slug={slug} />
          </div>
        </div>
        {/* End .container */}
      </section>
      {/* End top destinations */}
    </>
  );
};

export default dynamic(() => Promise.resolve(Destinations), { ssr: false });
