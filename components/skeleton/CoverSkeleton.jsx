"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import MainFilterSearchBox from "../hero/hero/MainFilterSearchBox";
const CoverSkeleton = () => {
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};

  // localStorage.clear();
  return (
    <>
      <section className="masthead__bg bg-dark-5 -type-2 z-2 d-md-none">
        <div className="row">
          <div className="col-12">
            <div className={`masthead__tabs skeleton`}>
              <div className="tabs -bookmark-2 js-tabs w-100">
                <div
                  className={`tabs__controls d-flex items-center js-tabs-controls`}
                >
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      className={`tabs__button px-30 py-20 sm:px-20 sm:py-15 rounded-4 fw-500 text-white js-tabs-button ${
                        tab?.name === currentTab ? "is-tab-el-active" : ""
                      }`}
                      onClick={() => {
                        scrollToTop();
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

            <div className="skeleton">
              <div
                className="row justify-center"
                style={{
                  backgroundImage:
                    "url(https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/2dc04686-968f-42e3-27b7-efe20bb64300/public)",
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
                    <h1
                      className="text-25 lg:text-25 md:text-25  text-white"
                      data-aos="fade-up"
                      style={{
                        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                      }}
                    >
                      The World is Waiting For You
                      <br /> Discover amazing places at exclusive deals
                    </h1>
                    <p
                      className="text-white text-12 mt-5"
                      data-aos="fade-up"
                      data-aos-delay="100"
                      style={{
                        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                      }}
                    >
                      Immerse in Spiritual Quests
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
      <section className="masthead -type-6 d-none d-md-block">
        <div className="masthead__bg skeleton">
          <Image
            src="https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/2dc04686-968f-42e3-27b7-efe20bb64300/public"
            width={1920}
            height={860}
            alt="image"
          />
        </div>
        <div className="container">
          <div className="row justify-center">
            <div
              className="col-xl-9 d-lg-flex flex-column justify-content-center align-items-center"
              style={{ visibility: "hidden" }}
            >
              <div className="text-center">
                <h1
                  className="text-45 lg:text-40 md:text-30 text-white"
                  data-aos="fade-up"
                  style={{
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                    visibility: "hidden",
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
                    isibility: "hidden",
                  }}
                >
                  Immerse in Spiritual Quests
                </p>
              </div>
              {/* End hero title */}
              <MainFilterSearchBox />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CoverSkeleton;
