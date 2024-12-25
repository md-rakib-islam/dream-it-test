"use client";

import React, { createContext, useState } from "react";

// Create Context
export const LayoutContext = createContext();

export default function LayoutProvider({ data, children }) {
  const [selectedCurrency, setSelectedCurrency] = useState({
    id: 10,
    name: "Euro",
    currency: "EUR",
    symbol: "€",
  });
  const [filteredTours, setFilteredTours] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");

  const updateCurrency = (currency) => {
    setSelectedCurrency(currency);
  };
  return (
    <LayoutContext.Provider
      value={{
        ...data,
        selectedCurrency,
        updateCurrency,
        filteredTours,
        setFilteredTours,
        setSelectedCategory,
        selectedCategory,
        selectedDuration,
        setSelectedDuration,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
