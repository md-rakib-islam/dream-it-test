"use client";
import { useGetContentsByMenuContentTitleQuery } from "@/features/content/contentApi";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

const SidebarRight = () => {
  const params = useParams();
  const slug = params?.name?.endsWith("-1")
    ? params?.name.slice(0, -2)
    : params?.name;
  const { data, isSuccess, isFulfilled } =
    useGetContentsByMenuContentTitleQuery(slug);
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c8f2314b-0289-4a75-825c-37cb690a7c70";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="d-flex js-pin-content" style={{ height: "fit-content" }}>
      <div className="w-360 lg:w-full d-flex flex-column">
        <div className=" d-flex items-center gradient-text">
          <Image
            src="https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/863921a6-6870-4690-d6bd-8dd0f0314f00/public"
            width={50}
            height={22}
            alt="Klarna Payment System"
          ></Image>

          <span className="fw-500 ml-20">Book now, pay in 3 installments</span>
        </div>
        {isSuccess && <div className="bokunWidget" data-src={data?.url}></div>}
      </div>
    </div>
  );
};

export default SidebarRight;
