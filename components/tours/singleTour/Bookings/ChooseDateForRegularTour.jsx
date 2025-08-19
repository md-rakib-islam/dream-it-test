"use client";

import { useState, useEffect } from "react";
// import styles from "./calendar.module.css";
import clsx from "clsx";
import { BASE_URL_AGENT_BOOKING } from "@/constant/constants";
import { modifiedCurrency } from "@/utils/modifiedCurrency";

const ChooseDateForRegularTour = ({
  onSelectionComplete,
  availableDates,
  price,
  currentCurrency,
  tourID,
  participants,
  available_times,
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
  const formatTotalPrice = (price) => {
    if (!price) return "";
    return `${currentCurrency?.symbol || ""}${modifiedCurrency(
      price,
      currentCurrency?.currency
    )}`;
  };

  // Function to fetch participants for a selected date
  const [availabilityError, setAvailabilityError] = useState("");
  const fetchParticipantsForDate = async (date) => {
    if (!date || !tourID) return;

    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    setIsLoadingParticipants(true);
    setAvailabilityError(""); // Clear any previous error

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
            participants_count: getTotalParticipants() || 0, // Include participants count
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Update state with the fetched participants
        setDateParticipants((prev) => ({
          ...prev,
          [formattedDate]: data.participants,
        }));

        // Check if there are enough spots available
        const currentParticipants = data.participants || 0;
        const actualSpots = maxParticipantsAllowed - currentParticipants;

        if (participants && participants.count > actualSpots) {
          setAvailabilityError(
            `Not enough spots available. You requested ${participants.count} spots, but only ${actualSpots} are available.`
          );
        }
      } else {
        console.error("Failed to fetch participants:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching participants:", error);
    } finally {
      setIsLoadingParticipants(false);
    }
  };

  // Get actual available spots for a date

  const getActualAvailableSpots = (date) => {
    if (!date) return maxParticipantsAllowed;

    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    const bookedParticipants = dateParticipants[formattedDate] || 0;
    return maxParticipantsAllowed - bookedParticipants;
  };

  // Get displayed available spots (with marketing logic)
  const getDisplayedAvailableSpots = (date) => {
    const actualSpots = getActualAvailableSpots(date);

    // Get total participants requested
    const totalParticipantsRequested = getTotalParticipants();
    const hasEnoughSpots = actualSpots >= totalParticipantsRequested;

    // If there are 0 spots available, show sold out
    if (actualSpots <= 0) {
      return {
        spots: 0,
        isLimited: false,
        isUrgent: false,
        isSoldOut: true,
        hasEnoughSpots: false,
        totalParticipantsRequested,
      };
    }

    // If there are between 1-5 spots available, show the actual number and mark as urgent
    if (actualSpots <= 5) {
      return {
        spots: actualSpots,
        isLimited: true,
        isUrgent: true,
        isSoldOut: false,
        hasEnoughSpots,
        totalParticipantsRequested,
      };
    }

    // If there are between 6-19 spots available, show the actual number
    if (actualSpots < 20) {
      return {
        spots: actualSpots,
        isLimited: false,
        isUrgent: false,
        isSoldOut: false,
        hasEnoughSpots,
        totalParticipantsRequested,
      };
    }

    // If spots are less than 30% of max, show "limited availability" with inflated number
    if (actualSpots < maxParticipantsAllowed * 0.3) {
      const inflatedSpots = Math.min(
        actualSpots + 5,
        maxParticipantsAllowed - 10
      );
      return {
        spots: inflatedSpots,
        isLimited: true,
        isUrgent: false,
        isSoldOut: false,
        hasEnoughSpots,
        totalParticipantsRequested,
      };
    }

    // For all other cases (30% or more of max available), just show the actual number
    return {
      spots: actualSpots,
      isLimited: false,
      isUrgent: false,
      isSoldOut: false,
      hasEnoughSpots,
      totalParticipantsRequested,
    };
  };

  // State initialization
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimeSelection, setShowTimeSelection] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date()); // Start with current month
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [dateParticipants, setDateParticipants] = useState({});
  const [isLoadingParticipants, setIsLoadingParticipants] = useState(false);
  const [maxParticipantsAllowed, setMaxParticipantsAllowed] = useState(50); // Default max participants

  // Set the initial date once availableDates is available
  useEffect(() => {
    if (availableDates && availableDates.length > 0) {
      setCurrentDate(getInitialDate());
    }
  }, [availableDates]); // Only run when availableDates changes

  const timeSlots = available_times;

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

    // Fetch participants for the selected date
    fetchParticipantsForDate(localDate);

    if (timeSlots.length === 1) {
      setSelectedTime(timeSlots[0]);
    } else {
      setSelectedTime(null);
    }
  };

  // Calculate total number of participants
  const getTotalParticipants = () => {
    if (!participants) return 0;

    // If participants is an object with child, adult, youth properties
    if (
      participants.child !== undefined ||
      participants.adult !== undefined ||
      participants.youth !== undefined
    ) {
      return (
        (participants.child || 0) +
        (participants.adult || 0) +
        (participants.youth || 0)
      );
    }

    // If participants has a count property
    if (participants.count !== undefined) {
      return participants.count;
    }

    return 0;
  };

  useEffect(() => {
    if (selectedDate) {
      const actualAvailableSpots = getActualAvailableSpots(selectedDate);
      const totalParticipantsRequested = getTotalParticipants();
      const hasEnoughSpots = actualAvailableSpots >= totalParticipantsRequested;

      onSelectionComplete({
        date: selectedDate,
        time: selectedTime, // This can be null
        price: price,
        availableSpots: actualAvailableSpots,
        canBook: hasEnoughSpots,
        hasEnoughSpots,
        totalParticipantsRequested,
      });
    }
  }, [
    selectedDate,
    selectedTime,
    price,
    onSelectionComplete,
    dateParticipants,
  ]);

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
    const availabilityInfo = getDisplayedAvailableSpots(selectedDate);
    const formattedDate = selectedDate
      ? `${selectedDate.getFullYear()}-${String(
          selectedDate.getMonth() + 1
        ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
      : "";
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

          {isLoadingParticipants ? (
            <div className="loadingIndicator">Loading availability...</div>
          ) : (
            <>
              <div className="availabilityInfo">
                {availabilityInfo.isSoldOut ? (
                  <span
                    className="availableSpots"
                    style={{
                      color: "#e53935",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Sold out for this date!
                  </span>
                ) : availabilityInfo.isUrgent ? (
                  <span
                    className="availableSpots"
                    style={{
                      color: "#e53935",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Only {availabilityInfo.spots} spots left! Book now to secure
                    your place.
                  </span>
                ) : availabilityInfo.isLimited ? (
                  <span
                    className="availableSpots"
                    style={{
                      color: "#ff9800",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Limited availability! Only {availabilityInfo.spots} spots
                    left.
                  </span>
                ) : (
                  <span
                    className="availableSpots"
                    style={{ color: "#4caf50", textAlign: "center" }}
                  >
                    {availabilityInfo.spots} spots available out of{" "}
                    {maxParticipantsAllowed}
                  </span>
                )}

                {dateParticipants[formattedDate] > 0 &&
                  !availabilityInfo.isSoldOut && (
                    <span
                      className="bookedSpots"
                      style={{
                        color: "#666",
                        marginTop: "4px",
                        display: "block",
                        textAlign: "center",
                      }}
                    >
                      {availabilityInfo.isUrgent || availabilityInfo.isLimited
                        ? "Booking quickly - don't miss out!"
                        : `${dateParticipants[formattedDate]} already booked`}
                    </span>
                  )}
              </div>

              {availabilityError && (
                <div
                  className="availabilityError"
                  style={{
                    color: "#e53935",
                    fontWeight: "bold",
                    marginTop: "10px",
                    padding: "8px",
                    backgroundColor: "#ffebee",
                    borderRadius: "4px",
                  }}
                >
                  {availabilityError}
                </div>
              )}
              {availabilityInfo.hasEnoughSpots === false && (
                <div
                  className="availabilityError"
                  style={{
                    color: "#e53935",
                    fontWeight: "bold",
                    marginTop: "10px",
                    padding: "8px",
                    backgroundColor: "#ffebee",
                    borderRadius: "4px",
                  }}
                >
                  Not enough spots available. You requested{" "}
                  {availabilityInfo.totalParticipantsRequested} spots, but only{" "}
                  {availabilityInfo.spots} are available.
                </div>
              )}

              <div className="timeGrid">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    className={clsx("timeSlot", {
                      ["timeSlotSelected"]: selectedTime === time,
                    })}
                    onClick={() => handleTimeClick(time)}
                    disabled={
                      timeSlots.length === 1 || availabilityInfo.isSoldOut
                    }
                  >
                    <span
                      className="availabilityIndicator"
                      style={{
                        backgroundColor: availabilityInfo.isSoldOut
                          ? "#e53935"
                          : availabilityInfo.isUrgent
                          ? "#ff9800"
                          : "#4caf50",
                      }}
                    ></span>
                    {time}
                  </button>
                ))}
              </div>
            </>
          )}

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
          <button
            className="monthButton"
            onClick={() => changeMonth(-1)}
            aria-label="Previous Month"
          >
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

          <button
            className="monthButton"
            onClick={() => changeMonth(1)}
            aria-label="Next Month"
          >
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
                        <span className="datePrice">
                          {formatTotalPrice(price)}
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

export default ChooseDateForRegularTour;
