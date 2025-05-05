"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";
import "../../../styles/weather.scss";

import TourSnapShot from "./TourSnapShot";
import Overview from "./Overview";
import SidebarRight from "./SidebarRight";
import TestimonialSectionSingleTour from "../../section/Testimonial/TestimonialSectionSingleTour";
import ImportantInfo from "./ImportantInfo";
import Itinerary from "./itinerary/index";
import Tours from "@/components/tours/Tours";
import TourGallery from "./TourGallery";

export default function TourSinglePage({ tour, itenarayItems }) {
  const width = useWindowSize();
  const isMobile = width < 768;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("about");
  const [tabsOverflow, setTabsOverflow] = useState(false);
  const tabsContainerRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  // Refs for scrolling to sections
  const aboutRef = useRef(null);
  const detailsRef = useRef(null);
  const itineraryRef = useRef(null);
  const relatedToursRef = useRef(null);
  const tabsWrapperRef = useRef(null);

  // Handle image click to open lightbox
  const openLightbox = (index) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = "hidden";
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    // Restore body scrolling
    document.body.style.overflow = "";
  };

  // Navigate through images in lightbox
  const navigateImage = (direction) => {
    const newIndex = activeImageIndex + direction;
    if (newIndex >= 0 && newIndex < tour?.slideImg?.length) {
      setActiveImageIndex(newIndex);
    }
  };

  // Function to scroll to section
  const scrollToSection = (sectionRef, tabName) => {
    setActiveTab(tabName);
    if (sectionRef.current) {
      const yOffset = -100; // Adjust this value for header height or any offset
      const y =
        sectionRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Function to scroll tab into view when selected
  const scrollTabIntoView = (tabName) => {
    if (tabsContainerRef.current) {
      const tabElement = tabsContainerRef.current.querySelector(
        `[data-tab="${tabName}"]`
      );
      if (tabElement) {
        const containerRect = tabsContainerRef.current.getBoundingClientRect();
        const tabRect = tabElement.getBoundingClientRect();

        // If tab is not fully visible, scroll it into view
        if (
          tabRect.left < containerRect.left ||
          tabRect.right > containerRect.right
        ) {
          tabsContainerRef.current.scrollLeft +=
            tabRect.left -
            containerRect.left -
            containerRect.width / 2 +
            tabRect.width / 2;
        }
      }
    }
  };

  // Combined function for tab click
  const handleTabClick = (sectionRef, tabName) => {
    scrollToSection(sectionRef, tabName);
    scrollTabIntoView(tabName);
  };

  // Check for tabs overflow and handle sticky behavior
  useEffect(() => {
    const checkTabsOverflow = () => {
      if (tabsContainerRef.current) {
        const { scrollWidth, clientWidth } = tabsContainerRef.current;
        setTabsOverflow(scrollWidth > clientWidth);
      }
    };

    const handleScroll = () => {
      if (tabsWrapperRef.current) {
        const rect = tabsWrapperRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      }
    };

    checkTabsOverflow();
    window.addEventListener("resize", checkTabsOverflow);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkTabsOverflow);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Add this after the other useEffect
  useEffect(() => {
    // Set initial active tab based on scroll position
    setActiveTab("about");

    // Set up intersection observer to detect which section is in view
    const observerOptions = {
      root: null, // viewport is the root
      rootMargin: "-80px 0px -50% 0px", // Adjusted for better detection
      threshold: 0, // Trigger as soon as any part of the element is visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Get the section id and update active tab
          const sectionId = entry.target.getAttribute("data-section");
          if (sectionId) {
            setActiveTab(sectionId);
            scrollTabIntoView(sectionId);
          }
        }
      });
    }, observerOptions);

    // Add data-section attribute to each section and observe them
    if (aboutRef.current) {
      aboutRef.current.setAttribute("data-section", "about");
      sectionObserver.observe(aboutRef.current);
    }

    if (detailsRef.current) {
      detailsRef.current.setAttribute("data-section", "details");
      sectionObserver.observe(detailsRef.current);
    }

    if (itineraryRef.current && itenarayItems?.length > 0) {
      itineraryRef.current.setAttribute("data-section", "itinerary");
      sectionObserver.observe(itineraryRef.current);
    }

    if (relatedToursRef.current) {
      relatedToursRef.current.setAttribute("data-section", "related");
      sectionObserver.observe(relatedToursRef.current);
    }

    // Manually check which section is in view on initial load
    setTimeout(() => {
      const scrollPosition = window.scrollY + 100; // Add offset for header

      // Check which section is currently in view
      let currentSection = "about";

      if (
        detailsRef.current &&
        scrollPosition >= detailsRef.current.offsetTop
      ) {
        currentSection = "details";
      }

      if (
        itineraryRef.current &&
        scrollPosition >= itineraryRef.current.offsetTop
      ) {
        currentSection = "itinerary";
      }

      if (
        relatedToursRef.current &&
        scrollPosition >= relatedToursRef.current.offsetTop
      ) {
        currentSection = "related";
      }

      setActiveTab(currentSection);
    }, 300);

    return () => {
      // Clean up observer when component unmounts
      sectionObserver.disconnect();
    };
  }, [itenarayItems]);

  return (
    <>
      {/* Image Gallery with Skeleton Loading */}
      <TourGallery tour={tour} openLightbox={openLightbox} />

      {/* Navigation Tabs */}
      <div
        id="sticky-tabs-wrapper"
        ref={tabsWrapperRef}
        className="sticky-tabs-wrapper"
      >
        <div className={`sticky-tabs-container ${isSticky ? "is-sticky" : ""}`}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div
                  className="tourTabs border-bottom-light"
                  ref={tabsContainerRef}
                >
                  <div className="tourTabs__content">
                    <button
                      className={`tourTabs__button ${
                        activeTab === "about" ? "is-active" : ""
                      }`}
                      onClick={() => handleTabClick(aboutRef, "about")}
                      data-tab="about"
                    >
                      About
                    </button>
                    <button
                      className={`tourTabs__button ${
                        activeTab === "details" ? "is-active" : ""
                      }`}
                      onClick={() => handleTabClick(detailsRef, "details")}
                      data-tab="details"
                    >
                      Details
                    </button>
                    {itenarayItems?.length > 0 && (
                      <button
                        className={`tourTabs__button ${
                          activeTab === "itinerary" ? "is-active" : ""
                        }`}
                        onClick={() =>
                          handleTabClick(itineraryRef, "itinerary")
                        }
                        data-tab="itinerary"
                      >
                        Itinerary
                      </button>
                    )}
                    <button
                      className={`tourTabs__button ${
                        activeTab === "related" ? "is-active" : ""
                      }`}
                      onClick={() => handleTabClick(relatedToursRef, "related")}
                      data-tab="related"
                    >
                      You might also like
                    </button>
                  </div>
                  {tabsOverflow && (
                    <div className="tourTabs__arrows">
                      <button
                        className="tourTabs__arrow -prev"
                        onClick={() => {
                          if (tabsContainerRef.current) {
                            tabsContainerRef.current.scrollLeft -= 100;
                          }
                        }}
                      >
                        <i className="icon-arrow-left"></i>
                      </button>
                      <button
                        className="tourTabs__arrow -next"
                        onClick={() => {
                          if (tabsContainerRef.current) {
                            tabsContainerRef.current.scrollLeft += 100;
                          }
                        }}
                      >
                        <i className="icon-arrow-right"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Navigation Tabs */}

      {/* Centered Lightbox for image view */}
      {lightboxOpen && (
        <div className="centered-lightbox">
          <div className="lightbox-overlay" onClick={closeLightbox}>
            <div className="lightbox-counter">
              {activeImageIndex + 1} / {tour?.slideImg?.length}
            </div>

            <button className="lightbox-close" onClick={closeLightbox}>
              <span className="close-icon">×</span>
            </button>

            <button
              className="lightbox-nav lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage(-1);
              }}
              disabled={activeImageIndex === 0}
            >
              <i className="icon icon-chevron-left text-24 text-white"></i>
            </button>

            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={tour?.slideImg[activeImageIndex] || "/placeholder.svg"}
                alt={`${tour?.title} - Fullscreen`}
                width={1000}
                height={600}
                style={{ height: "auto" }}
                sizes="90vw"
                className="lightbox-image"
                priority
              />
            </div>

            <button
              className="lightbox-nav lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage(1);
              }}
              disabled={activeImageIndex === tour?.slideImg?.length - 1}
            >
              <i className="icon icon-chevron-right text-24 text-white"></i>
            </button>
          </div>
        </div>
      )}

      {/* Tour Content Section */}
      <section className="pt-40" ref={aboutRef}>
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-8">
              <h2 className="text-22 sm:text-18 fw-600">About</h2>
              <div className="mb-8">
                <Overview data={tour} />
              </div>

              {!isMobile && <TourSnapShot data={tour} />}

              {!isMobile && <TestimonialSectionSingleTour title={"Reviews"} />}
            </div>

            {!isMobile && (
              <div className="col-xl-4">
                <SidebarRight data={tour} />
              </div>
            )}
          </div>
          {isMobile && (
            <div style={{ marginTop: "" }}>
              <div className="col-xl-4 mt-20">
                <SidebarRight data={tour} />
              </div>
              <TourSnapShot data={tour} />
              <TestimonialSectionSingleTour title={"Reviews"} />
            </div>
          )}
          {/* End .col-xl-4 */}
        </div>
        {/* End .row */}
      </section>

      {/* Details Section */}
      <section className="pt-40" ref={detailsRef}>
        <div className="container">
          <div className="">
            <ImportantInfo data={tour} />
          </div>
          {/* End pt-40 */}
        </div>
        {/* End .container */}
      </section>
      {/* End Details Section */}

      {/* Itinerary Section */}
      {itenarayItems?.length > 0 && (
        <section className="border-top-light mt-40 pt-40" ref={itineraryRef}>
          <div className="container">
            <h2 className="text-22 fw-600 mb-20">Itinerary</h2>
            <Itinerary itenarayItems={itenarayItems} />
          </div>
        </section>
      )}
      {/* End Itinerary Section */}

      {/* You might also like Section */}
      <section
        className="layout-pt-lg layout-pb-lg mt-50 border-top-light"
        ref={relatedToursRef}
      >
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-12">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title text-22 sm:text-18 fw-600">
                  You might also like...
                </h2>
                <p className="sectionTitle__text mt-5 sm:mt-0">
                  Explore Our Best Sellers: Unmatched Experiences in Every
                  Journey
                </p>
              </div>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}

          <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
            <Tours filterTour={tour?.title} />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End You might also like Section */}

      {/* CSS for the lightbox and tabs */}
      <style jsx global>{`
        /* Centered Lightbox Styles */
        .centered-lightbox {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
        }

        .lightbox-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-content {
          position: relative;
          max-width: 80%;
          max-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-image {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
        }

        .lightbox-counter {
          position: absolute;
          top: 15px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          font-size: 16px;
          font-weight: 500;
          z-index: 10;
        }

        .lightbox-close {
          position: absolute;
          top: 15px;
          left: 15px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: transparent;
          border: 1px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          cursor: pointer;
          z-index: 10;
          padding: 0;
          line-height: 1;
        }

        .close-icon {
          margin-top: -2px;
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background 0.3s ease;
        }

        .lightbox-nav:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .lightbox-nav:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .lightbox-prev {
          left: 20px;
        }

        .lightbox-next {
          right: 20px;
        }

        /* Sticky Navigation Tabs Styles */
        .sticky-tabs-container.is-sticky {
          position: fixed;
          top: 80px; /* Adjusted to match your layout */
          left: 0;
          right: 0;
          z-index: 50; /* Lowered z-index to ensure it's below dropdowns and popups */
          background-color: white;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
        .sticky-tabs-wrapper {
          height: auto;
          width: 100%;
        }

        .sticky-tabs-container {
          width: 100%;
          transition: all 0.3s ease;
        }

        .sticky-tabs-container.is-sticky {
          position: fixed;
          top: 80px; /* Adjusted to match your layout */
          left: 0;
          right: 0;
          z-index: 50; /* Lowered z-index to ensure it's below dropdowns and popups */
          background-color: white;
          border-top: 1px solid rgba(0, 0, 0, 0.1); /* Light border on top instead of shadow */
        }

        .tourTabs {
          width: 100%;
          margin-bottom: -1px;
          padding: 10px 0;
        }

        .tourTabs__content {
          display: flex;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          white-space: nowrap;
          padding: 0 10px;
        }

        .tourTabs__content::-webkit-scrollbar {
          display: none;
        }

        .tourTabs__button {
          position: relative;
          padding: 0 5px 15px;
          margin: 0 15px;
          font-size: 18px;
          font-weight: 500;
          color: var(--color-dark-1);
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          white-space: nowrap;
        }

        .tourTabs__button:first-child {
          margin-left: 0;
        }

        .tourTabs__button:last-child {
          margin-right: 0;
        }

        .tourTabs__button.is-active {
          color: var(--color-blue-1);
        }

        .tourTabs__button.is-active::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background-color: var(--color-blue-1);
        }

        .tourTabs__arrows {
          position: absolute;
          top: 0;
          right: 0;
          display: flex;
          align-items: center;
          height: 100%;
        }

        .tourTabs__arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: var(--color-white);
          border: 1px solid var(--color-border);
          color: var(--color-dark-1);
          cursor: pointer;
          transition: all 0.3s;
          margin-left: 5px;
        }

        .tourTabs__arrow:hover {
          background-color: var(--color-blue-1);
          color: var(--color-white);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .lightbox-content {
            max-width: 90%;
          }

          .lightbox-nav {
            width: 40px;
            height: 40px;
          }

          .lightbox-prev {
            left: 10px;
          }

          .lightbox-next {
            right: 10px;
          }

          .tourTabs__button {
            font-size: 16px;
            padding: 0 5px 10px;
            margin: 0 10px;
          }

          .tourTabs__content {
            padding: 0 5px;
          }
        }

        @media (max-width: 480px) {
          .tourTabs__button {
            font-size: 14px;
            padding: 0 3px 10px;
            margin: 0 8px;
          }
        }
      `}</style>
    </>
  );
}
