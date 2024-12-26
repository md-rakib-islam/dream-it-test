"use client";

// import Overview from "@/components/tour-single/Overview";
// import SidebarRight from "@/components/tour-single/SidebarRight";
// import TourSnapShot from "@/components/tour-single/TourSnapShot";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";
import "../../../styles/weather.scss";
import { useState } from "react";

import TourSnapShot from "./TourSnapShot";
import Overview from "./Overview";
import OverviewSkeleton from "@/components/skeleton/OverviewSkeleton";
import SidebarRight from "./SidebarRight";
import Slider from "react-slick";

export default function TourGallery({ tour, onDataAvailable }) {
  const [dataAvailable, setDataAvailable] = useState(false);

  const width = useWindowSize();
  const isMobile = width < 768;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  function Arrow(props) {
    let className =
      props.type === "next"
        ? "section-slider-nav -next flex-center button -blue-1 shadow-1 size-40 rounded-full sm:d-none"
        : "section-slider-nav -prev flex-center button -blue-1 shadow-1 size-40 rounded-full sm:d-none ";
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
    <>
      <section className="pt-40 js-pin-container">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-8">
              <div

              // style={{ height: isMobile ? 300 : 400 }}
              >
                <Slider
                  {...settings}
                  arrows={true}
                  nextArrow={<Arrow type="next" />}
                  prevArrow={<Arrow type="prev" />}
                >
                  {tour?.slideImg?.map((slide, i) => (
                    <div key={i}>
                      <Image
                        className="col-12 rounded-4 destination_banner_img "
                        height={860}
                        width={1920}
                        style={{ maxHeight: "448px" }}
                        priority={true}
                        src={`${slide}`}
                        alt={tour?.title}
                        onLoad={() => {
                          setDataAvailable(true);
                          onDataAvailable(true);
                        }} // Mark data as available
                      />
                    </div>
                  ))}
                </Slider>

                {/* Navigation Buttons */}
                {dataAvailable && (
                  <div
                    className={`absolute h-full col-11 ${
                      !dataAvailable ? "d-none" : ""
                    }`}
                  >
                    <button className="section-slider-nav -prev flex-center button -blue-1 shadow-1 size-40 rounded-full sm:d-none">
                      <i className="icon icon-chevron-left text-12" />
                    </button>
                    <button className="section-slider-nav -next flex-center button -blue-1 shadow-1 size-40 rounded-full sm:d-none">
                      <i className="icon icon-chevron-right text-12" />
                    </button>
                  </div>
                )}
              </div>
              {/* End relative */}

              {/* slider gallery */}

              <h3 className="text-22 fw-600 mt-40">Tour snapshot</h3>
              <TourSnapShot data={tour} />
              {/* End toursnapshot */}
              <div className="border-top-light mt-40 mb-40"></div>

              {!isMobile &&
                (dataAvailable ? (
                  <Overview data={tour} />
                ) : (
                  <OverviewSkeleton />
                ))}
              {/* End  Overview */}
            </div>
            {/* End .col-xl-8 */}

            <div className="col-xl-4">
              <SidebarRight data={tour} />
            </div>
            {isMobile &&
              (dataAvailable ? (
                <div style={{ marginTop: "" }}>
                  <Overview data={tour} />
                </div>
              ) : (
                <OverviewSkeleton />
              ))}
            {/* End .col-xl-4 */}
          </div>
          {/* End .row */}
        </div>
        {/* End container */}
      </section>
    </>
  );
}
