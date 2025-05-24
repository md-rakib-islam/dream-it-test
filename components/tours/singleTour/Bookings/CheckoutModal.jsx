"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { countries } from "./countries";

import { BASE_URL_AGENT_BOOKING } from "@/constant/constants";
import RenderReviewStep from "./renderReviewStep";

// Add this CSS to ensure error messages are visible
const errorMessageStyle = {
  color: "#e53935",
  fontSize: "12px",
  fontWeight: "bold",
  marginTop: "5px",
  display: "block",
};

const CheckoutModal = ({
  isOpen,
  onClose,
  tourName,
  selectedDate,
  selectedTime,
  total,
  participants,
  duration,
  tourID,
  tourImage,
  agentRef,
  currentCurrency,
  logoUrl,
  tourType,
  adultPrice,
  childPrice,
  youthPrice,
  price,
}) => {
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();
  const agentCup = searchParams.get("agentCup");
  const payWithStripe = true;
  const payWithCash = false;
  const is_agent = false;
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "IT",
    dial_code: "+39",
    flag: "it",
    name: "Itlay",
    label: "Italy",
    value: "+39",
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+39", // Set the default country code
    newsletter: false,
    gender: "",
    nationality: "",
    acceptTerms: false,
  });
  const [showDetails, setShowDetails] = useState(true);
  const [phoneError, setPhoneError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Create refs for error message elements
  const firstNameErrorRef = useRef(null);
  const lastNameErrorRef = useRef(null);
  const emailErrorRef = useRef(null);
  const phoneErrorRef = useRef(null);

  // Define validatePhone function before using it in useEffect
  const validatePhone = (phoneNumber) => {
    // Very basic validation - just make sure there are digits after the country code
    // This is a simplified approach that should work for most cases
    const hasCountryCode = phoneNumber.startsWith("+");
    const digitsAfterCode = phoneNumber.replace(/[^0-9]/g, "").length;

    // Phone is valid if it has a country code and at least 5 digits total
    const isValid = hasCountryCode && digitsAfterCode >= 9;

    setPhoneError(!isValid);
    return isValid;
  };

  // Validate form whenever relevant fields change
  useEffect(() => {
    const isPhoneValid = validatePhone(formData.phone);
    const areRequiredFieldsFilled =
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "" &&
      setIsFormValid(isPhoneValid);
  }, [formData]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Special handling for date of birth to format as D/M/YYYY
    if (name === "dateOfBirth" && type === "date") {
      const date = new Date(value);
      const formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      setFormData((prev) => ({
        ...prev,
        [name]: formattedDate,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Hide error message when user types
    if (name === "firstName" && firstNameErrorRef.current) {
      firstNameErrorRef.current.style.display = "none";
    } else if (name === "lastName" && lastNameErrorRef.current) {
      lastNameErrorRef.current.style.display = "none";
    } else if (name === "email" && emailErrorRef.current) {
      emailErrorRef.current.style.display = "none";
    }

    // Validate phone when it changes
    if (name === "phone") {
      validatePhone(value);
      if (phoneErrorRef.current) {
        phoneErrorRef.current.style.display = validatePhone(value)
          ? "none"
          : "block";
      }
    }
  };

  const handleCountryChange = (e) => {
    const country = countries.find((c) => c.code === e.target.value);
    setSelectedCountry({
      ...country,
      label: country.label,
    });

    // Update phone with new country code
    const currentPhone = formData.phone;
    const oldCountryCode = selectedCountry.value;

    // Extract just the phone number without the country code
    let phoneWithoutCode = "";
    if (currentPhone.startsWith(oldCountryCode)) {
      phoneWithoutCode = currentPhone.substring(oldCountryCode.length).trim();
    } else {
      // If we can't find the old country code at the start, just use everything after the "+"
      const plusIndex = currentPhone.indexOf("+");
      if (plusIndex !== -1) {
        phoneWithoutCode = currentPhone.substring(plusIndex + 1).trim();
        // Remove any digits that might be part of the country code
        phoneWithoutCode = phoneWithoutCode.replace(/^\d+\s*/, "");
      }
    }

    // Construct new phone number with new country code
    const newPhone =
      country.value + (phoneWithoutCode ? " " + phoneWithoutCode : "");

    console.log("Phone update:", {
      oldPhone: currentPhone,
      oldCountryCode,
      phoneWithoutCode,
      newPhone,
      newCountryCode: country.value,
    });

    setFormData((prev) => ({
      ...prev,
      phone: newPhone,
    }));

    // Validate phone with new country code
    validatePhone(newPhone);
    if (phoneErrorRef.current) {
      phoneErrorRef.current.style.display = validatePhone(newPhone)
        ? "none"
        : "block";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty required fields
    const isFirstNameEmpty = formData.firstName.trim() === "";
    const isLastNameEmpty = formData.lastName.trim() === "";
    const isEmailEmpty = formData.email.trim() === "";
    const isPhoneValid = validatePhone(formData.phone);

    // Show/hide error messages using direct DOM manipulation
    if (firstNameErrorRef.current) {
      firstNameErrorRef.current.style.display = isFirstNameEmpty
        ? "block"
        : "none";
    }
    if (lastNameErrorRef.current) {
      lastNameErrorRef.current.style.display = isLastNameEmpty
        ? "block"
        : "none";
    }
    if (emailErrorRef.current) {
      emailErrorRef.current.style.display = isEmailEmpty ? "block" : "none";
    }

    if (phoneErrorRef.current) {
      phoneErrorRef.current.style.display = !isPhoneValid ? "block" : "none";
    }

    console.log("Form validation:", {
      isFirstNameEmpty,
      isLastNameEmpty,
      isEmailEmpty,

      isPhoneValid,
    });

    // If any required field is empty or phone is invalid, don't proceed
    if (isFirstNameEmpty || isLastNameEmpty || isEmailEmpty || !isPhoneValid) {
      console.log("Form validation failed");
      return;
    }

    // All validation passed, proceed to next step
    console.log("Form validation passed, proceeding to step 2");
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSecureCheckout = async (
    discountedFinalPrice = null,
    couponPercentage = 0,
    couponApplied = false,
    coupon_text = null,
    coupon_discount = 0
  ) => {
    const formattedDate = formatDate(selectedDate);
    const finalTotal = discountedFinalPrice;

    const checkoutData = {
      ...formData,
      tourName,
      selectedDate: formattedDate,
      selectedTime,
      discountedtotalprice: finalTotal, // Use the discounted price if available
      total: total, // Keep the original total for reference
      participants,
      duration,
      selectedCountry,
      tourImage,
      tourID,
      agentRef,
      currentCurrency,
      is_agent,
      payWithStripe,
      couponPercentage,
      couponApplied,
      coupon_text: coupon_text === "" ? null : coupon_text, // Set to null if empty
      coupon_discount: coupon_discount === "" ? null : coupon_discount, // Set to null if empty
      payWithCash,
      tourType,
      adultPrice,
      childPrice,
      youthPrice,
      price,
    };

    try {
      const response = await fetch(
        `${BASE_URL_AGENT_BOOKING}/payments/api/v1/stripe/payment/checkout/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(checkoutData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.session_url) {
        window.location.href = result.session_url;

        // Construct the URL with both agentRef and agentCup if they exist
        let url = "/";
        if (agentRef) {
          url += `?agentRef=${agentRef}`;
        }
        if (agentCup) {
          // If agentRef is already present, append agentCup with "&"
          url += agentRef ? `&agentCup=${agentCup}` : `?agentCup=${agentCup}`;
        }

        // Redirect to the constructed URL
        // window.location.href = url;
      } else {
        console.error("Unexpected response format: missing URL");
        alert("An error occurred during checkout. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred during checkout. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const formatTime = (time) => {
    if (!time) return "";
    return time;
  };

  // Calculate max date (must be at least 18 years old)
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const maxDateString = maxDate.toISOString().split("T")[0];

  // Render price breakdown based on tour type
  const renderPriceBreakdown = () => {
    return (
      <>
        {showDetails && (
          <>
            {participants?.adult > 0 && (
              <div className="totalRow">
                <span>Adult × {participants?.adult}</span>
                <span>
                  {currentCurrency?.symbol}
                  {(participants.adult * Number(adultPrice)).toFixed(2)}
                </span>
              </div>
            )}
            {participants?.youth > 0 && (
              <div className="totalRow">
                <span>Child × {participants?.youth}</span>
                <span>
                  {currentCurrency?.symbol}
                  {(participants.youth * Number(youthPrice)).toFixed(2)}
                </span>
              </div>
            )}
            {participants?.child > 0 && (
              <div className="totalRow">
                <span>Infant × {participants?.child}</span>
                <span>
                  {currentCurrency?.symbol}
                  {(participants.child * Number(childPrice)).toFixed(2)}
                </span>
              </div>
            )}
          </>
        )}

        <button
          className="toggleButton"
          onClick={() => setShowDetails(!showDetails)}
        >
          Show {showDetails ? "less" : "more"}
        </button>
      </>
    );
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="modalHeader">
          <div className="headerContent">
            <Image
              unoptimized
              quality={100}
              style={{ width: "60px", height: "60px" }}
              src={logoUrl || "/placeholder.svg"}
              width={128}
              height={128}
              alt="Dream Tourism SRLS"
              priority={true}
            />
            <div className="progressContainer">
              <div className="progressBar">
                <div className="progressStep">
                  <span className={`stepText ${step >= 1 ? "active" : ""}`}>
                    Contact details
                  </span>
                  <div className={`stepNumber ${step >= 1 ? "active" : ""}`}>
                    1
                  </div>
                </div>
                <div className="progressLine">
                  <div className={`line ${step === 2 ? "active" : ""}`}></div>
                </div>
                <div className="progressStep">
                  <span className={`stepText ${step === 2 ? "active" : ""}`}>
                    Review
                  </span>
                  <div className={`stepNumber ${step === 2 ? "active" : ""}`}>
                    2
                  </div>
                </div>
              </div>
            </div>
            <div className="circularProgress">
              <div className="progressRing"></div>
              <div
                className={`$progressRingFill ${step === 2 ? "step2" : ""}`}
              ></div>
              <div className="progressText">{step} of 2</div>
            </div>

            <div className="headerRight">
              <button onClick={onClose} className="closeButton">
                <i className="icon icon-close text-16 text-dark"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="modalBody">
          {step === 1 ? (
            <>
              <div className="formSection">
                <h2 className="formTitle">Main traveller's contact details</h2>

                <form onSubmit={handleSubmit}>
                  <div className="fromborder">
                    <div className="formGrid">
                      <div className="formGroup">
                        <label>
                          First name <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                        <div
                          ref={firstNameErrorRef}
                          className="errorMessage"
                          style={{ ...errorMessageStyle, display: "none" }}
                        >
                          First name is required
                        </div>
                      </div>
                      <div className="formGroup">
                        <label>
                          Last name <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                        <div
                          ref={lastNameErrorRef}
                          className="errorMessage"
                          style={{ ...errorMessageStyle, display: "none" }}
                        >
                          Last name is required
                        </div>
                      </div>
                      <div className="formGroup">
                        <label>
                          Your email address <span className="required">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                        <div
                          ref={emailErrorRef}
                          className="errorMessage"
                          style={{ ...errorMessageStyle, display: "none" }}
                        >
                          Email address is required
                        </div>
                      </div>
                      <div className="formGroup">
                        <label>
                          Phone number <span className="required">*</span>
                        </label>
                        <div className="phoneInput">
                          <div className="countrySelect">
                            <div className="flagContainer">
                              <img
                                loading="lazy"
                                width="20"
                                src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png 2x`}
                                alt=""
                              />
                            </div>
                            <span className="selectedCountryCode">
                              {selectedCountry.code}
                            </span>
                            <select
                              value={selectedCountry.code}
                              onChange={handleCountryChange}
                              className="countrySelect"
                            >
                              {countries.map((country) => (
                                <option key={country.code} value={country.code}>
                                  {`${country.label} (${country.value})`}
                                </option>
                              ))}
                            </select>
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            placeholder="Phone number"
                            className={phoneError ? "error" : ""}
                          />
                        </div>
                        <div
                          ref={phoneErrorRef}
                          className="errorMessage"
                          style={{
                            ...errorMessageStyle,
                            display: phoneError ? "block" : "none",
                          }}
                        >
                          Please enter a valid phone number with country code
                        </div>
                      </div>
                    </div>

                    <div className="newsletterCheckbox">
                      <input
                        type="checkbox"
                        id="newsletter"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="newsletter">
                        Email me with news and offers
                      </label>
                    </div>

                    <div className="formGrid">
                      {/* <div className="formGroup">
                        <label>
                          Gender <span className="required">*</span>
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        <div
                          ref={genderErrorRef}
                          className="errorMessage"
                          style={{ ...errorMessageStyle, display: "none" }}
                        >
                          Please select a gender
                        </div>
                      </div>
                      <div className="formGroup">
                        <label>
                          Nationality <span className="required">*</span>
                        </label>
                        <select
                          name="nationality"
                          value={formData.nationality || "Italy"} // Default to Italy if empty
                          onChange={handleInputChange}
                          required
                        >
                          {countries.map((country) => (
                            <option key={country.label} value={country.label}>
                              {country.label}
                            </option>
                          ))}
                        </select>
                        <div
                          ref={nationalityErrorRef}
                          className="errorMessage"
                          style={{ ...errorMessageStyle, display: "none" }}
                        >
                          Nationality is required
                        </div>
                      </div> */}
                      {/* <div className="formGroup">
                        <label>Date of birth</label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          max={maxDateString}
                          onChange={handleInputChange}
                          className="dateInput"
                        />
                      </div>
                      <div className="formGroup">
                        <label>Passport ID</label>
                        <input
                          type="text"
                          name="passportId"
                          value={formData.passportId}
                          onChange={handleInputChange}
                        />
                      </div> */}
                    </div>
                  </div>

                  <div className="formFooter">
                    <div className="terms">
                      <Link href="/terms-and-conditions">
                        Terms And Conditions
                      </Link>
                      <Link href="/cancellation-policy">
                        Cancellation Policy
                      </Link>
                    </div>
                    <button type="submit" className="continueButton">
                      Continue
                    </button>
                  </div>
                </form>
              </div>
              <div className="orderSummary">
                <div className="orderDetails">
                  <h3>{tourName}</h3>
                  <p>
                    {formatDate(selectedDate)} - {formatTime(selectedTime)}
                  </p>
                  <div className="orderTotal">
                    {renderPriceBreakdown()}
                    <div className="totalRow">
                      <span>Total ({currentCurrency?.name || "GBP"})</span>
                      <span>
                        {currentCurrency?.symbol}
                        {total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <RenderReviewStep
              handleBack={handleBack}
              tourName={tourName}
              tourImage={tourImage}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              participants={participants}
              duration={duration}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSecureCheckout={handleSecureCheckout}
              onClose={onClose}
              showDetails={showDetails}
              setShowDetails={setShowDetails}
              total={total}
              currentCurrency={currentCurrency}
              is_agent={is_agent}
              payWithStripe={payWithStripe}
              tourID={tourID}
              logoUrl={logoUrl}
              tourType={tourType}
              adultPrice={adultPrice}
              childPrice={childPrice}
              youthPrice={youthPrice}
              price={price}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
