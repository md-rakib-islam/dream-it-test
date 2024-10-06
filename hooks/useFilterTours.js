import { BASE_URL } from "@/constant/constants";
import { useGetAllContentQuery } from "@/features/content/contentApi";
import { useGetImagesByMenuIdQuery } from "@/features/image/imageApi";
import convertCurrency from "@/utils/currency";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const singleTourInfo = {
  "Rome: Colosseum, Roman Forum, and Palatine Hills Ticket with Hosted Entry": {
    location: "Rome, Italy",
    numberOfReviews: "296",
    languages: "English",
    groupSize: "1-15",
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
const useFilterTours = (destination) => {
  const [tourItems, setTourItems] = useState([]);
  const { menuItems } = useSelector((state) => state?.menus);
  const { currentCurrency, exchangeRates } = useSelector(
    (state) => state?.currency
  );

  let menuId;
  if (destination == "Home") {
    menuId = menuItems.find((item) => item.name == "Home")?.id;
  } else {
    menuId = menuItems
      .find((item) => item.name == "Destinations")
      ?.children?.find((child) => child?.name == destination)?.id;
  }
  const { isSuccess, data, isLoading } = useGetImagesByMenuIdQuery(menuId);
  const {
    isSuccess: isContentSuccess,
    data: contentItems,
    isLoading: isContentLoading,
  } = useGetAllContentQuery(menuId);
  useEffect(() => {
    if (isSuccess && isContentSuccess) {
      let tours = contentItems
        .filter((item) => {
          if (
            item.name == "Title" ||
            item.name == "Our Tour" ||
            item.name == "Our Tour Image" ||
            item.name == "About" ||
            item.name == "Switzerland" ||
            item.name == "Italy" ||
            item.name == "France" ||
            item.name == "Home" ||
            item.name == "Tours" ||
            item.name == "404" ||
            item.name == "Privacy Policy" ||
            item.name == "Terms and Conditions" ||
            item.name == "Contact" ||
            item.name == "Belgium" ||
            item.name == "Netherlands" ||
            item.name == "United States" ||
            item.name == "Germany"
          )
            return false;
          return true;
        })
        .map((tour) => ({
          id: tour.id,
          tag: "",
          slideImg: [`${data?.content_images[tour.name]}`],
          title: tour.name,
          location: singleTourInfo[tour?.name]?.location,
          duration: tour?.duration,
          numberOfReviews: tour?.reviews ? tour?.reviews : "0",
          trip_url: tour?.trip_url,
          slug: tour?.slug,
          price: convertCurrency(
            parseInt(tour?.price),
            "EUR",
            currentCurrency?.currency,
            exchangeRates
          ),
          tourType: "Full-day Tours",
          delayAnimation: "100",
          position: tour?.position,
        }));
      setTourItems(tours);
    }
  }, [isSuccess, isContentSuccess, currentCurrency]);

  return tourItems;
};

export default useFilterTours;
