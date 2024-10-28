"use client";
import DestinationSkeleton from "@/components/skeleton/DestinationSkeleton";
import { useGetImagesByMenuNameQuery } from "@/features/image/imageApi";
import Image from "next/image";

const Banner = ({ slug }) => {
  const { isSuccess, data, isLoading } = useGetImagesByMenuNameQuery(slug);

  let bannerUrl = "";
  if (isSuccess) {
    bannerUrl = `${
      data?.content_images[slug.charAt(0).toUpperCase() + slug.slice(1)]
    }`;
  }

  return isLoading ? (
    <DestinationSkeleton />
  ) : (
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
          style={{ maxHeight: "448px" }}
        />

        {/* <div className="absolute d-flex justify-end items-end col-12 h-full z-1 px-10 py-10">
          <button className="button -md -blue-1 bg-white text-dark-1 text-14 fw-600">
            See All Photos
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Banner;
