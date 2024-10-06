"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
// import blogsData from "../../../../data/blogs";

const categoryTags = {
  Destinations: [
    { id: 1, name: "Travel Destinations" },
    { id: 2, name: "Explore Makkah" },
    { id: 3, name: "Explore Medina" },
    { id: 4, name: "Explore Taif" },
    { id: 5, name: "Explore Jedda" },
    { id: 6, name: "Explore Tabuk" },
  ],
  TravelTips: [
    { id: 1, name: "Travel Advice" },
    { id: 2, name: "Tips & Tricks" },
    { id: 3, name: "Smart Travel" },
    { id: 4, name: "Insider Tips" },
    { id: 5, name: "Pro Travel Tips" },
  ],
  BudgetTravel: [
    { id: 1, name: "Budget Adventures" },
    { id: 2, name: "Affordable Destinations" },
    { id: 3, name: "Budget-Friendly Tips" },
    { id: 4, name: "Thrifty Travel" },
  ],
  TravelPlanning: [
    { id: 1, name: "Trip Planning" },
    { id: 2, name: "Itinerary Ideas" },
    { id: 3, name: "Planning Tips" },
    { id: 4, name: "Travel Organization" },
    { id: 5, name: "Preparing for Travel" },
  ],
  LocalInsights: [
    { id: 1, name: "Local Experiences" },
    { id: 2, name: "Cultural Insights" },
    { id: 3, name: "Local Recommendations" },
    { id: 4, name: "Hidden Gems" },
  ],
};

const Tags = () => {
  const { currentCategory } = useSelector((state) => state.blog);

  return (
    <>
      {categoryTags[currentCategory?.name.split(" ").join("")].map((item) => (
        <div key={item.id} className="col-auto">
          <Link
            href="#"
            // href={`/blog-details/${item.id}`}
            className="button -blue-1 py-5 px-20 bg-blue-1-05 rounded-100 text-15 fw-500 text-blue-1 text-capitalize"
          >
            {item.name}
          </Link>
        </div>
      ))}
    </>
  );
};

export default Tags;
