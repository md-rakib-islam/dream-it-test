"use client";

import { useState, useEffect } from "react";
// import styles from "./calendar.module.css";

const Participants = ({
  onCountChange,
  pricingList,
  currentCurrency,
  minRequired,
  maxAllowed,
}) => {
  const [participantCount, setParticipantCount] = useState(1);
  const [hasValidPrice, setHasValidPrice] = useState(false);

  // Find the applicable price tier based on participant count
  const findApplicablePrice = (count) => {
    if (!pricingList || pricingList.length === 0) return null;

    // Check if there's an exact match for the participant count
    const exactMatch = pricingList.find((item) => item.person === count);
    if (exactMatch) {
      return exactMatch;
    }

    // If no exact match, return null to indicate no price is available
    return null;
  };

  // Get all available participant counts from the pricing list
  const getAvailableParticipantCounts = () => {
    if (!pricingList || pricingList.length === 0) return [];
    return pricingList.map((item) => item.person).sort((a, b) => a - b);
  };

  // Update price when participant count changes
  useEffect(() => {
    const applicablePricing = findApplicablePrice(participantCount);
    const hasPrice = !!applicablePricing;

    // Update local state
    setHasValidPrice(hasPrice);

    // Only call onCountChange if we have a valid price
    if (hasPrice) {
      onCountChange({
        count: participantCount,
        price: applicablePricing.price,
        priceId: applicablePricing.id,
        pricingTier: applicablePricing.person,
        hasValidPrice: true,
      });
    } else {
      // If no applicable pricing found, still update with current count but null price
      onCountChange({
        count: participantCount,
        price: null,
        priceId: null,
        pricingTier: null,
        hasValidPrice: false,
      });
    }
  }, [participantCount, pricingList]); // Removed onCountChange from dependencies

  // Get available participant counts
  const availableCounts = getAvailableParticipantCounts();

  // // Get minimum required participants
  // const minRequired =
  //   availableCounts.length > 0 ? Math.min(...availableCounts) : null;

  // // Get maximum allowed participants
  // const maxAllowed =
  //   availableCounts.length > 0 ? Math.max(...availableCounts) : null;

  const updateCount = (increment) => {
    setParticipantCount((prevCount) => {
      const newCount = prevCount + increment;
      // Ensure count is at least 1 and at most maxAllowed + 1
      // return Math.max(1, Math.min(maxAllowed ? maxAllowed + 1 : 10, newCount));
      return newCount;
    });
  };

  // Format price with currency symbol
  const formatPrice = (price) => {
    if (!price) return "";
    return `${currentCurrency?.symbol || ""}${price}`;
  };

  // Get current applicable price
  const getCurrentPrice = () => {
    if (!pricingList || pricingList.length === 0) return null;

    const applicablePricing = findApplicablePrice(participantCount);

    return applicablePricing?.price;
  };

  // Debug logging to help diagnose issues

  return (
    <>
      <h2 className="ParticipantsectionTitle">Participants</h2>

      <div className="participantsWrapper">
        <div className="participantType">
          <div className="participantInfo">
            <div className="participantLabel">Participants</div>
          </div>

          <div className="counterControls">
            <button
              className="counterButton"
              onClick={() => updateCount(-1)}
              disabled={participantCount <= 1}
            >
              <span className="buttonIcon">−</span>
            </button>
            <span className="counterValue">{participantCount}</span>
            <button className="counterButton" onClick={() => updateCount(1)}>
              <span className="buttonIcon">+</span>
            </button>
          </div>
        </div>
        <div className={`price text-15`}>
          {hasValidPrice ? (
            <>
              <strong>{formatPrice(getCurrentPrice())}</strong>
              {getCurrentPrice() && " Per person"}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Participants;
