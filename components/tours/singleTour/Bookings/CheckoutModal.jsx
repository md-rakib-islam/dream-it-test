"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import styles from "./CheckoutModal.module.css";
import { countries } from "./countries";
import RenderReviewStep from "./renderReviewStep";
import { BASE_URL_AGENT_BOOKING } from "@/constant/constants";

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
}) => {
  const searchParams = new URLSearchParams(window.location.search);
  const agentCup = searchParams.get("agentCup");
  const payWithStripe = true;
  const payWithCash = false;
  const is_agent = false;
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "GB",
    dial_code: "+44",
    flag: "gb",
    name: "United Kingdom",
    label: "United Kingdom",
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+44", // Set the default country code
    newsletter: false,
    gender: "",
    nationality: "United Kingdom",
    dateOfBirth: "",
    passportId: "",
    acceptTerms: false,
  });
  const [showDetails, setShowDetails] = useState(false);

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
  };

  const handleCountryChange = (e) => {
    const country = countries.find((c) => c.code === e.target.value);
    setSelectedCountry({
      ...country,
      label: country.label,
    });
    setFormData((prev) => ({
      ...prev,
      phone: country.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    };
    console.log("Proceeding to secure checkout", { checkoutData });

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
      console.log("Checkout response:", result);

      if (result.session_url) {
        window.open(result.session_url, "_blank");

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
        window.location.href = url;
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

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="modalHeader">
          <div className="headerContent">
            <Image
              src="/img/Logo_150_px-01.webp"
              width={120}
              height={50}
              alt="Dream Tourism"
            />
            <div className="progressContainer">
              <div className="progressBar">
                <div className="progressStep">
                  <span className={`stepText ${step >= 1 ? "active" : ""}`}>
                    Contact details
                  </span>
                  <div
                    className={`stepNumber ${step >= 1 ? "active" : ""}
                    `}
                  >
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
                          />
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
                      <div className="formGroup">
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
                      </div>
                      <div className="formGroup">
                        <label>
                          Nationality <span className="required">*</span>
                        </label>
                        <select
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="United Kingdom">United Kingdom</option>
                          {/* Add more nationality options here */}
                        </select>
                      </div>
                      <div className="formGroup">
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
                      </div>
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
                    <div className="totalRow">
                      <span>
                        Group of {participants?.count || 0} participants
                      </span>
                      <span>
                        {currentCurrency?.symbol}
                        {total.toFixed(2)}
                      </span>
                    </div>
                    <div className="totalRow">
                      <span>Total (GBP)</span>
                      <span>
                        {currentCurrency?.symbol}
                        {total.toFixed(2)}
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
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
