"use client";

import useTours from "@/hooks/useTours";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import isTextMatched from "../../utils/isTextMatched";
import useWindowSize from "@/hooks/useWindowSize";
import TourMobileSkeleton from "../skeleton/TourMobileSkeleton";
import TripReview from "../common/TripReview";

const ToursForMobile = ({ destination, filterTour }) => {
  const tourItems = useTours(destination);

  const { currentCurrency } = useSelector((state) => state.currency);
  const { currentTab } = useSelector((state) => state.hero) || {};

  const filteredTourItems = filterTour
    ? tourItems.filter((item) => item.title !== filterTour)
    : currentTab == "Daily Tours"
    ? tourItems.filter(
        (item) => item.duration && item.duration.includes("hours")
      )
    : currentTab == "Multi-Day Tours"
    ? tourItems.filter(
        (item) => item.duration && !item.duration.includes("hours")
      )
    : tourItems;
  const width = useWindowSize();
  const isMobile = width < 768;

  return filteredTourItems?.length === 0 ? (
    <TourMobileSkeleton />
  ) : (
    filteredTourItems?.map((item) => {
      const slug = item?.slug?.endsWith("-1")
        ? item?.slug.slice(0, -2)
        : item?.slug;

      return (
        <div className="col-lg-3 col-md-4 col-6" key={item?.id}>
          <Link
            href={`/tour/${slug}`}
            style={{ cursor: "pointer" }}
            className="tourCard -type-1 rounded-4 hover-inside-slider"
          >
            <div className="tourCard__image position-relative">
              <div className="inside-slider">
                {/* <Slider
                {...itemSettings}
                arrows={true}
                nextArrow={<Arrow type="next" />}
                prevArrow={<Arrow type="prev" />}
              > */}
                {item?.slideImg?.map((slide, i) => (
                  <div className="cardImage ratio ratio-1:1" key={i}>
                    <div className="cardImage__content ">
                      <Image
                        width={300}
                        height={300}
                        priority
                        className="col-12 js-lazy"
                        src={slide}
                        alt={item?.title}
                      />
                    </div>
                  </div>
                ))}
                {/* </Slider> */}

                {/* <div className="cardImage__leftBadge cardImage-2__leftBadge md:d-none">
                
                <div className="buttons-2">
                  <button
                    style={{
                      backgroundColor: "#353537",
                      backgroundImage:
                        "linear-gradient(to right, #353537 , #0d0c0d)",
                    }}
                  >
                    {`${currentCurrency?.symbol} ${item.price}`}{" "}
                    <span> PER PERSON</span>
                  </button>
                  <button>No</button>
                </div>
                
              </div> */}
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
                    From {currentCurrency?.symbol}
                    <span className="text-16 md:text-13 fw-600 text-blue-1 fw-bold">
                      {" "}
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>
              <h4 className="tourCard__title text-dark-5 text-18 md:text-13 lh-16 fw-600">
                <span>{item?.title}</span>
              </h4>
              <p className="text-light-1 lh-14 text-14 md:text-12 mt-5">
                {item?.location}
              </p>
            </div>
          </Link>
          <Link
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
                  <TripReview title={item?.title?.toLowerCase()} />
                  <div className={`text-14 md:text-12 text-light-1 ml-10  `}>
                    {item?.numberOfReviews} reviews
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    })
  );
};

export default ToursForMobile;
