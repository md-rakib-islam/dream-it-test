"use client";

import { useState } from "react";
// import styles from "./calendar.module.css";

const ParticipantsForRegularTour = ({
  onCountChange,
  adultPrice,
  childPrice,
  youthPrice,
  currentCurrency,
}) => {
  const [participants, setParticipants] = useState({
    child: 0,
    adult: 1,
    youth: 0,
  }); // Set adult to 1 by default

  const updateCount = (type, increment) => {
    const newCounts = { ...participants };
    switch (type) {
      case "child":
        newCounts.child = Math.max(0, newCounts.child + increment);
        break;
      case "adult":
        newCounts.adult = Math.max(0, newCounts.adult + increment); // Ensure at least 1 adult
        break;
      case "youth":
        newCounts.youth = Math.max(0, newCounts.youth + increment);
        break;
    }
    setParticipants(newCounts);
    onCountChange(newCounts);
  };

  return (
    <>
      <h2 className="ParticipantsectionTitle">Participants</h2>

      <div className="participantsWrapper">
        {/* Adult */}
        <div className="participantType">
          <div className="participantInfo">
            <div className="participantLabel">Adult</div>
            <div className="ageRange">Age 18 - 65</div>
            <div className="price">
              {currentCurrency?.symbol}
              {adultPrice}
            </div>
          </div>
          <div className="counterControls">
            <button
              className="counterButton"
              onClick={() => updateCount("adult", -1)}
              disabled={participants.adult === 0} // Prevent going below 0
            >
              <span className="buttonIcon">−</span>
            </button>
            <span className="counterValue">{participants.adult}</span>
            <button
              className="counterButton"
              onClick={() => updateCount("adult", 1)}
            >
              <span className="buttonIcon">+</span>
            </button>
          </div>
        </div>

        {/* Youth */}
        {youthPrice > 0 && (
          <div className="participantType">
            <div className="participantInfo">
              <div className="participantLabel">Youth</div>
              <div className="ageRange">Age 13 - 17</div>
              <div className="price">
                {currentCurrency?.symbol}
                {youthPrice}
              </div>
            </div>
            <div className="counterControls">
              <button
                className="counterButton"
                onClick={() => updateCount("youth", -1)}
                disabled={participants.youth === 0}
              >
                <span className="buttonIcon">−</span>
              </button>
              <span className="counterValue">{participants.youth}</span>
              <button
                className="counterButton"
                onClick={() => updateCount("youth", 1)}
              >
                <span className="buttonIcon">+</span>
              </button>
            </div>
          </div>
        )}

        {/* Child */}
        {childPrice > 0 && (
          <div className="participantType">
            <div className="participantInfo">
              <div className="participantLabel">Child</div>
              <div className="ageRange">Age 2 - 12</div>
              <div className="price">
                {currentCurrency?.symbol}
                {childPrice}
              </div>
            </div>
            <div className="counterControls">
              <button
                className="counterButton"
                onClick={() => updateCount("child", -1)}
                disabled={participants.child === 0}
              >
                <span className="buttonIcon">−</span>
              </button>
              <span className="counterValue">{participants.child}</span>
              <button
                className="counterButton"
                onClick={() => updateCount("child", 1)}
              >
                <span className="buttonIcon">+</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ParticipantsForRegularTour;
