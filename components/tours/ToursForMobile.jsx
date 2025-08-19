"use client";

import { useContext, useMemo, memo } from "react";
import dynamic from "next/dynamic";
import useWindowSize from "@/hooks/useWindowSize";
import TourMobileSkeleton from "../skeleton/TourMobileSkeleton";
import { LayoutContext } from "@/app/LayoutProvider";
import { modifiedCurrency } from "@/utils/modifiedCurrency";
import AgentLink from "../AgentLink/AgentLink";
import OptimizedImage from "../common/optimized/OptimizedImage";
import LazyComponent from "../common/optimized/LazyComponent";

// 🚀 OPTIMIZATION: Dynamically import TripReview for better code splitting
const TripReview = dynamic(() => import("../common/TripReview"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "80px",
        height: "16px",
        background: "#f3f4f6",
        borderRadius: "4px",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    />
  ),
});

// 🚀 OPTIMIZATION: Memoize entire component to prevent unnecessary re-renders
const ToursForMobile = memo(({ destination, filterTour, tourType }) => {
  const { toursMainData, selectedCurrency } = useContext(LayoutContext);
  const width = useWindowSize();
  const isMobile = width < 768;

  // 🚀 OPTIMIZATION: Memoize filtered tours with better performance
  const filteredtoursMainData = useMemo(() => {
    if (!toursMainData || !Array.isArray(toursMainData)) return [];

    if (filterTour) {
      return toursMainData.filter((item) => item?.title !== filterTour);
    }

    if (tourType === "day") {
      return toursMainData.filter((item) => {
        if (item?.duration && item.duration.includes("hours")) {
          const hours = parseInt(
            item.duration.replace(/hour[s]?/, "").trim(),
            10
          );
          return hours < 1 || hours > 4;
        }
        return false;
      });
    }

    if (tourType === "multi") {
      return toursMainData.filter(
        (item) => item?.duration && !item.duration.includes("hours")
      );
    }

    if (tourType === "attraction") {
      return toursMainData.filter(
        (item) => item?.title && item.title.includes("Ticket")
      );
    }

    if (destination) {
      return toursMainData.filter(
        (item) => item?.location && item.location.includes(destination)
      );
    }

    return toursMainData;
  }, [toursMainData, filterTour, tourType, destination]);

  // 🚀 OPTIMIZATION: Memoize TourCard component to prevent re-renders
  const TourCard = memo(({ item, index }) => {
    // Memoize expensive calculations
    const slug = useMemo(() => {
      return item?.slug?.endsWith("-1") ? item?.slug.slice(0, -2) : item?.slug;
    }, [item?.slug]);

    const isAboveFold = index < 4;
    const isFirstImage = index < 2; // Mobile shows fewer items above fold

    // Memoize formatted price
    const formattedPrice = useMemo(() => {
      return modifiedCurrency(item.price, selectedCurrency.currency);
    }, [item.price, selectedCurrency.currency]);

    // Only use first image for mobile performance
    const primaryImage = item?.slideImg?.[0];

    return (
      <div className="col-lg-3 col-md-4 col-6 mobile-tour-card" key={item?.id}>
        <AgentLink
          href={`/tours/${slug}`}
          style={{ cursor: "pointer" }}
          className="tourCard -type-1 rounded-4 hover-inside-slider"
          aria-label={`View ${item?.title} tour details`}
        >
          <div className="tourCard__image position-relative">
            <div className="inside-slider">
              {/* 🚀 OPTIMIZATION: Single image for mobile performance */}
              <div className="cardImage ratio ratio-1:1">
                <div className="cardImage__content">
                  <OptimizedImage
                    src={primaryImage}
                    priority={isAboveFold || isFirstImage}
                    alt={`${item?.title} - Tour image`}
                    width={250}
                    height={250}
                    className="col-12"
                    variant="thumbnail"
                    quality={isAboveFold ? 85 : 75}
                    loading={isAboveFold || isFirstImage ? "eager" : "lazy"}
                    placeholder={isAboveFold ? "empty" : "blur"}
                  />
                </div>
              </div>

              {/* Price badge overlay */}
              <div className="price-badge-mobile">
                <span className="price-text">
                  {selectedCurrency?.symbol}
                  {formattedPrice}
                </span>
              </div>
            </div>
          </div>

          <div className="tourCard__content mt-10">
            <div className="d-flex justify-content-between lh-14 mb-5">
              <div className="text-14 md:text-12 text-light-1 tour-duration">
                {item?.duration}
              </div>
              <div className="col-auto price-section">
                <div className="text-14 md:text-12 text-dark-1 fw-bold">
                  From {selectedCurrency?.symbol}
                  <span className="text-16 md:text-13 fw-500 text-blue-1 fw-bold">
                    {" "}
                    {formattedPrice}
                  </span>
                </div>
              </div>
            </div>
            <div className="tourCard__title text-dark-5 lh-16 fw-600 mobile-tour-title">
              <span>{item?.title}</span>
            </div>
            <p className="text-light-1 lh-14 text-14 md:text-12 mt-5 tour-location">
              {item?.location}
            </p>
          </div>
        </AgentLink>

        <AgentLink
          href={item?.trip_url || "#"}
          style={{
            cursor: item?.trip_url ? "pointer" : "default",
          }}
          className={item?.trip_url ? "text-hover-underline" : ""}
          target={item?.trip_url ? "_blank" : undefined}
          rel={item?.trip_url ? "noopener noreferrer" : undefined}
        >
          <div className="row justify-between items-center pt-15">
            <div className="col-auto">
              <div className="d-flex items-center review-section">
                <TripReview title={item?.title?.toLowerCase()} />
                <div className="text-14 md:text-12 text-light-1 ml-10 review-count">
                  {item?.numberOfReviews} reviews
                </div>
              </div>
            </div>
          </div>
        </AgentLink>

        <style jsx>{`
          .mobile-tour-card {
            margin-bottom: 20px;
            contain: layout style;
          }
          
          .mobile-tour-title {
            font-size: 14px !important;
            line-height: 1.4;
            max-height: 2.8em; /* 2 lines * 1.4 line-height */
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
          }

          .price-badge-mobile {
            position: absolute;
            top: 12px;
            left: 12px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            backdrop-filter: blur(4px);
          }

          .tour-duration,
          .tour-location {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .price-section {
            flex-shrink: 0;
            min-width: fit-content;
          }

          .review-section {
            min-height: 20px;
          }

          .review-count {
            white-space: nowrap;
          }

          @media (max-width: 576px) {
            .mobile-tour-card {
              margin-bottom: 16px;
            }
          }

          @keyframes pulse {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}</style>
      </div>
    );
  });

  TourCard.displayName = "TourCard";

  // Early return for empty data
  if (!filteredtoursMainData || filteredtoursMainData.length === 0) {
    if (!toursMainData) {
      return <TourMobileSkeleton />;
    }
    return (
      <div className="no-tours-mobile">
        <div className="text-center py-5">
          <p className="text-muted">No tours available for mobile view</p>
        </div>
        <style jsx>{`
          .no-tours-mobile {
            min-height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="tours-mobile-container">
      <div className="row">
        {filteredtoursMainData.map((item, index) => (
          <TourCard
            key={`${item?.id}-mobile-${index}`}
            item={item}
            index={index}
          />
        ))}
      </div>

      <style jsx>{`
        .tours-mobile-container {
          contain: layout style;
          will-change: transform;
        }
        
        .row {
          margin-left: -15px;
          margin-right: -15px;
        }
        
        .row::after {
          content: "";
          display: table;
          clear: both;
        }
      `}</style>
    </div>
  );
});

ToursForMobile.displayName = "ToursForMobile";

export default ToursForMobile;

// **** old code snippet for ToursForMobile.jsx ****
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import useWindowSize from "@/hooks/useWindowSize";
// import TripReview from "../common/TripReview";
// import TourMobileSkeleton from "../skeleton/TourMobileSkeleton";
// import { useContext } from "react";
// import { LayoutContext } from "@/app/LayoutProvider";
// import { modifiedCurrency } from "@/utils/modifiedCurrency";
// import AgentLink from "../AgentLink/AgentLink";

// const ToursForMobile = ({ destination, filterTour, tourType }) => {
//   const { toursMainData, selectedCurrency } = useContext(LayoutContext);

//   const filteredtoursMainData = filterTour
//     ? toursMainData.filter((item) => item.title !== filterTour)
//     : tourType == "day"
//     ? toursMainData.filter((item) => {
//         if (item.duration && item.duration.includes("hours")) {
//           const hours = parseInt(
//             item.duration.replace(/hour[s]?/, "").trim(),
//             10
//           );
//           return hours < 1 || hours > 4; // Only include items outside the 1-4 hour range
//         }
//         return false;
//       })
//     : tourType == "multi"
//     ? toursMainData.filter(
//         (item) => item.duration && !item.duration.includes("hours")
//       )
//     : tourType == "attraction"
//     ? toursMainData.filter(
//         (item) => item.title && item.title.includes("Ticket")
//       )
//     : destination
//     ? toursMainData.filter(
//         (item) => item.location && item.location.includes(destination)
//       )
//     : toursMainData;
//   const width = useWindowSize();
//   const isMobile = width < 768;

//   return filteredtoursMainData?.length === 0 ? (
//     <TourMobileSkeleton />
//   ) : (
//     filteredtoursMainData?.map((item) => {
//       const slug = item?.slug?.endsWith("-1")
//         ? item?.slug.slice(0, -2)
//         : item?.slug;

//       return (
//         <div className="col-lg-3 col-md-4 col-6" key={item?.id}>
//           <AgentLink
//             href={`/tour/${slug}`}
//             style={{ cursor: "pointer" }}
//             className="tourCard -type-1 rounded-4 hover-inside-slider"
//           >
//             <div className="tourCard__image position-relative">
//               <div className="inside-slider">
//                 {/* <Slider
//                 {...itemSettings}
//                 arrows={true}
//                 nextArrow={<Arrow type="next" />}
//                 prevArrow={<Arrow type="prev" />}
//               > */}
//                 {item?.slideImg?.map((slide, i) => (
//                   <div className="cardImage ratio ratio-1:1" key={i}>
//                     <div className="cardImage__content ">
//                       <Image
//                         width={300}
//                         height={300}
//                         priority
//                         className="col-12 "
//                         src={slide}
//                         alt={item?.title}
//                       />
//                     </div>
//                   </div>
//                 ))}
//                 {/* </Slider> */}

//                 {/* <div className="cardImage__leftBadge cardImage-2__leftBadge md:d-none">

//                 <div className="buttons-2">
//                   <button
//                     style={{
//                       backgroundColor: "#353537",
//                       backgroundImage:
//                         "linear-gradient(to right, #353537 , #0d0c0d)",
//                     }}
//                   >
//                     {`${currentCurrency?.symbol} ${item.price}`}{" "}
//                     <span> PER PERSON</span>
//                   </button>
//                   <button>No</button>
//                 </div>

//               </div> */}
//               </div>
//             </div>

//             <div className="tourCard__content mt-10">
//               <div className="d-flex justify-content-between lh-14 mb-5">
//                 <div className="text-14 md:text-12 text-light-1">
//                   {isMobile ? `${item?.duration}` : `${item?.duration}`}
//                 </div>
//                 <div className="ml-10 mr-10" />
//                 <div className="col-auto">
//                   <div className="text-14 md:text-12 text-dark-1 fw-bold">
//                     {/* From {currentCurrency?.symbol} */}
//                     From {selectedCurrency?.symbol}
//                     <span className="text-16 md:text-13 fw-500 text-blue-1 fw-bold">
//                       {" "}
//                       {modifiedCurrency(item.price, selectedCurrency.currency)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="tourCard__title text-dark-5 text-18 md:text-13 lh-16 fw-600">
//                 <span>{item?.title}</span>
//               </div>
//               <p className="text-light-1 lh-14 text-14 md:text-12 mt-5">
//                 {item?.location}
//               </p>
//             </div>
//           </AgentLink>
//           <AgentLink
//             href={item?.trip_url ? item?.trip_url : "#"}
//             style={{
//               cursor: item?.trip_url ? "pointer" : "default",
//             }}
//             className={`${item?.trip_url ? "text-hover-underline" : ""}`}
//             target={item?.trip_url ? "_blank" : ""}
//           >
//             <div className="row justify-between items-center pt-15 ">
//               <div className="col-auto">
//                 <div className="d-flex items-center">
//                   <TripReview title={item?.title?.toLowerCase()} />
//                   <div className={`text-14 md:text-12 text-light-1 ml-10  `}>
//                     {item?.numberOfReviews} reviews
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </AgentLink>
//         </div>
//       );
//     })
//   );
// };

// export default ToursForMobile;
