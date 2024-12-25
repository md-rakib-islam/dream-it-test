"use client";

import { LayoutContext } from "@/app/LayoutProvider";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const SearchBar = () => {
  const { menus } = useContext(LayoutContext);

  const Router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("location");
  const category = searchParams.get("category");
  const min = searchParams.get("min");
  const max = searchParams.get("max");

  const [searchValue, setSearchValue] = useState(search || "");
  const [selectedItem, setSelectedItem] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility state

  const destinations = menus?.find(
    (item) => item?.name === "Destinations"
  )?.children;

  const locationSearchContent = destinations?.map((item) => ({
    id: item?.id,
    name: item?.name,
    address: "",
  }));

  console.log("Location Search Content:", locationSearchContent);

  const handleOptionClick = (item) => {
    setSearchValue(item.name);
    setSelectedItem(item);
    setDropdownVisible(false); // Hide dropdown after selection

    Router.push(
      `/tours/?location=${item.name}&category=${category}&min=${min}&max=${max}`
    );
  };

  const handleInputFocus = () => {
    setDropdownVisible(true); // Show dropdown on input focus
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setDropdownVisible(false); // Hide dropdown when input loses focus after a delay
    }, 200); // Add a delay to allow item selection
  };

  return (
    <div className="searchMenu-loc px-20 py-10 bg-white rounded-4">
      <div>
        <div className="d-flex">
          <i className="icon-location-2 text-20 text-light-1 mt-5"></i>

          <div className="ml-10 flex-grow-1">
            <h4 className="text-15 fw-500 ls-2 lh-16">Location</h4>
            <div className="text-15 text-light-1 ls-2 lh-16">
              <input
                autoComplete="off"
                type="search"
                placeholder="Where are you going?"
                className="form-control"
                value={searchValue}
                onFocus={handleInputFocus} // Show dropdown on focus
                onBlur={handleInputBlur} // Hide dropdown on blur
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchValue(value);

                  if (value === "") {
                    setSelectedItem(null);
                    Router.push(`/tours/?location=&category&min=&max`);
                  }
                }}
              />
            </div>
          </div>
          {/* End ml-10 */}
        </div>
      </div>
      {/* End location Field */}

      {dropdownVisible && (
        <div className="shadow-2 dropdown-menu min-width-400 show">
          <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
            <ul className="y-gap-5">
              {locationSearchContent?.length > 0 ? (
                locationSearchContent.map((item, idx) => (
                  <li
                    className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                      selectedItem && selectedItem.id === item.id
                        ? "active"
                        : ""
                    }`}
                    key={idx}
                    role="button"
                    onClick={() => handleOptionClick(item)}
                  >
                    <div className="d-flex">
                      <div className="icon-location-2 text-light-1 text-20 pt-4" />
                      <div className="ml-10">
                        <div className="text-15 lh-12 fw-500">{item.name}</div>
                        <div className="text-14 lh-12 text-light-1 mt-5">
                          {item.address}
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-center text-light-1">No results found</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
