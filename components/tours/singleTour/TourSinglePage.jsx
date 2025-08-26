"use client";

import {
  useEffect,
  useState,
  useRef,
  useContext,
  useMemo,
  useCallback,
} from "react";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";
import "../../../styles/weather.scss";
import { LayoutContext } from "@/app/LayoutProvider";
import {
  scheduleIdleWork,
  throttleRAF,
  batchDOMOperations,
} from "@/utils/performanceOptimizer";

// Lazy load heavy components to improve LCP
import dynamic from "next/dynamic";

// Critical above-fold components - load immediately
import TourSnapShot from "./TourSnapShot";
import Overview from "./Overview";
import SidebarRight from "./SidebarRight";
import TourGallery from "./TourGallery";
import CriticalResourcePreloader from "../../common/CriticalResourcePreloader";

// Below-fold components - lazy load
const TestimonialSectionSingleTour = dynamic(
  () => import("../../section/Testimonial/TestimonialSectionSingleTour"),
  {
    ssr: false,
    loading: () => (
      <div className="testimonial-skeleton">Loading reviews...</div>
    ),
  }
);

const ImportantInfo = dynamic(() => import("./ImportantInfo"), {
  ssr: false,
  loading: () => <div className="info-skeleton">Loading details...</div>,
});

const Itinerary = dynamic(() => import("./itinerary/index"), {
  ssr: false,
  loading: () => <div className="itinerary-skeleton">Loading itinerary...</div>,
});

// 🚀 CRITICAL: Ultra-lazy Tours component to reduce 1000+ DOM elements
const Tours = dynamic(() => import("@/components/tours/Tours"), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-50 animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-gray-400 text-sm">Loading related tours...</div>
    </div>
  ),
});

