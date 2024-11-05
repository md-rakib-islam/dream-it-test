"use client";
import TopDestinations from "@/components/destinations/TopDestinations";
import Hero3 from "@/components/hero/hero";
import WhyChoose from "@/components/home/home/WhyChoose";
import Tours from "@/components/tours/Tours";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Testimonial from "../testimonial/Testimonial";
import Counter2 from "../counter/Counter2";
import Brand from "../brand/Brand";
import { useGetAllReviewsQuery } from "@/features/reviews/reviewsApi";
import useWindowSize from "@/hooks/useWindowSize";
import { useSelector } from "react-redux";
import ToursForMobile from "../tours/ToursForMobile";
import { useGetSliderImagesQuery } from "@/features/image/imageApi";
import Aos from "aos";
import "aos/dist/aos.css";

const index = () => {
  const { isSuccess, isLoading, data } = useGetSliderImagesQuery();

  const { data: reviewsData, isSuccess: reviewsSuccess } =
    useGetAllReviewsQuery(null);

  const [dataAvailable, setDataAvailable] = useState(false);
  const [mobileDataAvailable, setMobileDataAvailable] = useState(false);
  const width = useWindowSize();
  const isMobile = width > 768;
  const [isShow, setIsShow] = useState(false);

  const { currentTab } = useSelector((state) => state.hero) || {};

  // Function to handle data availability
  const handleDataAvailability = (isDataAvailable) => {
    setDataAvailable(isDataAvailable);
  };
  // Function to handle data availability
  const handleMobileDataAvailability = (isMobileDataAvailable) => {
    setMobileDataAvailable(isMobileDataAvailable);
  };
  const memoizedApiCallsMade = useMemo(() => isShow, [isShow]);

  useEffect(() => {
    const handleScroll = () => {
      if (!memoizedApiCallsMade && window.scrollY > 0) {
        setIsShow(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [memoizedApiCallsMade]);
  useEffect(() => {
    // Initialize AOS only on the client side
    if (typeof window !== "undefined") {
      Aos.init({ duration: 1200, once: true });
    }
  }, []);

  return (
    <>
      {/* <Hero7/> */}
      <div className="header-margin"></div>
      <Hero3
        onDataAvailable={handleDataAvailability}
        isSuccess={isSuccess}
        isLoading={isLoading}
        data={data}
        isMobile={isMobile}
        onMobileDataAvailable={handleMobileDataAvailability}
      />
      {/* End Hero 3 */}

      {!isMobile && mobileDataAvailable && (
        <>
          <section className="layout-pt-md layout-pb-md">
            <div className="container">
              <div className="row y-gap-22 justify-between items-start">
                <div className="col-8 col-lg-auto">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title  md:text-24">
                      Most Popular {currentTab == "All" ? "Tours" : currentTab}
                    </h2>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-4 col-lg-auto">
                  <Link
                    href="/tours"
                    className="button -md -blue-1 bg-blue-1-05 md:text-13 text-blue-1"
                  >
                    More{" "}
                    <div className="icon-arrow-top-right ml-15 md:text-13" />
                  </Link>
                </div>
                <div className="col-12 col-lg-auto">
                  <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                    Explore Our Best Sellers: Unmatched Experiences in Every
                    Journey
                  </p>
                </div>
                {/* End .col */}
              </div>
              {/* End .row */}

              <div className="row y-gap-30 pt-40 sm:pt-20 ">
                <ToursForMobile />
              </div>
              {/* End .row */}
            </div>
            {/* End .container */}
          </section>
          <section className="layout-pt-md layout-pb-md">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-auto">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      Top Destinations
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Explore Exciting Destinations, Tailored for Every Explorer
                    </p>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row y-gap-40 pt-40 sm:pt-20">
                <TopDestinations />
              </div>
              {/* End .row */}
            </div>
            {/* End .container */}
          </section>
          <section className="layout-pt-md layout-pb-md">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-auto">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      Why Book With Us
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Experience Quality and Excellence with DreamTourism
                    </p>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row y-gap-40 justify-between pt-50">
                <WhyChoose />
              </div>
              {/* End row */}
            </div>
            {/* End .container */}
          </section>
          {/* End Why choose Section */}
          {reviewsSuccess && (
            <section className="section-bg layout-pt-lg layout-pb-lg">
              <div className="section-bg__item -mx-20 bg-light-2" />
              <div className="container">
                <div className="row justify-center text-center">
                  <div className="col-auto">
                    <div className="sectionTitle -md">
                      <h2 className="sectionTitle__title md:text-24">
                        Overheard from travelers
                      </h2>
                      <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                        These popular destinations have a lot to offer
                      </p>
                    </div>
                  </div>
                </div>
                {/* End .row */}

                <div className="overflow-hidden pt-40 js-section-slider">
                  <div className="item_gap-x30">
                    <Testimonial reviewsData={reviewsData} />
                  </div>
                </div>
                {/* End .overflow-hidden */}

                <div className="row y-gap-30 items-center pt-40 sm:pt-20">
                  <div className="col-xl-4">
                    <Counter2 />
                  </div>
                  {/* End .col */}

                  <div className="col-xl-8">
                    <div className="row y-gap-30 justify-between items-center">
                      <Brand />
                    </div>
                  </div>
                  {/* End .col */}
                </div>
                {/* End .row */}
              </div>
              {/* End .container */}
            </section>
          )}
          {/* End testimonial section */}
        </>
      )}
      {/* End Popular Tours Sections */}

      {dataAvailable && (
        <>
          {isMobile && (
            <>
              <section className="layout-pt-md layout-pb-md">
                <div className="container">
                  <div className="row y-gap-22 justify-between items-start">
                    <div className="col-8 col-lg-auto">
                      <div className="sectionTitle -md">
                        <h2 className="sectionTitle__title">
                          Most Popular Tours
                        </h2>
                        <p className=" sectionTitle__text mt-5 sm:mt-0">
                          Italy’s Best Experiences, Loved by Travelers.
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
                    <Tours />
                  </div>
                  {/* End .row */}
                </div>
                {/* End .container */}
              </section>
              <section className="layout-pt-md layout-pb-md">
                <div className="container">
                  <div className="row y-gap-22 justify-between items-start">
                    <div className="col-8 col-lg-auto">
                      <div className="sectionTitle -md">
                        <h2 className="sectionTitle__title">
                          Top Attraction Tours
                        </h2>
                        <p className=" sectionTitle__text mt-5 sm:mt-0">
                          Experience Italy's Iconic Sights Like Never Before.
                        </p>
                      </div>
                    </div>
                    {/* End .col */}

                    <div className="col-4 col-lg-auto">
                      <Link
                        href="/tours?location=&category=Attraction%20Tours&min=&max="
                        className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                      >
                        More <div className="icon-arrow-top-right ml-15" />
                      </Link>
                    </div>
                    {/* End .col */}
                  </div>
                  {/* End .row */}

                  <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                    <Tours attraction={true} />
                  </div>
                  {/* End .row */}
                </div>
                {/* End .container */}
              </section>
              {/* Attraction Tours End */}
              <section className="layout-pt-md layout-pb-md">
                <div className="container">
                  <div className="row y-gap-22 justify-between items-start">
                    <div className="col-8 col-lg-auto">
                      <div className="sectionTitle -md">
                        <h2 className="sectionTitle__title">Top Daily Tours</h2>
                        <p className=" sectionTitle__text mt-5 sm:mt-0">
                          Perfect Day Trips for Exploring Italy’s Highlights.
                        </p>
                      </div>
                    </div>
                    {/* End .col */}

                    <div className="col-4 col-lg-auto">
                      <Link
                        href="/tours?location=&category=Day%20Tours&min=&max="
                        className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                      >
                        More <div className="icon-arrow-top-right ml-15" />
                      </Link>
                    </div>
                    {/* End .col */}
                  </div>
                  {/* End .row */}

                  <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                    <Tours dailyTours={true} />
                  </div>
                  {/* End .row */}
                </div>
                {/* End .container */}
              </section>
              {/* End Daily Tours Sections */}
              <section className="layout-pt-md layout-pb-md">
                <div className="container">
                  <div className="row y-gap-22 justify-between items-start">
                    <div className="col-8 col-lg-auto">
                      <div className="sectionTitle -md">
                        <h2 className="sectionTitle__title">
                          Top Multi-Day Tours
                        </h2>
                        <p className=" sectionTitle__text mt-5 sm:mt-0">
                          Extended Escapes Through Europe’s Rich Heritage.
                        </p>
                      </div>
                    </div>
                    {/* End .col */}

                    <div className="col-4 col-lg-auto">
                      <Link
                        href="/tours?location=&category=Multi-Day%20Tours&min=&max="
                        className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                      >
                        More <div className="icon-arrow-top-right ml-15" />
                      </Link>
                    </div>
                    {/* End .col */}
                  </div>
                  {/* End .row */}

                  <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                    <Tours multiDays={true} />
                  </div>
                  {/* End .row */}
                </div>
                {/* End .container */}
              </section>
              {/* End Multi Days Tours Sections */}
              <section className="layout-pt-md layout-pb-md">
                <div className="container">
                  <div className="row justify-center text-center">
                    <div className="col-auto">
                      <div className="sectionTitle -md">
                        <h2 className="sectionTitle__title">
                          Top Destinations
                        </h2>
                        <p className=" sectionTitle__text mt-5 sm:mt-0">
                          Explore Exciting Destinations, Tailored for Every
                          Explorer
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="row y-gap-40 pt-40 sm:pt-20">
                    <TopDestinations />
                  </div>
                  {/* End .row */}
                </div>
                {/* End .container */}
              </section>
              {/* top destination */}
            </>
          )}
        </>
      )}

      {dataAvailable && isMobile && (
        <>
          <section className="layout-pt-md layout-pb-md">
            k
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-auto">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title">Why Book With Us</h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0">
                      Experience Quality and Excellence with DreamTourism
                    </p>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row y-gap-40 justify-between pt-50">
                <WhyChoose />
              </div>
              {/* End row */}
            </div>
            {/* End .container */}
          </section>
          {/* End Why choose Section */}
          {reviewsSuccess && (
            <section className="section-bg layout-pt-lg layout-pb-lg">
              <div className="section-bg__item -mx-20 bg-light-2" />
              <div className="container">
                <div className="row justify-center text-center">
                  <div className="col-auto">
                    <div className="sectionTitle -md">
                      <h2 className="sectionTitle__title">
                        Overheard from travelers
                      </h2>
                      <p className=" sectionTitle__text mt-5 sm:mt-0">
                        These popular destinations have a lot to offer
                      </p>
                    </div>
                  </div>
                </div>
                {/* End .row */}

                <div className="overflow-hidden pt-40 js-section-slider">
                  <div className="item_gap-x30">
                    <Testimonial reviewsData={reviewsData} />
                  </div>
                </div>
                {/* End .overflow-hidden */}

                <div className="row y-gap-30 items-center pt-40 sm:pt-20">
                  <div className="col-xl-4">
                    <Counter2 />
                  </div>
                  {/* End .col */}

                  <div className="col-xl-8">
                    <div className="row y-gap-30 justify-between items-center">
                      <Brand />
                    </div>
                  </div>
                  {/* End .col */}
                </div>
                {/* End .row */}
              </div>
              {/* End .container */}
            </section>
          )}
          {/* End testimonial section */}

          {isShow && (
            <section className="section-bg layout-pt-md layout-pb-md mt-20 mb-20">
              <div className="section-bg__item -mx-20 bg-warning-1" />
              <div className="container">
                <div className="row y-gap-20 justify-between itkems-end">
                  <div className="col-auto">
                    <div className="sectionTitle -md">
                      <h2 className="sectionTitle__title">Popular Links</h2>
                    </div>
                  </div>
                  {/* End .col */}
                </div>
                {/* End .row */}

                <div className="row y-gap-30 pt-20 sm:pt-20 item_gap-x30">
                  <ul className="linksList">
                    <li className="linkItem">
                      <Link className="link" href="/destinations/france">
                        Things to do in France
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/destinations/france">
                        Places to visit in Paris
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Top attractions in Spain
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Must-see sights in Barcelona
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/destinations/germany">
                        Activities in Germany
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Best things to do in Berlin
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Attractions in the United Kingdom
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Explore London's landmarks
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        What to do in Greece
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Sightseeing in Athens
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Activities in Portugal
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Discover Lisbon's highlights
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Things to see in the Netherlands
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Visit Amsterdam's famous spots
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Top experiences in Switzerland
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Galway's artistic charm
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Must-do activities in Austria
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Discover Vienna's cultural gems
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Top experiences in Switzerland
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Charming towns in Tuscany
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Exploring Florence's treasures
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Discovering Venice's magic
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Unforgettable experiences in Rome
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Italy's hidden gems
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Experience Brussels' charm
                      </Link>
                    </li>
                    <li className="linkItem">
                      <Link className="link" href="/">
                        Things to explore in Belgium
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* End .row */}
              </div>
              {/* End .container */}
            </section>
          )}
        </>
      )}
    </>
  );
};

export default index;
