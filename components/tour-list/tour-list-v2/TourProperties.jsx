"use client";

import useFilterTours from "@/hooks/useFilterTours";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "@/hooks/useWindowSize";
import Slider from "react-slick";
import TripReview from "@/components/common/TripReview";
import { addFiltertourItems } from "@/features/tour/tourSlice";
import { useEffect } from "react";

const TourProperties = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const search = searchParams.get("location");
  const category = searchParams.get("category");
  const min = parseFloat(searchParams.get("min")) || 0; // Convert to number, default to 0
  const max = parseFloat(searchParams.get("max")) || Infinity; // Convert to number, default to Infinity
  const { currentCurrency } = useSelector((state) => state.currency);

  const tourItems = useFilterTours();

  // Filtering logic that combines location, category, and price range
  const filteredResults = tourItems.filter((item) => {
    const locationMatches = search
      ? item.location && item.location.includes(search)
      : true;

    const categoryMatches = category
      ? (category === "Attraction Tours" &&
          item.title &&
          item.title.includes("Ticket")) ||
        (category === "Day Tours" &&
          item.duration &&
          item.duration.includes("hours")) ||
        (category === "Multi-Day Tours" &&
          item.duration &&
          !item.duration.includes("hours"))
      : true;

    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, "")); // Remove non-numeric characters from price string and convert to number
    const priceMatches = price >= min && price <= max;

    return locationMatches && categoryMatches && priceMatches;
  });

  // Dispatch filtered results to Redux store only when filteredResults changes
  useEffect(() => {
    dispatch(addFiltertourItems(filteredResults));
  }, [dispatch, filteredResults]);

  const width = useWindowSize();
  const isMobile = width < 768;

  var itemSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Custom navigation
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

  return (
    <div
      className="row row-cols-1 row-cols-md-3 g-3 "
      style={{ marginTop: "-20px" }}
    >
      {filteredResults?.map((item) => {
        const slug = item?.slug?.endsWith("-1")
          ? item?.slug.slice(0, -2)
          : item?.slug;

        return (
          <div key={item?.id}>
            <Link
              href={`/tour/${slug}`}
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
                    <div>
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
                    </div>
                  </div>
                </div>
              </div>
              {/* End .tourCard__image */}

              <div className="tourCard__content mt-10">
                <div className="d-flex justify-content-between lh-14 mb-5">
                  <div className="text-14 text-light-1">
                    {isMobile ? `${item?.duration}` : `${item?.duration}`}
                  </div>
                  <div className="ml-10 mr-10" />
                  <div className="col-auto">
                    <div className="text-14 text-dark-1 fw-bold">
                      From {currentCurrency?.symbol}
                      <span className="text-16 fw-500 text-blue-1 fw-bold">
                        {" "}
                        {item.price}
                      </span>
                    </div>
                  </div>
                </div>
                <h4
                  className="tourCard__title text-dark-5 text-18 lh-16 fw-600"
                  style={{ color: "black" }}
                >
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
              <div className="row justify-between items-center pt-15 pb-10 ">
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

            {isMobile && (
              <Link href={`/tour/${slug}`} style={{ cursor: "pointer" }}>
                <button className="button -md h-5 border border-secondary bg-blue-1 text-white w-100">
                  Book Now
                </button>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TourProperties;
