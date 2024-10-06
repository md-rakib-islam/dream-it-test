"use client";
import Image from "next/image";
import Link from "next/link";

const Blog4 = ({ blogPosts }) => {
  return (
    <>
      {blogPosts.slice(0, 4).map((item) => (
        <div
          className="col-lg-3 col-6"
          key={item.id}
          data-aos="fade"
          data-aos-delay={item.delayAnimation}
        >
          <Link
            href={`/blog-details/${item?.title}`}
            className="blogCard -type-1 d-block "
          >
            <div className="blogCard__image">
              <div className="ratio ratio-1:1 rounded-4 rounded-8">
                <Image
                  width={400}
                  height={400}
                  className="img-ratio js-lazy"
                  src={item.cloudflare_image}
                  alt="image"
                />
              </div>
            </div>
            <div className="mt-20">
              <h4 className="text-dark-1 text-18 sm:text-13 fw-500">
                {item.title}
              </h4>
              <div className="text-light-1 text-15 sm:text-12 lh-14 mt-5">
                {item.date}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Blog4;
