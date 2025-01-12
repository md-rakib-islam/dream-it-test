"use client";

import { LayoutContext } from "@/app/LayoutProvider";
import { timeAgo } from "@/utils/timeAgo";
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
            <div className="mb-15">
              <h5> Featured </h5>
            </div>

            {featuredBlogs.map((blog) => {
              console.log("blog", blog);

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
                          href={`/blogs?category=${blog.blog_category.name}`}
                          className="text-gray-1"
                        >
                          {blog.blog_category.name}
                        </a>{" "}
                        <span className="text-15 character"></span>{" "}
                        <span className="text-15 date text-gray-1">
                          {timeAgo(blog.date)}
                        </span>
                      </p>
                    </div>

                    <Link href={`/blog/${blog.slug}`}>
                      <h2 className="text-18 ">{blog.title} </h2>
                    </Link>
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
            <div className="mb-30 mt-20">
              <h5> Categories</h5>
            </div>
            <div className="category">
              <ul>
                {categories?.blog_categories.map((option, idx) => (
                  <Link key={idx} href={`/blogs/?category=${option.name}`}>
                    <li className="text-18" key={idx}>
                      {option.name}
                    </li>
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
                  // className="mt-15 px-20 py-10 fw-500 text-14 border-white -outline-white   text-white   pointer"
                  className="book-now "
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
                  // className="mt-15 px-20 fw-500 text-14 border-white -outline-white h-50 text-white   pointer"
                  className="book-now "
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
                  // className="mt-15 px-20 fw-500 text-14 border-white -outline-white h-50 text-white   pointer"
                  className="book-now "
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
