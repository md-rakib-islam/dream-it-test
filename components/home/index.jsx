"use client";
import Hero from "../hero";
import ToursSection from "../section/ToursSection/ToursSection";
import DestinationSection from "../section/Destinations/DestinationSection";
import WhyChooseSection from "../section/WhyChoose/WhyChooseSection";
import TestimonialSection from "../section/Testimonial/TestimonialSection";
import { useEffect, useState } from "react";
const index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [oneTimeShow, setOneTimeShow] = useState(false);

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    if (!oneTimeShow) {
      const toggleVisibility = () => {
        if (window.pageYOffset > 2) {
          setIsVisible(true);
          setOneTimeShow(true);
        } else {
          setIsVisible(false);
        }
      };

      window.addEventListener("scroll", toggleVisibility);

      return () => window.removeEventListener("scroll", toggleVisibility);
    }
  }, [oneTimeShow]);
  return (
    <>
      <div className="header-margin"></div>

      <Hero />
      <ToursSection
        isVisible={isVisible}
        title={"Most Popular Tours"}
        des={"Italy’s Best Experiences, Loved by Travelers."}
        tourType={"popular"}
      />

      {isVisible && (
        <>
          <ToursSection
            isVisible={isVisible}
            title={"Top Attraction Tours"}
            des={"Experience Italy's Iconic Sights Like Never Before."}
            tourType={"attraction"}
          />
          <ToursSection
            isVisible={isVisible}
            title={"Top Day Tours"}
            des={"Perfect Day Trips for Exploring Italy’s Highlights."}
            tourType={"day"}
          />
          <ToursSection
            isVisible={isVisible}
            title={"Top Multi-Day Tours"}
            des={"Extended Escapes Through Europe’s Rich Heritage."}
            tourType={"multi"}
          />
          <DestinationSection
            title={"Top Destinations"}
            des={"Explore Exciting Destinations, Tailored for Every Explorer"}
          />
          <WhyChooseSection
            title={"Why Book With Us"}
            des={"Experience Quality and Excellence with DreamTourism"}
          />
          <TestimonialSection
            title={"Overheard from travelers"}
            des={"These popular destinations have a lot to offer"}
          />
        </>
      )}
    </>
  );
};
export default index;
