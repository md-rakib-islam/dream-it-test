"use client";

import { LayoutContext } from "@/app/LayoutProvider";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const BlogsSide = ({ categories }) => {
  const { blogs } = useContext(LayoutContext);
  const featuredBlogs = blogs?.blogs.blogs
    .filter((blog) => blog.is_featured == true)
    .slice(0, 3);
  return (
    <>
      <div className="row x-gap-20 y-gap-20">
        <div className="col-12">
          <div className="blog-sidebar">
            <div className="mb-20">
              <h5> Featured Blogs </h5>
            </div>

            {featuredBlogs.map((blog) => (
              // <div key={blog.id} className="d-flex justify-between mb-20">
              //   <Image
              //     src={blog.cloudflare_image}
              //     width={150}
              //     height={50}
              //     alt={blog.image_alt}
              //   ></Image>
              //   <Link href={`/blog/${blog.slug}`}>
              //     <div className="ml-10">
              //       <h2 className="text-18 ">{blog.title} </h2>
              //       <p>Read More</p>
              //     </div>
              //   </Link>
              // </div>
              <>
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
                    <h2 className="sm:text-20 text-white">{blog.title}</h2>
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
            ))}
            {featuredBlogs.length === 0 && (
              <div className="text-center">
                <p> No Featured Blogs Found </p>
              </div>
            )}
          </div>
        </div>
        <div className="col-12">
          <div className="blog-sidebar">
            <div className="mb-30 mt-20">
              <h5> Categories</h5>
            </div>
            <div className="category">
              <ul>
                {categories?.blog_categories.map((option, idx) => (
                  <Link key={idx} href={`/blogs/?category=${option.name}`}>
                    <li key={idx}>{option.name}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="blog-sidebar">
            <div className="mb-30 mt-20">
              <h5> Sponsor</h5>
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
                <h2 className="sm:text-20"> Capri Island Day Trip </h2>
                <button
                  //   disabled={!email || isLoading}
                  //   onClick={handleSubmit}
                  className="mt-15 px-20 py-10 fw-500 text-14 border-white -outline-white   text-white   pointer"
                >
                  Book Now
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
            <div className="mb-20 mt-20">
              <h5> Explore</h5>
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
                <h2 className="sm:text-20 text-white">
                  Colosseum Full Experience With Arena Ticket{" "}
                </h2>
                <button
                  //   disabled={!email || isLoading}
                  //   onClick={handleSubmit}
                  className="mt-15 px-20 fw-500 text-14 border-white -outline-white h-50 text-white   pointer"
                >
                  Book Now
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
                <h2> Capri Island Tour With Blue Grotto </h2>
                <button
                  //   disabled={!email || isLoading}
                  //   onClick={handleSubmit}
                  className="mt-15 px-20 fw-500 text-14 border-white -outline-white h-50 text-white   pointer"
                >
                  Book Now
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
