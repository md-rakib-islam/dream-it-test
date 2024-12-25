"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useWindowSize from "@/hooks/useWindowSize";
import Slider from "react-slick";
import TripReview from "@/components/common/TripReview";
import { useContext, useEffect, useMemo } from "react";
import { LayoutContext } from "@/app/LayoutProvider";
import { modifiedCurrency } from "@/utils/modifiedCurrency";

const TourProperties = () => {
  const { toursMainData, filteredTours, setFilteredTours, selectedCurrency } =
    useContext(LayoutContext);

  const searchParams = useSearchParams();
  const search = searchParams.get("location");
  const category = searchParams.get("category");
  const duration = searchParams.get("duration");
  const min = parseFloat(searchParams.get("min")) || 0;
  const max = parseFloat(searchParams.get("max")) || Infinity;

  const filteredResults = useMemo(() => {
    return toursMainData.filter((item) => {
      if (!item) return false; // Skip undefined or null items

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

      const durationMatches = () => {
        if (!item.duration) return false; // Exclude items with no duration

        const hours = parseInt(item.duration?.match(/(\d+)/)?.[0] || 0); // Extract numeric value
        const days = parseInt(item.duration?.match(/(\d+)/)?.[0] || 0);
        if (duration === "1 to 4 Hours") {
          return hours >= 1 && hours <= 4;
        }

        if (duration === "5 Hours to 1 Day") {
          return hours > 4 && hours <= 24;
        }

        if (duration === "2 to 5 Days") {
          return days >= 2 && days <= 5 && item.duration.includes("days"); // Filter for 2 to 5 days// Convert days to hours
        }

        return true; // Default to true if no specific duration filter is applied
      };

      const price = parseFloat(item.price?.replace(/[^0-9.-]+/g, "") || "0"); // Handle undefined price gracefully
      const priceMatches = price >= min && price <= max;

      return (
        locationMatches && categoryMatches && priceMatches && durationMatches()
      );
    });
  }, [toursMainData, search, min, max, category, duration]);

  // Dispatch filtered results to Redux store only when filteredResults changes
  useEffect(() => {
    setFilteredTours(filteredResults);
  }, [filteredResults]);

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
      className="row row-cols-2 row-cols-md-3  "
      style={{ marginTop: "-20px" }}
    >
      {filteredResults?.map((item, idx) => {
        const slug = item?.slug?.endsWith("-1")
          ? item?.slug.slice(0, -2)
          : item?.slug;

        return (
          <div key={idx}>
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

                  <div className="cardImage__leftBadge cardImage-2__leftBadge sm:d-none">
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
                        )}`}{" "}
                        <span> PER PERSON</span>
                      </button>
                      <button>No</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* End .tourCard__image */}

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
                        {item.price}
                      </span>
                    </div>
                  </div>
                </div>
                <h4
                  className="tourCard__title text-dark-5 text-18 md:text-13 lh-16 fw-600"
                  style={{ color: "black" }}
                >
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

            {/* {isMobile && (
              <Link href={`/tour/${slug}`} style={{ cursor: "pointer" }}>
                <button className="button -md h-5 border border-secondary bg-blue-1 text-white w-100">
                  Book Now
                </button>
              </Link>
            )} */}
          </div>
        );
      })}
    </div>
  );
};

export default TourProperties;
