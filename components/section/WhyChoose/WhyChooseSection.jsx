import WhyChoosePage from "@/components/common/whyChoose/WhyChoosePage";
import React from "react";

const WhyChooseSection = ({ title, des }) => {
  return (
    <div>
      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title md:text-24">{title}</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                  {des}
                </p>
              </div>
            </div>
          </div>

          <div className="row y-gap-40 justify-between pt-50">
            <WhyChoosePage />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseSection;
