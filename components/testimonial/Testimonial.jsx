"use client";

import OptimizedImage from "../common/optimized/OptimizedImage";
import { useContext, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

import Link from "next/link";

import { LayoutContext } from "@/app/LayoutProvider";

const Testimonial = () => {
  const { reviewsData } = useContext(LayoutContext);

  const [expandedRows, setExpandedRows] = useState([]);
  const textRefs = useRef([]);

  useEffect(() => {
    setExpandedRows(Array(reviewsData?.reviews.length).fill(false));
  }, [reviewsData]);

  const toggleReadMore = (index) => {
    const updatedRows = [...expandedRows];
    updatedRows[index] = !updatedRows[index];
    setExpandedRows(updatedRows);
  };

  function formatDate(seconds) {
    const milliseconds = seconds * 1000;

    const date = new Date(milliseconds);
    const now = new Date();

    const options = {
      day: "numeric",
      month: "long",
    };

    if (date.getFullYear() !== now.getFullYear()) {
      options.year = "numeric";
    }

    return date.toLocaleDateString("en-GB", options);
  }

  const settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1.09,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "35px",
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1.09,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "35px",
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
    ],
  };
  function Arrow(props) {
    let className =
      props.type === "next"
        ? "custom-slick-between custom-slick -next arrow-md flex-center button -blue-1  shadow-1 size-30 rounded-full js-next"
        : "custom-slick-between custom-slick -prev arrow-md flex-center button -blue-1  shadow-1 size-30 rounded-full js-prev";
    className += " arrow";
    const char =
      props.type === "next" ? (
        <>
          <i className="icon icon-chevron-right text-12 "></i>
        </>
      ) : (
        <>
          <span className="icon icon-chevron-left text-12 "></span>
        </>
      );
    return (
      <button className={className} onClick={props.onClick}>
        {char}
      </button>
    );
  }
  return (
    <>
      <Slider
        {...settings}
        arrows={true}
        nextArrow={<Arrow type="next" />}
        prevArrow={<Arrow type="prev" />}
      >
        {reviewsData?.reviews
          .filter((item) => item.rating === 5)
          .sort((a, b) => {
            const dateA = new Date(a.publication * 1000);
            const dateB = new Date(b.publication * 1000);
            // Compare by year (descending)
            if (dateB.getFullYear() !== dateA.getFullYear()) {
              return dateB.getFullYear() - dateA.getFullYear();
            }

            // If years are equal, compare by month (descending)
            if (dateB.getMonth() !== dateA.getMonth()) {
              return dateB.getMonth() - dateA.getMonth();
            }

            // If months and years are equal, compare by day (descending)
            return dateB.getDate() - dateA.getDate();
          })
          .map((item, index) => (
            <div
              className=" bg-white rounded-4 pt-20 pb-30 px-20"
              key={item.id}
              data-aos="fade"
              data-aos-delay={item.dealyAnimation}
            >
              <div className="row x-gap-10 y-gap-10 items-center">
                <div className="col-4">
                  <OptimizedImage
                    unoptimized
                    width={60}
                    height={60}
                    src={item.cloudflare_image}
                    alt={item?.reviewer_name}
                    className={`size-60 rounded-circle`}
                  />
                </div>
                <div className="col-8">
                  <Link href={item.url} legacyBehavior>
                    <a
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      style={{ textDecoration: "none", cursor: "pointer" }}
                    >
                      <div className=" d-flex items-center">
                        <span className="text-14 fw-500 lh-14 link-hover">
                          {item.reviewer_name.slice(0, 15)}
                        </span>

                        <OptimizedImage
                          width={20}
                          height={20}
                          src="/img/featureIcons/3/verified.svg"
                          alt={item?.reviewer_name}
                          className="size-14 ml-5 rounded-circle"
                        />
                      </div>
                    </a>
                  </Link>
                  <div>
                    <p className="text-12">{formatDate(item.publication)}</p>
                  </div>
                </div>
              </div>
              <div className="d-flex items-center x-gap-5 mt-10 mb-10">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="icon-star text-yellow-3 text-14" />
                ))}
              </div>
              <span
                style={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
                className="text-14 fw-500"
              >
                {item.title}
              </span>
              <div className="border-top-light mt-5">
                <p
                  ref={(el) => (textRefs.current[index] = el)}
                  className={`title-text lh-17 fw-400 text-dark-1 text-14 mt-5  ${
                    expandedRows[index] ? "show-all" : ""
                  }`}
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: expandedRows[index] ? "initial" : 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.text}
                </p>
                <button
                  className="text-14 fw-200 text-dark-4"
                  onClick={() => toggleReadMore(index)}
                >
                  {expandedRows[index] ? "Hide" : "Read more"}
                </button>
              </div>
            </div>
          ))}
      </Slider>
    </>
  );
};

export default Testimonial;
