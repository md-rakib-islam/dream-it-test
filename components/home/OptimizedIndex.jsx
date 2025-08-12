// components/home/OptimizedIndex.jsx
"use client";
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import Hero from "../hero";

// ✅ Lazy load sections that are below the fold
const ToursSection = dynamic(
  () => import("../section/ToursSection/ToursSection"),
  {
    ssr: false,
    loading: () => <div className="section-loading">Loading tours...</div>,
  }
);

const DestinationSection = dynamic(
  () => import("../section/Destinations/DestinationSection"),
  {
    ssr: false,
    loading: () => (
      <div className="section-loading">Loading destinations...</div>
    ),
  }
);

const AboutSection = dynamic(() => import("../section/About/AboutSection"), {
  ssr: false,
  loading: () => <div className="section-loading">Loading about...</div>,
});

const WhyChooseSection = dynamic(
  () => import("../section/WhyChoose/WhyChooseSection"),
  {
    ssr: false,
    loading: () => <div className="section-loading">Loading features...</div>,
  }
);

const TestimonialSection = dynamic(
  () => import("../section/Testimonial/TestimonialSection"),
  {
    ssr: false,
    loading: () => (
      <div className="section-loading">Loading testimonials...</div>
    ),
  }
);

const FAQSection = dynamic(() => import("../section/FAQ/FAQSection"), {
  ssr: false,
  loading: () => <div className="section-loading">Loading FAQ...</div>,
});

const BlogSection = dynamic(
  () => import("../section/BlogSection/BlogSection"),
  {
    ssr: false,
    loading: () => <div className="section-loading">Loading blog...</div>,
  }
);

// ✅ Optimized intersection observer hook
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // ✅ Disconnect after first intersection
        }
      },
      { threshold, rootMargin: "100px" } // ✅ Load 100px before visible
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, threshold]);

  return [setElement, isVisible];
};

// ✅ Memoized section data to prevent re-renders
const SECTIONS_DATA = {
  popular: {
    title: "Most Popular Tours",
    description:
      "Discover the best tours in Italy for 2025, including small-group tours to Rome, the Vatican, Tuscany, and the Amalfi Coast. Visit famous landmarks like the Colosseum, Uffizi Gallery, Pompeii, and more. Book your Italy tour today and save!",
    type: "popular",
  },
  attraction: {
    title: "Skip-the-Line & Top Attraction Tours",
    description:
      "Skip the lines and get priority access to Italy's top attractions like the Vatican, Colosseum, and Milan Cathedral. Book your skip-the-line tour now and explore hidden spots with expert guides for a deeper experience.",
    type: "attraction",
  },
  day: {
    title: "Best Day Trips from Rome & Beyond",
    description:
      "Take the best day trips from Rome, including the Amalfi Coast, Pompeii, Sorrento, and Tuscany's vineyards. Join our expert guides for a hassle-free day trip to Florence or beyond and enjoy unforgettable experiences.",
    type: "day",
  },
  multi: {
    title: "Multi-Day Italy Itineraries",
    description:
      "Explore Italy with multi-day guided tours, traveling from Rome to Venice or Milan to Florence. Create your perfect Italy itinerary with custom tours and vacation packages. Book now for an unforgettable trip!",
    type: "multi",
  },
};

const OptimizedMainHome = () => {
  // ✅ Single scroll listener instead of multiple
  const [showBelowFold, setShowBelowFold] = useState(false);
  const [setScrollTrigger, isScrollTriggered] = useIntersectionObserver(0.1);

  // ✅ Memoized sections to prevent unnecessary re-renders
  const sectionsData = useMemo(() => SECTIONS_DATA, []);

  useEffect(() => {
    // ✅ Show below-fold content after hero is visible or after 2 seconds
    const timer = setTimeout(() => {
      setShowBelowFold(true);
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="home-container">
      {/* ✅ Above the fold - Critical content */}
      <div className="header-margin"></div>

      <Hero />

      {/* ✅ First tours section - still above fold */}
      <ToursSection
        title={sectionsData.popular.title}
        des={sectionsData.popular.description}
        tourType={sectionsData.popular.type}
      />

      {/* ✅ Scroll trigger element */}
      <div ref={setScrollTrigger} style={{ height: "1px" }} />

      {/* ✅ Below the fold content - Progressive loading */}
      {(showBelowFold || isScrollTriggered) && (
        <div className="below-fold-content">
          <ToursSection
            title={sectionsData.attraction.title}
            des={sectionsData.attraction.description}
            tourType={sectionsData.attraction.type}
          />

          <ToursSection
            title={sectionsData.day.title}
            des={sectionsData.day.description}
            tourType={sectionsData.day.type}
          />

          <ToursSection
            title={sectionsData.multi.title}
            des={sectionsData.multi.description}
            tourType={sectionsData.multi.type}
          />

          <DestinationSection
            title="Top Destinations"
            des="Explore Italy's top destinations, from famous cities like Rome, Venice, and Florence to beautiful spots like the Amalfi Coast and Cinque Terre. Book your unforgettable Italy trip now and experience ancient ruins, coastal views, and more!"
          />

          <AboutSection />

          <WhyChooseSection
            title="Why Choose Dream Tourism to Book Tour Tickets Online"
            des="Experience Quality and Excellence with DreamTourism"
          />

          <TestimonialSection
            title="See Why Travelers Recommend Us for Booking Tour Tickets"
            des="Join thousands of happy travelers with Dream Tourism, Italy's top-rated tour operator. Check our 5-star reviews on TripAdvisor, Viator, and Google to see why customers love our unforgettable tours. Book your Italy adventure today!"
            isVisible={isScrollTriggered}
          />

          <FAQSection />

          <BlogSection title="Discover New Destinations and Travel Tips on Our Blog" />
        </div>
      )}
    </main>
  );
};

export default OptimizedMainHome;
