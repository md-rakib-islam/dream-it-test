"use client";

import { useState, useEffect } from "react";
// import styles from "./BookingSummary.module.css";
import CheckoutModal from "./CheckoutModal";

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
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayParticipants, setDisplayParticipants] = useState({
    adult: 1,
    youth: 0,
    child: 0,
    ...participants,
  });

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

  const handleCheckout = () => {
    setIsModalOpen(true);
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
              Adult: {adultCount} x {currentCurrency?.symbol}
              {Number(adultPrice || 0).toFixed(2)}
            </div>

            {displayParticipants?.youth > 0 && (
              <div className="participantInfo">
                Youth: {displayParticipants.youth} x {currentCurrency?.symbol}
                {Number(youthPrice || 0).toFixed(2)}
              </div>
            )}

            {displayParticipants?.child > 0 && (
              <div className="participantInfo">
                Child: {displayParticipants.child} x {currentCurrency?.symbol}
                {Number(childPrice || 0).toFixed(2)}
              </div>
            )}
          </div>

          <div className="ticketRight">
            <div className="timeDisplay">{selectedTime || "--:--"}</div>
            <div className="dateDisplay">
              {selectedDate ? formatDate(selectedDate) : ""}
            </div>
            <div className="totalAmount">
              <span className="totalLabel">Total:</span>
              <span>
                {currentCurrency?.symbol}
                {calculateTotal().toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <button
          className="checkoutButton"
          disabled={!selectedDate || !selectedTime || calculateTotal() === 0}
          onClick={handleCheckout}
        >
          Checkout
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
        participants={displayParticipants}
        adultPrice={adultPrice}
        childPrice={childPrice}
        youthPrice={youthPrice}
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
    </>
  );
};

export default BookingSummaryForRegularTour;
