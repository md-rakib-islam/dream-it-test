"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import LocationSearch from "./LocationSearch";

const MainFilterSearchBox = () => {
  const Router = useRouter();
  const { searchValue } = useSelector((state) => state.search);

  return (
    <>
      <div className="mainSearch bg-white px-20 py-20 lg:px-20 lg:pt-5 lg:pb-20">
        <div className="row items-center">
          {/* Location Search */}
          <div className="col-lg-8">
            <LocationSearch />
          </div>
          {/* End Location */}

          {/* Date Search (Hidden by default) */}
          {/* <div
            className="col-lg-5 searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar"
            style={{ display: "none" }}
          >
            <div>
              <h4 className="text-15 fw-500 ls-2 lh-16">
                Check in - Check out
              </h4>
              <DateSearch />
            </div>
          </div> */}
          {/* End check-in-out */}

          {/* Search Button */}
          <div className="col-lg-4">
            <div className="button-item">
              <button
                className="mainSearch__submit button -blue-1 py-15 px-35 h-60 col-12 rounded-4 bg-yellow-1 text-dark-1"
                onClick={() => Router.push(`/tours/?location=${searchValue}`)}
              >
                <i className="icon-search text-20 mr-10" />
                Search
              </button>
            </div>
          </div>
          {/* End search button_item */}
        </div>
      </div>
      {/* End .mainSearch */}
    </>
  );
};

export default MainFilterSearchBox;
