"use client";

// import Overview from "@/components/tour-single/Overview";
// import SidebarRight from "@/components/tour-single/SidebarRight";
// import TourSnapShot from "@/components/tour-single/TourSnapShot";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";
import "../../../styles/weather.scss";

import TourSnapShot from "./TourSnapShot";
import Overview from "./Overview";
import SidebarRight from "./SidebarRight";
import Slider from "react-slick";

export default function TourGallery({ tour }) {
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
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              {/* End relative */}

              {/* slider gallery */}

              <span className="text-22 fw-600 mt-40">Tour snapshot</span>
              <TourSnapShot data={tour} />
              {/* End toursnapshot */}
              <div className="border-top-light mt-40 mb-40"></div>

              {!isMobile && <Overview data={tour} />}
              {/* End  Overview */}
            </div>
            {/* End .col-xl-8 */}

            <div className="col-xl-4">
              <SidebarRight data={tour} />
            </div>
            {isMobile && (
              <div style={{ marginTop: "" }}>
                <Overview data={tour} />
              </div>
            )}
            {/* End .col-xl-4 */}
          </div>
          {/* End .row */}
        </div>
        {/* End container */}
      </section>
    </>
  );
}
