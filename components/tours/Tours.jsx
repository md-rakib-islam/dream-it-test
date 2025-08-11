"use client";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

import useWindowSize from "@/hooks/useWindowSize";
import { LayoutContext } from "@/app/LayoutProvider";
import TripReview from "../common/TripReview";
import TourSkeleton from "../skeleton/TourSkeleton";
import { useContext } from "react";
import { modifiedCurrency } from "@/utils/modifiedCurrency";
import AgentLink from "../AgentLink/AgentLink";
import OptimizedImage from "../common/optimized/OptimizedImage";
import LazyComponent from "../common/optimized/LazyComponent";

const Tours = ({ destination, filterTour, tourType }) => {
  const { toursMainData, selectedCurrency } = useContext(LayoutContext);
  const filteredtoursMainData = filterTour
    ? toursMainData.filter((item) => item.title !== filterTour)
    : tourType == "day"
    ? toursMainData.filter((item) => {
        if (item.duration && item.duration.includes("hours")) {
          const hours = Number.parseInt(
            item.duration.replace(/hour[s]?/, "").trim(),
            10
          );
          return hours < 1 || hours > 4;
        }
        return false;
      })
    : tourType == "multi"
    ? toursMainData.filter(
        (item) => item.duration && !item.duration.includes("hours")
      )
    : tourType == "attraction"
    ? toursMainData.filter(
        (item) => item.title && item.title.includes("Ticket")
      )
    : destination
    ? toursMainData.filter(
        (item) => item.location && item.location.includes(destination)
      )
    : toursMainData;

  const width = useWindowSize();
  const isMobile = width < 768;

  // Optimized slider settings with lazy loading
  const settings = {
    dots: true,
    infinite: true,
    accessibility: true, // Changed to true for better accessibility
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    lazyLoad: "ondemand", // Added lazy loading for slider
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          accessibility: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          accessibility: true,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          accessibility: true,
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
        },
      },
    ],
  };

  // Optimized item slider settings
  const itemSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
    lazyLoad: "ondemand",
    fade: true, // Added fade effect for better performance
  };

  // Custom navigation arrow component
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

  // Tour card component for reusability
  const TourCard = ({ item, index, isInSlider = false }) => {
    const slug = item?.slug?.endsWith("-1")
      ? item?.slug.slice(0, -2)
      : item?.slug;

    const isAboveFold = index < 4; // First 4 items get priority loading

    return (
      <div
        className={isInSlider ? "" : "col-lg-3 col-md-3 col-6"}
        key={item?.id}
      >
        <AgentLink
          href={`/tour/${slug}`}
          style={{ cursor: "pointer" }}
          className="tourCard -type-1 rounded-4 hover-inside-slider"
          aria-label={`View details of ${item.title}`}
        >
          <div className="tourCard__image position-relative">
            <div className="inside-slider">
              {isInSlider ? (
                // For slider items - use inner slider
                <Slider
                  {...itemSettings}
                  arrows={true}
                  nextArrow={<Arrow type="next" />}
                  prevArrow={<Arrow type="prev" />}
                >
                  {item?.slideImg?.map((slide, i) => (
                    <div className="cardImage ratio ratio-1:1" key={i}>
                      <div className="cardImage__content">
                        <OptimizedImage
                          width={200}
                          height={200}
                          priority={isAboveFold && i === 0} // Only first image of first 4 cards get priority
                          className="col-12"
                          src={slide}
                          alt={`${item?.title} - Image ${i + 1}`}
                          variant="thumbnail"
                          quality={80}
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                // For non-slider items - show all images
                item?.slideImg?.map((slide, i) => (
                  <div className="cardImage ratio ratio-1:1" key={i}>
                    <div className="cardImage__content">
                      <OptimizedImage
                        width={200}
                        height={200}
                        priority={isAboveFold && i === 0}
                        className="col-12"
                        src={slide}
                        alt={`${item?.title} - Image ${i + 1}`}
                        variant="thumbnail"
                        quality={80}
                      />
                    </div>
                  </div>
                ))
              )}

              <div className="cardImage__leftBadge cardImage-2__leftBadge sm:d-none">
                <div className="buttons-2">
                  <button
                    style={{
                      backgroundColor: "#353537",
                      backgroundImage:
                        "linear-gradient(to right, #353537 , #0d0c0d)",
                    }}
                  >
                    {`${selectedCurrency?.symbol} ${modifiedCurrency(
                      item.price,
                      selectedCurrency.currency
                    )}`}
                    <span> PER PERSON</span>
                  </button>
                  <button>No</button>
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
                    {modifiedCurrency(item.price, selectedCurrency.currency)}
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
          href={item?.trip_url ? item?.trip_url : "#"}
          style={{
            cursor: item?.trip_url ? "pointer" : "default",
          }}
          className={`${item?.trip_url ? "text-hover-underline" : ""}`}
          target={item?.trip_url ? "_blank" : ""}
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
      </div>
    );
  };

  // Loading state
  if (!filteredtoursMainData) {
    return <TourSkeleton />;
  }

  // No tours available
  if (filteredtoursMainData?.length === 0) {
    return <p>No tours available</p>;
  }

  // Less than 4 tours - show without slider
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

  // 4 or more tours - use slider with lazy loading
  return (
    <LazyComponent
      fallback={<TourSkeleton />}
      rootMargin="100px" // Load when 100px before entering viewport
    >
      <Slider
        {...settings}
        arrows={true}
        nextArrow={<Arrow type="next" />}
        prevArrow={<Arrow type="prev" />}
      >
        {filteredtoursMainData?.map((item, index) => (
          <div key={item?.id}>
            <TourCard item={item} index={index} isInSlider={true} />
          </div>
        ))}
      </Slider>
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
