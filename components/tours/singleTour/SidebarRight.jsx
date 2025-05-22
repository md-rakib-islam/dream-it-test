"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import AgentCalendar from "./Bookings/AgentCalendar";
import { tour_content_id } from "@/constant/constants";

const SidebarRight = ({ data }) => {
  // State for bus data
  const [busdata, setBusdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use ref to track if component is mounted
  const isMounted = useRef(true);

  // Use ref to prevent multiple data fetches
  const dataFetchedRef = useRef(false);

  // Memoize the data dependency to prevent unnecessary effect triggers
  const dataDependency = useMemo(() => {
    return data?.select_bus;
  }, [data?.select_bus]);

  useEffect(() => {
    // Set mounted flag
    isMounted.current = true;

    // Cleanup function to set mounted flag to false when unmounting
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Skip if data or select_bus is missing
    if (!data || !dataDependency) {
      console.warn("Missing data or select_bus for fetching bus data");
      return;
    }

    // Skip if we've already fetched this data
    if (dataFetchedRef.current) {
      return;
    }

    const fetchBusData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${tour_content_id}${dataDependency}`);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const busData = await response.json();

        // Only update state if component is still mounted
        if (isMounted.current) {
          setBusdata(busData);
          setError(null);
          // Mark data as fetched
          dataFetchedRef.current = true;
        }
      } catch (error) {
        console.error("Error fetching bus data:", error);
        if (isMounted.current) {
          setError(error.message);
          setBusdata([]);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchBusData();
  }, [dataDependency]); // Only depend on memoized dataDependency

  // Memoize the Bokun script loading to prevent it from running on every render
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

  // Memoize the AgentCalendar component to prevent unnecessary re-renders
  const agentCalendarComponent = useMemo(() => {
    if (loading || error || data?.is_bokun_url !== false) {
      return null;
    }

    return <AgentCalendar tourdata={data} busdata={busdata} />;
  }, [data, busdata, loading, error]);

  // Memoize the Bokun widget component
  const bokunWidgetComponent = useMemo(() => {
    if (data?.is_bokun_url !== true) {
      return null;
    }

    return <div className="bokunWidget" data-src={data?.url}></div>;
  }, [data?.is_bokun_url, data?.url]);

  return (
    <div className="d-flex" style={{ height: "fit-content" }}>
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
            {data?.is_bokun_url === false
              ? agentCalendarComponent
              : bokunWidgetComponent}
          </>
        )}
      </div>
    </div>
  );
};

// Export with React.memo to prevent unnecessary re-renders
export default SidebarRight;
