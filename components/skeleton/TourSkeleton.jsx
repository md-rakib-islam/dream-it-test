"use client";
// import useTours from "@/hooks/useTours";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

import AgentLink from "../AgentLink/AgentLink";

const TourSkeleton = () => {
  //   const width = useWindowSize();
  //   const isMobile = width < 768;

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

  // custom navigation
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
      <button
        className={className}
        onClick={props.onClick}
        aria-label={props.type === "next" ? "Next Slide" : "Previous Slide"}
      >
        {char}
      </button>
    );
  }

  const defaultTourItem = [
    {
      id: 0,
      delayAnimation: 0,
      title:
        "Rome: Colosseum, Roman Forum, and Palatine Hills Ticket with Hosted Entry",
      slideImg: [
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/96e787f4-98cb-4a60-6cfc-c83e723dd900/public",
      ],
      tag: " ",
      duration: "1",
      location: "Default Location",
      numberOfReviews: 0,
      price: 30,
      tourType: "Default Tour Type",
    },
    {
      id: 0,
      delayAnimation: 0,
      title:
        "Rome: Colosseum, Roman Forum, and Palatine Hills Ticket with Hosted Entry",
      slideImg: [
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/96e787f4-98cb-4a60-6cfc-c83e723dd900/public",
      ],
      tag: " ",
      duration: "1",
      location: "Default Location",
      numberOfReviews: 0,
      price: 30,
      tourType: "Default Tour Type",
    },
    {
      id: 0,
      delayAnimation: 0,
      title:
        "Rome: Colosseum, Roman Forum, and Palatine Hills Ticket with Hosted Entry",
      slideImg: [
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/96e787f4-98cb-4a60-6cfc-c83e723dd900/public",
      ],
      tag: " ",
      duration: "1",
      location: "Default Location",
      numberOfReviews: 0,
      price: 30,
      tourType: "Default Tour Type",
    },
    {
      id: 0,
      delayAnimation: 0,
      title:
        "Rome: Colosseum, Roman Forum, and Palatine Hills Ticket with Hosted Entry",
      slideImg: [
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/96e787f4-98cb-4a60-6cfc-c83e723dd900/public",
      ],
      tag: " ",
      duration: "1",
      location: "Default Location",
      numberOfReviews: 0,
      price: 30,
      tourType: "Default Tour Type",
    },
    {
      id: 0,
      delayAnimation: 0,
      title:
        "Rome: Colosseum, Roman Forum, and Palatine Hills Ticket with Hosted Entry",
      slideImg: [
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/96e787f4-98cb-4a60-6cfc-c83e723dd900/public",
      ],
      tag: " ",
      duration: "1",
      location: "Default Location",
      numberOfReviews: 0,
      price: 30,
      tourType: "Default Tour Type",
    },
  ];

  //   const defaultTourItems = new Array(1).fill(defaultTourItem);

  return (
    <Slider
      {...settings}
      arrows={true}
      nextArrow={<Arrow type="next" />}
      prevArrow={<Arrow type="prev" />}
    >
      {defaultTourItem?.map((item) => (
        <div
          key={item?.id}
          //   data-aos="fade"
          //   data-aos-delay={item?.delayAnimation}
        >
          <AgentLink
            href={`/tour/${item?.title?.toLowerCase()?.split(" ")?.join("-")}`}
            style={{ cursor: "pointer" }}
            className="tourCard -type-1 rounded-4 hover-inside-slider"
            aria-label={`View details of ${item.title}`}
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
                    <div className="cardImage ratio ratio-1:1 skeleton" key={i}>
                      <div className="cardImage__content skeleton">
                        <Image
                          width={300}
                          height={300}
                          priority
                          className="col-12 "
                          src={slide}
                          alt={item?.title}
                        />
                      </div>
                    </div>
                  ))}
                </Slider>

                <div className="cardImage__leftBadge skeleton">
                  <div
                    className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase bg-blue-1 text-white `}
                  >
                    {item?.tag}
                  </div>
                </div>
              </div>
            </div>
            {/* End .tourCard__image */}

            <div className="tourCard__content mt-10">
              <div className="d-flex justify-content-between lh-14 mb-5">
                <div className="text-14 text-light-1 skeleton">
                  {`${item?.duration}+ hours`}
                </div>
                {/* <div className="size-3 bg-light-1 rounded-full ml-10 mr-10" /> */}
                <div className="ml-10 mr-10" />
                {/* <div className="text-14 text-light-1">{item?.tourType}</div> */}
                <div className="col-auto">
                  <div className="text-14 text-dark-1 fw-bold skeleton">
                    From $
                    <span className="text-16 fw-500 text-blue-1 fw-bold">
                      {" "}
                      {item?.price}
                    </span>
                  </div>
                </div>
              </div>
              <span className="tourCard__title text-dark-1 text-18 lh-16 fw-500 skeleton">
                <span>{item?.title}</span>
              </span>
              <p className="text-light-1 lh-14 text-14 mt-5 skeleton">
                {item?.location}
              </p>

              <div className="row justify-between items-center pt-15">
                <div className="col-auto">
                  <div className="d-flex items-center skeleton">
                    <div className="d-flex items-center x-gap-5">
                      <div className="icon-star text-yellow-1 text-10" />
                      <div className="icon-star text-yellow-1 text-10" />
                      <div className="icon-star text-yellow-1 text-10" />
                      <div className="icon-star text-yellow-1 text-10" />
                      <div className="icon-star text-yellow-1 text-10" />
                    </div>
                    {/* End ratings */}

                    <div className="text-14 text-light-1 ml-10">
                      {item?.numberOfReviews} reviews
                    </div>
                  </div>
                </div>
                {/* <div className="col-auto">
                <div className="text-14 text-light-1">
                  From {currentCurrency?.symbol} 
                  <span className="text-16 fw-500 text-dark-1">
                    {" "}
                    
                    {item.price}
                  </span>
                </div>
              </div> */}
              </div>
            </div>
          </AgentLink>
        </div>
      ))}
    </Slider>
  );
};

export default TourSkeleton;
