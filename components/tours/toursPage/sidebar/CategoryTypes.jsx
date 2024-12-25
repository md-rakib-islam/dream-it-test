"use client";
import { LayoutContext } from "@/app/LayoutProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";

const CategoryTypes = () => {
  const { selectedCategory, setSelectedCategory, toursMainData } =
    useContext(LayoutContext);
  // const { filteredTours, selectedCategory } = useSelector((state) => state.tour);
  const router = useRouter();
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "";
  const category = searchParams.get("category") || "";

  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";

  const dailyTours = toursMainData.filter(
    (item) => item.duration && item.duration.includes("hours")
  );
  const multiDayTours = toursMainData.filter(
    (item) => item.duration && !item.duration.includes("hours")
  );
  const attractionTours = toursMainData.filter(
    (item) => item.title && item.title.includes("Ticket")
  );

  const categories = [
    { name: "Attraction Tours", count: attractionTours.length },
    { name: "Day Tours", count: dailyTours.length },
    { name: "Multi-Day Tours", count: multiDayTours.length },
  ];

  const handleCategoryChange = (categoryLabel) => {
    // If the category is already selected, deselect it
    const newCategory = selectedCategory === categoryLabel ? "" : categoryLabel;

    // Update the Redux store
    // dispatch(addCategory(newCategory));
    setSelectedCategory(newCategory);
    // Update the URL
    const categoryParam = newCategory ? `&category=${newCategory}` : "";
    router.push(
      `/tours/?location=${location}${categoryParam}&min=${min}&max=${max}`
    );
  };
  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

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
                checked={selectedCategory === category.name}
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
