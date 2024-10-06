"use client";

import { addSearchTerm } from "@/features/blog/blogSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const SearchBox = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form
      className="single-field relative d-flex items-center py-10"
      onSubmit={handleSubmit}
    >
      <input
        value={searchTerm}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          dispatch(addSearchTerm(e.target.value));
        }}
        className="pl-50 border-light text-dark-1 h-50 rounded-8"
        type="text"
        placeholder="Search"
      />
      <button className="absolute d-flex items-center h-full">
        <i className="icon-search text-20 px-15 text-dark-1" />
      </button>
    </form>
  );
};

export default SearchBox;
