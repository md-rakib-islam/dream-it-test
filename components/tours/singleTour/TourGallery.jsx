"use client";

import OptimizedImage from "../../common/optimized/OptimizedImage";
import useWindowSize from "@/hooks/useWindowSize";
import dynamic from "next/dynamic";

// Lazy load slider only for mobile with multiple images
const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
  loading: () => <div className="slider-skeleton">Loading...</div>,
});

const TourGallery = ({ tour, openLightbox: externalOpenLightbox }) => {
  const width = useWindowSize();
  const isMobile = width < 768;

  // Ensure min images - prioritize first image
  const images =
    Array.isArray(tour?.slideImg) && tour.slideImg.length > 0
      ? tour.slideImg
      : ["/placeholder.svg"];

  const normalizedImages = [...images];
  while (normalizedImages.length < 4) {
    normalizedImages.push("/placeholder.svg");
  }

  const handleImageClick = (index) => {
    externalOpenLightbox?.(index % (tour?.slideImg?.length || 1));
  };

  const hasSingleImage = tour?.slideImg?.length === 1;

  // Mobile slider settings - optimized
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 300, // Reduced from 400
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    lazyLoad: "ondemand", // Critical: lazy load non-visible slides
  };

  return (
    <section className="pt-40 js-pin-container">
      <div className="container">
        {/* ✅ Desktop Grid - LCP Optimized */}
        {!isMobile ? (
          <div className="gallery-grid">
            <div
              className={`gallery-grid-container ${
                hasSingleImage ? "single-image-grid" : ""
              }`}
            >
              {/* 🚀 CRITICAL: First image = LCP candidate - Maximum priority */}
              <div
                className="gallery-item gallery-item-large-left"
                onClick={() => handleImageClick(0)}
                style={{
                  minHeight: "250px", // Prevent layout shift
                  backgroundColor: "#f3f4f6", // Placeholder color
                }}
              >
                <OptimizedImage
                  src={normalizedImages[0]}
                  alt={`${tour?.title || "Tour"} - Image 1`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1000px"
                  className="object-cover rounded-4"
                  priority={true}
                  quality={95} // Highest quality for LCP
                  fetchPriority="high"
                  loading="eager"
                  placeholder="empty" // No blur delay for LCP
                  variant="galleryLarge"
                />
              </div>

              {/* Second image - Also visible, medium priority */}
              <div
                className="gallery-item gallery-item-large-center"
                onClick={() => handleImageClick(1)}
                style={{
                  minHeight: "250px", // Prevent layout shift
                  backgroundColor: "#f3f4f6", // Placeholder color
                }}
              >
                <OptimizedImage
                  src={normalizedImages[1]}
                  alt={`${tour?.title || "Tour"} - Image 2`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1000px"
                  className="object-cover rounded-4"
                  quality={90}
                  loading="eager" // Also eager since visible
                  priority={true} // Also priority since above the fold
                  variant="galleryLarge"
                />
              </div>

              {/* Remaining images - lazy loaded with proper sizing */}
              <div
                className="gallery-item gallery-item-small-top-right"
                onClick={() => handleImageClick(2)}
                style={{
                  minHeight: "120px", // Prevent layout shift
                  backgroundColor: "#f3f4f6", // Placeholder color
                }}
              >
                <OptimizedImage
                  src={normalizedImages[2]}
                  alt={`${tour?.title || "Tour"} - Image 3`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 300px, 400px"
                  className="object-cover rounded-4"
                  quality={80}
                  loading="lazy" // Lazy load smaller images
                  variant="gallerySmail"
                />
              </div>

              <div
                className="gallery-item gallery-item-small-bottom-right"
                onClick={() => handleImageClick(3)}
                style={{
                  minHeight: "120px", // Prevent layout shift
                  backgroundColor: "#f3f4f6", // Placeholder color
                }}
              >
                <OptimizedImage
                  src={normalizedImages[3]}
                  alt={`${tour?.title || "Tour"} - Image 4`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 300px, 400px"
                  className="object-cover rounded-4"
                  quality={80}
                  loading="lazy"
                  variant="gallerySmail"
                />
                {tour?.slideImg?.length > 4 && (
                  <div className="more-photos-overlay rounded-4">
                    <span>+{tour.slideImg.length - 4}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ✅ Mobile: LCP Optimized - Show first image immediately */
          <div className="mobile-slider-container">
            {hasSingleImage ? (
              <div
                className="mobile-single-image"
                onClick={() => handleImageClick(0)}
                style={{
                  minHeight: "240px", // Prevent layout shift on mobile
                  backgroundColor: "#f3f4f6", // Placeholder color
                }}
              >
                <OptimizedImage
                  src={normalizedImages[0]}
                  alt={`${tour?.title || "Tour"} - Image 1`}
                  width={800}
                  height={500}
                  sizes="100vw"
                  className="object-cover rounded-4"
                  priority={true}
                  quality={90} // Higher quality for mobile LCP
                  fetchPriority="high"
                  loading="eager"
                  placeholder="empty"
                />
              </div>
            ) : (
              <>
                {/* Show first image immediately without slider wrapper */}
                {/* <div
                  className="mobile-first-image"
                  onClick={() => handleImageClick(0)}
                >
                  <OptimizedImage
                    src={normalizedImages[0]}
                    alt={`${tour?.title || "Tour"} - Image 1`}
                    width={800}
                    height={500}
                    sizes="100vw"
                    className="object-cover rounded-4"
                    priority={true}
                    quality={85}
                    fetchPriority="high"
                    loading="eager"
                    placeholder="empty"
                  />
                </div> */}

                {/* Lazy load the slider for remaining images */}
                {normalizedImages.length > 1 && (
                  <div
                    className="mobile-slider-wrapper"
                    style={{
                      minHeight: "240px", // Prevent layout shift
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <Slider {...sliderSettings}>
                      {normalizedImages.map((img, idx) => (
                        <div key={idx}>
                          <div
                            className="mobile-grid-full"
                            onClick={() => handleImageClick(idx)}
                            style={{
                              minHeight: "400px", // Consistent height
                              backgroundColor: "#f3f4f6",
                            }}
                          >
                            <OptimizedImage
                              src={img}
                              alt={`${tour?.title || "Tour"} - Image ${
                                idx + 1
                              }`}
                              width={800}
                              height={500}
                              sizes="100vw"
                              className="object-cover rounded-4"
                              quality={idx === 0 ? 90 : 75} // Higher quality for first image
                              loading={idx === 0 ? "eager" : "lazy"} // First image eager
                              priority={idx === 0} // First image priority
                            />
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        .gallery-grid-container {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          grid-template-rows: repeat(2, 250px);
          grid-gap: 10px;
          height: 510px;
          /* Optimize layout shifts */
          contain: layout style;
          /* Reserve space immediately */
          min-height: 510px;
        }

        .gallery-item {
          position: relative;
          cursor: pointer;
          overflow: hidden;
          /* Prevent layout shift */
          contain: layout;
        }

        .gallery-item-large-left {
          grid-column: 1;
          grid-row: 1 / 3;
        }

        .gallery-item-large-center {
          grid-column: 2;
          grid-row: 1 / 3;
        }

        .gallery-item-small-top-right {
          grid-column: 3;
          grid-row: 1;
        }

        .gallery-item-small-bottom-right {
          grid-column: 3;
          grid-row: 2;
        }

        .more-photos-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 24px;
          font-weight: 600;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .mobile-slider-container {
            margin-bottom: 20px;
            /* Contain layout changes */
            contain: layout style;
          }

          .mobile-single-image,
          .mobile-first-image,
          .mobile-grid-full {
            width: 100%;
            position: relative;
            overflow: hidden;
            border-radius: 8px;
            margin-bottom: 10px;
            /* Fixed dimensions to prevent CLS */
            height: 240px;
            min-height: 240px;
          }

          .mobile-slider-wrapper {
            margin-top: 10px;
            /* Fixed height for slider */
            height: 240px;
            min-height: 240px;
          }

          .slider-skeleton {
            height: 240px; /* Match mobile image height */
            background: #f3f4f6;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6b7280;
          }
        }

        /* Reduce animation/transition overhead */
        .gallery-item,
        .mobile-grid-full {
          transition: transform 0.2s ease;
        }

        .gallery-item:hover,
        .mobile-grid-full:hover {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
};

export default TourGallery;

// import OptimizedImage from "../../common/optimized/OptimizedImage";
// import useWindowSize from "@/hooks/useWindowSize";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("react-slick"), { ssr: false });

// const TourGallery = ({ tour, openLightbox: externalOpenLightbox }) => {
//   const width = useWindowSize();
//   const isMobile = width < 768;

//   // Ensure we always have at least 4 images for desktop grid and 3 for mobile
//   const ensureMinimumImages = (images) => {
//     if (!images || !Array.isArray(images) || images.length === 0) {
//       // If no images, use placeholder
//       return [
//         "/placeholder.svg",
//         "/placeholder.svg",
//         "/placeholder.svg",
//         "/placeholder.svg",
//       ];
//     }

//     // If we have fewer than 4 images, repeat the existing ones to fill the grid
//     const result = [...images];
//     while (result.length < 4) {
//       // Add images from the beginning until we have at least 4
//       result.push(
//         ...images.slice(0, Math.min(4 - result.length, images.length))
//       );
//     }
//     return result;
//   };

//   // Get the normalized array of images
//   const normalizedImages = ensureMinimumImages(tour?.slideImg);

//   // Function to chunk array into groups of 3 for mobile
//   const createMobileImageGroups = (images) => {
//     // Ensure we have at least 3 images for the first slide
//     if (!images || images.length < 3) {
//       const paddedImages = [...(images || [])];
//       while (paddedImages.length < 3) {
//         paddedImages.push(
//           paddedImages[paddedImages.length % paddedImages.length] ||
//             "/placeholder.svg"
//         );
//       }
//       return [paddedImages];
//     }

//     // Create groups of 3 images
//     const chunks = [];
//     for (let i = 0; i < images.length; i += 3) {
//       const chunk = images.slice(i, i + 3);
//       // If chunk has fewer than 3 images, pad it
//       while (chunk.length < 3) {
//         chunk.push(chunk[chunk.length % chunk.length] || "/placeholder.svg");
//       }
//       chunks.push(chunk);
//     }
//     return chunks;
//   };

//   // Create image groups for mobile slider (3 images per slide)
//   const mobileImageGroups = createMobileImageGroups(normalizedImages);

//   // Slider settings for mobile
//   const sliderSettings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     nextArrow: <Arrow type="next" />,
//     prevArrow: <Arrow type="prev" />,
//   };

//   // Custom arrow component for slider
//   function Arrow(props) {
//     let className =
//       props.type === "next"
//         ? "section-slider-nav -next flex-center button -blue-1 shadow-1 size-40 rounded-full sm:d-none"
//         : "section-slider-nav -prev flex-center button -blue-1 shadow-1 size-40 rounded-full sm:d-none ";
//     className += " arrow";
//     const char =
//       props.type === "next" ? (
//         <>
//           <i className="icon icon-chevron-right text-12 text-light"></i>
//         </>
//       ) : (
//         <>
//           <span className="icon icon-chevron-left text-12 text-light"></span>
//         </>
//       );
//     return (
//       <button className={className} onClick={props.onClick}>
//         {char}
//       </button>
//     );
//   }

//   // Handle image click to open lightbox
//   const handleImageClick = (index) => {
//     if (externalOpenLightbox) {
//       externalOpenLightbox(index % (tour?.slideImg?.length || 1));
//     }
//   };

//   // Check if there's only one image
//   const hasSingleImage = tour?.slideImg?.length === 1;

//   // if (isLoading) {
//   //   return <TourGalleryGridSkeleton />;
//   // }

//   return (
//     <section className="pt-40 js-pin-container">
//       <div className="container">
//         {!isMobile ? (
//           // Desktop Grid Layout - Always show 4 images
//           <div className="gallery-grid">
//             <div
//               className={`gallery-grid-container ${
//                 hasSingleImage ? "single-image-grid" : ""
//               }`}
//             >
//               {/* First large image (left) */}
//               <div
//                 className="gallery-item gallery-item-large-left"
//                 onClick={() => handleImageClick(0)}
//               >
//                 <OptimizedImage
//                   src={normalizedImages[0] || "/placeholder.svg"}
//                   alt={`${tour?.title || "Tour"} - Image 1`}
//                   fill
//                   sizes="(max-width: 768px) 100vw, 33vw"
//                   className="object-cover rounded-4"
//                   priority={true}
//                 />
//               </div>

//               {/* Center large image */}
//               <div
//                 className="gallery-item gallery-item-large-center"
//                 onClick={() => handleImageClick(1)}
//               >
//                 <OptimizedImage
//                   src={normalizedImages[1] || "/placeholder.svg"}
//                   alt={`${tour?.title || "Tour"} - Image 2`}
//                   fill
//                   sizes="(max-width: 768px) 100vw, 50vw"
//                   className="object-cover rounded-4"
//                   priority={true}
//                 />
//               </div>

//               {/* Top right image */}
//               <div
//                 className="gallery-item gallery-item-small-top-right"
//                 onClick={() => handleImageClick(2)}
//               >
//                 <OptimizedImage
//                   src={normalizedImages[2] || "/placeholder.svg"}
//                   alt={`${tour?.title || "Tour"} - Image 3`}
//                   fill
//                   sizes="(max-width: 768px) 100vw, 25vw"
//                   className="object-cover rounded-4"
//                 />
//               </div>

//               {/* Bottom right image */}
//               <div
//                 className="gallery-item gallery-item-small-bottom-right"
//                 onClick={() => handleImageClick(3)}
//               >
//                 <OptimizedImage
//                   src={normalizedImages[3] || "/placeholder.svg"}
//                   alt={`${tour?.title || "Tour"} - Image 4`}
//                   fill
//                   sizes="(max-width: 768px) 100vw, 25vw"
//                   className="object-cover rounded-4"
//                 />
//                 {tour?.slideImg?.length > 4 && (
//                   <div className="more-photos-overlay rounded-4">
//                     <span>+{tour.slideImg.length - 4}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ) : (
//           // Mobile View - Always show 3 images per slide
//           <div className="mobile-slider-container">
//             {hasSingleImage ? (
//               // Single image for mobile - no grid, no slider
//               <div
//                 className="mobile-single-image"
//                 onClick={() => handleImageClick(0)}
//               >
//                 <OptimizedImage
//                   src={normalizedImages[0] || "/placeholder.svg"}
//                   alt={`${tour?.title || "Tour"} - Image 1`}
//                   width={800}
//                   height={500}
//                   style={{ width: "100%", height: "auto" }}
//                   sizes="100vw"
//                   className="object-cover rounded-4"
//                   priority={true}
//                 />
//               </div>
//             ) : (
//               // Multiple images - use grid slider with 3 images per slide
//               <Slider {...sliderSettings}>
//                 {mobileImageGroups.map((group, groupIndex) => (
//                   <div key={groupIndex}>
//                     <div className="mobile-grid-slide">
//                       {/* Always 3 images layout (1 large + 2 small) */}
//                       <div
//                         className="mobile-grid-large"
//                         onClick={() => handleImageClick(groupIndex * 3)}
//                       >
//                         <OptimizedImage
//                           src={group[0] || "/placeholder.svg"}
//                           alt={`${tour?.title || "Tour"} - Image ${
//                             groupIndex * 3 + 1
//                           }`}
//                           width={600}
//                           height={600}
//                           style={{ height: "auto" }}
//                           sizes="60vw"
//                           className="object-cover w-full h-full rounded-4"
//                         />
//                       </div>
//                       <div className="mobile-grid-small-container">
//                         <div
//                           className="mobile-grid-small"
//                           onClick={() => handleImageClick(groupIndex * 3 + 1)}
//                         >
//                           <OptimizedImage
//                             src={group[1] || "/placeholder.svg"}
//                             alt={`${tour?.title || "Tour"} - Image ${
//                               groupIndex * 3 + 2
//                             }`}
//                             width={300}
//                             height={200}
//                             style={{ height: "auto" }}
//                             sizes="40vw"
//                             className="object-cover w-full h-full rounded-4"
//                           />
//                         </div>
//                         <div
//                           className="mobile-grid-small"
//                           onClick={() => handleImageClick(groupIndex * 3 + 2)}
//                         >
//                           <OptimizedImage
//                             src={group[2] || "/placeholder.svg"}
//                             alt={`${tour?.title || "Tour"} - Image ${
//                               groupIndex * 3 + 3
//                             }`}
//                             width={300}
//                             height={200}
//                             style={{ height: "auto" }}
//                             sizes="40vw"
//                             className="object-cover w-full h-full rounded-4"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </Slider>
//             )}
//           </div>
//         )}
//       </div>

//       {/* CSS for the gallery grid and mobile layout */}
//       <style jsx global>{`
//         /* Desktop Grid Layout */
//         .gallery-grid {
//           width: 100%;
//           overflow: hidden;
//         }

//         .gallery-grid-container {
//           display: grid;
//           grid-template-columns: 1fr 2fr 1fr;
//           grid-template-rows: repeat(2, 250px);
//           grid-gap: 10px;
//           height: 510px;
//         }

//         .gallery-grid-container.single-image-grid {
//           position: relative;
//         }

//         .gallery-item {
//           position: relative;
//           overflow: hidden;
//           cursor: pointer;
//         }

//         .gallery-item:hover::after {
//           content: "";
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0, 0, 0, 0.2);
//           z-index: 1;
//           border-radius: 8px;
//         }

//         .gallery-item-large-left {
//           grid-column: 1 / 2;
//           grid-row: 1 / 3;
//         }

//         .gallery-item-large-center {
//           grid-column: 2 / 3;
//           grid-row: 1 / 3;
//         }

//         .gallery-item-small-top-right {
//           grid-column: 3 / 4;
//           grid-row: 1 / 2;
//         }

//         .gallery-item-small-bottom-right {
//           grid-column: 3 / 4;
//           grid-row: 2 / 3;
//           position: relative;
//         }

//         .more-photos-overlay {
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0, 0, 0, 0.5);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 2;
//         }

//         .more-photos-overlay span {
//           color: white;
//           font-size: 24px;
//           font-weight: bold;
//         }

//         /* Mobile Styles */
//         .mobile-slider-container {
//           margin-bottom: 20px;
//         }

//         .mobile-single-image {
//           width: 100%;
//           cursor: pointer;
//           border-radius: 8px;
//           overflow: hidden;
//         }

//         .mobile-grid-slide {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 4px;
//           height: 400px;
//         }

//         .mobile-grid-large {
//           width: 60%;
//           height: 100%;
//           position: relative;
//           cursor: pointer;
//         }

//         .mobile-grid-small-container {
//           width: calc(40% - 4px);
//           height: 100%;
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//         }

//         .mobile-grid-small {
//           width: 100%;
//           height: calc(50% - 2px);
//           position: relative;
//           cursor: pointer;
//         }

//         .mobile-grid-full {
//           width: 100%;
//           height: 100%;
//           position: relative;
//           cursor: pointer;
//         }

//         /* Responsive adjustments */
//         @media (max-width: 768px) {
//           .mobile-grid-slide {
//             height: 350px;
//           }
//         }

//         @media (max-width: 480px) {
//           .mobile-grid-slide {
//             height: 300px;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default TourGallery;
