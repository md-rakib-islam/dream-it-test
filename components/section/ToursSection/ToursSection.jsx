import Tours from "@/components/tours/Tours";
import ToursForMobile from "@/components/tours/ToursForMobile";
import { useMobile } from "@/hooks/useMobile";
import Link from "next/link";

const ToursSection = ({ title, des, tourType }) => {
  const isMobile = useMobile();
  return (
    <section className="layout-pt-md layout-pb-md sm:mt-40">
      <div className="container">
        <div className="row y-gap-22 justify-between items-start">
          <div className="col-12 ">
            <div className="sectionTitle -md">
              <h2 className="sectionTitle__title md:text-22 fw-600">{title}</h2>
              {/*  old code 
              <p className=" sectionTitle__text mt-5  bannar_mobile">{des}</p> */}
              <p className=" sectionTitle__text mt-5  text-mobile-11">{des}</p>
            </div>
          </div>

          {/* <div className="col-4 col-lg-auto bannar_mobile">
            <Link
              href="/tours"
              className="button -md -blue-1 bg-blue-1-05 text-blue-1 py-10 px-10"
              aria-label="Explore more"
            >
              <span className="text-12">Explore More</span>
              <div
                className="icon-arrow-top-right ml-10 text-12"
                aria-hidden="true"
              />
            </Link>
          </div> */}
          {/* <div className="col-12 col-lg-auto d-md-none">
            <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
              {tourType == "popular"
                ? "Italy’s Best Experiences, Loved by Travelers."
                : tourType == "attraction"
                ? "Experience Italy's Iconic Sights Like Never Before."
                : tourType == "day"
                ? "Perfect Day Trips for Exploring Italy’s Highlights."
                : tourType == "multi"
                ? "Extended Escapes Through Europe’s Rich Heritage."
                : ""}
            </p>
          </div> */}
        </div>

        {/* {isVisible && ( */}
        <div className="row y-gap-30 pt-40    sm:pt-20 item_gap-x30">
          {!isMobile ? (
            <Tours tourType={tourType} />
          ) : (
            <ToursForMobile tourType={tourType} />
          )}
        </div>
        {/* )} */}
        {/* {!isVisible && (
          <div className="row y-gap-30 pt-40  bannar_mobile  sm:pt-20 item_gap-x30 text-center">
            <p>loading ...</p>
          </div>
        )}
        {!isVisible && (
          <div className="row y-gap-30 pt-40 d-md-none sm:pt-20 item_gap-x30 text-center">
            <p>loading ...</p>
          </div>
        )} */}
        {/* {isVisible && ( */}
        {/* <div className="row y-gap-30 pt-40 d-md-none sm:pt-20 item_gap-x30">
          <ToursForMobile tourType={tourType} />
        </div> */}
        {/* )} */}
      </div>
    </section>
  );
};

export default ToursSection;
