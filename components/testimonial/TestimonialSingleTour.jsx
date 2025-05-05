"use client";

import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LayoutContext } from "@/app/LayoutProvider";

const TestimonialSingleTour = () => {
  const { reviewsData } = useContext(LayoutContext);

  const [expandedRows, setExpandedRows] = useState([]);
  const textRefs = useRef([]);

  useEffect(() => {
    if (reviewsData?.reviews) {
      setExpandedRows(Array(reviewsData.reviews.length).fill(false));
    }
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

  // Filter and sort reviews
  const filteredReviews = reviewsData?.reviews
    ? reviewsData.reviews
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
        .slice(0, 6) // Only take the first 3 reviews
    : [];

  return (
    <>
      <div className="row">
        {filteredReviews.map((item, index) => (
          <div
            className="col-lg-4 col-md-6"
            key={item.id}
            data-aos="fade"
            data-aos-delay={index * 100}
          >
            <div className="bg-white rounded-4 pt-20 pb-30 px-20 h-full">
              <div className="row x-gap-10 y-gap-10 items-center">
                <div className="col-4">
                  <Image
                    unoptimized
                    width={60}
                    height={60}
                    src={item.cloudflare_image || "/placeholder.svg"}
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
                      <div className="d-flex items-center">
                        <span className="text-14 fw-500 lh-14 link-hover">
                          {item.reviewer_name.slice(0, 15)}
                        </span>

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
                  className={`title-text lh-17 fw-400 text-dark-1 text-14 mt-5 ${
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
          </div>
        ))}
      </div>

      <div className="row mt-30">
        <div className="col-auto">
          <Link
            href="https://www.tripadvisor.co.uk/AttractionProductReview-g187791-d17486873-Colosseum_Roman_Forum_and_Palatine_Hill_Access_with_Audio_Guide-Rome_Lazio.html"
            className="button -md -blue-1 bg-blue-1-05 text-blue-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            See more reviews <i className="icon-arrow-top-right ml-10"></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TestimonialSingleTour;
