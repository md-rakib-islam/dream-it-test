"use client";

import { useGetImagesByMenuIdQuery } from "@/features/image/imageApi";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import Slider from "react-slick";

const TopDestinations2 = ({ slug }) => {
  const { menuItems } = useSelector((state) => state.menus);
  const destinationId = menuItems.find(
    (item) => item.name === "Destinations"
  )?.id;
  const { isSuccess, data, isLoading } =
    useGetImagesByMenuIdQuery(destinationId);
  let destinations = [];
  if (isSuccess && data) {
    destinations = menuItems
      .find((item) => item.name === "Destinations")
      ?.children?.filter((subItem) => subItem.name.toLowerCase() !== slug)
      ?.map((item) => ({
        id: item.id,
        img: `${data?.content_images[item?.name?.toLowerCase()]}`,
        location: item.name,
        properties: "4,090",
        delayAnimation: "0",
      }));
  }
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
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1.09,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {destinations?.map((item) => {
          return (
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
                  <h4 className="text-26 fw-500 text-white text-capitalize">
                    {item.location}
                  </h4>
                  {/* <div className="text-15 text-white">
                {item.numberOfProperties} properties
              </div> */}
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default TopDestinations2;
