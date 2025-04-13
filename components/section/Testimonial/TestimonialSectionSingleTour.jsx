import TestimonialSingleTour from "@/components/testimonial/TestimonialSingleTour";
import React from "react";

const TestimonialSectionSingleTour = ({ title }) => {
  return (
    <div>
      <section className="layout-pt-lg layout-pb-lg">
        <div className="row">
          <div className="col-auto">
            <div className="">
              <span className="text-24 fw-600 mb-40">{title}</span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden js-section-slider">
          <div className="item_gap-x30">
            <TestimonialSingleTour />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialSectionSingleTour;
