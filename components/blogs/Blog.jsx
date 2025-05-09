"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import BlogPagination from "./BlogPagination";
import { useSearchParams, useRouter } from "next/navigation";
import AgentLink from "../AgentLink/AgentLink";
const Blog = ({ blogs, categories }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const country = searchParams.get("country");

  const [filterOption, setFilterOption] = useState(categories[0]?.id);
  const [filteredItems, setFilteredItems] = useState(blogs);

  useEffect(() => {
    setFilteredItems(
      blogs.filter((elm) => elm?.blog_country?.id == filterOption)
    );
  }, [filterOption, blogs]);

  useEffect(() => {
    if (country) {
      setFilterOption(country);
    }
  }, [country]);

  const handleCategoryChange = (option) => {
    // Update the query params in the URL
    router.push(`?country=${option}`);
    setFilterOption(option);
  };

  return (
    <>
      {blogs.length !== 0 && (
        <div className="tabs -pills-3 pt-30 js-tabs">
          <div className="tabs__controls row x-gap-10 justify-center js-tabs-controls">
            {categories.map((option) => (
              <div className="col-auto" key={option.id}>
                <button
                  className={`tabs__button text-14 fw-500 px-20 py-10 rounded-4 bg-light-2 js-tabs-button ${
                    filterOption == option.id ? "is-tab-el-active" : ""
                  }`}
                  onClick={() => handleCategoryChange(option.id)}
                >
                  {option.name}
                </button>
              </div>
            ))}
          </div>
          {/* End tab-controls */}

          <div className="row y-gap-30 pt-30">
            {filteredItems?.slice(0, 9).map((item, idx) => (
              <div className="col-lg-4 col-sm-6" key={idx}>
                <AgentLink
                  href={`/blog/${item.slug}`}
                  className="blogCard -type-1 d-block "
                >
                  <div className="blogCard__image">
                    <div className="rounded-8">
                      <Image
                        width={400}
                        height={300}
                        className="cover w-100 img-fluid"
                        src={item.cloudflare_image}
                        alt="image"
                      />
                    </div>
                  </div>
                  <div className="pt-20">
                    <h3 className="text-dark-1 text-18 fw-500">{item.title}</h3>
                    <div className="text-light-1 text-15 lh-14 mt-5">
                      {item.date}
                    </div>
                  </div>
                </AgentLink>
              </div>
            ))}
          </div>
          {/* End .row */}

          {blogs.length >= 10 && <BlogPagination />}
        </div>
      )}
    </>
  );
};

export default Blog;
