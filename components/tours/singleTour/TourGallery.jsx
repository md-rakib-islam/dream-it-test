"use client";

import { useState } from "react";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";
import "../../../styles/weather.scss";

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
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Navigate through images in lightbox
  const navigateImage = (direction) => {
    const newIndex = activeImageIndex + direction;
    if (newIndex >= 0 && newIndex < tour?.slideImg?.length) {
      setActiveImageIndex(newIndex);
    }
  };

  return (
    <>
      {/* Image Grid Gallery */}
      <section className="pt-40 js-pin-container">
        <div className="container">
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
        </div>
      </section>

      {/* Lightbox for fullscreen view */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div
            className="lightbox-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              &times;
            </button>
            <button
              className="lightbox-nav lightbox-prev"
              onClick={() => navigateImage(-1)}
              disabled={activeImageIndex === 0}
            >
              <i className="icon icon-chevron-left text-24 text-white"></i>
            </button>
            <div className="lightbox-content">
              <Image
                src={tour.slideImg[activeImageIndex] || "/placeholder.svg"}
                alt={`${tour?.title} - Fullscreen`}
                fill
                className="object-contain"
              />
            </div>
            <button
              className="lightbox-nav lightbox-next"
              onClick={() => navigateImage(1)}
              disabled={activeImageIndex === tour.slideImg.length - 1}
            >
              <i className="icon icon-chevron-right text-24 text-white"></i>
            </button>
            <div className="lightbox-counter">
              {activeImageIndex + 1} / {tour.slideImg.length}
            </div>
          </div>
        </div>
      )}

      {/* Tour Content Section */}
      <section className="pt-40">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-8">
              <span className="text-22 fw-600">About This Tour</span>
              <TourSnapShot data={tour} />

              <div className="border-top-light mt-40 mb-40"></div>

              <Overview data={tour} />

              <div className="border-top-light mt-40 mb-40"></div>

              <TestimonialSectionSingleTour
                title={"Highlighted reviews from other travelers"}
              />
            </div>

            <div className="col-xl-4">
              <SidebarRight data={tour} />
            </div>
          </div>
        </div>
      </section>

      {/* CSS for the gallery grid and lightbox */}
      <style jsx global>{`
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

        /* Lightbox styles */
        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-container {
          position: relative;
          width: 90%;
          height: 90%;
        }

        .lightbox-content {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .lightbox-close {
          position: absolute;
          top: -40px;
          right: 0;
          background: none;
          border: none;
          color: white;
          font-size: 30px;
          cursor: pointer;
          z-index: 10;
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
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
        }

        .lightbox-prev {
          left: 20px;
        }

        .lightbox-next {
          right: 20px;
        }

        .lightbox-counter {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          font-size: 14px;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .gallery-grid-container {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: repeat(2, 200px);
            height: 410px;
            grid-gap: 8px;
          }

          .gallery-item-large-left {
            grid-column: 1 / 2;
            grid-row: 1 / 3;
          }

          .gallery-item-large-center {
            grid-column: 2 / 3;
            grid-row: 1 / 2;
          }

          .gallery-item-small-top-right {
            display: none;
          }

          .gallery-item-small-bottom-right {
            grid-column: 2 / 3;
            grid-row: 2 / 3;
          }
        }
      `}</style>
    </>
  );
}
