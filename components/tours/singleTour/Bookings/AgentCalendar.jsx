"use client";

import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "next/navigation";
import ParticipantsForDailyTour from "./ParticipantsForDailyTour";
import ChooseDateForDailyTour from "./ChooseDateForDailyTour";
import BookingSummaryForDailyTour from "./BookingSummaryForDailyTour";
import ParticipantsForRegularTour from "./ParticipantsForRegularTour";
import ChooseDateForRegularTour from "./ChooseDateForRegularTour";
import BookingSummaryForRegularTour from "./BookingSummaryForRegularTour";
// import styles from "./calendar.module.css";
import { LayoutContext } from "@/app/LayoutProvider";
import ParticipantsForBusTour from "./ParticipantsForBusTour";
import BookingSummaryForBusTour from "./BookingSummaryForBusTour";
import ChooseDateForBusTour from "./ChooseDateForBusTour";

const AgentCalendar = ({ tourdata, busdata }) => {
  // Get context data and URL parameters
  const data = useContext(LayoutContext);
  const logoUrl = data?.logo ? data?.logo[0]?.cloudflare_favicon : "";
  const searchParams = useSearchParams();
  const search = searchParams.get("location");
  const agentRef = searchParams.get("agentRef");

  // State for booking selections
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

  // Render components based on tour type
  const renderTourComponents = () => {
    if (tourType == "day_tour") {
      return (
        <>
          <div className="Agentsection">
            <ParticipantsForDailyTour
              onCountChange={handleParticipantChange}
              pricingList={pricingList}
              currentCurrency={selectedCurrency}
              minRequired={minRequired}
              maxAllowed={maxAllowed}
            />
          </div>
          <div className="Agentsection">
            <ChooseDateForDailyTour
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
            <BookingSummaryForDailyTour
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
              tourType={tourType}
            />
          </div>
        </>
      );
    } else if (tourType == "bus_tour") {
      return (
        <>
          <div className="Agentsection">
            <ParticipantsForBusTour
              onCountChange={handleParticipantChange}
              adultPrice={busdata?.adult_seat_price}
              childPrice={busdata?.child_seat_price}
              youthPrice={busdata?.youth_seat_price}
              currentCurrency={selectedCurrency}
            />
          </div>
          <div className="Agentsection">
            <ChooseDateForBusTour
              onSelectionComplete={handleDateSelection}
              availableDates={parsedAvailableDates}
              currentCurrency={selectedCurrency}
              price={busdata?.price}
            />
          </div>
          <div className="Agentsection">
            <BookingSummaryForBusTour
              selectedDate={selectedDate}
              selectedTime={selectedTime}
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
              adultPrice={busdata?.adult_seat_price}
              childPrice={busdata?.child_seat_price}
              youthPrice={busdata?.youth_seat_price}
              tourType={tourType}
            />
          </div>
        </>
      );
    } else {
      // Default to regular_tour components
      return (
        <>
          <div className="Agentsection">
            <ParticipantsForRegularTour
              onCountChange={handleParticipantChange}
              adultPrice={busdata?.adult_seat_price}
              childPrice={busdata?.child_seat_price}
              youthPrice={busdata?.youth_seat_price}
              currentCurrency={selectedCurrency}
            />
          </div>
          <div className="Agentsection">
            <ChooseDateForRegularTour
              onSelectionComplete={handleDateSelection}
              availableDates={parsedAvailableDates}
              currentCurrency={selectedCurrency}
              price={busdata?.price}
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
              tourID={tourdata?.id}
              agentRef={agentRef}
              currentCurrency={selectedCurrency}
              isValidBooking={isValidBooking}
              minRequired={minRequired}
              maxAllowed={maxAllowed}
              logoUrl={logoUrl}
              adultPrice={busdata?.adult_seat_price}
              childPrice={busdata?.child_seat_price}
              youthPrice={busdata?.youth_seat_price}
              tourType={tourType}
            />
          </div>
        </>
      );
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col px-0">
          <div className="bookingColumn">{renderTourComponents()}</div>
        </div>
      </div>
    </div>
  );
};

export default AgentCalendar;
