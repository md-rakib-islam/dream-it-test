"use client";

import useTours from "@/hooks/useTours";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import isTextMatched from "../../utils/isTextMatched";
import useWindowSize from "@/hooks/useWindowSize";
import TourSkeleton from "../skeleton/TourSkeleton";
import TripReview from "../common/TripReview";

const Tours = ({ destination, filterTour, dailyTours, multiDays }) => {
  const tourItems = useTours(destination);
  const filteredTourItems = filterTour
    ? tourItems.filter((item) => item.title !== filterTour)
    : dailyTours
    ? tourItems.filter(
        (item) => item.duration && item.duration.includes("hours")
      )
    : multiDays
    ? tourItems.filter(
        (item) => item.duration && !item.duration.includes("hours")
      )
    : tourItems;
  const { currentCurrency } = useSelector((state) => state.currency);
  const width = useWindowSize();
  const isMobile = width < 768;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },

      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1.09,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "35px",
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
      <button className={className} onClick={props.onClick}>
        {char}
      </button>
    );
  }

  return filteredTourItems?.length === 0 ? (
    <TourSkeleton />
  ) : filteredTourItems?.length < 4 ? (
    filteredTourItems?.map((item) => (
      <div className="col-lg-3 col-md-3 col-6" key={item?.id}>
        <Link
          href={`/tour/${item?.slug}`}
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

              <div className="cardImage__leftBadge cardImage-2__leftBadge sm:d-none">
                {/* <div
                    className={`py-5  rounded-right-4 text-12 lh-16 fw-600 uppercase ${
                      isTextMatched(item?.tag, "likely to sell out*")
                        ? "bg-dark-1 text-white"
                        : ""
                    } ${
                      isTextMatched(item?.tag, "best seller")
                        ? "bg-blue-1 text-white"
                        : ""
                    }  ${
                      isTextMatched(item?.tag, "top rated")
                        ? "bg-yellow-1 text-dark-1"
                        : ""
                    }`}
                  >
                    Item
                  </div> */}
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
                {/* <div>
                  <Image
                    width={80}
                    height={80}
                    priority
                    className="col-12 js-lazy"
                    src={`https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/94088711-e642-4216-52ee-393e4c6a3c00/public`}
                    alt="price"
                  />

                  <p
                    className={
                      currentCurrency?.symbol == "ريال"
                        ? "price-arabic-position"
                        : "price-position"
                    }
                  >{`${currentCurrency?.symbol} ${item.price}`}</p>
                </div> */}
              </div>
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
    ))
  ) : (
    <Slider
      {...settings}
      arrows={true}
      nextArrow={<Arrow type="next" />}
      prevArrow={<Arrow type="prev" />}
    >
      {filteredTourItems?.map((item) => (
        <div key={item?.id}>
          <Link
            href={`/tour/${item?.slug}`}
            style={{ cursor: "pointer" }}
            className="tourCard -type-1 rounded-4 hover-inside-slider"
          >
            <div className="tourCard__image position-relative">
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

                <div className="cardImage__leftBadge cardImage-2__leftBadge">
                  {/* <div
                    className={`py-5  rounded-right-4 text-12 lh-16 fw-600 uppercase ${
                      isTextMatched(item?.tag, "likely to sell out*")
                        ? "bg-dark-1 text-white"
                        : ""
                    } ${
                      isTextMatched(item?.tag, "best seller")
                        ? "bg-blue-1 text-white"
                        : ""
                    }  ${
                      isTextMatched(item?.tag, "top rated")
                        ? "bg-yellow-1 text-dark-1"
                        : ""
                    }`}
                  >
                    Item
                  </div> */}
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
                  {/* <div>
                    <Image
                      width={80}
                      height={80}
                      priority
                      className="col-12 js-lazy"
                      src={`https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/94088711-e642-4216-52ee-393e4c6a3c00/public`}
                      alt="price"
                    />

                    <p
                      className={
                        currentCurrency?.symbol == "ريال"
                          ? "price-arabic-position"
                          : "price-position"
                      }
                    >{`${currentCurrency?.symbol} ${item.price}`}</p>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="tourCard__content mt-10">
              <div className="d-flex justify-content-between lh-14 mb-5">
                <div className="text-14 text-light-1">
                  {isMobile ? `${item?.duration}` : `${item?.duration}`}
                </div>
                <div className="ml-10 mr-10" />
                <div className="col-auto">
                  <div className="text-14 text-dark-1 fw-bold">
                    From {currentCurrency?.symbol}
                    <span className="text-16 fw-600 text-blue-1 fw-bold">
                      {" "}
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>
              <h4 className="tourCard__title text-dark-5 text-18 lh-16 fw-600">
                <span>{item?.title}</span>
              </h4>
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
      ))}
    </Slider>
  );
};

export default Tours;
