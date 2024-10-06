"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Link from "next/link";

const Testimonial = ({ reviewsData }) => {
  // const [loadImage, setLoadImage] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const textRefs = useRef([]);

  useEffect(() => {
    // Initialize the array of expanded state with false for each row
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

    // Check if the year is the current year
    if (date.getFullYear() !== now.getFullYear()) {
      options.year = "numeric";
    }

    return date.toLocaleDateString("en-GB", options);
  }

  const settings = {
    // dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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
        breakpoint: 520,
        settings: {
          slidesToShow: 1.09,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "35px",
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
        // dots={(count, dotList) => {

        //   // Calculate the number of dots to show
        //   const maxDotsToShow = 4;
        //   const totalSlides = count + settings.slidesToShow - 1; // Adjust total slides considering the slidesToShow
        //   const totalDots = Math.ceil(totalSlides / settings.slidesToShow);
        //   const visibleDots = Math.min(maxDotsToShow, totalDots);

        //   // Render only the visible dots
        //   return dotList.slice(0, visibleDots);
        // }}
      >
        {reviewsData?.reviews
          .filter((item) => item.rating === 5)
          .map((item, index) => (
            <div
              className=" bg-white rounded-4 pt-20 pb-30 px-20"
              key={item.id}
              data-aos="fade"
              data-aos-delay={item.dealyAnimation}
            >
              <div className="row x-gap-10 y-gap-10 items-center">
                <div className="col-4">
                  <Image
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
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", cursor: "pointer" }}
                    >
                      <div className=" d-flex items-center">
                        <h4 className="text-14 fw-600 lh-14 link-hover">
                          {item.reviewer_name.slice(0, 15)}
                        </h4>

                        <Image
                          unoptimized
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
              <h4
                style={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
                className="text-14 fw-600"
              >
                {item.title}
              </h4>
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
