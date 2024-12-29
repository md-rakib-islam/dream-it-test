"use client";
import { LayoutContext } from "@/app/LayoutProvider";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import Slider from "react-slick";

const TopDestinations = ({ destination }) => {
  const { topDestinations } = useContext(LayoutContext);
  console.log("topDestinations", topDestinations, destination);
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
            <Link
              href={`/destinations/${item?.name
                ?.toLowerCase()
                ?.split(" ")
                ?.join("_")}`}
              className="citiesCard -type-3 d-block h-full rounded-4 "
            >
              <div className="citiesCard__image ratio ratio-3:2">
                <Image
                  className="col-12 js-lazy"
                  src={item?.img}
                  width={800}
                  height={600}
                  quality={100}
                  priority
                  alt={`${item?.name} Images`}
                />{" "}
              </div>
              <div className="citiesCard__content d-flex justify-content-center align-items-center px-30 py-30">
                <h4 className="text-26 fw-500 text-white md:text-20 text-capitalize">
                  {item.name}
                </h4>
                {/* <div className="text-15 text-white">
                {item.numberOfProperties} properties
              </div> */}
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default TopDestinations;
