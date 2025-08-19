"use client";

import useWindowSize from "@/hooks/useWindowSize";
import TourMobileSkeleton from "../skeleton/TourMobileSkeleton";
import { useContext } from "react";
import { LayoutContext } from "@/app/LayoutProvider";
import { modifiedCurrency } from "@/utils/modifiedCurrency";
import AgentLink from "../AgentLink/AgentLink";
import OptimizedImage from "../common/optimized/OptimizedImage";
import LazyComponent from "../common/optimized/LazyComponent";

const ToursForMobile = ({ destination, filterTour, tourType }) => {
  const { toursMainData, selectedCurrency } = useContext(LayoutContext);

  const filteredtoursMainData = filterTour
    ? toursMainData.filter((item) => item.title !== filterTour)
    : tourType == "day"
    ? toursMainData.filter((item) => {
        if (item.duration && item.duration.includes("hours")) {
          const hours = parseInt(
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

  return filteredtoursMainData?.length === 0 ? (
    <TourMobileSkeleton />
  ) : (
    filteredtoursMainData?.map((item, index) => {
      const slug = item?.slug?.endsWith("-1")
        ? item?.slug.slice(0, -2)
        : item?.slug;
      const isAboveFold = index < 4;

      return (
        <div className="col-lg-3 col-md-4 col-6" key={item?.id}>
          <AgentLink
            href={`/tours/${slug}`}
            style={{ cursor: "pointer" }}
            className="tourCard -type-1 rounded-4 hover-inside-slider"
          >
            <div className="tourCard__image position-relative">
              <div className="inside-slider">
                {item?.slideImg?.map((slide, i) => (
                  <div className="cardImage ratio ratio-1:1" key={i}>
                    <div className="cardImage__content ">
                      <OptimizedImage
                        src={slide}
                        priority={isAboveFold && i === 0}
                        alt={item?.title}
                        width={200}
                        height={200}
                        className="col-12 "
                        variant="thumbnail"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="tourCard__content mt-10">
              <div className="d-flex justify-content-between lh-14 mb-5">
                <div className="text-14 md:text-12 text-light-1">
                  {isMobile ? `${item?.duration}` : `${item?.duration}`}
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
            <div className="row justify-between items-center pt-15 ">
              <div className="col-auto">
                <div className="d-flex items-center">
                  <LazyComponent
                    loader={() => import("../common/TripReview")}
                    props={{ title: item?.title?.toLowerCase() }}
                    fallback={<span>Loading...</span>}
                  />
                  <div className={`text-14 md:text-12 text-light-1 ml-10  `}>
                    {item?.numberOfReviews} reviews
                  </div>
                </div>
              </div>
            </div>
          </AgentLink>
        </div>
      );
    })
  );
};

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
