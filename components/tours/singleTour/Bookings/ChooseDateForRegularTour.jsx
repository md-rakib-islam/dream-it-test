"use client";

import { useState, useEffect } from "react";
// import styles from "./calendar.module.css";
import clsx from "clsx";

const ChooseDateForRegularTour = ({
  onSelectionComplete,
  availableDates,
  price,
  currentCurrency,
}) => {
  // Initialize calendar to show the month of the first available date
  const getInitialDate = () => {
    // Default to current month
    const defaultDate = new Date();
    defaultDate.setDate(1); // First day of current month

    // If no available dates, return default
    if (
      !availableDates ||
      !Array.isArray(availableDates) ||
      availableDates.length === 0
    ) {
      return defaultDate;
    }

    try {
      // Get today for comparison
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Find the earliest future date
      let earliestFutureDate = null;

      for (let i = 0; i < availableDates.length; i++) {
        const date = availableDates[i];
        if (date && date instanceof Date) {
          // Create a clean date for comparison (no time)
          const cleanDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          );
          const cleanToday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
          );

          if (cleanDate >= cleanToday) {
            if (!earliestFutureDate || cleanDate < earliestFutureDate) {
              earliestFutureDate = cleanDate;
            }
          }
        }
      }

      if (earliestFutureDate) {
        // Create a date for the first day of the month of the earliest future date
        const result = new Date(
          earliestFutureDate.getFullYear(),
          earliestFutureDate.getMonth(),
          1
        );

        return result;
      }
    } catch (error) {
      console.error("Error finding earliest future date:", error);
    }

    return defaultDate;
  };
  // console.log("availableDates", availableDates);
  // State initialization
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimeSelection, setShowTimeSelection] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date()); // Start with current month
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  // Set the initial date once availableDates is available
  useEffect(() => {
    if (availableDates && availableDates.length > 0) {
      setCurrentDate(getInitialDate());
    }
  }, [availableDates]); // Only run when availableDates changes

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
        price: price,
      });
    }
  }, [selectedDate, selectedTime, price, onSelectionComplete]);

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
      price: price,
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

    // Create clean date objects for comparison (no time component)
    const cleanDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const cleanToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    if (cleanDate < cleanToday) return false;

    return availableDates.some((availableDate) => {
      // Ensure availableDate is a Date object
      const availableDateObj =
        availableDate instanceof Date ? availableDate : new Date(availableDate);

      return (
        availableDateObj.getDate() === date.getDate() &&
        availableDateObj.getMonth() === date.getMonth() &&
        availableDateObj.getFullYear() === date.getFullYear()
      );
    });
  };

  // Check if there are any available dates in the current month
  const hasAvailableDatesInMonth = () => {
    if (
      !availableDates ||
      !Array.isArray(availableDates) ||
      availableDates.length === 0
    )
      return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cleanToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return availableDates.some((date) => {
      // Ensure date is a Date object
      const dateObj = date instanceof Date ? date : new Date(date);

      // Create clean date for comparison
      const cleanDate = new Date(
        dateObj.getFullYear(),
        dateObj.getMonth(),
        dateObj.getDate()
      );

      return (
        dateObj.getMonth() === currentDate.getMonth() &&
        dateObj.getFullYear() === currentDate.getFullYear() &&
        cleanDate >= cleanToday
      );
    });
  };

  // Check if a specific month has available dates
  const hasAvailableDatesInSpecificMonth = (year, month) => {
    if (
      !availableDates ||
      !Array.isArray(availableDates) ||
      availableDates.length === 0
    )
      return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cleanToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return availableDates.some((date) => {
      // Ensure date is a Date object
      const dateObj = date instanceof Date ? date : new Date(date);

      // Create clean date for comparison
      const cleanDate = new Date(
        dateObj.getFullYear(),
        dateObj.getMonth(),
        dateObj.getDate()
      );

      return (
        dateObj.getMonth() === month &&
        dateObj.getFullYear() === year &&
        cleanDate >= cleanToday
      );
    });
  };

  // Format price with currency symbol
  const formatPrice = (price) => {
    if (!price) return "";
    return `${currentCurrency?.symbol || ""}${price}`;
  };

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
              <i className="icon-chevron-sm-down text-12 text-dark"></i>
            </div>

            {showMonthDropdown && (
              <div className="monthDropdown">
                {getMonthsToShow().map((date, index) => {
                  const hasAvailableDates = hasAvailableDatesInSpecificMonth(
                    date.getFullYear(),
                    date.getMonth()
                  );
                  return (
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
                      {hasAvailableDates && (
                        <span className="monthAvailabilityDot"></span>
                      )}
                    </div>
                  );
                })}
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

        {!hasAvailableDatesInMonth() ? (
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
                      {isAvailable && price && (
                        <span className="datePrice">{formatPrice(price)}</span>
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

export default ChooseDateForRegularTour;
