"use client";

import { LayoutContext } from "@/app/LayoutProvider";
import { useContext, useEffect, useState } from "react";

const CurrenctyMegaMenu = ({ textClass }) => {
  const { selectedCurrency, updateCurrency } = useContext(LayoutContext);

  const [click, setClick] = useState(false);
  const handleCurrency = () => setClick((prevState) => !prevState);
  const [oneTimeCall, setOnetimeCall] = useState(false);

  const currencyContent = [
    {
      id: 1,
      name: "United States dollar",
      currency: "USD",
      symbol: "$",
      country_code: [
        "US",
        "AS",
        "EC",
        "FM",
        "GU",
        "MH",
        "MP",
        "PW",
        "PR",
        "TC",
        "TL",
        "UM",
        "VG",
        "VI",
        "BZ",
        "SV",
        "PA",
        "ZM",
      ],
    },
    {
      id: 2,
      name: "Australian dollar",
      currency: "AUD",
      symbol: "$",
      country_code: ["AU", "CX", "CC", "HM", "KI", "NR", "NF", "TV"],
    },

    {
      id: 5,
      name: "Canadian dollar",
      currency: "CAD",
      symbol: "$",
      country_code: ["CA"],
    },

    {
      id: 10,
      name: "Euro",
      currency: "EUR",
      symbol: "€",
      country_code: [
        "AD",
        "AT",
        "BE",
        "CY",
        "EE",
        "FI",
        "FR",
        "DE",
        "GR",
        "IE",
        "IT",
        "LV",
        "LT",
        "LU",
        "MT",
        "MC",
        "ME",
        "NL",
        "PT",
        "SM",
        "SK",
        "SI",
        "ES",
        "VA",
      ],
    },

    {
      id: 13,
      name: "Great Britain Pound",
      currency: "GBP",
      symbol: "£",
      country_code: ["GB", "IM", "GG", "JE"],
    },
    {
      id: 15,
      name: "Saudi riyal",
      currency: "SAR",
      symbol: "ريال",
      country_code: ["SA"],
    },
  ];

  const handleItemClick = (item) => {
    updateCurrency(item);
    // dispatch(addCurrency(item));
    setClick(false);
  };

  useEffect(() => {
    if (!oneTimeCall) {
      setOnetimeCall(true);
      const fetchGeoData = async () => {
        try {
          const res = await fetch(
            "https://ipinfo.io/json?token=baf431b7705663"
          );
          const data = await res.json();
          // console.log("Geo data:", data);

          if (data && data.country) {
            // updateCurrency(currencyObject);
            currencyContent.forEach((item) => {
              item.country_code.forEach((code) => {
                if (code == data.country) {
                  console.log("country code:", code, data.country);
                  updateCurrency(item);
                  setClick(false);
                }
              });
              // if (item.country_code === data.country) {
              //   updateCurrency(item);
              // } else {
              //   console.log("No match found for country code:", data.country);
              // }
            });
          }
        } catch (error) {
          console.error("Geo error:", error);
        }
      };
      fetchGeoData();
    }
  }, [updateCurrency, oneTimeCall, currencyContent]);

  return (
    <>
      {/* Start currencty dropdown wrapper */}
      <div className="col-auto">
        <button
          className={`d-flex items-center text-14 ${textClass}`}
          onClick={handleCurrency}
        >
          <span className="js-currencyMenu-mainTitle">
            {selectedCurrency.currency} - {selectedCurrency.symbol}
          </span>
          <i className="icon-chevron-sm-down text-7 ml-10" />
        </button>
      </div>
      {/* End currencty dropdown wrapper */}

      <div
        className={`currencyMenu js-currencyMenu ${click ? "" : "is-hidden"}`}
      >
        <div className="currencyMenu__bg" onClick={handleCurrency}></div>
        <div className="currencyMenu__content bg-white rounded-4">
          <div className="d-flex items-center justify-between px-30 py-20 sm:px-15 border-bottom-light">
            <div className="text-20 fw-500 lh-15">Select your currency</div>
            {/* End Title */}

            <button
              className="pointer"
              onClick={handleCurrency}
              aria-label="Close"
            >
              <i className="icon-close" />
            </button>
            {/* End colse button */}
          </div>
          {/* End flex wrapper */}
          <ul className="modalGrid px-30 py-30 sm:px-15 sm:py-15">
            {currencyContent.map((item) => (
              <li
                className={`modalGrid__item js-item ${
                  selectedCurrency.currency === item.currency ? "active" : ""
                }`}
                key={item.id}
                onClick={() => handleItemClick(item)}
              >
                <div className="py-10 px-15 sm:px-5 sm:py-5">
                  <div className="text-15 lh-15 fw-500 text-dark-1">
                    {item.name}
                  </div>
                  <div className="text-14 lh-15 mt-5">
                    <span className="js-title">{item.currency}</span> -{" "}
                    {item.symbol}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CurrenctyMegaMenu;
