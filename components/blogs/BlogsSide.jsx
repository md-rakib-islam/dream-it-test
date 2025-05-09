"use client";

import { LayoutContext } from "@/app/LayoutProvider";
import Loading from "@/app/loading";
import { timeAgo } from "@/utils/timeAgo";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AgentLink from "../AgentLink/AgentLink";

const BlogsSide = ({ categories, fullUrl, countriesData }) => {
  const { blogs } = useContext(LayoutContext);
  const [copied, setCopied] = useState(false);
  const [isCopyLoading, setIsCopyLoading] = useState(false);
  const featuredBlogs = blogs?.blogs.blogs
    .filter((blog) => blog.is_featured == true)
    .slice(0, 3);

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
      <div className="row x-gap-20 y-gap-20">
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
              <FacebookMessengerShareButton className="me-2" url={fullUrl}>
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
              {/* <LinkedinShareButton
                         url={fullUrl}
                      >
                        <LinkedinIcon size={32} round={true} />
                      </LinkedinShareButton> */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "-15px",
                }}
                onClick={copyToClipboard}
              >
                {isCopyLoading ? (
                  // <CircularProgress
                  //   style={{ color: "#e02043", marginRight: "10px" }}
                  //   size={20}
                  // />
                  <div
                    // className="col-12 h-20 text-center"
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
                  // <i className="icon-files-o"></i>
                  <>
                    {!isCopyLoading && (
                      <Image
                        width={40}
                        height={40}
                        style={{
                          // height: "32px",
                          // width: "32px",
                          // marginRight: "10px",
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
        <div className="col-12">
          <div className="blog-sidebar">
            <div className="mb-15 bg-img">
              <span className="text-20 text-black fw-600"> Featured </span>
            </div>

            {featuredBlogs.map((blog) => {
              return (
                <div key={blog.id} className="d-flex  mb-20 featured-image">
                  <a href={`/blog/${blog.slug}`} className="image-wrapper">
                    <Image
                      src={blog.cloudflare_image}
                      width={150}
                      height={110}
                      alt={blog.image_alt}
                    ></Image>
                  </a>

                  <div className="ml-10">
                    <div className="featured-content">
                      <p className="d-flex text-15 text-gray-1 align-center fw-600">
                        <a
                          href={`/blogs?country=${blog.blog_country.id}`}
                          className="text-gray-1 "
                        >
                          {blog.blog_country.name}
                        </a>{" "}
                        <span className="text-15 character"></span>{" "}
                        <span className="text-15 date text-gray-1">
                          {timeAgo(blog.date)}
                        </span>
                      </p>
                    </div>

                    <AgentLink href={`/blog/${blog.slug}`}>
                      <span className="text-18 text-black fw-600">
                        {blog.title}{" "}
                      </span>
                    </AgentLink>
                    {/* <p className="text-clamp-short-des">{blog.short_des}</p> */}
                  </div>
                  {/* 
             <div className="explore mb-20">
                  <div className="explore-contetn">
                    <div
                      className={`explore-bg`}
                      style={{
                        backgroundImage: `url(${blog.cloudflare_image})`,
                      }}
                    >
                      <div className="explore-overlay"></div>
                    </div>
                  </div>
                  <div className="explore-text-content">
                    <span className="sm:text-20 text-white">{blog.title}</span>
                    <Link href={`/blog/${blog.slug}`}>
                      <button
                        //   disabled={!email || isLoading}
                        //   onClick={handleSubmit}
                        className="mt-15 px-20 fw-500 text-14 border-white -outline-white h-50 text-white   pointer"
                      >
                        Read More
                      </button>
                    </Link>
                  </div>
                </div> 
              </>
              */}
                </div>
              );
            })}
            {featuredBlogs.length === 0 && (
              <div className="text-center">
                <p> No Featured Blogs Found </p>
              </div>
            )}
          </div>
        </div>
        <div className="col-12">
          <div className="blog-sidebar">
            <div className="mb-30 mt-20 bg-img">
              <span className="text-20 text-black fw-600"> Categories</span>
            </div>
            <div className="category">
              <ul>
                {countriesData.map((option, idx) => (
                  <AgentLink key={idx} href={`/blogs/?country=${option.id}`}>
                    <li className="text-18 fw-500" key={idx}>
                      {option.name}
                    </li>
                  </AgentLink>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="blog-sidebar">
            <div className="mb-30 mt-20 bg-img">
              <span className="text-20 text-black fw-600"> Sponsor</span>
            </div>
            <div className="sponsor">
              <div className="sponsor-contetn">
                <div
                  className={`sponsor-bg`}
                  style={{
                    backgroundImage:
                      "url(https://blog.dreamtourism.co.uk/wp-content/uploads/2024/07/public-2-1024x682.jpg)",
                  }}
                >
                  <div className="sponsor-overlay"></div>
                </div>
              </div>
              <div className="sponsor-text-content">
                <span className="sm:text-20 text-white sm:text-20 text-24 fw-600">
                  {" "}
                  Capri Island Day Trip{" "}
                </span>
                <br></br>
                <button
                  //   disabled={!email || isLoading}
                  //   onClick={handleSubmit}
                  // className="mt-15 px-20 py-10 fw-500 text-14 border-white -outline-white   text-white   pointer"
                  className="book-now "
                >
                  <AgentLink href="/tours/capri-island-day-trip-from-rome">
                    Book Now
                  </AgentLink>
                </button>
              </div>
              <div className="sponsor-conter-text">
                <div className="conter-text"> SELLING FAST</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="blog-sidebar">
            <div className="mb-20 mt-20 bg-img">
              <span className="text-20 text-black fw-600"> Explore</span>
            </div>
            <div className="explore mb-20">
              <div className="explore-contetn">
                <div
                  className={`explore-bg`}
                  style={{
                    backgroundImage:
                      "url(https://blog.dreamtourism.co.uk/wp-content/uploads/2024/07/public-2-1024x682.jpg)",
                  }}
                >
                  <div className="explore-overlay"></div>
                </div>
              </div>
              <div className="explore-text-content">
                <span className="sm:text-20 text-white sm:text-20 text-24 fw-600">
                  Colosseum Full Experience With Arena Ticket{" "}
                </span>
                <button
                  //   disabled={!email || isLoading}
                  //   onClick={handleSubmit}
                  // className="mt-15 px-20 fw-500 text-14 border-white -outline-white h-50 text-white   pointer"
                  className="book-now "
                >
                  <AgentLink href="/tours/rome-colosseum-hosted-entry-roman-forum-and-palatine-hills-with-arena-ticket">
                    Book Now
                  </AgentLink>
                </button>
              </div>
            </div>
            <div className="explore mb-20">
              <div className="explore-contetn">
                <div
                  className={`explore-bg`}
                  style={{
                    backgroundImage:
                      "url(https://blog.dreamtourism.co.uk/wp-content/uploads/2024/07/public-2-1024x682.jpg)",
                  }}
                >
                  <div className="explore-overlay"></div>
                </div>
              </div>
              <div className="explore-text-content">
                <span className="text-white sm:text-20 text-24 fw-600">
                  Capri Island Tour With Blue Grotto
                </span>
                <br></br>
                <button
                  //   disabled={!email || isLoading}
                  //   onClick={handleSubmit}
                  // className="mt-15 px-20 fw-500 text-14 border-white -outline-white h-50 text-white   pointer"
                  className="book-now "
                >
                  <AgentLink href="/tours/capri-island-day-trip-from-rome-with-blue-grotto">
                    Book Now
                  </AgentLink>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsSide;
