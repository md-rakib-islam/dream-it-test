"use client";

import OptimizedImage from "../../common/optimized/OptimizedImage";
import useWindowSize from "@/hooks/useWindowSize";
import dynamic from "next/dynamic";

// 🚀 PERFORMANCE: Ultra-lazy load slider with timeout
const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
  loading: () => (
    <div
      className="slider-skeleton"
      style={{
        height: "240px",
        width: "100%",
        background: "#f8f9fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        fontSize: "14px",
        color: "#6b7280",
      }}
    >
      Loading gallery...
    </div>
  ),
});

const TourGallery = ({ tour, openLightbox: externalOpenLightbox }) => {
  const width = useWindowSize();
  const isMobile = width < 768;

  // 🚀 PERFORMANCE: Ensure we always have at least 4 images for desktop grid and 3 for mobile
  const ensureMinimumImages = (images) => {
    if (!images || !Array.isArray(images) || images.length === 0) {
      return [
        "/placeholder.svg",
        "/placeholder.svg",
        "/placeholder.svg",
        "/placeholder.svg",
      ];
    }

    const result = [...images];
    while (result.length < 4) {
      result.push(
        ...images.slice(0, Math.min(4 - result.length, images.length))
      );
    }
    return result;
  };

  const normalizedImages = ensureMinimumImages(tour?.slideImg);

  // 🚀 PERFORMANCE: Function to chunk array into groups of 3 for mobile
  const createMobileImageGroups = (images) => {
    if (!images || images.length < 3) {
      const paddedImages = [...(images || [])];
      while (paddedImages.length < 3) {
        paddedImages.push(
          paddedImages[paddedImages.length % paddedImages.length] ||
            "/placeholder.svg"
        );
      }
      return [paddedImages];
    }

    const chunks = [];
    for (let i = 0; i < images.length; i += 3) {
      const chunk = images.slice(i, i + 3);
      while (chunk.length < 3) {
        chunk.push(chunk[chunk.length % chunk.length] || "/placeholder.svg");
      }
      chunks.push(chunk);
    }
    return chunks;
  };

  const mobileImageGroups = createMobileImageGroups(normalizedImages);

  // 🚀 PERFORMANCE: Ultra-lightweight slider settings
  const sliderSettings = {
    dots: false,
    infinite: normalizedImages.length > 1,
    speed: 200, // Faster transitions
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: normalizedImages.length > 1,
    nextArrow: normalizedImages.length > 1 ? <Arrow type="next" /> : null,
    prevArrow: normalizedImages.length > 1 ? <Arrow type="prev" /> : null,
    lazyLoad: "ondemand", // Less aggressive lazy loading
    waitForAnimate: false,
    useCSS: true,
    useTransform: false, // Disable transforms to reduce repaints
    accessibility: false, // Disable for performance
    touchMove: true,
    swipe: true,
    adaptiveHeight: false,
    fade: false, // No fade animation
    cssEase: "linear",
    pauseOnHover: false,
    pauseOnFocus: false,
    autoplay: false,
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
        <i className="icon icon-chevron-right text-12 text-light"></i>
      ) : (
        <span className="icon icon-chevron-left text-12 text-light"></span>
      );
    return (
      <button className={className} onClick={props.onClick}>
        {char}
      </button>
    );
  }

  const handleImageClick = (index) => {
    if (externalOpenLightbox) {
      externalOpenLightbox(index % (tour?.slideImg?.length || 1));
    }
  };

  const hasSingleImage = tour?.slideImg?.length === 1;

  return (
    <section className="pt-40 js-pin-container">
      <div className="container">
        {!isMobile ? (
          // 🚀 PERFORMANCE: Desktop Grid Layout - Always show 4 images with optimizations
          <div className="gallery-grid">
            <div
              className={`gallery-grid-container ${
                hasSingleImage ? "single-image-grid" : ""
              }`}
            >
              {/* 🚀 LCP CRITICAL: First large image (left) */}
              <div
                className="gallery-item gallery-item-large-left"
                onClick={() => handleImageClick(0)}
              >
                <OptimizedImage
                  src={normalizedImages[0] || "/placeholder.svg"}
                  alt={`${tour?.title || "Tour"} - Image 1`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover rounded-4"
                  priority={true}
                  quality={100}
                  fetchPriority="high"
                  loading="eager"
                  placeholder="empty"
                  variant="galleryLarge"
                />
              </div>

              {/* 🚀 LCP CRITICAL: Center large image */}
              <div
                className="gallery-item gallery-item-large-center"
                onClick={() => handleImageClick(1)}
              >
                <OptimizedImage
                  src={normalizedImages[1] || "/placeholder.svg"}
                  alt={`${tour?.title || "Tour"} - Image 2`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-4"
                  priority={true}
                  quality={95}
                  loading="eager"
                  fetchPriority="high"
                  placeholder="empty"
                  variant="galleryLarge"
                />
              </div>

              {/* Top right image */}
              <div
                className="gallery-item gallery-item-small-top-right"
                onClick={() => handleImageClick(2)}
              >
                <OptimizedImage
                  src={normalizedImages[2] || "/placeholder.svg"}
                  alt={`${tour?.title || "Tour"} - Image 3`}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover rounded-4"
                  quality={80}
                />
              </div>

              {/* Bottom right image */}
              <div
                className="gallery-item gallery-item-small-bottom-right"
                onClick={() => handleImageClick(3)}
              >
                <OptimizedImage
                  src={normalizedImages[3] || "/placeholder.svg"}
                  alt={`${tour?.title || "Tour"} - Image 4`}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover rounded-4"
                  quality={80}
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
          // 🚀 MOBILE: Single image slider - one image per slide
          <div className="mobile-slider-container">
            <Slider {...sliderSettings}>
              {normalizedImages.map((img, index) => {
                console.log("Rendering mobile image:", img, "at index:", index);
                return (
                  <div key={index}>
                    <div
                      className="mobile-single-slide"
                      onClick={() => handleImageClick(index)}
                    >
                      <OptimizedImage
                        src={img || "/placeholder.svg"}
                        alt={`${tour?.title || "Tour"} - Image ${index + 1}`}
                        width={428}
                        height={240}
                        style={{
                          width: "100%",
                          height: "240px",
                          objectFit: "cover",
                        }}
                        sizes="(max-width: 768px) 428px, 50vw"
                        className="object-cover rounded-4"
                        priority={index === 0}
                        quality={index === 0 ? 90 : 80}
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : undefined}
                        placeholder={index === 0 ? "empty" : "blur"}
                        variant="gallery"
                      />
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        )}
      </div>

      <style jsx global>{`
        /* 🎯 DESKTOP LAYOUT: Left 0.62 ratio, all images same total height, filled grid items */
        .gallery-grid-container {
          display: grid;
          grid-template-columns: 0.62fr 1.2fr 0.62fr;
          grid-template-rows: 1fr 1fr;
          grid-gap: 10px;
          height: 500px;
          width: 100%;
          contain: layout style;
          min-height: 500px;
        }

        .gallery-item {
          position: relative;
          cursor: pointer;
          overflow: hidden;
          contain: layout;
          border-radius: 8px;
          width: 100%;
          height: 100%;
        }

        /* Left image - 0.62 ratio, spans full height (both rows) */
        .gallery-item-large-left {
          grid-column: 1;
          grid-row: 1 / 3;
          width: 100%;
          height: 100%;
        }

        /* Center image - spans full height (both rows) */
        .gallery-item-large-center {
          grid-column: 2;
          grid-row: 1 / 3;
          width: 100%;
          height: 100%;
        }

        /* Right top image - fills top row completely */
        .gallery-item-small-top-right {
          grid-column: 3;
          grid-row: 1;
          width: 100%;
          height: 100%;
        }

        /* Right bottom image - fills bottom row completely */
        .gallery-item-small-bottom-right {
          grid-column: 3;
          grid-row: 2;
          width: 100%;
          height: 100%;
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

        /* 📱 MOBILE: Single image slider optimizations - CLS prevention */
        @media (max-width: 768px) {
          .mobile-slider-container {
            margin-bottom: 20px;
            contain: layout style paint;
            /* 🚀 CRITICAL: Reserve exact space to prevent CLS */
            height: 240px !important;
            min-height: 240px !important;
            max-height: 240px !important;
            width: 100% !important;
            background-color: #f8f9fa;
            border-radius: 8px;
            overflow: hidden;
            aspect-ratio: 16/9;
            position: relative;
            transform: translateZ(0); /* Force GPU layer */
          }

          .mobile-single-slide {
            width: 100% !important;
            position: relative !important;
            overflow: hidden;
            border-radius: 8px;
            /* 🚀 CRITICAL: Fixed exact dimensions to prevent CLS */
            height: 240px !important;
            min-height: 240px !important;
            max-height: 240px !important;
            display: flex !important;
            align-items: center;
            justify-content: center;
            transform: translateZ(0) !important; /* Force GPU layer */
            contain: layout size style paint;
            will-change: auto;
          }

          .slider-skeleton {
            height: 240px !important;
            width: 100%;
            background: #f8f9fa;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6b7280;
            font-size: 14px;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }

          /* 🚀 CRITICAL: Slider wrapper height control - prevent layout shifts */
          .slick-slider {
            height: 240px !important;
            min-height: 240px !important;
            max-height: 240px !important;
            width: 100% !important;
            transform: translateZ(0);
          }

          .slick-list {
            height: 240px !important;
            min-height: 240px !important;
            max-height: 240px !important;
            overflow: hidden !important;
            transform: translateZ(0);
          }

          .slick-track {
            height: 240px !important;
            min-height: 240px !important;
            max-height: 240px !important;
            display: flex !important;
            align-items: stretch !important;
            transform: translateZ(0);
            transition: none !important;
          }

          .slick-slide {
            height: 240px !important;
            min-height: 240px !important;
            max-height: 240px !important;
            contain: layout size paint;
            transform: translateZ(0);
          }

          .slick-slide > div {
            height: 100% !important;
            width: 100% !important;
            position: relative;
          }

          /* Disable slider animations that cause CLS */
          .slick-track {
            transition: none !important;
            transform: translateZ(0) !important;
          }

          .slick-slide {
            transition: none !important;
            opacity: 1 !important;
          }
        }

        /* Reduce animation/transition overhead */
        .gallery-item,
        .mobile-single-slide {
          transition: transform 0.2s ease;
        }

        .gallery-item:hover,
        .mobile-single-slide:hover {
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
