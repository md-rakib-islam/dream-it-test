import TripReview from "@/components/common/TripReview";
import { GET_CONTENT_BY_TITLE } from "@/constant/constants";
import Link from "next/link";
import AgentLink from "@/components/AgentLink/AgentLink";
const TourHeading = async ({ data }) => {
  // const name = params?.name;

  // const res = await fetch(`${GET_CONTENT_BY_TITLE}/${params?.name}`);
  // let data;
  // if (res.ok) {
  //   data = await res.json();
  // }

  return (
    <div className="col-xl-8">
      <h1 className="text-25 fw-600">{data?.name}</h1>
      <div className="row x-gap-10 y-gap-10 items-center pt-10">
        <div className="col-auto">
          <AgentLink
            href={data?.trip_url ? data?.trip_url : "#"}
            style={{
              cursor: data?.trip_url ? "pointer" : "default",
            }}
            className={`${data?.trip_url ? "text-hover-underline" : ""}`}
            target={data?.trip_url ? "_blank" : ""}
          >
            <div className="d-flex items-center">
              <TripReview title={data?.name?.toLowerCase()} />

              <div className="text-14 text-light-1 ml-10">
                {data?.reviews} reviews
              </div>
            </div>
          </AgentLink>
        </div>

        <div className="col-auto">
          <div className="row x-gap-10 items-center">
            <div className="col-auto">
              <div className="d-flex x-gap-5 items-center">
                <i className="icon-placeholder text-16 text-light-1"></i>
                <div className="text-15 text-light-1">{data?.location}</div>
              </div>
            </div>

            {/* <div className="col-auto">
                      <button
                        data-x-click="mapFilter"
                        className="text-blue-1 text-15 underline"
                      >
                        Show on map
                      </button>
                    </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourHeading;
