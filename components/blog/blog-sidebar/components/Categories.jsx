"use client";
import { addCategory } from "@/features/blog/blogSlice";
import { useGetAllContentQuery } from "@/features/content/contentApi";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Categories = () => {
  const dipatch = useDispatch();
  const { menuItems } = useSelector((state) => state.menus);
  const blogId = menuItems.find((item) => item.name === "Blog")?.id;
  const {
    isSuccess: isContentSuccess,
    data: contentItems,
    isLoading: isBlogContentLoading,
  } = useGetAllContentQuery(blogId);

  const catContent = [
    {
      id: 3,
      name: "Destinations",
      number: contentItems?.filter(
        (item) => item?.category.toLowerCase() === "destinations"
      )?.length,
    },
    {
      id: 4,
      name: "Travel Tips",
      number: contentItems?.filter(
        (item) => item?.category?.toLowerCase() === "travel tips"
      )?.length,
    },
    {
      id: 5,
      name: "Budget Travel",
      number: contentItems?.filter(
        (item) => item?.category?.toLowerCase() === "budget travel"
      )?.length,
    },
    {
      id: 5,
      name: "Travel Planning",
      number: contentItems?.filter(
        (item) => item?.category?.toLowerCase() === "travel planning"
      )?.length,
    },
    {
      id: 5,
      name: "Local Insights",
      number: contentItems?.filter(
        (item) => item?.category?.toLowerCase() === "local insights"
      )?.length,
    },
  ];
  const [currentCategory, setCurrnetCategory] = useState({
    id: 1,
    name: "Destinations",
    number: "3",
  });
  return (
    <>
      {catContent.map((item) => (
        <Link
          href={`/blog?category=${item?.name}`}
          className="d-flex items-center justify-between text-dark-1"
          onClick={() => {
            setCurrnetCategory(item);
            dipatch(addCategory(item));
          }}
          key={item.id}
        >
          <span
            className={`text-15 ${
              currentCategory.name === item.name
                ? "text-primary"
                : "text-dark-1"
            }`}
          >
            {item.name}
          </span>
          <span className="text-14 text-light-1">{item.number}</span>
        </Link>
      ))}
    </>
  );
};

export default Categories;
