import { LayoutContext } from "@/app/LayoutProvider";
import AgentLink from "@/components/AgentLink/AgentLink";
import Blog from "@/components/blogs/Blog";
import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import Slider from "react-slick";

const Arrow = ({ type, onClick }) => (
  <div
    className={`slick-arrow slick-${type}`}
    onClick={onClick}
    style={{ zIndex: 1, cursor: "pointer" }}
  >
    {type === "next" ? "→" : "←"}
  </div>
);

const BlogSection = ({ title }) => {
  const width = useWindowSize();
  const isMobile = width > 768;
  const { blogs } = useContext(LayoutContext);

  const sliderSettings = {
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
    ],
  };

  const filteredBlogs = blogs.blogs.blogs?.slice(0, 3);
  return (
    <>
      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title  fw-600">{title}</h2>
              </div>
            </div>
          </div>

          <div className="pt-30">
            {!isMobile ? (
              <Slider {...sliderSettings}>
                {filteredBlogs?.map((item, idx) => (
                  <div key={idx} className="px-10">
                    <AgentLink
                      href={`/blog/${item.slug}`}
                      className="blogCard -type-1 d-block"
                    >
                      <div className="blogCard__image">
                        <div className="rounded-8">
                          <Image
                            width={400}
                            height={300}
                            className="cover w-100 img-fluid"
                            src={item.cloudflare_image}
                            alt={item.image_alt || "Blog Image"}
                          />
                        </div>
                      </div>
                      <div className="pt-20">
                        <h3 className="text-dark-1 text-13 fw-500">
                          {item.title}
                        </h3>
                        <div className="text-light-1 text-10 lh-14 mt-5">
                          {item.date}
                        </div>
                      </div>
                    </AgentLink>
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="row y-gap-30">
                {filteredBlogs?.map((item, idx) => (
                  <div className="col-lg-4 col-sm-6" key={idx}>
                    <AgentLink
                      href={`/blog/${item.slug}`}
                      className="blogCard -type-1 d-block"
                    >
                      <div className="blogCard__image">
                        <div className="rounded-8">
                          <Image
                            width={400}
                            height={300}
                            className="cover w-100 img-fluid"
                            src={item.cloudflare_image}
                            alt={item.image_alt || "Blog Image"}
                          />
                        </div>
                      </div>
                      <div className="pt-20">
                        <h3 className="text-dark-1 text-18 fw-500 ">
                          {item.title}
                        </h3>
                        <div className="text-light-1 text-15 lh-14 mt-5">
                          {item.date}
                        </div>
                      </div>
                    </AgentLink>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="pt-5 mt-3 text-center">
            <Link
              href="/blogs"
              className="button -blue-1-05  -md -blue-1 bg-blue-1-06  text-white d-inline-block"
            >
              Discover More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSection;