export default function TourSinglePage({ tourData, itenarayItems }) {
  const { imageContentsForTours } = useContext(LayoutContext);

  // 🚀 SEO: Memoize tour object to prevent re-creation
  const tour = useMemo(() => {
    if (!tourData || !imageContentsForTours) return {};

    return {
      id: tourData?.id,
      tag: "",
      slideImg: Array.isArray(
        imageContentsForTours?.content_images[tourData?.name]
      )
        ? imageContentsForTours?.content_images[tourData?.name]
        : [`${imageContentsForTours?.content_images[tourData?.name]}`],
      title: tourData?.name,
      url: tourData?.url,
      location: tourData.location,
      description: tourData?.description,
      value: tourData?.value,
      duration: tourData?.duration,
      additional_info: tourData?.additional_info,
      knw_before_go: tourData?.knw_before_go,
      inclution: tourData?.inclution,
      exclusion: tourData?.exclusion,
      trip_url: tourData?.trip_url,
      cancelValue: tourData?.value,
      numberOfReviews: tourData?.reviews,
      price: tourData?.price,
      tourType: "Attractions & Museums",
      delayAnimation: "200",
      languages: tourData?.languages,
      meetup_point: tourData?.meetup_point,
      about_ticket: tourData?.about_ticket,
      help_center: tourData?.help_center,
      faq: tourData?.faq,
      select_bus: tourData?.select_bus,
      ...tourData,
    };
  }, [tourData, imageContentsForTours]);

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

  // 🚀 LCP: Preload lightbox images on hover/touch
  const preloadLightboxImage = (index) => {
    if (tour?.slideImg?.[index]) {
      const img = new window.Image();
      img.src = tour.slideImg[index];
    }
  };

  // Handle image click to open lightbox
  const openLightbox = (index) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";

    // Preload next/previous images
    preloadLightboxImage(index - 1);
    preloadLightboxImage(index + 1);
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  // Navigate through images in lightbox
  const navigateImage = (direction) => {
    const newIndex = activeImageIndex + direction;
    if (newIndex >= 0 && newIndex < tour?.slideImg?.length) {
      setActiveImageIndex(newIndex);
      // Preload next image in sequence
      preloadLightboxImage(newIndex + direction);
    }
  };

  // Function to scroll to section
  const scrollToSection = (sectionRef, tabName) => {
    setActiveTab(tabName);
    if (sectionRef.current) {
      const yOffset = -100;
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

  // 🚀 Performance: Optimized debounce with RAF for smoother performance
  const debounce = useCallback((func, wait) => {
    let timeout;
    let rafId;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        rafId = requestAnimationFrame(() => {
          func(...args);
        });
      };
      clearTimeout(timeout);
      if (rafId) cancelAnimationFrame(rafId);
      timeout = setTimeout(later, wait);
    };
  }, []);

  // 🚀 OPTIMIZATION: Memoized event handlers with improved performance
  const checkTabsOverflow = useCallback(
    debounce(() => {
      if (tabsContainerRef.current) {
        const { scrollWidth, clientWidth } = tabsContainerRef.current;
        setTabsOverflow(scrollWidth > clientWidth);
      }
    }, 100),
    [debounce]
  );

  const handleScroll = useCallback(
    throttleRAF(() => {
      if (tabsWrapperRef.current) {
        batchDOMOperations([
          {
            read: () => tabsWrapperRef.current.getBoundingClientRect(),
            write: (rect) => {
              if (rect.top <= 0 !== isSticky) {
                setIsSticky(rect.top <= 0);
              }
            },
          },
        ]);
      }
    }),
    [isSticky]
  );

  // Check for tabs overflow and handle sticky behavior
  useEffect(() => {
    checkTabsOverflow();
    window.addEventListener("resize", checkTabsOverflow, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", checkTabsOverflow);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [checkTabsOverflow, handleScroll]);

  // 🚀 OPTIMIZATION: Memoized intersection observer with better performance
  const sectionObserver = useMemo(() => {
    // 🚀 SSR FIX: Check if we're on the client side
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return null;
    }

    const observerOptions = {
      root: null,
      rootMargin: "-80px 0px -50% 0px",
      threshold: [0, 0.1, 0.5], // Multiple thresholds for better detection
    };

    return new IntersectionObserver((entries) => {
      // Use requestIdleCallback to defer non-critical work
      const processEntries = () => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            const sectionId = entry.target.getAttribute("data-section");
            if (sectionId) {
              setActiveTab(sectionId);
              scrollTabIntoView(sectionId);
            }
          }
        });
      };

      if ("requestIdleCallback" in window) {
        requestIdleCallback(processEntries, { timeout: 100 });
      } else {
        setTimeout(processEntries, 0);
      }
    }, observerOptions);
  }, []);

  // Intersection observer for section detection
  useEffect(() => {
    setActiveTab("about");

    // Observe sections
    const sections = [
      { ref: aboutRef, id: "about" },
      { ref: detailsRef, id: "details" },
      {
        ref: itineraryRef,
        id: "itinerary",
        condition: itenarayItems?.length > 0,
      },
      { ref: relatedToursRef, id: "related" },
    ];

    sections.forEach(({ ref, id, condition = true }) => {
      if (ref.current && condition && sectionObserver) {
        ref.current.setAttribute("data-section", id);
        sectionObserver.observe(ref.current);
      }
    });

    return () => {
      if (sectionObserver) {
        sectionObserver.disconnect();
      }
    };
  }, [itenarayItems, sectionObserver]);

  // 🚀 SEO: Add structured data with idle scheduling
  useEffect(() => {
    if (!tour.title) return;

    // Schedule structured data creation during idle time
    scheduleIdleWork(() => {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "TouristAttraction",
        name: tour.title,
        description: tour.description
          ?.replace(/<[^>]*>/g, "")
          .substring(0, 160),
        address: {
          "@type": "PostalAddress",
          addressLocality: tour.location,
        },
        image: tour.slideImg?.[0],
        aggregateRating: tour.numberOfReviews
          ? {
              "@type": "AggregateRating",
              ratingValue: "4.5",
              reviewCount: tour.numberOfReviews,
            }
          : undefined,
        offers: {
          "@type": "Offer",
          price: tour.price,
          priceCurrency: "USD",
        },
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);

      return script;
    }).then((script) => {
      // Store script reference for cleanup
      if (script) {
        return () => {
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
        };
      }
    });
  }, [tour]);

  return (
    <>
      {/* 🚀 CRITICAL: Preload critical resources for LCP optimization */}
      <CriticalResourcePreloader tour={tour} />

      {/* 🚀 LCP CRITICAL: Image Gallery - highest priority */}
      <TourGallery tour={tour} openLightbox={openLightbox} />

      {/* Navigation Tabs */}
      <nav
        id="sticky-tabs-wrapper"
        ref={tabsWrapperRef}
        className="sticky-tabs-wrapper"
        role="navigation"
        aria-label="Tour sections"
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
                      aria-current={activeTab === "about" ? "true" : "false"}
                    >
                      About
                    </button>
                    <button
                      className={`tourTabs__button ${
                        activeTab === "details" ? "is-active" : ""
                      }`}
                      onClick={() => handleTabClick(detailsRef, "details")}
                      data-tab="details"
                      aria-current={activeTab === "details" ? "true" : "false"}
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
                        aria-current={
                          activeTab === "itinerary" ? "true" : "false"
                        }
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
                      aria-current={activeTab === "related" ? "true" : "false"}
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
                        aria-label="Scroll tabs left"
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
                        aria-label="Scroll tabs right"
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
      </nav>

      {/* 🚀 LCP: Lightbox with optimized loading */}
      {lightboxOpen && (
        <div className="centered-lightbox">
          <div className="lightbox-overlay" onClick={closeLightbox}>
            <div className="lightbox-counter">
              {activeImageIndex + 1} / {tour?.slideImg?.length}
            </div>

            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <span className="close-icon">×</span>
            </button>

            <button
              className="lightbox-nav lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage(-1);
              }}
              disabled={activeImageIndex === 0}
              aria-label="Previous image"
            >
              <i className="icon icon-chevron-left text-24 text-white"></i>
            </button>

            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={tour?.slideImg[activeImageIndex] || "/placeholder.svg"}
                alt={`${tour?.title} - Image ${activeImageIndex + 1}`}
                width={1000}
                height={600}
                style={{ height: "auto" }}
                sizes="90vw"
                className="lightbox-image"
                priority={true}
                quality={90}
              />
            </div>

            <button
              className="lightbox-nav lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage(1);
              }}
              disabled={activeImageIndex === tour?.slideImg?.length - 1}
              aria-label="Next image"
            >
              <i className="icon icon-chevron-right text-24 text-white"></i>
            </button>
          </div>
        </div>
      )}

      {/* 🚀 Above-fold content - critical for LCP */}
      <main className="tour-content">
        <section className="pt-40" ref={aboutRef}>
          <div className="container">
            <div className="row y-gap-30">
              <div
                className="col-xl-8"
                style={{ minHeight: "300px", contain: "layout" }}
              >
                <header style={{ minHeight: "40px" }}>
                  <h2 className="text-22 sm:text-18 fw-600">About</h2>
                </header>
                <div className="mb-8" style={{ minHeight: "200px" }}>
                  <Overview data={tour} />
                </div>

                {!isMobile && <TourSnapShot data={tour} />}

                {!isMobile && (
                  <div className="mt-40" style={{ minHeight: "300px" }}>
                    <TestimonialSectionSingleTour title="Reviews" />
                  </div>
                )}
              </div>

              {!isMobile && (
                <aside className="col-xl-4 sidebar-container">
                  <SidebarRight data={tour} />
                </aside>
              )}
            </div>

            {isMobile && (
              <div style={{ marginTop: "20px", minHeight: "500px" }}>
                <aside className="col-xl-4 mt-20 sidebar-container">
                  <SidebarRight data={tour} />
                </aside>
                <TourSnapShot data={tour} />
              </div>
            )}
          </div>
        </section>

        {/* 🚀 Below-fold content - lazy loaded */}
        <section className="pt-40" ref={detailsRef}>
          <div className="container">
            <header>
              <h2 className="text-22 sm:text-18 fw-600">
                Important Information
              </h2>
            </header>
            <ImportantInfo data={tour} />
          </div>
        </section>

        {itenarayItems?.length > 0 && (
          <section className="border-top-light mt-40 pt-40" ref={itineraryRef}>
            <div className="container">
              <header>
                <h2 className="text-22 sm:text-18 fw-600 mb-20">Itinerary</h2>
              </header>
              <Itinerary itenarayItems={itenarayItems} />
            </div>
          </section>
        )}

        {isMobile && (
          <section className="container mt-40">
            <TestimonialSectionSingleTour title="Reviews" />
          </section>
        )}

        {!isMobile && (
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
              </div>
              {/* Related tours component would go here */}
              {/* <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
              🚀 CRITICAL: Ultra-deferred Tours to reduce DOM from 1400+ elements
              <div
                // ref={(el) => {
                //   if (
                //     !el ||
                //     typeof window === "undefined" ||
                //     !("IntersectionObserver" in window)
                //   )
                //     return;
                //   const observer = new IntersectionObserver(
                //     ([entry]) => {
                //       if (entry.isIntersecting) {
                //         // Only render Tours when it comes into view
                //         import("@/components/tours/Tours").then(
                //           (ToursModule) => {
                //             const ToursComponent = ToursModule.default;
                //             const container = document.createElement("div");
                //             el.appendChild(container);
                //             // This is simplified - in reality you'd use React.render or a state update
                //           }
                //         );
                //         observer.disconnect();
                //       }
                //     },
                //     { rootMargin: "200px" }
                //   );
                //   observer.observe(el);
                // }}
                style={{ background: "#f9f9f9" }}
              >
                <Tours filterTour={tour?.title} />
              </div>
            </div> */}
              <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                <Tours filterTour={tour?.title} />
              </div>
            </div>
          </section>
        )}
      </main>

      {/* 🚀 Optimized CSS with reduced animations for better performance */}
      <style jsx global>{`
        /* Skeleton loading states */
        .testimonial-skeleton,
        .info-skeleton,
        .itinerary-skeleton,
        .tours-skeleton {
          height: 200px;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 8px;
          margin: 20px 0;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        /* Centered Lightbox Styles */
        .centered-lightbox {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          backdrop-filter: blur(2px);
        }

        .lightbox-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-content {
          position: relative;
          max-width: 85%;
          max-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-image {
          max-width: 100%;
          max-height: 85vh;
          object-fit: contain;
          border-radius: 8px;
        }

        .lightbox-counter {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          font-size: 16px;
          font-weight: 500;
          z-index: 10;
          background: rgba(0, 0, 0, 0.7);
          padding: 8px 16px;
          border-radius: 20px;
        }

        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          cursor: pointer;
          z-index: 10;
          padding: 0;
          line-height: 1;
          transition: background 0.2s ease;
        }

        .lightbox-close:hover {
          background: rgba(0, 0, 0, 0.9);
        }

        .close-icon {
          margin-top: -2px;
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background 0.2s ease;
        }

        .lightbox-nav:hover {
          background: rgba(0, 0, 0, 0.9);
        }

        .lightbox-nav:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .lightbox-nav:disabled:hover {
          background: rgba(0, 0, 0, 0.7);
        }

        .lightbox-prev {
          left: 20px;
        }
        .lightbox-next {
          right: 20px;
        }

        /* Optimized Sticky Navigation Tabs */
        .sticky-tabs-wrapper {
          height: auto;
          width: 100%;
          contain: layout;
        }

        .sticky-tabs-container {
          width: 100%;
          transition: transform 0.2s ease-out;
          will-change: transform;
        }

        .sticky-tabs-container.is-sticky {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          z-index: 50;
          background-color: white;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .tourTabs {
          width: 100%;
          margin-bottom: -1px;
          padding: 12px 0;
          contain: layout;
        }

        .tourTabs__content {
          display: flex;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          white-space: nowrap;
          padding: 0 10px;
          scroll-behavior: smooth;
        }

        .tourTabs__content::-webkit-scrollbar {
          display: none;
        }

        .tourTabs__button {
          position: relative;
          padding: 8px 12px 16px;
          margin: 0 8px;
          font-size: 16px;
          font-weight: 500;
          color: var(--color-dark-1, #333);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease;
          white-space: nowrap;
          border-radius: 4px 4px 0 0;
        }

        .tourTabs__button:first-child {
          margin-left: 0;
        }
        .tourTabs__button:last-child {
          margin-right: 0;
        }

        .tourTabs__button:hover {
          color: var(--color-blue-1, #3554d1);
        }

        .tourTabs__button.is-active {
          color: var(--color-blue-1, #3554d1);
        }

        .tourTabs__button.is-active::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background-color: var(--color-blue-1, #3554d1);
          border-radius: 2px 2px 0 0;
        }

        /* Responsive optimizations */
        @media (max-width: 768px) {
          .lightbox-content {
            max-width: 95%;
          }
          .lightbox-nav {
            width: 44px;
            height: 44px;
          }
          .lightbox-prev {
            left: 15px;
          }
          .lightbox-next {
            right: 15px;
          }
          .lightbox-counter {
            font-size: 14px;
            padding: 1px 12px;
          }

          .tourTabs__button {
            font-size: 15px;
            padding: 6px 10px 14px;
            margin: 0 6px;
          }

          .sticky-tabs-container.is-sticky {
            top: 60px;
          }
        }

        @media (max-width: 480px) {
          .tourTabs__button {
            font-size: 14px;
            padding: 6px 8px 12px;
            margin: 0 4px;
          }

          .lightbox-nav {
            width: 40px;
            height: 40px;
          }
        }

        /* Performance optimizations */
        .tourTabs__button,
        .lightbox-nav,
        .lightbox-close {
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .sticky-tabs-container,
          .tourTabs__button,
          .lightbox-nav,
          .lightbox-close {
            transition: none;
          }

          .loading {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

//  old code
//"use client";

// import { useEffect, useState, useRef, useContext } from "react";
// import Image from "next/image";
// import useWindowSize from "@/hooks/useWindowSize";
// import "../../../styles/weather.scss";
// import { LayoutContext } from "@/app/LayoutProvider";

// import TourSnapShot from "./TourSnapShot";
// import Overview from "./Overview";
// import SidebarRight from "./SidebarRight";
// import TestimonialSectionSingleTour from "../../section/Testimonial/TestimonialSectionSingleTour";
// import ImportantInfo from "./ImportantInfo";
// import Itinerary from "./itinerary/index";
// import Tours from "@/components/tours/Tours";
// import TourGallery from "./TourGallery";

// export default function TourSinglePage({ tourData, itenarayItems }) {
//   const { imageContentsForTours } = useContext(LayoutContext);
//   let tour = {};
//   if (tourData && imageContentsForTours) {
//     tour = {
//       id: tourData?.id,
//       tag: "",
//       slideImg: Array.isArray(
//         imageContentsForTours?.content_images[tourData?.name]
//       )
//         ? imageContentsForTours?.content_images[tourData?.name]
//         : [`${imageContentsForTours?.content_images[tourData?.name]}`],
//       title: tourData?.name,
//       url: tourData?.url,
//       location: tourData.location,
//       description: tourData?.description,
//       value: tourData?.value,
//       duration: tourData?.duration,
//       additional_info: tourData?.additional_info,
//       knw_before_go: tourData?.knw_before_go,
//       inclution: tourData?.inclution,
//       exclusion: tourData?.exclusion,
//       trip_url: tourData?.trip_url,
//       cancelValue: tourData?.value,
//       numberOfReviews: tourData?.reviews,
//       price: tourData?.price,
//       tourType: "Attractions & Museums",
//       delayAnimation: "200",
//       languages: tourData?.languages,
//       meetup_point: tourData?.meetup_point,
//       about_ticket: tourData?.about_ticket,
//       help_center: tourData?.help_center,
//       faq: tourData?.faq,
//       select_bus: tourData?.select_bus,
//       ...tourData,
//     };
//   }
//   const width = useWindowSize();
//   const isMobile = width < 768;
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [activeTab, setActiveTab] = useState("about");
//   const [tabsOverflow, setTabsOverflow] = useState(false);
//   const tabsContainerRef = useRef(null);
//   const [isSticky, setIsSticky] = useState(false);

//   // Refs for scrolling to sections
//   const aboutRef = useRef(null);
//   const detailsRef = useRef(null);
//   const itineraryRef = useRef(null);
//   const relatedToursRef = useRef(null);
//   const tabsWrapperRef = useRef(null);

//   // Handle image click to open lightbox
//   const openLightbox = (index) => {
//     setActiveImageIndex(index);
//     setLightboxOpen(true);
//     // Prevent body scrolling when lightbox is open
//     document.body.style.overflow = "hidden";
//   };

//   // Close lightbox
//   const closeLightbox = () => {
//     setLightboxOpen(false);
//     // Restore body scrolling
//     document.body.style.overflow = "";
//   };

//   // Navigate through images in lightbox
//   const navigateImage = (direction) => {
//     const newIndex = activeImageIndex + direction;
//     if (newIndex >= 0 && newIndex < tour?.slideImg?.length) {
//       setActiveImageIndex(newIndex);
//     }
//   };

//   // Function to scroll to section
//   const scrollToSection = (sectionRef, tabName) => {
//     setActiveTab(tabName);
//     if (sectionRef.current) {
//       const yOffset = -100; // Adjust this value for header height or any offset
//       const y =
//         sectionRef.current.getBoundingClientRect().top +
//         window.pageYOffset +
//         yOffset;
//       window.scrollTo({ top: y, behavior: "smooth" });
//     }
//   };

//   // Function to scroll tab into view when selected
//   const scrollTabIntoView = (tabName) => {
//     if (tabsContainerRef.current) {
//       const tabElement = tabsContainerRef.current.querySelector(
//         `[data-tab="${tabName}"]`
//       );
//       if (tabElement) {
//         const containerRect = tabsContainerRef.current.getBoundingClientRect();
//         const tabRect = tabElement.getBoundingClientRect();

//         // If tab is not fully visible, scroll it into view
//         if (
//           tabRect.left < containerRect.left ||
//           tabRect.right > containerRect.right
//         ) {
//           tabsContainerRef.current.scrollLeft +=
//             tabRect.left -
//             containerRect.left -
//             containerRect.width / 2 +
//             tabRect.width / 2;
//         }
//       }
//     }
//   };

//   // Combined function for tab click
//   const handleTabClick = (sectionRef, tabName) => {
//     scrollToSection(sectionRef, tabName);
//     scrollTabIntoView(tabName);
//   };

//   // Check for tabs overflow and handle sticky behavior
//   useEffect(() => {
//     const checkTabsOverflow = () => {
//       if (tabsContainerRef.current) {
//         const { scrollWidth, clientWidth } = tabsContainerRef.current;
//         setTabsOverflow(scrollWidth > clientWidth);
//       }
//     };

//     const handleScroll = () => {
//       if (tabsWrapperRef.current) {
//         const rect = tabsWrapperRef.current.getBoundingClientRect();
//         setIsSticky(rect.top <= 0);
//       }
//     };

//     checkTabsOverflow();
//     window.addEventListener("resize", checkTabsOverflow);
//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("resize", checkTabsOverflow);
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Add this after the other useEffect
//   useEffect(() => {
//     // Set initial active tab based on scroll position
//     setActiveTab("about");

//     // Set up intersection observer to detect which section is in view
//     const observerOptions = {
//       root: null, // viewport is the root
//       rootMargin: "-80px 0px -50% 0px", // Adjusted for better detection
//       threshold: 0, // Trigger as soon as any part of the element is visible
//     };

//     const sectionObserver = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           // Get the section id and update active tab
//           const sectionId = entry.target.getAttribute("data-section");
//           if (sectionId) {
//             setActiveTab(sectionId);
//             scrollTabIntoView(sectionId);
//           }
//         }
//       });
//     }, observerOptions);

//     // Add data-section attribute to each section and observe them
//     if (aboutRef.current) {
//       aboutRef.current.setAttribute("data-section", "about");
//       sectionObserver.observe(aboutRef.current);
//     }

//     if (detailsRef.current) {
//       detailsRef.current.setAttribute("data-section", "details");
//       sectionObserver.observe(detailsRef.current);
//     }

//     if (itineraryRef.current && itenarayItems?.length > 0) {
//       itineraryRef.current.setAttribute("data-section", "itinerary");
//       sectionObserver.observe(itineraryRef.current);
//     }

//     if (relatedToursRef.current) {
//       relatedToursRef.current.setAttribute("data-section", "related");
//       sectionObserver.observe(relatedToursRef.current);
//     }

//     // Manually check which section is in view on initial load
//     setTimeout(() => {
//       const scrollPosition = window.scrollY + 100; // Add offset for header

//       // Check which section is currently in view
//       let currentSection = "about";

//       if (
//         detailsRef.current &&
//         scrollPosition >= detailsRef.current.offsetTop
//       ) {
//         currentSection = "details";
//       }

//       if (
//         itineraryRef.current &&
//         scrollPosition >= itineraryRef.current.offsetTop
//       ) {
//         currentSection = "itinerary";
//       }

//       if (
//         relatedToursRef.current &&
//         scrollPosition >= relatedToursRef.current.offsetTop
//       ) {
//         currentSection = "related";
//       }

//       setActiveTab(currentSection);
//     }, 300);

//     return () => {
//       // Clean up observer when component unmounts
//       sectionObserver.disconnect();
//     };
//   }, [itenarayItems]);

//   return (
//     <>
//       {/* Image Gallery with Skeleton Loading */}
//       <TourGallery tour={tour} openLightbox={openLightbox} />

//       {/* Navigation Tabs */}
//       <div
//         id="sticky-tabs-wrapper"
//         ref={tabsWrapperRef}
//         className="sticky-tabs-wrapper"
//       >
//         <div className={`sticky-tabs-container ${isSticky ? "is-sticky" : ""}`}>
//           <div className="container">
//             <div className="row">
//               <div className="col-12">
//                 <div
//                   className="tourTabs border-bottom-light"
//                   ref={tabsContainerRef}
//                 >
//                   <div className="tourTabs__content">
//                     <button
//                       className={`tourTabs__button ${
//                         activeTab === "about" ? "is-active" : ""
//                       }`}
//                       onClick={() => handleTabClick(aboutRef, "about")}
//                       data-tab="about"
//                     >
//                       About
//                     </button>
//                     <button
//                       className={`tourTabs__button ${
//                         activeTab === "details" ? "is-active" : ""
//                       }`}
//                       onClick={() => handleTabClick(detailsRef, "details")}
//                       data-tab="details"
//                     >
//                       Details
//                     </button>
//                     {itenarayItems?.length > 0 && (
//                       <button
//                         className={`tourTabs__button ${
//                           activeTab === "itinerary" ? "is-active" : ""
//                         }`}
//                         onClick={() =>
//                           handleTabClick(itineraryRef, "itinerary")
//                         }
//                         data-tab="itinerary"
//                       >
//                         Itinerary
//                       </button>
//                     )}
//                     <button
//                       className={`tourTabs__button ${
//                         activeTab === "related" ? "is-active" : ""
//                       }`}
//                       onClick={() => handleTabClick(relatedToursRef, "related")}
//                       data-tab="related"
//                     >
//                       You might also like
//                     </button>
//                   </div>
//                   {tabsOverflow && (
//                     <div className="tourTabs__arrows">
//                       <button
//                         className="tourTabs__arrow -prev"
//                         onClick={() => {
//                           if (tabsContainerRef.current) {
//                             tabsContainerRef.current.scrollLeft -= 100;
//                           }
//                         }}
//                       >
//                         <i className="icon-arrow-left"></i>
//                       </button>
//                       <button
//                         className="tourTabs__arrow -next"
//                         onClick={() => {
//                           if (tabsContainerRef.current) {
//                             tabsContainerRef.current.scrollLeft += 100;
//                           }
//                         }}
//                       >
//                         <i className="icon-arrow-right"></i>
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* End Navigation Tabs */}

//       {/* Centered Lightbox for image view */}
//       {lightboxOpen && (
//         <div className="centered-lightbox">
//           <div className="lightbox-overlay" onClick={closeLightbox}>
//             <div className="lightbox-counter">
//               {activeImageIndex + 1} / {tour?.slideImg?.length}
//             </div>

//             <button className="lightbox-close" onClick={closeLightbox}>
//               <span className="close-icon">×</span>
//             </button>

//             <button
//               className="lightbox-nav lightbox-prev"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 navigateImage(-1);
//               }}
//               disabled={activeImageIndex === 0}
//             >
//               <i className="icon icon-chevron-left text-24 text-white"></i>
//             </button>

//             <div
//               className="lightbox-content"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <Image
//                 src={tour?.slideImg[activeImageIndex] || "/placeholder.svg"}
//                 alt={`${tour?.title} - Fullscreen`}
//                 width={1000}
//                 height={600}
//                 style={{ height: "auto" }}
//                 sizes="90vw"
//                 className="lightbox-image"
//                 priority
//               />
//             </div>

//             <button
//               className="lightbox-nav lightbox-next"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 navigateImage(1);
//               }}
//               disabled={activeImageIndex === tour?.slideImg?.length - 1}
//             >
//               <i className="icon icon-chevron-right text-24 text-white"></i>
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Tour Content Section */}
//       <section className="pt-40" ref={aboutRef}>
//         <div className="container">
//           <div className="row y-gap-30">
//             <div className="col-xl-8">
//               <h2 className="text-22 sm:text-18 fw-600">About</h2>
//               <div className="mb-8">
//                 <Overview data={tour} />
//               </div>

