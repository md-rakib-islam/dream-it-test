// import MainFilterSearchBox from "./MainFilterSearchBox";

"use client";
import { addExchangeRates } from "@/features/currency/currencySlice";
import useCurrencyExchangeRates from "@/hooks/currency";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import MainFilterSearchBox from "./MainFilterSearchBox";
import CoverSkeleton from "@/components/skeleton/CoverSkeleton";
import { useEffect, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { addCurrentTab } from "@/features/hero/findPlaceSlice";
const index = ({
  onDataAvailable,
  isSuccess,
  isLoading,
  data,
  isMobile,
  onMobileDataAvailable,
}) => {
  const dispatch = useDispatch();
  const exchangeRates = useCurrencyExchangeRates();

  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const [navbar, setNavbar] = useState(false);

  useEffect(() => {
    dispatch(addExchangeRates(exchangeRates));
  }, [dispatch, exchangeRates]);

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

  useEffect(() => {
    onMobileDataAvailable(true);
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
                      className={`tabs__button px-30 py-20 sm:px-20 sm:py-15 rounded-4 fw-600 text-white js-tabs-button ${
                        tab?.name === currentTab ? "is-tab-el-active" : ""
                      }`}
                      onClick={() => {
                        scrollToTop();
                        dispatch(addCurrentTab(tab?.name));
                      }}
                    >
                      {/* <i className={`${tab.icon} text-20 mr-10 sm:mr-5`}></i> */}
                      {tab?.name}
                    </button>
                  ))}
                </div>
              </div>
              {/* End tabs */}
            </div>
            {/* End .masthead__tabs */}

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
                  // width: '100%',  // Uncomment if you need this property
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
                  {/* End hero title */}
                </div>
              </div>
            </div>
          </div>
          {/* End .masthead__content */}
        </div>
        {/* End .container */}
      </section>

      <section className="masthead -type-6 mb-40 bannar_mobile">
        <div className="masthead__bg">
          <Image
            src={sliderImageItems[0]?.cloudflare_image_url}
            width={1920}
            height={860}
            alt="image"
            // className="h-100"
            priority={true}
            onLoad={onDataAvailable(true)}
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
            {/* End tab-filter */}
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
