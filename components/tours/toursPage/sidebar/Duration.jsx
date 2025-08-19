"use client";

import { LayoutContext } from "@/app/LayoutProvider";
import { useContext, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Duration = () => {
  const { selectedDuration, setSelectedDuration, toursMainData } =
    useContext(LayoutContext);
  // const { filteredTours, selectedDuration } = useSelector((state) => state.tour);
  const router = useRouter();
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "";
  const category = searchParams.get("category") || "";
  const duration = searchParams.get("duration") || "";

  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";

  const oneToFour = toursMainData.filter((item) => {
    const hours = parseInt(item.duration?.match(/(\d+)/)?.[0] || 0);
    return hours >= 1 && hours <= 4; // Filter for 1 to 4 hours
  });

  const fiveToDay = toursMainData.filter((item) => {
    const hours = parseInt(item.duration?.match(/(\d+)/)?.[0] || 0);
    return hours > 4 && hours <= 24; // Filter for 5 hours to 1 day
  });

  const twoToFiveDays = toursMainData.filter((item) => {
    const days = parseInt(item.duration?.match(/(\d+)/)?.[0] || 0);
    return days >= 2 && days <= 5 && item.duration.includes("days"); // Filter for 2 to 5 days
  });
  const handleDurationChange = (categoryLabel) => {
    // If the category is already selected, deselect it
    const newDuration = selectedDuration === categoryLabel ? "" : categoryLabel;

    setSelectedDuration(newDuration);
    // Update the URL
    const durationParam = newDuration ? `&duration=${newDuration}` : "";
    router.push(
      `/tours/?location=${location}&category=${category}${durationParam}&min=${min}&max=${max}`
    );
  };
  useEffect(() => {
    setSelectedDuration(duration);
  }, [duration]);

  // Duration options with counts
  const durationOptions = [
    { label: "1 to 4 Hours", count: oneToFour.length },
    { label: "5 Hours to 1 Day", count: fiveToDay.length },
    // { label: "2 to 5 Days", count: twoToFiveDays.length },
  ];

  return (
    <>
      {durationOptions.map((option, index) => (
        <div className="row y-gap-10 items-center justify-between" key={index}>
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input
                type="checkbox"
                name="name"
                checked={selectedDuration === option.label}
                onChange={() => handleDurationChange(option.label)}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">{option.label}</div>
            </div>
          </div>
          <div className="col-auto">
            <div className="text-15 text-light-1">{option.count}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Duration;
