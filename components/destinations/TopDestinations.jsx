"use client";
import dynamic from "next/dynamic";
import { LayoutContext } from "@/app/LayoutProvider";
import OptimizedImage from "../common/optimized/OptimizedImage";
import { useContext } from "react";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

import AgentLink from "../AgentLink/AgentLink";

const TopDestinations = ({ destination }) => {
  const { topDestinations } = useContext(LayoutContext);

  const filteredTopDestinations = destination
    ? topDestinations?.filter(
        (item) => item.name.toLowerCase() !== destination.toLowerCase()
      )
    : topDestinations;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay speed in milliseconds
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          autoplay: true, // Enable autoplay
          autoplaySpeed: 3000, // Set autoplay speed in milliseconds
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true, // Enable autoplay
          autoplaySpeed: 3000, // Set autoplay speed in milliseconds
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true, // Enable autoplay
          autoplaySpeed: 3000, // Set autoplay speed in milliseconds
        },
      },
    ],
  };
  return (
    <>
      <Slider {...settings}>
        {filteredTopDestinations?.map((item) => (
          <div
            className={`${item.colClass} top_destination_width px-5`}
            key={item.id}
            data-aos="fade"
            data-aos-delay={item.delayAnimation}
          >
            <AgentLink
              href={`/destinations/${item?.name
                ?.toLowerCase()
                ?.split(" ")
                ?.join("_")}`}
              className="citiesCard -type-3 d-block h-full rounded-4 "
            >
              <div className="citiesCard__image ratio ratio-3:2">
                <OptimizedImage
                  className="col-12 "
                  src={item?.img}
                  width={300}
                  height={200}
                  quality={80}
                  priority
                  alt={`${item?.name} Images`}
                  variant="thumbnail"
                />{" "}
              </div>
              <div className="citiesCard__content d-flex justify-content-center align-items-center px-30 py-30">
                <span className="text-26 fw-500 text-white md:text-20 text-capitalize">
                  {item.name}
                </span>
                {/* <div className="text-15 text-white">
                {item.numberOfProperties} properties
              </div> */}
              </div>
            </AgentLink>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default TopDestinations;
