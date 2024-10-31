"use client";
import { addCategory } from "@/features/tour/tourSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const CategoryTypes = () => {
  const dispatch = useDispatch();
  const { filterTours, filterCategory } = useSelector((state) => state.tour);
  const router = useRouter();
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "";
  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";


  const dailyTours = filterTours.filter(
    (item) => item.duration && item.duration.includes("hours")
  );
  const multiDayTours = filterTours.filter(
    (item) => item.duration && !item.duration.includes("hours")
  );
  const attractionTours = filterTours.filter(
    (item) => item.title && item.title.includes("Ticket")
  );

  const categories = [
    { name: "Attraction Tours", count: attractionTours.length },
    { name: "Day Tours", count: dailyTours.length },
    { name: "Multi-Day Tours", count: multiDayTours.length },
  ];

  const handleCategoryChange = (categoryLabel) => {
    // If the category is already selected, deselect it
    const newCategory = filterCategory === categoryLabel ? "" : categoryLabel;

    // Update the Redux store
    dispatch(addCategory(newCategory));

    // Update the URL
    const categoryParam = newCategory ? `&category=${newCategory}` : "";
    router.push(`/tours/?location=${location}${categoryParam}&min=${min}&max=${max}`);
  };

  return (
    <>
      {categories.map((category) => (
        <div
          className="row y-gap-10 items-center justify-between"
          key={category.name}
        >
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input
                type="checkbox"
                checked={filterCategory === category.name}
                onChange={() => handleCategoryChange(category.name)}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">{category.name}</div>
            </div>
          </div>
          <div className="col-auto">
            <div className="text-15 text-light-1">{category.count}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoryTypes;
