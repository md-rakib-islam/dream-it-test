import Brand from "@/components/brand/Brand";
import Counter from "@/components/counter/Counter";
import Testimonial from "@/components/testimonial/Testimonial";
import React from "react";

const TestimonialSection = ({ title, des }) => {
  return (
    <div>
      <section className="section-bg layout-pt-lg layout-pb-lg bg-light-2">
        <div className="section-bg__item -mx-20 " />
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <span className="sectionTitle__title md:text-24 fw-600">
                  {title}
                </span>
                <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                  {des}
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden pt-40 js-section-slider">
            <div className="item_gap-x30">
              <Testimonial />
            </div>
          </div>

          <div className="row y-gap-30 items-center pt-40 sm:pt-20">
            <div className="col-xl-4">
              <Counter />
            </div>

            <div className="col-xl-8">
              <div className="row y-gap-30 justify-between items-center">
                <Brand />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialSection;
