"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import MainFilterSearchBox from "./MainFilterSearchBox";
import CoverSkeleton from "@/components/skeleton/CoverSkeleton";
import { useEffect, useState } from "react";
import { addCurrentTab } from "@/features/hero/findPlaceSlice";

const index = ({
  onDataAvailable,
  isSuccess,
  isLoading,
  data,
  onMobileDataAvailable,
}) => {
  const dispatch = useDispatch();
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const [navbar, setNavbar] = useState(false);

  let sliderImageItems = [];
  if (isSuccess) {
    sliderImageItems = data?.homepage_sliders?.map((item) => ({
      ...item,
      image: `${item?.image}`,
    }));
  }

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Ensure this is only called when isSuccess changes
  useEffect(() => {
    if (isSuccess) {
      onMobileDataAvailable(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return isLoading ? (
    <CoverSkeleton />
  ) : (
    <>
      <section className="masthead__bg bg-dark-5 -type-2 z-2 d-md-none">
        <div className="row">
          <div className="col-12">
            <div
              className={`masthead__tabs ${
                navbar ? "header-masterhead controls-head is-sticky" : ""
              }`}
            >
              <div className="tabs -bookmark-2 js-tabs w-100">
                <div
                  className={`tabs__controls d-flex items-center js-tabs-controls ${
                    navbar ? "bg-dark-5" : ""
                  }`}
                >
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      className={`tabs__button px-30 py-20 sm:px-20 sm:py-15 rounded-4 fw-500 text-white js-tabs-button ${
                        tab?.name === currentTab ? "is-tab-el-active" : ""
                      }`}
                      onClick={() => {
                        scrollToTop();
                        dispatch(addCurrentTab(tab?.name));
                      }}
                    >
                      {tab?.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="">
              <div
                className="row justify-center"
                style={{
                  backgroundImage:
                    "url(https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/2dc04686-968f-42e3-27b7-efe20bb64300/v1)",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  opacity: 0.89,
                  height: "120px",
                  backgroundPosition: "center",
                  backgroundAttachment: "local",
                }}
              >
                <div className="col-xl-9 d-lg-flex flex-column justify-content-center align-items-center mt-10">
                  <div className="text-center">
                    <h2
                      className="text-25 lg:text-25 md:text-25 text-white"
                      data-aos="fade-up"
                      style={{
                        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                      }}
                    >
                      The World is Waiting <br /> For You
                    </h2>
                    <p
                      className="text-white text-12 mt-5"
                      data-aos="fade-up"
                      data-aos-delay="100"
                      style={{
                        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                      }}
                    >
                      Discover amazing places at exclusive deals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="masthead -type-6 mb-40 bannar_mobile">
        <div className="masthead__bg">
          <Image
            src={sliderImageItems[0]?.cloudflare_image_url}
            width={1920}
            height={860}
            alt="image"
            priority={true}
            onLoad={() => onDataAvailable(true)} // Changed to arrow function
          />
        </div>

        <div
          className="container"
          style={{ position: "relative", top: "70px" }}
        >
          <div className="row justify-center">
            <div className="col-xl-9 d-lg-flex flex-column justify-content-center align-items-center">
              <div className="text-center">
                <h1
                  className="text-45 lg:text-40 md:text-30 text-white"
                  data-aos="fade-up"
                  style={{
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  }}
                >
                  The World is Waiting For You
                </h1>
                <p
                  className="text-white mt-5"
                  data-aos="fade-up"
                  data-aos-delay="100"
                  style={{
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  }}
                >
                  Discover amazing places at exclusive deals
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div
            className="mainSearch-wrap bg-white shadow-1"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <MainFilterSearchBox />
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
