"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// import styles from "./CheckoutModal.module.css";
import { BASE_URL_AGENT_BOOKING } from "@/constant/constants";

const RenderReviewStep = ({
  handleBack,
  tourName,
  tourImage,
  selectedDate,
  selectedTime,
  participants,
  duration,
  formData,
  handleInputChange,
  handleSecureCheckout,
  onClose,
  showDetails,
  setShowDetails,
  total,
  currentCurrency,
  is_agent,
  payWithStripe,
  tourID,
  logoUrl,
  tourType,
  adultPrice,
  childPrice,
  youthPrice,
  price,
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [couponStatus, setCouponStatus] = useState(""); // "success", "error", or ""
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountedFinalPrice, setDiscountedFinalPrice] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [appliedCouponType, setAppliedCouponType] = useState("");
  const [couponPercentage, setCouponPercentage] = useState(0);
  const [couponApplied, setCouponApplied] = useState(true);
  const [couponText, setCouponText] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Check for agentCup parameter in URL
    const searchParams = new URLSearchParams(window.location.search);
    const agentCup = searchParams.get("agentCup");

    if (agentCup) {
      setCouponCode(agentCup);
      // Automatically apply the coupon
      applyAgentCoupon(agentCup);
    } else {
      setCouponApplied(false);
    }
  }, []);

  const applyAgentCoupon = async (agentCupCode) => {
    setIsApplying(true);
    try {
      const response = await fetch(
        `${BASE_URL_AGENT_BOOKING}/member/api/v1/member/apply_coupon/?coupon_text=${agentCupCode}&tourID=${tourID}&total_price=${total}&currency=${currentCurrency?.symbol}`
      );

      const data = await response.json();

      if (response.ok && data.message.includes("Coupon applied successfully")) {
        setCouponStatus("success");
        setCouponMessage(`${data.message}`);
        setDiscountAmount(data.coupon_discount || 0);
        setDiscountedFinalPrice(Number(data.final_price));
        setAppliedCouponType(data.applied_coupon_type || "");
        setCouponPercentage(data.coupon_percentage || 0);
        setCouponApplied(true);
        setCouponText(data.coupon_text || "");
        setCouponDiscount(data.coupon_discount || 0);
      } else {
        setCouponStatus("error");
        setCouponMessage(data.message || "Invalid coupon code");
        setDiscountAmount(0);
        setDiscountedFinalPrice(null);
        setCouponApplied(false);
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      setCouponStatus("error");
      setCouponMessage("Failed to apply coupon. Please try again.");
      setDiscountAmount(0);
      setDiscountedFinalPrice(null);
      setCouponApplied(false);
    } finally {
      setIsApplying(false);
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

  const dateStr = selectedDate
    ? `${formatDate(selectedDate)} - ${formatTime(selectedTime)}`
    : "";

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
    if (couponMessage) {
      setCouponMessage("");
      setCouponStatus("");
    }
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponMessage("Please enter a coupon code");
      setCouponStatus("error");
      setCouponApplied(false);
      return;
    }

    setIsApplying(true);
    try {
      const response = await fetch(
        `${BASE_URL_AGENT_BOOKING}/member/api/v1/member/apply_coupon/?coupon_text=${couponCode}&tourID=${tourID}&total_price=${total}&currency=${currentCurrency?.symbol}`
      );

      const data = await response.json();

      if (response.ok && data.message.includes("Coupon applied successfully")) {
        setCouponStatus("success");
        setCouponMessage(`${data.message}`);
        setDiscountAmount(data.coupon_discount || 0);
        setDiscountedFinalPrice(Number(data.final_price));
        setAppliedCouponType(data.applied_coupon_type || "");
        setCouponPercentage(data.coupon_percentage || 0);
        setCouponApplied(true);
        setCouponText(data.coupon_text || "");
        setCouponDiscount(data.coupon_discount || 0);
      } else {
        setCouponStatus("error");
        setCouponMessage(data.message || "Invalid coupon code");
        setDiscountAmount(0);
        setDiscountedFinalPrice(null);
        setCouponApplied(false);
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      setCouponStatus("error");
      setCouponMessage("Failed to apply coupon. Please try again.");
      setDiscountAmount(0);
      setDiscountedFinalPrice(null);
      setCouponApplied(false);
    } finally {
      setIsApplying(false);
    }
  };

  const handleCheckoutWithDiscount = async () => {
    setIsProcessing(true);

    try {
      await handleSecureCheckout(
        discountedFinalPrice,
        couponPercentage,
        couponApplied,
        couponText,
        couponDiscount
      );
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const finalTotal =
    discountedFinalPrice !== null ? discountedFinalPrice : total;

  // Render price breakdown based on tour type
  const renderPriceBreakdown = () => {
    if (tourType === "regular_tour") {
      return (
        <>
          {participants?.adult > 0 && (
            <div className="columnValue">
              <span>Adult {participants?.adult}×</span>
              <span>
                {(participants.adult * Number(adultPrice)).toFixed(2)}
                {currentCurrency?.symbol}
              </span>
            </div>
          )}
          {participants?.youth > 0 && (
            <div className="columnValue">
              <span>Child {participants?.youth}×</span>
              <span>
                {(participants.youth * Number(youthPrice)).toFixed(2)}
                {currentCurrency?.symbol}
              </span>
            </div>
          )}
          {participants?.child > 0 && (
            <div className="columnValue">
              <span>Infant {participants?.child} ×</span>
              <span>
                {(participants.child * Number(childPrice)).toFixed(2)}
                {currentCurrency?.symbol}
              </span>
            </div>
          )}
        </>
      );
    } else {
      // Default to day_tour
      return (
        <div className="columnValue">
          <span>Total {participants?.count || 0} participants</span>
        </div>
      );
    }
  };

  return (
    <div className="reviewStep">
      <button onClick={handleBack} className="backButton">
        <i className="icon icon-chevron-left text-16 text-dark"></i>
        Back
      </button>

      <div className="reviewContent">
        <div className="leftColumn">
          <div className="bookingDetails">
            <h2 className="bookingTitle">You're booking</h2>

            <div className="tourCardR">
              <div className="tourImage">
                <Image
                  src={tourImage || "/placeholder.svg"}
                  alt={tourName}
                  width={500}
                  height={500}
                  className="tourImg"
                />
              </div>
              <div className="tourInfo">
                <h3>{tourName}</h3>
                <div className="tourDetailsTable">
                  <div className="detailColumn">
                    <div className="columnHeader">Travellers</div>
                    <div className="colomnValue">{renderPriceBreakdown()}</div>
                  </div>
                  <div className="detailColumn">
                    <div className="columnHeader">Departure</div>
                    <div className="columnValue">{dateStr}</div>
                  </div>
                  <div className="detailColumn">
                    <div className="columnHeader">Duration</div>
                    <div className="columnValue">{duration}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rightColumn">
          <div className="priceSummaryCard">
            <div className="summaryHeader">
              <div className="summaryTitle">
                <h3>{tourName}</h3>
                <button onClick={onClose} className="closeButton">
                  <i className="icon icon-close text-16 text-dark"></i>
                </button>
              </div>
              <div className="summaryDate">{dateStr}</div>
            </div>

            {showDetails && (
              <div className="priceBreakdown">
                <div className="columnHeader">
                  {renderPriceBreakdown()}
                  <span>
                    {currentCurrency?.symbol}
                    {total}
                  </span>
                </div>
              </div>
            )}

            <button
              className="toggleButton"
              onClick={() => setShowDetails(!showDetails)}
            >
              Show {showDetails ? "less" : "more"}
            </button>

            <div className="totalSection">
              <div className="priceRow">
                <span>Original Price</span>
                <span>
                  {currentCurrency?.symbol}
                  {total}
                </span>
              </div>

              <div className="priceRow finalTotal">
                <span>Total (GBP)</span>
                <span>
                  {currentCurrency?.symbol}
                  {finalTotal}
                </span>
              </div>

              {/* Coupon Section */}
              <div className="couponSection">
                <div className="couponInput">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={handleCouponChange}
                    className="couponField"
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={isApplying || !couponCode.trim()}
                    className="couponButton"
                  >
                    {isApplying ? "Applying..." : "Add Coupon"}
                  </button>
                </div>

                {couponMessage && (
                  <div className="couponMessage couponStatus">
                    {couponMessage}
                  </div>
                )}

                {/* {discountAmount > 0 && (
                  <div className="priceRow">
                    <span>Discount</span>
                    <span className="discountAmount">
                      -{currentCurrency?.symbol}
                      {discountAmount.toFixed(3)}
                    </span>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
        <div className="secureCheckoutSection">
          <div className="secureCheckout">
            <h2 className="checkoutTitle">Secure Checkout</h2>
            <div className="termsCheckbox">
              <div className="newsletterCheckbox">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                />
              </div>

              <label htmlFor="acceptTerms">
                I accept the{" "}
                <Link href="/terms-and-conditions" className="link">
                  terms and conditions
                </Link>{" "}
                and{" "}
                <Link href="/cancellation-policy" className="link">
                  cancellation policy
                </Link>
              </label>
            </div>
            <button
              className="checkoutButton"
              onClick={handleCheckoutWithDiscount}
              disabled={!formData.acceptTerms || isProcessing}
            >
              {isProcessing ? "Processing..." : "Proceed with Online Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderReviewStep;
