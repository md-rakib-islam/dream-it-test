"use client";

import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "next/navigation";
import Participants from "./Participants";
import ChooseDate from "./ChooseDate";
import BookingSummary from "./BookingSummary";
// import styles from "./calendar.module.css";
import { LayoutContext } from "@/app/LayoutProvider";

const AgentCalendar = ({ tourdata, busdata }) => {
  const data = useContext(LayoutContext);
  const logoUrl = data?.logo ? data?.logo[0]?.cloudflare_favicon : "";
  const searchParams = useSearchParams();
  const search = searchParams.get("location");
  const agentRef = searchParams.get("agentRef");

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [participants, setParticipants] = useState({
    count: 1,
    price: null,
    priceId: null,
    hasValidPrice: false,
  });
  const { toursMainData, selectedCurrency } = useContext(LayoutContext);
  const [matchedTourData, setMatchedTourData] = useState(null);
  const [isValidBooking, setIsValidBooking] = useState(false);

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

  const availableCounts = getAvailableParticipantCounts();

  // Get minimum required participants
  const minRequired =
    availableCounts.length > 0 ? Math.min(...availableCounts) : null;

  // Get maximum allowed participants
  const maxAllowed =
    availableCounts.length > 0 ? Math.max(...availableCounts) : null;

  useEffect(() => {
    if (matchedTour) {
      setMatchedTourData(matchedTour.slideImg?.[0]);
    }
  }, [matchedTour]);

  const handleParticipantChange = (participantData) => {
    console.log("Participant data changed:", participantData);
    setParticipants(participantData);
  };

  const handleDateSelection = (selection) => {
    setSelectedDate(selection.date);
    setSelectedTime(selection.time);
  };

  // Get available dates from busdata
  const parsedAvailableDates = busdata?.available_dates
    ? busdata.available_dates.map((dateStr) => new Date(dateStr))
    : [];

  // Validate booking requirements
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

    setIsValidBooking(
      isMinParticipantsMet &&
        !isMaxParticipantsExceeded &&
        hasValidDate &&
        hasValidTime &&
        hasValidPrice
    );

    // Debug logging
    // console.log("Validation in AgentCalendar:", {
    //   isMinParticipantsMet,
    //   isMaxParticipantsExceeded,
    //   hasValidDate,
    //   hasValidTime,
    //   hasValidPrice,
    //   isValidBooking:
    //     isMinParticipantsMet &&
    //     !isMaxParticipantsExceeded &&
    //     hasValidDate &&
    //     hasValidTime &&
    //     hasValidPrice,
    // });
  }, [selectedDate, selectedTime, participants, minRequired, maxAllowed]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col px-0">
          <div className="bookingColumn">
            <div className="Agentsection">
              <Participants
                onCountChange={handleParticipantChange}
                pricingList={pricingList}
                currentCurrency={selectedCurrency}
                minRequired={minRequired}
                maxAllowed={maxAllowed}
              />
            </div>
            <div className="Agentsection">
              <ChooseDate
                onSelectionComplete={handleDateSelection}
                availableDates={parsedAvailableDates}
                currentCurrency={selectedCurrency}
                currentPrice={participants.price}
                participants={participants}
                minRequired={minRequired}
                maxAllowed={maxAllowed}
              />
            </div>
            <div className="Agentsection">
              <BookingSummary
                selectedDate={isValidBooking ? selectedDate : null}
                selectedTime={isValidBooking ? selectedTime : null}
                participants={participants}
                tourName={tourName}
                busId={busdata?.id}
                duration={tourdata?.duration}
                tourImage={tourImage}
                tourID={tourdata?.id}
                agentRef={agentRef}
                currentCurrency={selectedCurrency}
                isValidBooking={isValidBooking}
                minRequired={minRequired}
                maxAllowed={maxAllowed}
                logoUrl={logoUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCalendar;
