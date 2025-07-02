"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import BlogPagination from "./BlogPagination";
import { useSearchParams, useRouter } from "next/navigation";
import AgentLink from "../AgentLink/AgentLink";

const Blog = ({ blogs, countries, currentPage, totalPages }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const country = searchParams.get("country");

  const desiredOrder = [
    "Italy",
    "Netherlands",
    "Switzerland",
    "Germany",
    "France",
    "Belgium",
  ];

  const orderedCountries = [...countries].sort(
    (a, b) => desiredOrder.indexOf(a.name) - desiredOrder.indexOf(b.name)
  );

  const [filterOption, setFilterOption] = useState(orderedCountries[0]?.id);

  useEffect(() => {
    if (country && country !== filterOption) {
      setFilterOption(country);
    }
  }, [country]);

  const handleCategoryChange = (option) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("country", option);
    router.push(`?${params.toString()}`);
    setFilterOption(option);
  };

  return (
    <>
      <div className="tabs -pills-3 pt-30 js-tabs">
        <div className="tabs__controls row x-gap-10 justify-center js-tabs-controls">
          {orderedCountries.map((option) => (
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

        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle -md">
              {blogs.length === 0 && (
                <p className="sectionTitle__text mt-10 sm:mt-0">
                  There are no blog posts.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-30">
          {blogs?.map((item, idx) => (
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

        {blogs.length !== 0 && (
          <BlogPagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </>
  );
};

export default Blog;
