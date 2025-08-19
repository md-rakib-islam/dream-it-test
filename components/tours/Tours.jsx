"use client";
import dynamic from "next/dynamic";
import { useContext, useEffect, useRef, useMemo, memo } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { LayoutContext } from "@/app/LayoutProvider";
import TourSkeleton from "../skeleton/TourSkeleton";
import { modifiedCurrency } from "@/utils/modifiedCurrency";
import AgentLink from "../AgentLink/AgentLink";
import OptimizedImage from "../common/optimized/OptimizedImage";
import LazyComponent from "../common/optimized/LazyComponent";

// 🚀 OPTIMIZATION: Lazy load slider with better loading state
const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
  loading: () => (
    <div
      className="slider-loading"
      style={{
        height: "300px",
        background: "#f3f4f6",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ color: "#6b7280" }}>Loading tours...</span>
    </div>
  ),
});

// 🚀 OPTIMIZATION: Lazy load TripReview component
const TripReview = dynamic(() => import("../common/TripReview"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "80px",
        height: "16px",
        background: "#f3f4f6",
        borderRadius: "4px",
      }}
    />
  ),
});

const Tours = ({ destination, filterTour, tourType }) => {
  const { toursMainData, selectedCurrency } = useContext(LayoutContext);
  const sliderRef = useRef(null);

  // 🚀 OPTIMIZATION: Memoize filtered tours to prevent unnecessary re-filtering
  const filteredtoursMainData = useMemo(() => {
    if (!toursMainData || !Array.isArray(toursMainData)) return [];

    if (filterTour) {
      return toursMainData.filter((item) => item.title !== filterTour);
    }

    if (tourType === "day") {
      return toursMainData.filter((item) => {
        if (item.duration && item.duration.includes("hours")) {
          const hours = Number.parseInt(
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
        (item) => item.duration && !item.duration.includes("hours")
      );
    }

    if (tourType === "attraction") {
      return toursMainData.filter(
        (item) => item.title && item.title.includes("Ticket")
      );
    }

    if (destination) {
      return toursMainData.filter(
        (item) => item.location && item.location.includes(destination)
      );
    }

    return toursMainData;
  }, [toursMainData, filterTour, tourType, destination]);

  const width = useWindowSize();

  // Accessibility fix: Remove focus from aria-hidden slides
  useEffect(() => {
    if (!sliderRef.current) return;
    const updateTabIndex = () => {
      const slides =
        sliderRef.current.innerSlider.list.querySelectorAll(".slick-slide");
      slides.forEach((slide) => {
        const isHidden = slide.getAttribute("aria-hidden") === "true";
        slide
          .querySelectorAll("a, button, input, select, textarea, [tabindex]")
          .forEach((el) => {
            el.tabIndex = isHidden ? -1 : 0;
          });
      });
    };

    // Initial run + re-run after every slide change
    updateTabIndex();
    sliderRef.current?.innerSlider?.list?.addEventListener(
      "transitionend",
      updateTabIndex
    );

    return () => {
      sliderRef.current?.innerSlider?.list?.removeEventListener(
        "transitionend",
        updateTabIndex
      );
    };
  }, []);

  // 🚀 OPTIMIZATION: Memoize slider settings to prevent recreation
  const settings = useMemo(
    () => ({
      dots: true,
      infinite: filteredtoursMainData.length >= 4,
      accessibility: true,
      speed: 400, // Slightly faster for better UX
      slidesToShow: 4,
      slidesToScroll: 4,
      lazyLoad: "ondemand",
      swipeToSlide: true,
      touchThreshold: 20,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            accessibility: true,
            infinite: filteredtoursMainData.length >= 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            accessibility: true,
            infinite: filteredtoursMainData.length >= 2,
          },
        },
        {
          breakpoint: 540,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            accessibility: true,
            infinite: filteredtoursMainData.length >= 2,
          },
        },
        {
          breakpoint: 300,
          settings: {
            slidesToShow: 1.09,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: "35px",
            accessibility: true,
            infinite: filteredtoursMainData.length >= 2,
          },
        },
      ],
    }),
    [filteredtoursMainData.length]
  );

  function Arrow(props) {
    let className =
      props.type === "next"
        ? "slick_arrow-between slick_arrow -next arrow-md flex-center button -blue-1 bg-secondary shadow-1 size-30 rounded-full js-next"
        : "slick_arrow-between slick_arrow -prev arrow-md flex-center button -blue-1 bg-secondary shadow-1 size-30 rounded-full js-prev";
    className += " arrow";
    const char =
      props.type === "next" ? (
        <i className="icon icon-chevron-right text-12 text-light" />
      ) : (
        <span className="icon icon-chevron-left text-12 text-light" />
      );
    return (
      <button
        className={className}
        onClick={props.onClick}
        aria-label={props.type === "next" ? "Next Slide" : "Previous Slide"}
      >
        {char}
      </button>
    );
  }

  // 🚀 OPTIMIZATION: Memoized TourCard to prevent unnecessary re-renders
  const TourCard = memo(({ item, index, isInSlider = false }) => {
    // Memoize expensive calculations
    const slug = useMemo(() => {
      return item?.slug?.endsWith("-1") ? item?.slug.slice(0, -2) : item?.slug;
    }, [item?.slug]);

    const isAboveFold = index < 4;
    const isFirstImage = index === 0 && !isInSlider;

    // Memoize price calculation
    const formattedPrice = useMemo(() => {
      return modifiedCurrency(item.price, selectedCurrency.currency);
    }, [item.price, selectedCurrency.currency]);

    // Only render first image for performance, show others on hover
    const firstImage = item?.slideImg?.[0];
    const hasMultipleImages = item?.slideImg?.length > 1;

    return (
      <div
        className={
          isInSlider
            ? "tour-card-slider"
            : "col-lg-3 col-md-3 col-6 tour-card-grid"
        }
        key={item?.id}
      >
        <AgentLink
          href={`/tours/${slug}`}
          style={{ cursor: "pointer" }}
          className="tourCard -type-1 rounded-4 hover-inside-slider"
          aria-label={`View details of ${item.title}`}
        >
          <div className="tourCard__image position-relative">
            <div className="inside-slider">
              {/* 🚀 OPTIMIZATION: Only render first image initially, lazy load others */}
              <div className="cardImage ratio ratio-1:1">
                <div className="cardImage__content">
                  <OptimizedImage
                    width={250}
                    height={250}
                    priority={isAboveFold || isFirstImage}
                    className="col-12"
                    src={firstImage}
                    alt={`${item?.title} - Tour image`}
                    variant="thumbnail"
                    quality={isAboveFold ? 85 : 75}
                    loading={isAboveFold || isFirstImage ? "eager" : "lazy"}
                  />
                </div>
              </div>

              {/* Show additional images on hover for desktop */}
              {hasMultipleImages && (
                <div className="additional-images d-none">
                  {item.slideImg.slice(1, 3).map((slide, i) => (
                    <div
                      className="cardImage ratio ratio-1:1 hover-image"
                      key={i + 1}
                    >
                      <div className="cardImage__content">
                        <OptimizedImage
                          width={250}
                          height={250}
                          className="col-12"
                          src={slide}
                          alt={`${item?.title} - Image ${i + 2}`}
                          variant="thumbnail"
                          quality={70}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="cardImage__leftBadge cardImage-2__leftBadge sm:d-none">
                <div className="buttons-2">
                  <button
                    className="price-badge"
                    aria-label={`Price: ${selectedCurrency?.symbol}${formattedPrice} per person`}
                  >
                    {selectedCurrency?.symbol}
                    {formattedPrice}
                    <span> PER PERSON</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="tourCard__content mt-10">
            <div className="d-flex justify-content-between lh-14 mb-5">
              <div className="text-14 md:text-12 text-light-1">
                {item?.duration}
              </div>
              <div className="ml-10 mr-10" />
              <div className="col-auto">
                <div className="text-14 md:text-12 text-dark-1 fw-bold">
                  From {selectedCurrency?.symbol}
                  <span className="text-16 md:text-13 fw-500 text-blue-1 fw-bold">
                    {" "}
                    {formattedPrice}
                  </span>
                </div>
              </div>
            </div>
            <div className="tourCard__title text-dark-5 text-18 md:text-13 lh-16 fw-600">
              <span>{item?.title}</span>
            </div>
            <p className="text-light-1 lh-14 text-14 md:text-12 mt-5">
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
              <div className="d-flex items-center">
                <TripReview title={item?.title?.toLowerCase()} />
                <div className="text-14 md:text-12 text-light-1 ml-10">
                  {item?.numberOfReviews} reviews
                </div>
              </div>
            </div>
          </div>
        </AgentLink>

        <style jsx>{`
          .price-badge {
            background: linear-gradient(to right, #353537, #0d0c0d);
            border: none;
            color: white;
            padding: 1px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
          }

          .hover-inside-slider:hover .additional-images {
            display: block !important;
          }

          .additional-images {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
          }

          .hover-image {
            animation: fadeIn 0.3s ease;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @media (max-width: 768px) {
            .additional-images {
              display: none !important;
            }
          }
        `}</style>
      </div>
    );
  });

  TourCard.displayName = "TourCard";

  // 🚀 OPTIMIZATION: Early returns with better loading states
  if (!filteredtoursMainData || filteredtoursMainData.length === 0) {
    if (!toursMainData) {
      return <TourSkeleton />;
    }
    return (
      <div className="no-tours-container">
        <p className="text-center text-light-1">
          No tours available for the selected criteria
        </p>
        <style jsx>{`
          .no-tours-container {
            padding: 40px 20px;
            text-align: center;
            min-height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    );
  }

  if (filteredtoursMainData?.length < 4) {
    return (
      <div className="row">
        {filteredtoursMainData?.map((item, index) => (
          <TourCard
            key={item?.id}
            item={item}
            index={index}
            isInSlider={false}
          />
        ))}
      </div>
    );
  }

  // 🚀 OPTIMIZATION: Better lazy loading with intersection observer
  return (
    <LazyComponent
      fallback={<TourSkeleton />}
      rootMargin="50px"
      threshold={0.1}
    >
      <div className="tours-slider-container">
        <Slider
          ref={sliderRef}
          {...settings}
          arrows={true}
          nextArrow={<Arrow type="next" />}
          prevArrow={<Arrow type="prev" />}
        >
          {filteredtoursMainData?.map((item, index) => (
            <div key={`${item?.id}-${index}`} className="slider-item">
              <TourCard item={item} index={index} isInSlider={true} />
            </div>
          ))}
        </Slider>

        <style jsx>{`
          .tours-slider-container {
            position: relative;
            contain: layout style;
          }

          .slider-item {
            padding: 0 8px;
          }

          :global(.slick-track) {
            display: flex;
            align-items: stretch;
          }

          :global(.slick-slide) {
            height: inherit;
          }

          :global(.slick-slide > div) {
            height: 100%;
          }
        `}</style>
      </div>
    </LazyComponent>
  );
};

export default Tours;

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// const Slider = dynamic(() => import('react-slick'), { ssr: false });

// import useWindowSize from "@/hooks/useWindowSize";
// import { LayoutContext } from "@/app/LayoutProvider";
// import TripReview from "../common/TripReview";
// import TourSkeleton from "../skeleton/TourSkeleton";
// import { useContext } from "react";
// import { modifiedCurrency } from "@/utils/modifiedCurrency";
// import AgentLink from "../AgentLink/AgentLink";

// const Tours = ({ destination, filterTour, tourType }) => {
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
//   const settings = {
//     dots: true,
//     infinite: true,
//     accessibility: false,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 4,
//     responsive: [
//       {
//         breakpoint: 992,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           accessibility: false,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           accessibility: false,
//         },
//       },
//       {
//         breakpoint: 540,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           accessibility: false,
//         },
//       },

//       {
//         breakpoint: 300,
//         settings: {
//           slidesToShow: 1.09,
//           slidesToScroll: 1,
//           centerMode: true,
//           centerPadding: "35px",
//           accessibility: false,
//         },
//       },
//     ],
//   };
//   var itemSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     accessibility: false,
//   };

//   // Custom navigation arrow component
//   function Arrow(props) {
//     let className =
//       props.type === "next"
//         ? "slick_arrow-between slick_arrow -next arrow-md flex-center button -blue-1 bg-secondary shadow-1 size-30 rounded-full js-next"
//         : "slick_arrow-between slick_arrow -prev arrow-md flex-center button -blue-1 bg-secondary shadow-1 size-30 rounded-full js-prev";
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
//       <button
//         className={className}
//         onClick={props.onClick}
//         aria-label={props.type === "next" ? "Next Slide" : "Previous Slide"}
//       >
//         {char}
//       </button>
//     );
//   }

//   return filteredtoursMainData?.length === 0 ? (
//     <p>No tours available</p>
//   ) : filteredtoursMainData?.length < 4 ? (
//     filteredtoursMainData?.map((item, index) => {
//       const slug = item?.slug?.endsWith("-1")
//         ? item?.slug.slice(0, -2)
//         : item?.slug;

//       return (
//         <div className="col-lg-3 col-md-3 col-6" key={item?.id}>
//           <AgentLink
//             href={`/tour/${slug}`}
//             style={{ cursor: "pointer" }}
//             className="tourCard -type-1 rounded-4 hover-inside-slider"
//             aria-hidden={index <= 3 ? "true" : "false"}
//           >
//             <div className="tourCard__image position-relative">
//               <div className="inside-slider">
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

//                 <div
//                   className="cardImage__leftBadge cardImage-2__leftBadge sm:d-none"
//                   aria-hidden={index <= 3 ? "true" : "false"}
//                 >
//                   <div className="buttons-2">
//                     <button
//                       style={{
//                         backgroundColor: "#353537",
//                         backgroundImage:
//                           "linear-gradient(to right, #353537 , #0d0c0d)",
//                       }}
//                     >
//                       {`${selectedCurrency?.symbol} ${modifiedCurrency(
//                         item.price,
//                         selectedCurrency.currency
//                       )}`}
//                       <span> PER PERSON</span>
//                     </button>
//                     <button>No</button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div
//               className="tourCard__content mt-10"
//               aria-hidden={index <= 3 ? "true" : "false"}
//             >
//               <div className="d-flex justify-content-between lh-14 mb-5">
//                 <div className="text-14 md:text-12 text-light-1">
//                   {isMobile ? `${item?.duration}` : `${item?.duration}`}
//                 </div>
//                 <div className="ml-10 mr-10" />
//                 <div className="col-auto">
//                   <div className="text-14 md:text-12 text-dark-1 fw-bold">
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
//             aria-hidden={index <= 3 ? "true" : "false"}
//           >
//             <div
//               className="row justify-between items-center pt-15 "
//               aria-hidden={index <= 3 ? "true" : "false"}
//             >
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
//   ) : (
//     <Slider
//       {...settings}
//       arrows={true}
//       nextArrow={<Arrow type="next" />}
//       prevArrow={<Arrow type="prev" />}
//     >
//       {filteredtoursMainData?.map((item, index) => {
//         const slug = item?.slug?.endsWith("-1")
//           ? item?.slug.slice(0, -2)
//           : item?.slug;

//         return (
//           <div key={item?.id} aria-hidden="true">
//             <AgentLink
//               href={`/tour/${slug}`}
//               style={{ cursor: "pointer" }}
//               className="tourCard -type-1 rounded-4 hover-inside-slider"
//               tabIndex={index >= filteredtoursMainData.length ? -1 : 0}
//               aria-label={`View details of ${item.title}`}
//             >
//               <div
//                 className="tourCard__image position-relative"
//                 aria-hidden={index <= 3 ? "true" : "false"}
//               >
//                 <div className="inside-slider">
//                   <Slider
//                     {...itemSettings}
//                     arrows={true}
//                     nextArrow={<Arrow type="next" />}
//                     prevArrow={<Arrow type="prev" />}
//                   >
//                     {item?.slideImg?.map((slide, i) => (
//                       <div className="cardImage ratio ratio-1:1" key={i}>
//                         <div className="cardImage__content ">
//                           <Image
//                             width={300}
//                             height={300}
//                             priority
//                             className="col-12 "
//                             src={slide}
//                             alt={item?.title}
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </Slider>

//                   <div
//                     className="cardImage__leftBadge cardImage-2__leftBadge"
//                     aria-hidden={index <= 3 ? "true" : "false"}
//                   >
//                     <div className="buttons-2">
//                       <button
//                         style={{
//                           backgroundColor: "#353537",
//                           backgroundImage:
//                             "linear-gradient(to right, #353537 , #0d0c0d)",
//                         }}
//                         aria-hidden={index <= 3 ? "true" : "false"}
//                       >
//                         {`${selectedCurrency?.symbol} ${modifiedCurrency(
//                           item.price,
//                           selectedCurrency.currency
//                         )}`}{" "}
//                         <span> PER PERSON</span>
//                       </button>
//                       <button aria-hidden={index <= 3 ? "true" : "false"}>
//                         No
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div
//                 className="tourCard__content mt-10"
//                 aria-hidden={index <= 3 ? "true" : "false"}
//               >
//                 <div className="d-flex justify-content-between lh-14 mb-5">
//                   <div className="text-14 text-light-1">
//                     {isMobile ? `${item?.duration}` : `${item?.duration}`}
//                   </div>
//                   <div className="ml-10 mr-10" />
//                   <div className="col-auto">
//                     <div className="text-14 text-dark-1 fw-bold">
//                       From {selectedCurrency?.symbol}
//                       <span className="text-16 fw-500 text-blue-1 fw-bold">
//                         {" "}
//                         {modifiedCurrency(
//                           item.price,
//                           selectedCurrency.currency
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="tourCard__title text-dark-5 text-18 lh-16 fw-600">
//                   <span>{item?.title}</span>
//                 </div>
//                 <p className="text-light-1 lh-14 text-14 mt-5">
//                   {item?.location}
//                 </p>
//               </div>
//             </AgentLink>
//             <AgentLink
//               href={item?.trip_url ? item?.trip_url : "#"}
//               style={{
//                 cursor: item?.trip_url ? "pointer" : "default",
//               }}
//               className={`${item?.trip_url ? "text-hover-underline" : ""}`}
//               target={item?.trip_url ? "_blank" : ""}
//               aria-hidden={index <= 3 ? "true" : "false"}
//             >
//               <div className="row justify-between items-center pt-15 ">
//                 <div className="col-auto">
//                   <div className="d-flex items-center">
//                     <TripReview title={item?.title?.toLowerCase()} />
//                     <div className={`text-14 md:text-12 text-light-1 ml-10  `}>
//                       {item?.numberOfReviews} reviews
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </AgentLink>
//           </div>
//         );
//       })}
//     </Slider>
//   );
// };

// export default Tours;
