"use client";
import Image from "next/image";
import Link from "next/link";

const TourMobileSkeleton = () => {
  const defaultTourItem = [
    {
      id: 0,
      delayAnimation: 0,
      title:
        "Italy City Tourism Luxury Private Vehicle With Guide (3 Person Luxury)",
      slideImg: [
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/96e787f4-98cb-4a60-6cfc-c83e723dd900/public",
      ],
      tag: " ",
      duration: "1",
      location: "Default Location",
      numberOfReviews: 0,
      price: 1200,
      tourType: "Default Tour Type",
    },
    {
      id: 0,
      delayAnimation: 0,
      title:
        "Italy City Tourism Luxury Private Vehicle With Guide (3 Person Luxury)",
      slideImg: [
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/96e787f4-98cb-4a60-6cfc-c83e723dd900/public",
      ],
      tag: " ",
      duration: "1",
      location: "Default Location",
      numberOfReviews: 0,
      price: 1200,
      tourType: "Default Tour Type",
    },
    {
      id: 0,
      delayAnimation: 0,
      title:
        "Italy City Tourism Luxury Private Vehicle With Guide (3 Person Luxury)",
      slideImg: [
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/96e787f4-98cb-4a60-6cfc-c83e723dd900/public",
      ],
      tag: " ",
      duration: "1",
      location: "Default Location",
      numberOfReviews: 0,
      price: 1200,
      tourType: "Default Tour Type",
    },
  ];

  //   const defaultTourItems = new Array(1).fill(defaultTourItem);

  return defaultTourItem?.map((item) => (
    <div className="col-lg-3 col-md-3 col-6" key={item?.id}>
      <Link
        href={`/tour/${item?.title
          ?.replace(/[,.-]/g, "")
          ?.toLowerCase()
          ?.split(" ")
          ?.join("-")}`}
        style={{ cursor: "pointer" }}
        className="tourCard -type-1 rounded-4 hover-inside-slider"
      >
        <div className="tourCard__image position-relative">
          <div className="inside-slider">
            {item?.slideImg?.map((slide, i) => (
              <div className="cardImage" key={i}>
                <div className="cardImage__content skeleton">
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

            <div className="cardImage__leftBadge cardImage-2__leftBadge sm:d-none">
              <div>
                <Image
                  width={80}
                  height={80}
                  priority
                  className="col-12 js-lazy"
                  src={`https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/94088711-e642-4216-52ee-393e4c6a3c00/public`}
                  alt="price"
                />

                <p className={"price-position"}>{`$ ${item.price}`}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="tourCard__content mt-10">
          <div className="d-flex justify-content-between lh-14 mb-5">
            <div className="text-14 md:text-12 text-light-1 skeleton">
              {`${item?.duration}`}
            </div>
            <div className="ml-10 mr-10" />
            <div className="col-auto">
              <div className="text-14 md:text-12 text-dark-1 fw-bold skeleton">
                From $
                <span className="text-16 md:text-13 fw-500 text-blue-1 fw-bold">
                  {" "}
                  {item.price}
                </span>
              </div>
            </div>
          </div>
          <h4 className="tourCard__title text-dark-5 text-18 md:text-13 lh-16 fw-500 skeleton">
            <span>{item?.title}</span>
          </h4>
          <p className="text-light-1 lh-14 text-14 md:text-12 mt-5 skeleton">
            {item?.location}
          </p>

          <div className="row justify-between items-center pt-15">
            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="d-flex items-center x-gap-5 skeleton">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="icon-star text-yellow-1 text-10" />
                  ))}
                </div>
                <div className="text-14 md:text-12 text-light-1 ml-10 skeleton">
                  {item?.numberOfReviews} reviews
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  ));
};

export default TourMobileSkeleton;
