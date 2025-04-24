"use client";

import { useState, useEffect } from "react";
// import styles from "./calendar.module.css";
import clsx from "clsx";

const ChooseDate = ({
  onSelectionComplete,
  availableDates,
  currentCurrency,
  currentPrice,
  participants,
  minRequired = null,
  maxAllowed = null,
}) => {
  // Initialize calendar to show the month of the first available date
  const getInitialDate = () => {
    if (availableDates && availableDates.length > 0) {
      // Sort dates to get the earliest one
      const sortedDates = [...availableDates].sort((a, b) => a - b);
      // Create a new date with the same month and year as the first available date
      return new Date(
        sortedDates[0].getFullYear(),
        sortedDates[0].getMonth(),
        1
      );
    }
    // Default to current month if no available dates
    return new Date();
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimeSelection, setShowTimeSelection] = useState(false);
  const [currentDate, setCurrentDate] = useState(getInitialDate);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  const timeSlots = ["07:30 AM"];

  const handleDateClick = (date) => {
    // Ensure the selected date is stored without any unintended timezone conversion
    const localDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      12
    ); // Add 12 hours to prevent UTC shift
    setSelectedDate(localDate);
    setShowTimeSelection(true);

    if (timeSlots.length === 1) {
      setSelectedTime(timeSlots[0]);
    } else {
      setSelectedTime(null);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      onSelectionComplete({
        date: selectedDate,
        time: selectedTime, // This can be null
        price: currentPrice,
      });
    }
  }, [selectedDate, selectedTime, currentPrice, onSelectionComplete]);

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleBackToCalendar = () => {
    setShowTimeSelection(false);
    setSelectedTime(null);

    // Notify parent component that time selection has been cleared
    onSelectionComplete({
      date: selectedDate,
      time: null,
      price: currentPrice,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const changeMonth = (increment) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + increment);
      return newDate;
    });
    setShowMonthDropdown(false);
  };

  // Check if minimum participants requirement is met
  const isMinParticipantsMet = minRequired
    ? participants?.count >= minRequired
    : true;

  // Check if maximum participants limit is exceeded
  const isMaxParticipantsExceeded = maxAllowed
    ? participants?.count > maxAllowed
    : false;

  // Check if the current participant count has a valid price
  const hasValidPrice = participants?.hasValidPrice === true;

  // Generate array of 12 months from current date
  const getMonthsToShow = () => {
    const today = new Date();
    const months = [];

    for (let i = 0; i < 12; i++) {
      const newDate = new Date(today.getFullYear(), today.getMonth() + i, 1);
      months.push(newDate);
    }

    return months;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById("month-dropdown-container");
      if (dropdown && !dropdown.contains(event.target)) {
        setShowMonthDropdown(false);
      }
    };

    if (showMonthDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMonthDropdown]);

  if (showTimeSelection) {
    return (
      <>
        <h2 className="CalendarsectionTitle">
          <button onClick={handleBackToCalendar} className="backButton">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          {formatDate(selectedDate)}
        </h2>

        <div className="timeSelectionWrapper">
          <h3 className="timeSelectionTitle">
            {timeSlots.length === 1 ? "Selected time" : "Choose a time"}
          </h3>

          <div className="timeGrid">
            {timeSlots.map((time) => (
              <button
                key={time}
                className={clsx("timeSlot", {
                  ["timeSlotSelected"]: selectedTime === time,
                })}
                onClick={() => handleTimeClick(time)}
                disabled={timeSlots.length === 1}
              >
                <span className={"availabilityIndicator"}></span>
                {time}
              </button>
            ))}
          </div>

          <button className="backToCalendarLink" onClick={handleBackToCalendar}>
            Back to calendar
          </button>
        </div>
      </>
    );
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const daysInMonth = getDaysInMonth(currentDate);

  const isDateAvailable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      date >= today &&
      availableDates.some(
        (availableDate) =>
          availableDate.getDate() === date.getDate() &&
          availableDate.getMonth() === date.getMonth() &&
          availableDate.getFullYear() === date.getFullYear()
      )
    );
  };

  // Check if there are any available dates in the current month
  const hasAvailableDatesInMonth = () => {
    if (!availableDates || availableDates.length === 0) return false;

    return availableDates.some(
      (date) =>
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
    );
  };

  // Format price with currency symbol
  const formatPrice = (price) => {
    if (!price) return "";
    return `${currentCurrency?.symbol || ""}${price}`;
  };

  // Debug logging to help diagnose issues
  console.log("Participants in ChooseDate:", participants);
  console.log("Has valid price in ChooseDate:", hasValidPrice);

  return (
    <>
      <h2 className="CalendarsectionTitle">Choose a date</h2>

      <div className="calendarWrapper">
        <div className="monthSelector">
          <button className="monthButton" onClick={() => changeMonth(-1)}>
            <i className="icon icon-chevron-left text-12 text-dark"></i>
          </button>

          <div id="month-dropdown-container" className="monthDropdownContainer">
            <div
              className="monthDisplay"
              onClick={() => setShowMonthDropdown(!showMonthDropdown)}
            >
              <span>
                {currentDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <i className={`icon-chevron-sm-down text-12 ml-10 text-dark`}></i>
            </div>

            {showMonthDropdown && (
              <div className="monthDropdown">
                {getMonthsToShow().map((date, index) => (
                  <div
                    key={index}
                    className={clsx("monthOption", {
                      ["activeMonth"]:
                        date.getMonth() === currentDate.getMonth() &&
                        date.getFullYear() === currentDate.getFullYear(),
                    })}
                    onClick={() => {
                      setCurrentDate(date);
                      setShowMonthDropdown(false);
                    }}
                  >
                    {date.toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="monthButton" onClick={() => changeMonth(1)}>
            <i className="icon icon-chevron-right text-12 text-dark"></i>
          </button>
        </div>

        <div className="weekDays">
          {weekDays.map((day) => (
            <div key={day} className="weekDay">
              {day}
            </div>
          ))}
        </div>

        {!isMinParticipantsMet ? (
          <div className="noAvailabilityMessage">
            <i className="fa-regular fa-user-group fa-lg mb-3 text-gray-500"></i>
            <p className="text-center">MIN. {minRequired} to Go</p>
          </div>
        ) : isMaxParticipantsExceeded ? (
          <div className="noAvailabilityMessage">
            <i className="fa-regular fa-users fa-lg mb-3 text-gray-500"></i>
            <p className="text-center">
              MAX. {maxAllowed} participants allowed
            </p>
          </div>
        ) : !hasValidPrice ? (
          <div className="noAvailabilityMessage">
            <i className="fa-regular fa-money-bill fa-lg mb-3 text-gray-500"></i>
            <p className="text-center">
              Your {participants?.count} participants has no price
            </p>
          </div>
        ) : !hasAvailableDatesInMonth() ? (
          <div className="noAvailabilityMessage">
            <i className="fa-regular fa-calendar fa-lg mb-3 text-gray-500"></i>
            <p className="text-center">
              Your selection is not available for this month
            </p>
          </div>
        ) : (
          <div className="calendarGrid">
            <div className="row g-1">
              {daysInMonth.map((date, index) => {
                if (!date) {
                  return (
                    <div key={`empty-${index}`} className="calendarCol"></div>
                  );
                }
                const isAvailable = isDateAvailable(date);
                return (
                  <div key={date.getTime()} className="calendarCol">
                    <button
                      className={clsx("calendarBtn", {
                        ["active"]:
                          selectedDate &&
                          selectedDate.getTime() === date.getTime(),
                        ["disabled"]: !isAvailable,
                      })}
                      onClick={() => isAvailable && handleDateClick(date)}
                      disabled={!isAvailable}
                    >
                      <span>{date.getDate()}</span>
                      {isAvailable && currentPrice && (
                        <span className="datePrice">
                          {formatPrice(currentPrice)}
                        </span>
                      )}
                      {isAvailable && <span className="availabilityDot"></span>}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-3 small text-muted">
          Showing prices in {currentCurrency?.name || "EUR (Euro)"}
        </div>
      </div>
    </>
  );
};

export default ChooseDate;
