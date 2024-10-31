"use client";

import { addPriceRange } from "@/features/tour/tourSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import InputRange from "react-input-range";
import { useDispatch } from "react-redux";

const PirceSlider = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "";
  const category = searchParams.get("category") || "";
  const [price, setPrice] = useState({
    value: { min: 0, max: 20000 },
  });

  const handleOnChange = (value) => {
    setPrice({ value });
  };

  const handleOnChangeComplete = (value) => {
    dispatch(addPriceRange(value));
    router.push(
      `/tours/?location=${location}&category=${category}&min=${value.min}&max=${value.max}`
    );
  };

  return (
    <div className="js-price-rangeSlider">
      <div className="text-14 fw-500"></div>

      <div className="d-flex justify-between mb-20">
        <div className="text-15 text-dark-1">
          <span className="js-lower mx-1">${price.value.min}</span>-
          <span className="js-upper mx-1">${price.value.max}</span>
        </div>
      </div>

      <div className="px-5">
        <InputRange
          formatLabel={(value) => ``}
          minValue={0}
          maxValue={20000}
          value={price.value}
          onChange={handleOnChange}
          onChangeComplete={handleOnChangeComplete}
        />
      </div>
    </div>
  );
};

export default PirceSlider;
