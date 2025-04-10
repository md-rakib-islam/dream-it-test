"use client";
import Image from "next/image";

const Banner = ({ slug, data }) => {
  let bannerUrl = "";
  if (data?.content_images) {
    bannerUrl = `${
      data?.content_images[slug.charAt(0).toUpperCase() + slug.slice(1)]
    }`;
  }

  return (
    <div className="col-12">
      <div className="relative d-flex">
        <Image
          src={bannerUrl}
          alt="banner"
          className="col-12 rounded-4 destination_banner_img"
          // loading="lazy"
          height={860}
          width={1920}
          priority={true}
          style={{ maxHeight: "628px" }}
        />

        {/* <div className="absolute d-flex justify-end items-end col-12 h-full z-1 px-10 py-10">
          <button className="button -md -blue-1 bg-white text-dark-1 text-14 fw-500">
            See All Photos
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Banner;
