import { BASE_URL } from "@/constant/constants";
import { useGetAllContentQuery } from "@/features/content/contentApi";
import { useGetImagesByMenuIdQuery } from "@/features/image/imageApi";
import convertCurrency from "@/utils/currency";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
          if (item.type !== "Tours") return false;
          return true;
        })
        .map((tour) => ({
          id: tour.id,
          tag: "",
          slideImg: [`${data?.content_images[tour.name]}`],
          title: tour.name,
          location: tour?.location,
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
