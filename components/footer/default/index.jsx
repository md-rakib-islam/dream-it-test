// import AppButton from "./AppButton";
"use client";
// import { useCreateNewsLetterJustEmailMutation } from "@/features/newsLetter/newsLetterSlice";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ContactInfo from "./ContactInfo";
import Copyright from "./Copyright";
import FooterContent from "./FooterContent";

import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const paymentMethodImages = [
  "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/cf951672-c246-4231-c634-7bdc78087900/public",
  "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/8b88d9ae-9b20-41e7-3a75-1d41f4732900/public",
  "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/f89d7a91-caf1-4816-51a7-33fe02486b00/public",
  "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/6b990d32-b090-4f88-5b29-f6da01bb7a00/public",
  "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/05294c39-4a47-42c5-b3fb-a4f7dd7a6300/public",
  "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/106fbb3a-954c-471b-732e-a2aaa1729400/public",
  "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/488ac86f-218f-4779-092c-229616a9f700/public",
  "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/6cac0f84-5186-46ac-66dc-fbb5986dde00/public",
  "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/233bf83d-e90f-47ec-0904-fed2857b7700/public",
  "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/a2662d54-15b6-450e-5891-0562d52f3400/public",
];
const index = () => {
  const [email, setEmail] = useState("");
  const [createNewsLetterJustEmail] = "";
  const [isVisible, setIsVisible] = useState(false);

  // const [show, setShow] = useState(false);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShow(true);
  //   }, 2000);

  //   // Clean up the timer if the component is unmounted
  //   return () => clearTimeout(timer);
  // }, []);
  const handleSubmit = async () => {
    try {
      const res = await createNewsLetterJustEmail({ email });

      if (res.data) {
        // alert("subcription added! thank you");
        toast.success(
          "Your subscription ensures access to exclusive tours & tips!",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        setEmail("");
      }
      if (res?.error) {
        // alert("subcription added! thank you");
        toast.error(res?.error?.data?.email[0], {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (err) {
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <footer className="footer -type-1">
      {/* {show && ( */}
      {isVisible ? (
        <div className="container">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <div className="pt-60 pb-60">
            <div className="row y-gap-40">
              <div className="col-xl-4 col-lg-4 col-sm-6">
                <div className="d-flex items-center">
                  <span className="text-18 fw-500 mb-10 w-100">
                    Dream Tourism SRLS
                  </span>
                  {/* End logo */}
                </div>

                <div
                  className={"text-14 mt-0 w-100 text-justify"}
                  style={{ textAlign: "justify" }}
                >
                  Explore, Experience, Wander with Dream Tourism SRLS. Book your
                  dream tours and activities worldwide with Dream Tourism SRLS.
                  Your adventure awaits!
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-sm-6">
                <span className="text-18 fw-500 mb-10 w-100">Contact Us</span>
                <ContactInfo />
              </div>
              {/* End col */}

              <FooterContent />
              {/* End footer menu content */}

              <div className="col-xl-3 col-lg-3 col-sm-6 ">
                <span className="text-18 fw-500 mb-10 w-100">
                  Sign up to our newsletter
                </span>
                {/* <AppButton /> */}
                <div className="single-field w-100 d-flex flex-column y-gap-20 w-100">
                  <div>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                      name="email"
                      className="border border-secondary h-50"
                      style={{ backgroundColor: "#ffffff" }}
                      type="email"
                      placeholder="Your Email"
                    />
                  </div>
                  {/* End email input */}

                  <div>
                    <button
                      // disabled={!email || isLoading}
                      onClick={handleSubmit}
                      className="px-30 fw-400 text-14 border-white -outline-white h-50 text-white  w-100 pointer"
                    >
                      Subscribe
                    </button>
                  </div>
                  {/* End subscribe btn */}
                </div>

                <span className="text-16 fw-500 mb-10 mt-10 w-100">
                  We Accept
                </span>
                <div className="payment-methods">
                  {paymentMethodImages.map((src, index) => {
                    return (
                      <Image
                        width={50}
                        height={50}
                        key={index}
                        src={src}
                        alt={`Payment Method ${index + 1}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* End footer top */}

          <div className="py-20 border-top-light">
            <Copyright />
          </div>
          {/* End footer-copyright */}
        </div>
      ) : (
        ""
      )}
      {/* )} */}
      {/* End container */}
    </footer>
  );
};

export default index;
