"use client";

import { useState, useEffect } from "react";
// import styles from "./BookingSummary.module.css";
import CheckoutModal from "./CheckoutModal";

const BookingSummary = ({
  selectedDate,
  selectedTime,
  participants,
  tourName,
  busId,
  duration,
  tourID,
  tourImage,
  agentRef,
  currentCurrency,
  isValidBooking,
  minRequired,
  maxAllowed,
  logoUrl,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMinParticipantsMet, setIsMinParticipantsMet] = useState(false);
  const [isMaxParticipantsExceeded, setIsMaxParticipantsExceeded] =
    useState(false);

  // Update validation state when participants change
  useEffect(() => {
    setIsMinParticipantsMet(participants?.count >= minRequired);
    setIsMaxParticipantsExceeded(participants?.count > maxAllowed);
  }, [participants, minRequired, maxAllowed]);

  // Calculate total price based on participant count and price per person
  const calculateTotal = () => {
    if (!participants || !participants.count || !participants.price) {
      return 0;
    }

    // Multiply participant count by price per person
    return participants.count * Number(participants.price);
  };

  const formatDate = (date) => {
    if (!date) return "";

    const options = {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);

    // Format to match "Wed 30 April 2025"
    const parts = formattedDate.split(", ");
    if (parts.length >= 2) {
      const dayPart = parts[0]; // "Wed"
      const restPart = parts[1].split(" "); // ["April", "30", "2025"]
      if (restPart.length >= 3) {
        return `${dayPart} ${restPart[1]} ${restPart[0]} ${restPart[2]}`;
      }
    }
    return formattedDate;
  };

  const formatTime = (time) => {
    if (!time) return "";
    // Extract just the time and ensure it's in 24-hour format with leading zero
    const timePart = time.replace(/\s*AM|\s*PM/i, "").trim();
    const [hours, minutes] = timePart.split(":");
    return `${hours.padStart(2, "0")}:${minutes}`;
  };

  // Format price with currency symbol
  const formatPrice = (price) => {
    if (!price) return "";
    return `€${Number(price).toFixed(2)}`;
  };

  // Format total price with currency symbol
  const formatTotalPrice = (price) => {
    if (!price) return "";
    return `€${Number(price).toFixed(2)}`;
  };

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="Bookingsection">
        <h2 className="BookingsectionTitle">Booking Summary</h2>

        <div className="ticketContainer">
          <div className="ticketLeft">
            <h3 className="tourTitle">{tourName}</h3>
            <div className="participantInfo">
              <strong>Participants:</strong> {participants?.count || 0}
              {isValidBooking && participants?.price && (
                <> x {formatPrice(participants?.price || 0)}</>
              )}
            </div>
          </div>

          <div className="ticketRight">
            <div className="timeDisplay">
              {isValidBooking ? formatTime(selectedTime) : "--:--"}
            </div>
            <div className="dateDisplay">
              {isValidBooking && selectedDate ? formatDate(selectedDate) : ""}
            </div>
            <div className="totalAmount">
              <span className="totalLabel">Total:</span>
              {isValidBooking
                ? formatTotalPrice(calculateTotal())
                : "Total: --"}
            </div>
          </div>
        </div>

        <button
          className="BookingcheckoutButton"
          disabled={!isValidBooking}
          onClick={handleCheckout}
        >
          {!isMinParticipantsMet
            ? `Minimum ${minRequired} participants required`
            : isMaxParticipantsExceeded
            ? `Maximum ${maxAllowed} participants allowed`
            : !selectedDate || !selectedTime
            ? "Please select date and time"
            : "Checkout"}
          <i className="icon icon-shopping-cart"></i>
        </button>
      </div>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tourName={tourName}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        total={calculateTotal()}
        participants={participants}
        duration={duration}
        tourImage={tourImage}
        tourID={tourID}
        agentRef={agentRef}
        currentCurrency={currentCurrency}
        logoUrl={logoUrl}
      />
    </>
  );
};

export default BookingSummary;
