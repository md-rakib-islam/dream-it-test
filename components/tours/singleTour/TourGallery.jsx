"use client";

import { useState } from "react";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";
import "../../../styles/weather.scss";
import Slider from "react-slick";

import TourSnapShot from "./TourSnapShot";
import Overview from "./Overview";
import SidebarRight from "./SidebarRight";
import TestimonialSectionSingleTour from "./../../section/Testimonial/TestimonialSectionSingleTour";

export default function TourGallery({ tour }) {
  const width = useWindowSize();
  const isMobile = width < 768;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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

  // Function to chunk array into groups
  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // Create image groups for mobile slider (3 images per slide)
  const mobileImageGroups = tour?.slideImg ? chunkArray(tour.slideImg, 3) : [];

  // Slider settings for mobile
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
  };

  // Custom arrow component for slider
  function Arrow(props) {
    let className =
      props.type === "next"
        ? "section-slider-nav -next flex-center button -blue-1 shadow-1 size-40 rounded-full sm:d-none"
        : "section-slider-nav -prev flex-center button -blue-1 shadow-1 size-40 rounded-full sm:d-none ";
    className += " arrow";
    const char =
      props.type === "next" ? (
        <>
          <i className="icon icon-chevron-right text-12 text-light"></i>
        </>
      ) : (
        <>
          <span className="icon icon-chevron-left text-12 text-light"></span>
        </>
      );
    return (
      <button className={className} onClick={props.onClick}>
        {char}
      </button>
    );
  }

  return (
    <>
      {/* Image Gallery - Grid for Desktop, Grid Slider for Mobile */}
      <section className="pt-40 js-pin-container">
        <div className="container">
          {!isMobile ? (
            // Desktop Grid Layout
            <div className="gallery-grid">
              {tour?.slideImg?.length > 0 && (
                <div className="gallery-grid-container">
                  {/* First large image (left) */}
                  <div
                    className="gallery-item gallery-item-large-left"
                    onClick={() => openLightbox(0)}
                  >
                    <Image
                      src={tour.slideImg[0] || "/placeholder.svg"}
                      alt={`${tour?.title} - Image 1`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover rounded-4"
                      priority={true}
                    />
                  </div>

                  {/* Center large image */}
                  {tour?.slideImg?.length > 1 && (
                    <div
                      className="gallery-item gallery-item-large-center"
                      onClick={() => openLightbox(1)}
                    >
                      <Image
                        src={tour.slideImg[1] || "/placeholder.svg"}
                        alt={`${tour?.title} - Image 2`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover rounded-4"
                        priority={true}
                      />
                    </div>
                  )}

                  {/* Top right image */}
                  {tour?.slideImg?.length > 2 && (
                    <div
                      className="gallery-item gallery-item-small-top-right"
                      onClick={() => openLightbox(2)}
                    >
                      <Image
                        src={tour.slideImg[2] || "/placeholder.svg"}
                        alt={`${tour?.title} - Image 3`}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover rounded-4"
                      />
                    </div>
                  )}

                  {/* Bottom right image */}
                  {tour?.slideImg?.length > 3 && (
                    <div
                      className="gallery-item gallery-item-small-bottom-right"
                      onClick={() => openLightbox(3)}
                    >
                      <Image
                        src={tour.slideImg[3] || "/placeholder.svg"}
                        alt={`${tour?.title} - Image 4`}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover rounded-4"
                      />
                      {tour?.slideImg?.length > 4 && (
                        <div className="more-photos-overlay rounded-4">
                          <span>+{tour.slideImg.length - 4}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            // Mobile Grid Slider Layout
            <div className="mobile-slider-container">
              <Slider {...sliderSettings}>
                {mobileImageGroups.map((group, groupIndex) => (
                  <div key={groupIndex}>
                    <div className="mobile-grid-slide">
                      {group.length === 3 ? (
                        // 3 images layout (1 large + 2 small)
                        <>
                          <div
                            className="mobile-grid-large"
                            onClick={() => openLightbox(groupIndex * 3)}
                          >
                            <Image
                              src={group[0] || "/placeholder.svg"}
                              alt={`${tour?.title} - Image ${
                                groupIndex * 3 + 1
                              }`}
                              width={600}
                              height={600}
                              style={{ height: "auto" }}
                              sizes="60vw"
                              className="object-cover w-full h-full rounded-4"
                            />
                          </div>
                          <div className="mobile-grid-small-container">
                            <div
                              className="mobile-grid-small"
                              onClick={() => openLightbox(groupIndex * 3 + 1)}
                            >
                              <Image
                                src={group[1] || "/placeholder.svg"}
                                alt={`${tour?.title} - Image ${
                                  groupIndex * 3 + 2
                                }`}
                                width={300}
                                height={200}
                                style={{ height: "auto" }}
                                sizes="40vw"
                                className="object-cover w-full h-full rounded-4"
                              />
                            </div>
                            <div
                              className="mobile-grid-small"
                              onClick={() => openLightbox(groupIndex * 3 + 2)}
                            >
                              <Image
                                src={group[2] || "/placeholder.svg"}
                                alt={`${tour?.title} - Image ${
                                  groupIndex * 3 + 3
                                }`}
                                width={300}
                                height={200}
                                style={{ height: "auto" }}
                                sizes="40vw"
                                className="object-cover w-full h-full rounded-4"
                              />
                            </div>
                          </div>
                        </>
                      ) : group.length === 2 ? (
                        // 2 images layout (1 large + 1 small)
                        <>
                          <div
                            className="mobile-grid-large"
                            onClick={() => openLightbox(groupIndex * 3)}
                          >
                            <Image
                              src={group[0] || "/placeholder.svg"}
                              alt={`${tour?.title} - Image ${
                                groupIndex * 3 + 1
                              }`}
                              width={600}
                              height={600}
                              style={{ height: "auto" }}
                              sizes="60vw"
                              className="object-cover w-full h-full rounded-4"
                            />
                          </div>
                          <div className="mobile-grid-small-container">
                            <div
                              className="mobile-grid-small"
                              onClick={() => openLightbox(groupIndex * 3 + 1)}
                            >
                              <Image
                                src={group[1] || "/placeholder.svg"}
                                alt={`${tour?.title} - Image ${
                                  groupIndex * 3 + 2
                                }`}
                                width={300}
                                height={200}
                                style={{ height: "auto" }}
                                sizes="40vw"
                                className="object-cover w-full h-full rounded-4"
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        // 1 image layout (just large)
                        <div
                          className="mobile-grid-full"
                          onClick={() => openLightbox(groupIndex * 3)}
                        >
                          <Image
                            src={group[0] || "/placeholder.svg"}
                            alt={`${tour?.title} - Image ${groupIndex * 3 + 1}`}
                            width={600}
                            height={400}
                            style={{ height: "auto" }}
                            sizes="100vw"
                            className="object-cover w-full h-full rounded-4"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      </section>

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
      <section className="pt-40">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-8">
              <h2 className="text-24 fw-600">About This Tour</h2>
              <TourSnapShot data={tour} />

              {!isMobile && <Overview data={tour} />}

              {!isMobile && (
                <TestimonialSectionSingleTour
                  title={"Highlighted reviews from other travelers"}
                />
              )}
            </div>

            <div className="col-xl-4">
              <SidebarRight data={tour} />
            </div>
          </div>
          {isMobile && (
            <div style={{ marginTop: "" }}>
              <Overview data={tour} />
              <TestimonialSectionSingleTour
                title={"Highlighted reviews from other travelers"}
              />
            </div>
          )}
          {/* End .col-xl-4 */}
        </div>
        {/* End .row */}
      </section>

      {/* CSS for the gallery grid, mobile slider, and lightbox */}
      <style jsx global>{`
        /* Desktop Grid Layout */
        .gallery-grid {
          width: 100%;
          overflow: hidden;
        }

        .gallery-grid-container {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          grid-template-rows: repeat(2, 250px);
          grid-gap: 10px;
          height: 510px;
        }

        .gallery-item {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .gallery-item:hover::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.2);
          z-index: 1;
          border-radius: 8px;
        }

        .gallery-item-large-left {
          grid-column: 1 / 2;
          grid-row: 1 / 3;
        }

        .gallery-item-large-center {
          grid-column: 2 / 3;
          grid-row: 1 / 3;
        }

        .gallery-item-small-top-right {
          grid-column: 3 / 4;
          grid-row: 1 / 2;
        }

        .gallery-item-small-bottom-right {
          grid-column: 3 / 4;
          grid-row: 2 / 3;
          position: relative;
        }

        .more-photos-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .more-photos-overlay span {
          color: white;
          font-size: 24px;
          font-weight: bold;
        }

        /* Mobile Grid Slider */
        .mobile-slider-container {
          margin-bottom: 20px;
        }

        .mobile-grid-slide {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          height: 400px;
        }

        .mobile-grid-large {
          width: 60%;
          height: 100%;
          position: relative;
          cursor: pointer;
        }

        .mobile-grid-small-container {
          width: calc(40% - 4px);
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mobile-grid-small {
          width: 100%;
          height: calc(50% - 2px);
          position: relative;
          cursor: pointer;
        }

        .mobile-grid-full {
          width: 100%;
          height: 100%;
          position: relative;
          cursor: pointer;
        }

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

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .gallery-grid-container {
            display: none;
          }

          .mobile-grid-slide {
            height: 350px;
          }

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
        }

        @media (max-width: 480px) {
          .mobile-grid-slide {
            height: 300px;
          }
        }
      `}</style>
    </>
  );
}
