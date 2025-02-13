import TopDestinations from "@/components/destinations/TopDestinations";
import React from "react";

const DestinationSection = ({ title, des, slug }) => {
  return (
    <div>
      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title fw-600">{title}</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">{des} </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row y-gap-40 pt-40 sm:pt-20">
            <TopDestinations destination={slug} />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
    </div>
  );
};

export default DestinationSection;