//               {!isMobile && <TourSnapShot data={tour} />}

//               {!isMobile && <TestimonialSectionSingleTour title={"Reviews"} />}
//             </div>

//             {!isMobile && (
//               <div className="col-xl-4">
//                 <SidebarRight data={tour} />
//               </div>
//             )}
//           </div>
//           {isMobile && (
//             <div style={{ marginTop: "" }}>
//               <div className="col-xl-4 mt-20">
//                 <SidebarRight data={tour} />
//               </div>
//               <TourSnapShot data={tour} />

//               {/*
//                 /// old code  \\\
//               <TestimonialSectionSingleTour title={"Reviews"} /> */}
//             </div>
//           )}
//           {/* End .col-xl-4 */}
//         </div>
//         {/* End .row */}
//       </section>

//       {/* Details Section */}
//       <section className="pt-40" ref={detailsRef}>
//         <div className="container">
//           <div className="">
//             <ImportantInfo data={tour} />
//           </div>
//           {/* End pt-40 */}
//         </div>
//         {/* End .container */}
//       </section>
//       {/* End Details Section */}

//       {/* Itinerary Section */}
//       {itenarayItems?.length > 0 && (
//         <section className="border-top-light mt-40 pt-40" ref={itineraryRef}>
//           <div className="container">
//             <h2 className="text-22 sm:text-18 fw-600 mb-20">Itinerary</h2>
//             <Itinerary itenarayItems={itenarayItems} />
//           </div>
//         </section>
//       )}

