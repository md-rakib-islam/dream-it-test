"use client";

import { useState, useEffect, useRef } from "react";
// import styles from "./BookingSummary.module.css";
import CheckoutModal from "./CheckoutModal";
import { modifiedCurrency } from "@/utils/modifiedCurrency";

import { BASE_URL_AGENT_BOOKING } from "@/constant/constants";

const BookingSummaryForRegularTour = ({
  selectedDate,
  selectedTime,
  participants,
  adultPrice,
  childPrice,
  youthPrice,
  tourName,
  busId,
  duration,
  tourID,
  tourImage,
  agentRef,
  currentCurrency,
  realPrice,
  realAdultPrice,
  realChildPrice,
  realYouthPrice,
  tourType,
  logoUrl,
  isValidBooking,
  availableSpots,
  price,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayParticipants, setDisplayParticipants] = useState({
    adult: 1,
    youth: 0,
    child: 0,
    ...participants,
  });
  // Add new state for API response and loading
  const [apiMessage, setApiMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [spotsAvailable, setSpotsAvailable] = useState(null);

  // Refs to store previous values to prevent unnecessary updates
  const prevPropsRef = useRef({ selectedDate, selectedTime, participants });
  const timeoutRef = useRef(null);
  const isMountedRef = useRef(true);

  // Update mounted flag
  useEffect(() => {
    isMountedRef.current = true;

    // Cleanup function
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Update display participants whenever the participants prop changes
  useEffect(() => {
    if (participants) {
      setDisplayParticipants({
        adult: 1, // Always ensure at least 1 adult as default
        youth: 0,
        child: 0,
        ...participants,
      });
    }
  }, [participants]);

  // Add this useEffect to reset API message and spots available when isValidBooking changes
  useEffect(() => {
    // If date/time is deselected (isValidBooking becomes false), reset API-related states
    if (!isValidBooking) {
      setApiMessage("");
      setSpotsAvailable(null);
    }
  }, [isValidBooking]);

  const calculateTotal = () => {
    const childTotal =
      (displayParticipants?.child || 0) * Number(childPrice || 0);
    const adultTotal =
      (displayParticipants?.adult || 1) * Number(adultPrice || 0); // Default to 1 adult
    const youthTotal =
      (displayParticipants?.youth || 0) * Number(youthPrice || 0);
    return childTotal + adultTotal + youthTotal;
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Format total price with currency symbol
  const formatTotalPrice = (price) => {
    if (!price) return "";
    return `${currentCurrency?.symbol || ""}${modifiedCurrency(
      price,
      currentCurrency?.currency
    )}`;
  };

  // Format total price with currency symbol
  const formatsTotalPrice = (price) => {
    if (!price) return "";
    return `${modifiedCurrency(price, currentCurrency?.currency)}`;
  };

  // Function to check participants for the selected date
  const checkParticipantsForDate = async () => {
    if (!selectedDate || !tourID) return false;

    setIsLoading(true);
    setApiMessage("");

    const formattedDate = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

    try {
      const response = await fetch(
        `${BASE_URL_AGENT_BOOKING}/tour_content/api/v1/tour_content/get_participants/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tour_id: tourID,
            date: formattedDate,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Check if there are enough spots available
        const currentParticipants = data.participants || 0;
        const maxParticipantsAllowed = 50; // Default max participants
        const availableSpots = maxParticipantsAllowed - currentParticipants;

        // Calculate total participants
        const totalParticipants =
          (displayParticipants.adult || 0) +
          (displayParticipants.youth || 0) +
          (displayParticipants.child || 0);

        if (availableSpots >= totalParticipants) {
          // There are enough spots available
          setApiMessage("Booking available!");
          setSpotsAvailable(true);
          return true;
        } else {
          // Not enough spots available
          setApiMessage("Sorry, not enough spots available for this date.");
          setSpotsAvailable(false);
          return false;
        }
      } else {
        const errorText = await response.text();
        console.error("Failed to check participants:", errorText);
        setApiMessage("Error checking availability");
        setSpotsAvailable(false);
        return false;
      }
    } catch (error) {
      console.error("Error checking participants:", error);
      setApiMessage("Error checking availability");
      setSpotsAvailable(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for checkout button
  const handleCheckout = async () => {
    // Check participants for the selected date
    const success = await checkParticipantsForDate();

    if (success) {
      // If successful, open the checkout modal
      setIsModalOpen(true);
    }
    // The message is already set by the checkParticipantsForDate function
  };

  // Determine button text based on validation state
  const getButtonText = () => {
    if (!isValidBooking) {
      return "Please select date and time";
    } else if (isLoading) {
      return "Checking availability...";
    } else if (spotsAvailable === false) {
      return "No spots available";
    } else {
      return "Checkout";
    }
  };

  // Check if the button should be disabled
  const isButtonDisabled = () => {
    // If date and time are not selected (isValidBooking is false),
    // the button should show "Please select date and time" and be disabled
    if (!isValidBooking) {
      return true;
    }

    // Otherwise, disable if:
    // 1. Currently loading
    // 2. Spots are explicitly not available (spotsAvailable === false)
    // 3. Total price is 0
    return isLoading || spotsAvailable === false || calculateTotal() === 0;
  };

  // Always show adult section regardless of count
  const adultCount =
    displayParticipants?.adult !== undefined ? displayParticipants.adult : 1;

  return (
    <>
      <div className="Bookingsection">
        <h2 className="BookingsectionTitle">Booking Summary</h2>

        <div className="ticketContainer">
          <div className="ticketLeft">
            <h3 className="tourTitle">{tourName}</h3>

            {/* Always show adult section */}
            <div className="participantInfo">
              Adult: {adultCount} x
              {isValidBooking && formatTotalPrice(adultPrice)}
            </div>

            {displayParticipants?.youth > 0 && (
              <div className="participantInfo">
                Child: {displayParticipants.youth} x
                {isValidBooking && formatTotalPrice(youthPrice)}
              </div>
            )}

            {displayParticipants?.child > 0 && (
              <div className="participantInfo">
                Infant: {displayParticipants.child} x
                {isValidBooking && formatTotalPrice(childPrice)}
              </div>
            )}
          </div>

          <div className="ticketRight">
            <div className="timeDisplay">
              {" "}
              {isValidBooking ? selectedTime : "--:--"}
            </div>
            <div className="dateDisplay">
              {isValidBooking && selectedDate ? formatDate(selectedDate) : ""}
            </div>
            <div className="totalAmount">
              <span className="totalLabel">Total:</span>
              <span>
                {isValidBooking
                  ? `${formatTotalPrice(calculateTotal())}`
                  : null}
              </span>
            </div>
          </div>
        </div>
        {apiMessage && (
          <div
            className="availabilityInfo"
            style={{
              marginTop: "8px",
              color: spotsAvailable ? "#4caf50" : "#e53935",
              fontWeight: spotsAvailable ? "normal" : "bold",
            }}
          >
            {apiMessage}
          </div>
        )}

        <button
          className="BookingcheckoutButton"
          disabled={isButtonDisabled()}
          onClick={handleCheckout}
        >
          {getButtonText()}
          {!isLoading && <i className="icon icon-shopping-cart"></i>}
          {isLoading && <span className="spinner"></span>}
        </button>
      </div>

      {isModalOpen && (
        <CheckoutModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tourName={tourName}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          total={formatsTotalPrice(calculateTotal())}
          participants={displayParticipants}
          adultPrice={formatsTotalPrice(adultPrice)}
          childPrice={formatsTotalPrice(childPrice)}
          youthPrice={formatsTotalPrice(youthPrice)}
          duration={duration}
          tourImage={tourImage}
          tourID={tourID}
          agentRef={agentRef}
          currentCurrency={currentCurrency}
          realPrice={realPrice}
          realAdultPrice={realAdultPrice}
          realChildPrice={realChildPrice}
          realYouthPrice={realYouthPrice}
          tourType={tourType}
          logoUrl={logoUrl}
        />
      )}
    </>
  );
};

export default BookingSummaryForRegularTour;
