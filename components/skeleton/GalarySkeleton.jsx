"use client";
import Image from "next/image";
import "../../styles/weather.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Zoom } from "swiper";

// import useWindowSize from "@/hooks/useWindowSize";

export default function GalarySkeleton() {
  return (
    <>
      <div
        className="relative d-flex justify-center overflow-hidden js-section-slider skeleton"
        // style={{ height: isMobile ? 300 : 400 }}
      >
        <Swiper
          modules={[Zoom, Navigation]}
          loop={true}
          zoom={true}
          navigation={{
            nextEl: ".js-img-next",
            prevEl: ".js-img-prev",
          }}
        >
          <SwiperSlide>
            <div className="swiper-zoom-container">
              <Image
                className="col-12 rounded-4 destination_banner_img swiper-zoom-container skeleton"
                height={860}
                width={1920}
                style={{ maxHeight: "448px" }}
                priority={true}
                src="https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/2dc04686-968f-42e3-27b7-efe20bb64300/public"
                alt="dream"
              />
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="absolute h-full col-11">
          <button className="section-slider-nav -prev flex-center button -blue-1  shadow-1 size-40 rounded-full sm:d-none js-img-prev">
            <i className="icon icon-chevron-left text-12" />
          </button>
          <button className="section-slider-nav -next flex-center button -blue-1  shadow-1 size-40 rounded-full sm:d-none js-img-next">
            <i className="icon icon-chevron-right text-12" />
          </button>
        </div>
      </div>
    </>
  );
}