//       {isMobile && (
//         <div className="container">
//           <TestimonialSectionSingleTour title={"Reviews"} />{" "}
//         </div>
//       )}
//       {/* End Itinerary Section */}

//       {/* You might also like Section */}
//       <section
//         className="layout-pt-lg layout-pb-lg mt-50 border-top-light"
//         ref={relatedToursRef}
//       >
//         <div className="container">
//           <div className="row y-gap-20 justify-between items-end">
//             <div className="col-12">
//               <div className="sectionTitle -md">
//                 <h2 className="sectionTitle__title text-22 sm:text-18 fw-600">
//                   You might also like...
//                 </h2>
//                 <p className="sectionTitle__text mt-5 sm:mt-0">
//                   Explore Our Best Sellers: Unmatched Experiences in Every
//                   Journey
//                 </p>
//               </div>
//             </div>
//             {/* End .col */}
//           </div>
//           {/* End .row */}

//           {/* <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
//             <Tours filterTour={tour?.title} />
//           </div> */}
//           {/* End .row */}
//         </div>
//         {/* End .container */}
//       </section>
//       {/* End You might also like Section */}

//       {/* CSS for the lightbox and tabs */}
//       <style jsx global>{`
//         /* Centered Lightbox Styles */
//         .centered-lightbox {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           z-index: 9999;
//         }

