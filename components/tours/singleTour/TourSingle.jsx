"use client";

import { useContext, useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import Loading from "@/app/loading";
import { LayoutContext } from "@/app/LayoutProvider";
import TourSinglePage from "./TourSinglePage";
import ImportantInfo from "./ImportantInfo";
import Itinerary from "./itinerary/index";
import Tours from "@/components/tours/Tours";

const TourSingle = ({ children, data, fullUrl, itenarayItems }) => {
  const { imageContentsForTours } = useContext(LayoutContext);
  const [dataAvailable, setDataAvailable] = useState(false);

  // Refs for scrolling to sections
  const aboutRef = useRef(null);
  const detailsRef = useRef(null);
  const itineraryRef = useRef(null);
  const relatedToursRef = useRef(null);

  const [copied, setCopied] = useState(false);
  const [isCopyLoading, setIsCopyLoading] = useState(false);

  let tour = {};
  if (data && imageContentsForTours) {
    tour = {
      id: data?.id,
      tag: "",
      slideImg: Array.isArray(imageContentsForTours?.content_images[data?.name])
        ? imageContentsForTours?.content_images[data?.name]
        : [`${imageContentsForTours?.content_images[data?.name]}`],
      title: data?.name,
      url: data?.url,
      location: data.location,
      description: data?.description,
      value: data?.value,
      duration: data?.duration,
      additional_info: data?.additional_info,
      knw_before_go: data?.knw_before_go,
      inclution: data?.inclution,
      exclusion: data?.exclusion,
      trip_url: data?.trip_url,
      cancelValue: data?.value,
      numberOfReviews: data?.reviews,
      price: data?.price,
      tourType: "Attractions & Museums",
      delayAnimation: "200",
      languages: data?.languages,
      meetup_point: data?.meetup_point,
      about_ticket: data?.about_ticket,
      help_center: data?.help_center,
      faq: data?.faq,
      select_bus: data?.select_bus,
    };
  }
  console.log("tour", tour);
  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 80) {
        setDataAvailable(true);
      } else {
        setDataAvailable(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  //copy link
  const copyToClipboard = () => {
    setIsCopyLoading(true);

    // Create a custom promise to handle the copying process
    const copyingPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        navigator?.clipboard
          ?.writeText(window?.location?.href)
          .then(() => {
            setIsCopyLoading(false);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 1500);
            resolve();
          })
          .catch(() => {
            setIsCopyLoading(false);
            reject();
          });
      }, 1500);
    });

    toast.promise(
      copyingPromise,
      {
        pending: "Copying link to clipboard...", // Message to show while promise is pending
        success: "Link copied successfully", // Message to show on success
        error: "Failed to copy link to clipboard", // Message to show on error
        pendingToastId: "pending-toast", // Custom ID for the pending toast
        successToastId: "success-toast", // Custom ID for the success toast
        errorToastId: "error-toast", // Custom ID for the error toast
      },
      {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };

  return (
    <>
      <ToastContainer />

      <div className="header-margin"></div>
      {/* header top margin */}

      <section className="pt-50 js-pin-container">
        <div className="container">
          <div className="row y-gap-30">
            {children}
            {/* End .col */}

            <div className="col-xl-4 d-flex align-items-end">
              <div className="row ">
                <div className="col-auto btn-group dropup">
                  <button
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    className="button px-10 py-10 -blue-1 "
                  >
                    <i className="icon-share mr-10"></i>
                    Share
                  </button>
                  <ul className="dropdown-menu">
                    <li className="d-flex my-2">
                      <FacebookShareButton className="me-2" url={fullUrl}>
                        <FacebookIcon size={32} round={true} />
                      </FacebookShareButton>
                      <FacebookMessengerShareButton
                        className="me-2"
                        url={fullUrl}
                      >
                        <FacebookMessengerIcon size={32} round={true} />
                      </FacebookMessengerShareButton>
                      <WhatsappShareButton className="me-2" url={fullUrl}>
                        <WhatsappIcon size={32} round={true} />
                      </WhatsappShareButton>
                      <EmailShareButton
                        className="me-2"
                        url={fullUrl}
                        subject="Check out this amazing tour!"
                        body={`I found this great tour. Check it out here:`}
                      >
                        <EmailIcon size={32} round={true} />
                      </EmailShareButton>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "-15px",
                        }}
                        onClick={copyToClipboard}
                      >
                        {isCopyLoading ? (
                          <div
                            style={{
                              marginLeft: "10px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Loading />
                          </div>
                        ) : (
                          <i
                            className="icon-copy"
                            style={{ height: 32, width: 32 }}
                          ></i>
                        )}
                        {copied ? (
                          <span
                            style={{
                              marginLeft: "-15px",
                            }}
                          >
                            copied!
                          </span>
                        ) : (
                          <>
                            {!isCopyLoading && (
                              <Image
                                width={40}
                                height={40}
                                style={{
                                  cursor: "pointer",
                                }}
                                alt="images"
                                src="https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/80bd75f3-6ddb-4c93-1acf-7b4fb358f200/public"
                              />
                            )}
                          </>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="col-auto">
                  <button className="button px-10 py-10 -blue-1 bg-light-2">
                    <i className="icon-heart mr-10"></i>
                    Save
                  </button>
                </div>
              </div>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End gallery grid wrapper */}

      <TourSinglePage tour={tour} itenarayItems={itenarayItems} />
    </>
  );
};

export default TourSingle;
