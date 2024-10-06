import { GET_CONTENT_BY_TITLE } from "@/constant/constants";
import Image from "next/image";
import TripReview from "../common/TripReview";
import Link from "next/link";

const tourUrlsMap = {
  "rome%3A-colosseum-hosted-entry-roman-forum-and-palatine-hills-with-arena-ticket":
    "Rome: Colosseum Hosted entry, Roman Forum and Palatine hills with Arena Ticket",
  "rome%3A-colosseum-roman-forum-and-palatine-hills-ticket-with-hosted-entry":
    "Rome: Colosseum, Roman Forum, and Palatine Hills Ticket with Hosted Entry",
  "skip-the-line-ticket-colosseum-forum-%26-palatine-hills-with-audio-%26-video-guide":
    "Skip the Line ticket Colosseum, Forum & Palatine Hills with Audio & Video Guide",
  "full-experience-colosseum-with-arena":
    "Full Experience Colosseum with Arena",
  "capri-island-day-trip-from-rome": "Capri Island Day Trip From Rome",
  "capri-island-day-trip-from-rome-with-blue-grotto":
    "Capri Island Day Trip From Rome With Blue Grotto",
  "celebrate-new-year-in-paris%3A-a-3night-4day-tour-from-london":
    "Celebrate New Year In Paris: A 3-Night, 4-Day Tour From London",
  "visit-europe-in-summer-holiday%3A-switzerland-venice-austria-and-liechtenstein":
    "Visit Europe In Summer Holiday: Switzerland, Venice, Austria And Liechtenstein",
  "dream-meets-the-blue-at-santorini": "Dream Meets The Blue At Santorini",
  "valentine's-day-in-venice-and-bernina-express-journey-to-switzerland":
    "Valentine's Day In Venice And Bernina Express Journey To Switzerland",
  "tulip-garden-tour-from-london-by-eurostar":
    "Tulip Garden Tour From London By Eurostar",
};

export const singleTourInfo = {
  "Rome: Colosseum, Roman Forum, and Palatine Hills Ticket with Hosted Entry": {
    location: "Rome, Italy",
    numberOfReviews: "348",
    languages: "English",
    groupSize: "1-8",
    itinerarySrc:
      "https://www.google.com/maps/d/u/0/embed?mid=1nO_1-Xc4ZbZ6dBYgB-hpOFlB2rQ5O0k&ehbc=2E312F&noprof=1",
  },
  "Skip the Line ticket Colosseum, Forum & Palatine Hills with Audio & Video Guide":
    {
      location: "Rome, Italy",
      numberOfReviews: "0",
      languages: "English",
      groupSize: "1-8",
      itinerarySrc:
        "https://www.google.com/maps/d/u/0/embed?mid=1nO_1-Xc4ZbZ6dBYgB-hpOFlB2rQ5O0k&ehbc=2E312F&noprof=1",
    },
  "Rome: Colosseum Hosted entry, Roman Forum and Palatine hills with Arena Ticket":
    {
      location: "Rome, Italy",
      numberOfReviews: "0",
      languages: "English",
      groupSize: "1-8",
      itinerarySrc:
        "https://www.google.com/maps/d/u/0/embed?mid=1o4d3yKIDwLO1Ss1qckmvvQH1-wPsVos&ehbc=2E312F&noprof=1",
    },
  "Capri Island Day Trip From Rome": {
    location: "Island",
    numberOfReviews: "1",
    languages: "English.",
    groupSize: "1-10",
    itinerarySrc:
      "https://www.google.com/maps/d/u/0/embed?mid=1G-xi4H9had61JnP77WMMnKw9TtxpCrM&ehbc=2E312F&noprof=1",
  },
  "Dream Meets The Blue At Santorini": {
    location: "Greece",
    numberOfReviews: "0",
    languages: "English.",
    groupSize: "1-10",
    itinerarySrc: "",
  },
  "Capri Island Day Trip From Rome With Blue Grotto": {
    location: "Island",
    numberOfReviews: "0",
    languages: "English",
    groupSize: "1-10",
    itinerarySrc:
      "https://www.google.com/maps/d/u/0/embed?mid=1fZGrAf-uDXa3dluo2ugbQbf2cK-5hos&ehbc=2E312F&noprof=1",
  },
  "Celebrate New Year In Paris: A 3-Night, 4-Day Tour From London": {
    location: "Paris, France",
    numberOfReviews: "0",
    languages: "English",
    groupSize: "1-10",
    itinerarySrc: "",
  },
  "Visit Europe In Summer Holiday: Switzerland, Venice, Austria And Liechtenstein":
    {
      location: "Switzerland, Italy, Austria, Liechtenstein",
      numberOfReviews: "0",
      languages: "English",
      groupSize: "1-10",
      itinerarySrc: "",
    },
  "Valentine's Day In Venice And Bernina Express Journey To Switzerland": {
    location: "Switzerland",
    numberOfReviews: "0",
    languages: "English",
    groupSize: "1-10",
    itinerarySrc: "",
  },
  "Tulip Garden Tour From London By Eurostar": {
    location: "Netherlands",
    numberOfReviews: "0",
    languages: "English",
    groupSize: "1-10",
    itinerarySrc: "",
  },
};
const TourHeading = async ({ params }) => {
  // const name = params?.name;

  const res = await fetch(`${GET_CONTENT_BY_TITLE}/${params?.name}`);
  let data;
  if (res.ok) {
    data = await res.json();
  }

  return (
    <div className="col-xl-8">
      <h1 className="text-25 fw-600">{data?.name}</h1>
      <div className="row x-gap-10 y-gap-10 items-center pt-10">
        <div className="col-auto">
          <Link
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
                {singleTourInfo[data?.name]?.numberOfReviews} reviews
              </div>
            </div>
          </Link>
        </div>

        <div className="col-auto">
          <div className="row x-gap-10 items-center">
            <div className="col-auto">
              <div className="d-flex x-gap-5 items-center">
                <i className="icon-placeholder text-16 text-light-1"></i>
                <div className="text-15 text-light-1">
                  {singleTourInfo[data?.name]?.location}
                </div>
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
