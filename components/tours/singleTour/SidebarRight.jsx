"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AgentCalendar from "./Bookings/AgentCalendar";
import { BASE_URL_AGENT_BOOKING } from "@/constant/constants";

const SidebarRight = ({ data }) => {
  // State for bus data
  const [busdata, setBusdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Skip if data or select_bus is missinging
    if (!data || !data.select_bus) {
      console.warn("Missing data or select_bus for fetching bus data");
      return;
    }

    const fetchBusData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL_AGENT_BOOKING}/bus/api/v1/bus/${data.select_bus}`
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const busData = await response.json();
        setBusdata(busData);
        setError(null);
      } catch (error) {
        console.error("Error fetching bus data:", error);
        setError(error.message);
        setBusdata([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBusData();
  }, [data]);

  // console.log("busdata", busdata);
  // console.log("selectbus", data?.select_bus);

  useEffect(() => {
    // Check if script already exists to prevent duplicates
    const existingScript = document.querySelector(
      'script[src*="BokunWidgetsLoader.js"]'
    );
    if (existingScript) return;

    const script = document.createElement("script");
    script.src =
      "https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c8f2314b-0289-4a75-825c-37cb690a7c70";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Only remove if it exists
      const scriptToRemove = document.querySelector(
        'script[src*="BokunWidgetsLoader.js"]'
      );
      if (scriptToRemove && scriptToRemove.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove);
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="d-flex js-pin-content" style={{ height: "fit-content" }}>
      <div className="w-360 lg:w-full d-flex flex-column">
        <div className="d-flex items-center gradient-text">
          <Image
            src="https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/863921a6-6870-4690-d6bd-8dd0f0314f00/public"
            width={50}
            height={22}
            alt="Klarna Payment System"
          />
          <span className="fw-500 ml-20">Book now, pay in 3 installments</span>
        </div>

        {loading && <div className="text-center py-4">Loading bus data...</div>}

        {error && (
          <div className="text-center py-4 text-red-500">
            Error loading bus data: {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {!data?.select_bus ? (
              <div className="bokunWidget" data-src={data?.url}></div>
            ) : (
              <AgentCalendar tourdata={data} busdata={busdata} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarRight;