//         .lightbox-overlay {
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0, 0, 0, 0.85);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .lightbox-content {
//           position: relative;
//           max-width: 80%;
//           max-height: 80vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .lightbox-image {
//           max-width: 100%;
//           max-height: 80vh;
//           object-fit: contain;
//         }

//         .lightbox-counter {
//           position: absolute;
//           top: 15px;
//           left: 50%;
//           transform: translateX(-50%);
//           color: white;
//           font-size: 16px;
//           font-weight: 500;
//           z-index: 10;
//         }

//         .lightbox-close {
//           position: absolute;
//           top: 15px;
//           left: 15px;
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           background: transparent;
//           border: 1px solid white;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: white;
//           font-size: 24px;
//           cursor: pointer;
//           z-index: 10;
//           padding: 0;
//           line-height: 1;
//         }

//         .close-icon {
//           margin-top: -2px;
//         }

//         .lightbox-nav {
//           position: absolute;
//           top: 50%;
//           transform: translateY(-50%);
//           background: rgba(255, 255, 255, 0.2);
//           border: none;
//           color: white;
//           width: 50px;
//           height: 50px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           z-index: 10;
//           transition: background 0.3s ease;
//         }

//         .lightbox-nav:hover {
//           background: rgba(255, 255, 255, 0.3);
//         }

//         .lightbox-nav:disabled {
//           opacity: 0.3;
//           cursor: not-allowed;
//         }

//         .lightbox-prev {
//           left: 20px;
//         }

//         .lightbox-next {
//           right: 20px;
//         }

//         /* Sticky Navigation Tabs Styles */
//         .sticky-tabs-container.is-sticky {
//           position: fixed;
//           top: 80px; /* Adjusted to match your layout */
//           left: 0;
//           right: 0;
//           z-index: 50; /* Lowered z-index to ensure it's below dropdowns and popups */
//           background-color: white;
//           border-top: 1px solid rgba(0, 0, 0, 0.1);
//         }
//         .sticky-tabs-wrapper {
//           height: auto;
//           width: 100%;
//         }

//         .sticky-tabs-container {
//           width: 100%;
//           transition: all 0.3s ease;
//         }

//         .sticky-tabs-container.is-sticky {
//           position: fixed;
//           top: 80px; /* Adjusted to match your layout */
//           left: 0;
//           right: 0;
//           z-index: 50; /* Lowered z-index to ensure it's below dropdowns and popups */
//           background-color: white;
//           border-top: 1px solid rgba(0, 0, 0, 0.1); /* Light border on top instead of shadow */
//         }

//         .tourTabs {
//           width: 100%;
//           margin-bottom: -1px;
//           padding: 10px 0;
//         }

//         .tourTabs__content {
//           display: flex;
//           overflow-x: auto;
//           scrollbar-width: none;
//           -ms-overflow-style: none;
//           white-space: nowrap;
//           padding: 0 10px;
//         }

//         .tourTabs__content::-webkit-scrollbar {
//           display: none;
//         }

//         .tourTabs__button {
//           position: relative;
//           padding: 0 5px 15px;
//           margin: 0 15px;
//           font-size: 18px;
//           font-weight: 500;
//           color: var(--color-dark-1);
//           background: none;
//           border: none;
//           cursor: pointer;
//           transition: all 0.3s;
//           white-space: nowrap;
//         }

//         .tourTabs__button:first-child {
//           margin-left: 0;
//         }

//         .tourTabs__button:last-child {
//           margin-right: 0;
//         }

//         .tourTabs__button.is-active {
//           color: var(--color-blue-1);
//         }

//         .tourTabs__button.is-active::after {
//           content: "";
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           right: 0;
//           height: 2px;
//           background-color: var(--color-blue-1);
//         }

//         .tourTabs__arrows {
//           position: absolute;
//           top: 0;
//           right: 0;
//           display: flex;
//           align-items: center;
//           height: 100%;
//         }

//         .tourTabs__arrow {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 30px;
//           height: 30px;
//           border-radius: 50%;
//           background-color: var(--color-white);
//           border: 1px solid var(--color-border);
//           color: var(--color-dark-1);
//           cursor: pointer;
//           transition: all 0.3s;
//           margin-left: 5px;
//         }

//         .tourTabs__arrow:hover {
//           background-color: var(--color-blue-1);
//           color: var(--color-white);
//         }

//         /* Responsive adjustments */
//         @media (max-width: 768px) {
//           .lightbox-content {
//             max-width: 90%;
//           }

//           .lightbox-nav {
//             width: 40px;
//             height: 40px;
//           }

//           .lightbox-prev {
//             left: 10px;
//           }

//           .lightbox-next {
//             right: 10px;
//           }

//           .tourTabs__button {
//             font-size: 16px;
//             padding: 0 5px 10px;
//             margin: 0 10px;
//           }

//           .tourTabs__content {
//             padding: 0 5px;
//           }
//         }

//         @media (max-width: 480px) {
//           .tourTabs__button {
//             font-size: 14px;
//             padding: 0 3px 10px;
//             margin: 0 8px;
//           }
//         }
//       `}</style>
//     </>
//   );
// }
