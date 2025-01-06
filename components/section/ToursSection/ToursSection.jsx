import Tours from "@/components/tours/Tours";
import ToursForMobile from "@/components/tours/ToursForMobile";
import Link from "next/link";

const ToursSection = ({ title, des, tourType }) => {
  return (
    <section className="layout-pt-md layout-pb-md sm:mt-40">
      <div className="container">
        <div className="row y-gap-22 justify-between items-start">
          <div className="col-8 col-lg-auto">
            <div className="sectionTitle -md">
              <h2 className="sectionTitle__title md:text-22">{title}</h2>
              <p className=" sectionTitle__text mt-5  bannar_mobile">{des}</p>
            </div>
          </div>

          <div className="col-4 col-lg-auto">
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
          </div>
          <div className="col-12 col-lg-auto d-md-none">
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
          </div>
        </div>

        <div className="row y-gap-30 pt-40  bannar_mobile  sm:pt-20 item_gap-x30">
          <Tours tourType={tourType} />
        </div>
        <div className="row y-gap-30 pt-40 d-md-none sm:pt-20 item_gap-x30">
          <ToursForMobile tourType={tourType} />
        </div>
      </div>
    </section>
  );
};

export default ToursSection;
