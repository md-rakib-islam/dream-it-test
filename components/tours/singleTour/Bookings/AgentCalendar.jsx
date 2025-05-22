"use client"; // Indicates this is a client component that uses client-side features

// Import necessary React hooks and components
import {
  useState,
  useEffect,
  useContext,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useSearchParams } from "next/navigation";
import ParticipantsForRegularTour from "./ParticipantsForRegularTour";
import ChooseDateForRegularTour from "./ChooseDateForRegularTour";
import BookingSummaryForRegularTour from "./BookingSummaryForRegularTour";
// import styles from "./calendar.module.css"; // CSS module import is commented out
import { LayoutContext } from "@/app/LayoutProvider";

// Main component definition with props for tour and bus data
const AgentCalendar = ({ tourdata, busdata }) => {
  // Get context data and URL parameters
  const data = useContext(LayoutContext);
  const logoUrl = data?.logo ? data?.logo[0]?.cloudflare_favicon : "";
  const searchParams = useSearchParams();
  const search = searchParams.get("location");
  const agentRef = searchParams.get("agentRef");

  // Create refs to store persistent values
  const initialRenderRef = useRef(true);
  const selectedValuesRef = useRef({
    date: null,
    time: null,
    participants: {
      count: 1,
    },
  });

  const [selectedDate, setSelectedDate] = useState(
    selectedValuesRef.current.date
  );
  const [selectedTime, setSelectedTime] = useState(
    selectedValuesRef.current.time
  );
  const [participants, setParticipants] = useState(
    selectedValuesRef.current.participants
  );
  const { toursMainData, selectedCurrency } = useContext(LayoutContext);
  const [matchedTourData, setMatchedTourData] = useState(null);
  const [isValidBooking, setIsValidBooking] = useState(false);
  // Add new state for bus tour validation that only checks date and time
  const [isValidBookingBus, setIsValidBookingBus] = useState(false);
  // Add to the state for booking selections
  const [availableSpots, setAvailableSpots] = useState(null);

  // Determine tour type
  const tourType = busdata?.tour_type || "regular_tour"; // Default to regular_tour if not specified

  // Find the matched tour from toursMainData
  const matchedTour = toursMainData.find((tour) => tour.id === tourdata?.id);
  const tourImage = matchedTour?.slideImg?.[0] || null;

  // Get tour name from busdata or fallback
  const tourName = busdata?.name || "Tour Name Not Available";

  // Extract price list from busdata
  const pricingList = busdata?.day_tour_price_list || [];

  // Get available participant counts
  const getAvailableParticipantCounts = () => {
    if (!pricingList || pricingList.length === 0) return [];
    return pricingList.map((item) => item.person).sort((a, b) => a - b);
  };

  const availableCounts = useMemo(() => {
    if (!pricingList || pricingList.length === 0) return [];
    return pricingList.map((item) => item.person).sort((a, b) => a - b);
  }, [pricingList]);

  // Get minimum required participants
  const minRequired =
    availableCounts.length > 0 ? Math.min(...availableCounts) : null;

  // Get maximum allowed participants
  const maxAllowed =
    availableCounts.length > 0 ? Math.max(...availableCounts) : null;

  // Effect to set matched tour data when matchedTour changes
  useEffect(() => {
    if (matchedTour) {
      setMatchedTourData(matchedTour.slideImg?.[0]);
    }
  }, [matchedTour]);

  // Handler for participant changes - use useCallback to prevent recreation
  const handleParticipantChange = useCallback((participantData) => {
    setParticipants(participantData);
    // Store in ref for persistence
    selectedValuesRef.current.participants = participantData;
  }, []);

  // Handler for date selection - use useCallback to prevent recreation
  const handleDateSelection = useCallback((selection) => {
    setSelectedDate(selection.date);
    setSelectedTime(selection.time);
    // Store in ref for persistence
    selectedValuesRef.current.date = selection.date;
    selectedValuesRef.current.time = selection.time;

    if (selection.availableSpots !== undefined) {
      setAvailableSpots(selection.availableSpots);
    }
  }, []);

  // Get available dates from busdata
  // Memoize parsed available dates to prevent recalculation
  const parsedAvailableDates = useMemo(() => {
    if (!busdata?.available_dates) return [];

    return busdata.available_dates.map((dateString) => {
      // Handle date strings in format "DD/MM/YYYY"
      if (typeof dateString === "string" && dateString.includes("/")) {
        const [day, month, year] = dateString.split("/");
        // Create date with correct parts (month is 0-indexed in JS Date)
        return new Date(
          Number.parseInt(year),
          Number.parseInt(month) - 1,
          Number.parseInt(day)
        );
      }
      // Handle if it's already an object with date property
      else if (
        dateString &&
        typeof dateString === "object" &&
        dateString.date
      ) {
        // If it's in the format {date: "DD/MM/YYYY"}
        if (
          typeof dateString.date === "string" &&
          dateString.date.includes("/")
        ) {
          const [day, month, year] = dateString.date.split("/");
          return new Date(
            Number.parseInt(year),
            Number.parseInt(month) - 1,
            Number.parseInt(day)
          );
        }
        // If it's already in a format Date can parse
        return new Date(dateString.date);
      }
      // Fallback - try to parse directly (will work for ISO dates)
      return new Date(dateString);
    });
  }, [busdata?.available_dates]);

  // Only log on initial render, not on every scroll
  useEffect(() => {
    if (initialRenderRef.current) {
      console.log("Parsed available dates:", parsedAvailableDates);
      initialRenderRef.current = false;
    }
  }, [parsedAvailableDates]);

  // Effect to validate booking requirements
  useEffect(() => {
    const isMinParticipantsMet = minRequired
      ? participants?.count >= minRequired
      : false;
    const isMaxParticipantsExceeded = maxAllowed
      ? participants?.count > maxAllowed
      : false;
    const hasValidDate = !!selectedDate;
    const hasValidTime = !!selectedTime;
    const hasValidPrice = participants?.hasValidPrice === true;

    // Set the standard validation that includes participant requirements
    setIsValidBooking(hasValidDate && hasValidTime);

    // Set the bus tour validation that only checks date and time
    setIsValidBookingBus(hasValidDate && hasValidTime);

    // Debug logging
    console.log("Validation in AgentCalendar:", {
      isMinParticipantsMet,
      isMaxParticipantsExceeded,
      hasValidDate,
      hasValidTime,
      hasValidPrice,
      isValidBooking:
        isMinParticipantsMet &&
        !isMaxParticipantsExceeded &&
        hasValidDate &&
        hasValidTime &&
        hasValidPrice,
      isValidBookingBus: hasValidDate && hasValidTime,
    });
  }, [selectedDate, selectedTime, participants, minRequired, maxAllowed]);

  // Component return statement with container structure
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col px-0">
          <div className="bookingColumn">
            <div className="Agentsection">
              <ParticipantsForRegularTour
                onCountChange={handleParticipantChange}
                adultPrice={busdata?.adult_price}
                childPrice={busdata?.child_price}
                youthPrice={busdata?.youth_price}
                currentCurrency={selectedCurrency}
              />
            </div>
            <div className="Agentsection">
              <ChooseDateForRegularTour
                onSelectionComplete={handleDateSelection}
                availableDates={parsedAvailableDates}
                currentCurrency={selectedCurrency}
                price={busdata?.price}
                tourID={busdata?.id}
                participants={participants}
              />
            </div>
            <div className="Agentsection">
              <BookingSummaryForRegularTour
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                participants={participants}
                tourName={tourName}
                busId={busdata?.id}
                duration={tourdata?.duration}
                tourImage={tourImage}
                tourID={busdata?.id}
                agentRef={agentRef}
                currentCurrency={selectedCurrency}
                isValidBooking={isValidBooking}
                minRequired={minRequired}
                maxAllowed={maxAllowed}
                logoUrl={logoUrl}
                adultPrice={busdata?.adult_price}
                childPrice={busdata?.child_price}
                youthPrice={busdata?.youth_price}
                tourType={tourType}
                availableSpots={availableSpots}
                price={busdata?.price}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCalendar;
