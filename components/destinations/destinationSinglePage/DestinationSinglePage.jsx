import DestinationSection from "@/components/section/Destinations/DestinationSection";
import React from "react";
import Faq from "../componentsSinglePage/Faq";
import Slights from "../componentsSinglePage/Slights";
import { slightContent } from "@/data/desinations";
import Tours from "@/components/tours/Tours";
import Link from "next/link";
import Weather from "../componentsSinglePage/Weather";
import IntroTown from "../componentsSinglePage/IntroTown";
import Banner from "../componentsSinglePage/Banner";

const DestinationSinglePage = ({ slug, contentImagesData, content }) => {
  return (
    <div>
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
            <Banner slug={slug} data={contentImagesData} />
          </div>
          {/* End .row */}

          <div className="row y-gap-20 pt-40">
            <IntroTown slug={slug} data={content} />
          </div>
          {/* End .row */}

          <div className="pt-30 mt-30 border-top-light" />
          {/* border separation */}

          <div className="row y-gap-20">
            <div className="col-12">
              <span className="text-24 fw-600 text-black">Local weather</span>
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
      {slug === "italy" ||
      slug === "netherlands" ||
      slug === "switzerland" ||
      slug === "france" ? (
        <section className="layout-pt-md layout-pb-md">
          <div className="container">
            <div className="row y-gap-22 justify-between items-start">
              <div className="col-8 col-lg-auto">
                <div className="sectionTitle -md">
                  <h2 className="sectionTitle__title fw-600">
                    Most Popular Tours
                  </h2>
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
                  aria-label="Explore more"
                >
                  <span>Explore More</span>
                  <div
                    className="icon-arrow-top-right ml-15"
                    aria-hidden="true"
                  />
                </Link>
              </div>
              {/* End .col */}
            </div>
            {/* End .row */}

            <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
              <Tours
                destination={`${slug
                  ?.split("_")
                  ?.map(
                    (word) => word?.charAt(0).toUpperCase() + word?.slice(1)
                  )
                  ?.join(" ")}`}
              />
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
        </section>
      ) : (
        ""
      )}
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <span className="sectionTitle__title fw-600">
                  Top sights in{" "}
                  {slug
                    ?.split("_")
                    ?.map(
                      (word) => word?.charAt(0).toUpperCase() + word?.slice(1)
                    )
                    ?.join(" ")}
                </span>
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
      <section className="layout-pt-lg layout-pb-md">
        <div className="container">
          <div className="row y-gap-20">
            <div className="col-lg-4">
              <span className="text-30 fw-600">
                FAQs about
                <br />
                {slug
                  ?.split("_")
                  ?.map(
                    (word) => word?.charAt(0).toUpperCase() + word?.slice(1)
                  )
                  ?.join(" ")}
              </span>
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
      <DestinationSection
        title={`Destinations ${slug.charAt(0).toUpperCase() + slug.slice(1)}`}
        des={"These popular destinations have a lot to offer"}
        slug={slug}
      />
    </div>
  );
};

export default DestinationSinglePage;
