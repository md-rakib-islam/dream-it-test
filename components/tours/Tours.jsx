"use client";

import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import useWindowSize from "@/hooks/useWindowSize";
import { LayoutContext } from "@/app/LayoutProvider";
import TripReview from "../common/TripReview";
import TourSkeleton from "../skeleton/TourSkeleton";
import { useContext } from "react";
import { modifiedCurrency } from "@/utils/modifiedCurrency";

const Tours = ({ destination, filterTour, tourType }) => {
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
          return hours < 1 || hours > 4; // Only include items outside the 1-4 hour range
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
  const settings = {
    dots: true,
    infinite: true,
    accessibility: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          accessibility: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          accessibility: false,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          accessibility: false,
        },
      },

      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1.09,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "35px",
          accessibility: false,
        },
      },
    ],
  };
  var itemSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: false,
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
        <>
          <i className="icon icon-chevron-right text-12 text-light"></i>
        </>
      ) : (
        <>
          <span className="icon icon-chevron-left text-12 text-light"></span>
        </>
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

  return filteredtoursMainData?.length === 0 ? (
    <TourSkeleton />
  ) : filteredtoursMainData?.length < 4 ? (
    filteredtoursMainData?.map((item, index) => {
      const slug = item?.slug?.endsWith("-1")
        ? item?.slug.slice(0, -2)
        : item?.slug;

      return (
        <div className="col-lg-3 col-md-3 col-6" key={item?.id}>
          <Link
            href={`/tour/${slug}`}
            style={{ cursor: "pointer" }}
            className="tourCard -type-1 rounded-4 hover-inside-slider"
            aria-hidden={index <= 3 ? "true" : "false"}
          >
            <div className="tourCard__image position-relative">
              <div className="inside-slider">
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

                <div
                  className="cardImage__leftBadge cardImage-2__leftBadge sm:d-none"
                  aria-hidden={index <= 3 ? "true" : "false"}
                >
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

            <div
              className="tourCard__content mt-10"
              aria-hidden={index <= 3 ? "true" : "false"}
            >
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
              <h3 className="tourCard__title text-dark-5 text-18 md:text-13 lh-16 fw-600">
                <span>{item?.title}</span>
              </h3>
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
            aria-hidden={index <= 3 ? "true" : "false"}
          >
            <div
              className="row justify-between items-center pt-15 "
              aria-hidden={index <= 3 ? "true" : "false"}
            >
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
  ) : (
    <Slider
      {...settings}
      arrows={true}
      nextArrow={<Arrow type="next" />}
      prevArrow={<Arrow type="prev" />}
    >
      {filteredtoursMainData?.map((item, index) => {
        const slug = item?.slug?.endsWith("-1")
          ? item?.slug.slice(0, -2)
          : item?.slug;

        return (
          <div key={item?.id} aria-hidden="true">
            <Link
              href={`/tour/${slug}`}
              style={{ cursor: "pointer" }}
              className="tourCard -type-1 rounded-4 hover-inside-slider"
              tabIndex={index >= filteredtoursMainData.length ? -1 : 0}
              aria-label={`View details of ${item.title}`}
            >
              <div
                className="tourCard__image position-relative"
                aria-hidden={index <= 3 ? "true" : "false"}
              >
                <div className="inside-slider">
                  <Slider
                    {...itemSettings}
                    arrows={true}
                    nextArrow={<Arrow type="next" />}
                    prevArrow={<Arrow type="prev" />}
                  >
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
                  </Slider>

                  <div
                    className="cardImage__leftBadge cardImage-2__leftBadge"
                    aria-hidden={index <= 3 ? "true" : "false"}
                  >
                    <div className="buttons-2">
                      <button
                        style={{
                          backgroundColor: "#353537",
                          backgroundImage:
                            "linear-gradient(to right, #353537 , #0d0c0d)",
                        }}
                        aria-hidden={index <= 3 ? "true" : "false"}
                      >
                        {`${selectedCurrency?.symbol} ${modifiedCurrency(
                          item.price,
                          selectedCurrency.currency
                        )}`}{" "}
                        <span> PER PERSON</span>
                      </button>
                      <button aria-hidden={index <= 3 ? "true" : "false"}>
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="tourCard__content mt-10"
                aria-hidden={index <= 3 ? "true" : "false"}
              >
                <div className="d-flex justify-content-between lh-14 mb-5">
                  <div className="text-14 text-light-1">
                    {isMobile ? `${item?.duration}` : `${item?.duration}`}
                  </div>
                  <div className="ml-10 mr-10" />
                  <div className="col-auto">
                    <div className="text-14 text-dark-1 fw-bold">
                      From {selectedCurrency?.symbol}
                      <span className="text-16 fw-500 text-blue-1 fw-bold">
                        {" "}
                        {modifiedCurrency(
                          item.price,
                          selectedCurrency.currency
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="tourCard__title text-dark-5 text-18 lh-16 fw-600">
                  <span>{item?.title}</span>
                </h3>
                <p className="text-light-1 lh-14 text-14 mt-5">
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
              aria-hidden={index <= 3 ? "true" : "false"}
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
      })}
    </Slider>
  );
};

export default Tours;
