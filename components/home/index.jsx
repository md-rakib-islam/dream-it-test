"use client";
import Hero from "../hero";
import ToursSection from "../section/ToursSection/ToursSection";
import DestinationSection from "../section/Destinations/DestinationSection";
import WhyChooseSection from "../section/WhyChoose/WhyChooseSection";
import TestimonialSection from "../section/Testimonial/TestimonialSection";
import { useEffect, useState } from "react";
import AboutSection from "../section/About/AboutSection";
import FAQSection from "../section/FAQ/FAQSection";
import BlogSection from "../section/BlogSection/BlogSection";

const index = () => {
  // const [isVisible, setIsVisible] = useState(false);
  // const [oneTimeShow, setOneTimeShow] = useState(false);

  // useEffect(() => {
  //   // Button is displayed after scrolling for 500 pixels
  //   if (!oneTimeShow) {
  //     const toggleVisibility = () => {
  //       if (window.pageYOffset > 2) {
  //         setIsVisible(true);
  //         setOneTimeShow(true);
  //       } else {
  //         setIsVisible(false);
  //       }
  //     };

  //     window.addEventListener("scroll", toggleVisibility);

  //     return () => window.removeEventListener("scroll", toggleVisibility);
  //   }
  // }, [oneTimeShow]);
  return (
    <>
      <div className="header-margin"></div>

      <Hero />
      <ToursSection
        // isVisible={isVisible}
        title={"Most Popular Tours"}
        des={
          "Discover the best tours in Italy for 2025, including small-group tours to Rome, the Vatican, Tuscany, and the Amalfi Coast. Visit famous landmarks like the Colosseum, Uffizi Gallery, Pompeii, and more. Book your Italy tour today and save!"
        }
        tourType={"popular"}
      />

      {/* {isVisible && ( */}
      <>
        <ToursSection
          // isVisible={isVisible}
          title={"Skip-the-Line & Top Attraction Tours"}
          des={
            "Skip the lines and get priority access to Italy’s top attractions like the Vatican, Colosseum, and Milan Cathedral. Book your skip-the-line tour now and explore hidden spots with expert guides for a deeper experience."
          }
          tourType={"attraction"}
        />
        <ToursSection
          // isVisible={isVisible}
          title={"Best Day Trips from Rome & Beyond"}
          des={
            "Take the best day trips from Rome, including the Amalfi Coast, Pompeii, Sorrento, and Tuscany’s vineyards. Join our expert guides for a hassle-free day trip to Florence or beyond and enjoy unforgettable experiences."
          }
          tourType={"day"}
        />
        <ToursSection
          // isVisible={isVisible}
          title={"Multi-Day Italy Itineraries"}
          des={
            "Explore Italy with multi-day guided tours, traveling from Rome to Venice or Milan to Florence. Create your perfect Italy itinerary with custom tours and vacation packages. Book now for an unforgettable trip!"
          }
          tourType={"multi"}
        />
        <DestinationSection
          title={"Top Destinations"}
          des={
            "Explore Italy’s top destinations, from famous cities like Rome, Venice, and Florence to beautiful spots like the Amalfi Coast and Cinque Terre. Book your unforgettable Italy trip now and experience ancient ruins, coastal views, and more!"
          }
        />
        <AboutSection />
        <WhyChooseSection
          title={"Why Choose Dream Tourism to Book Tour Tickets Online"}
          des={"Experience Quality and Excellence with DreamTourism"}
        />
        <TestimonialSection
          title={"See Why Travelers Recommend Us for Booking Tour Tickets"}
          des={
            "Join thousands of happy travelers with Dream Tourism, Italy’s top-rated tour operator. Check our 5-star reviews on TripAdvisor, Viator, and Google to see why customers love our unforgettable tours. Book your Italy adventure today!"
          }
        />
        <FAQSection />
        <BlogSection
          title={"Discover New Destinations and Travel Tips on Our Blog"}
        />
      </>
      {/* )} */}
    </>
  );
};
export default index;
