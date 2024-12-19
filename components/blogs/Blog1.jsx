"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import blogsData from "../../data/blogs";
import BlogPagination from "./BlogPagination";

const Blog1 = ({ blogs, categories }) => {
  const [filterOption, setFilterOption] = useState(
    categories.blog_categories[0].name
  );
  const [filteredItems, setFilteredItems] = useState(blogs.blogs);
  console.log("categories", categories);
  useEffect(() => {
    setFilteredItems(
      blogs.blogs.filter((elm) =>
        elm?.blog_category?.name?.includes(filterOption)
      )
    );
  }, [filterOption, blogs]);

  return (
    <>
      <div className="tabs -pills-3 pt-30 js-tabs">
        <div className="tabs__controls row x-gap-10 justify-center js-tabs-controls">
          {categories.blog_categories.map((option) => (
            <div className="col-auto" key={option.value}>
              <button
                className={`tabs__button text-14 fw-500 px-20 py-10 rounded-4 bg-light-2 js-tabs-button ${
                  filterOption === option.name ? "is-tab-el-active" : ""
                }`}
                onClick={() => setFilterOption(option.name)}
              >
                {option.name}
              </button>
            </div>
          ))}
        </div>
        {/* End tab-controls */}

        <div className="row y-gap-30 pt-30">
          {filteredItems.slice(0, 9).map((item) => (
            <div className="col-lg-4 col-sm-6" key={item.id}>
              <Link
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
                  <h4 className="text-dark-1 text-18 fw-500">{item.title}</h4>
                  <div className="text-light-1 text-15 lh-14 mt-5">
                    {item.date}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {/* End .row */}

        <BlogPagination />
      </div>
    </>
  );
};

export default Blog1;
