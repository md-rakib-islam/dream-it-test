"use client";

import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BASE_URL_AGENT_BOOKING } from "@/constant/constants";
import { LayoutContext } from "@/app/LayoutProvider";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [memberDetails, setMemberDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const data = useContext(LayoutContext);
  const logoUrl = data?.logo ? data?.logo[0]?.cloudflare_favicon : "";

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      const payment_id = searchParams.get("payment_id");
      if (!payment_id) {
        setError("Payment ID not found");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${BASE_URL_AGENT_BOOKING}/payments/api/v1/success-full/payment_details/${payment_id}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch payment details");
        }
        const data = await response.json();
        // console.log(data);
        setPaymentDetails(data.payment_details);
        setMemberDetails(data.member_details);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [searchParams]);

  const agentCup = searchParams.get("agentCup");

  const getHref = (path) => {
    const params = new URLSearchParams();

    // Check if both agent_ref_no and coupon_text exist in memberDetails
    if (memberDetails?.agent_ref_no && paymentDetails?.coupon_text) {
      // Prioritize agentCup (coupon_text) if both exist
      params.append("agentCup", paymentDetails.coupon_text);
    } else {
      // Otherwise, add them individually if they exist

      // Check for agent_ref_no in memberDetails
      if (memberDetails?.agent_ref_no) {
        params.append("agentRef", memberDetails.agent_ref_no);
      }

      // Check for coupon_text in memberDetails
      if (paymentDetails?.coupon_text) {
        params.append("agentCup", paymentDetails.coupon_text);
      }
      // If no coupon_text in memberDetails, check URL params
      else if (agentCup) {
        params.append("agentCup", agentCup);
      }
    }

    const queryString = params.toString();
    return queryString ? `${path}?${queryString}` : path;
  };

  if (isLoading) {
    return <div className="text-center py-3">Loading payment details...</div>;
  }

  if (error) {
    return <div className="text-center py-3 text-danger">Error: {error}</div>;
  }

  return (
    <>
      <div className="header-margin"></div>
      <main className="main-content">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <div
                      className="text-success mx-auto"
                      style={{ maxWidth: "60px" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-100 h-auto"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9 12l2 2l4 -4" />
                      </svg>
                    </div>
                  </div>
                  <h1 className="h3 fw-bold text-success mb-3">
                    Payment Successful!
                  </h1>

                  <div className="mb-3">
                    <Image
                      src={logoUrl}
                      alt="Dream Tourism Logo"
                      width={120}
                      height={50}
                      className="img-fluid"
                    />
                  </div>

                  <p className="text-muted mb-4">
                    Thank you for booking with Dream Tourism. Your payment has
                    been processed successfully. A confirmation email has been
                    sent to your registered email address.
                  </p>

                  <div className="border-top border-bottom py-3 mb-3">
                    <div className="row">
                      <div className="col-6 border-end">
                        <div className="text-muted small">
                          Booking Reference
                        </div>
                        <div className="fw-bold">
                          {paymentDetails?.id || "N/A"}
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="text-muted small">Amount Paid</div>
                        <div className="fw-bold">
                          {paymentDetails?.currency?.symbol}
                          {paymentDetails?.amount || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    {/* <Link
                      href={getHref("/my-bookings")}
                      className="btn btn-primary"
                    >
                      View My Bookings
                    </Link> */}
                    <Link
                      href={getHref("/")}
                      className="btn btn-outline-secondary"
                    >
                      Return to Home
                    </Link>
                  </div>

                  <div className="mt-3">
                    <p className="small text-muted mb-0">
                      Having trouble?{" "}
                      <Link
                        href={getHref("/contact")}
                        className="text-decoration-none"
                      >
                        Contact our support team
                      </Link>
                    </p>
                  </div>

                  {/* Additional Order Details Section */}
                  <div className="mt-4 text-start">
                    <h3 className="h5 mb-3 text-center text-md-start">
                      Order Details
                    </h3>
                    <div className="bg-light p-3 rounded order-details-container">
                      <div className="row g-2">
                        <div className="col-12">
                          <div className="d-flex justify-content-between flex-wrap">
                            <span className="text-muted order-detail-label">
                              Tourist Name
                            </span>
                            <span className="fw-medium order-detail-value">
                              {paymentDetails?.traveller || "N/A"}
                            </span>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-flex justify-content-between flex-wrap">
                            <span className="text-muted order-detail-label">
                              Tour Name
                            </span>
                            <span className="fw-medium order-detail-value">
                              {paymentDetails?.tour || "N/A"}
                            </span>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-flex justify-content-between flex-wrap">
                            <span className="text-muted order-detail-label">
                              Amount
                            </span>
                            <span className="fw-medium order-detail-value">
                              {paymentDetails?.currency?.symbol}
                              {paymentDetails?.amount || "N/A"}
                            </span>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-flex justify-content-between flex-wrap">
                            <span className="text-muted order-detail-label">
                              Currency
                            </span>
                            <span className="fw-medium order-detail-value">
                              {paymentDetails?.currency?.currency_code || "N/A"}
                            </span>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-flex justify-content-between flex-wrap">
                            <span className="text-muted order-detail-label">
                              Payment Method
                            </span>
                            <span className="fw-medium order-detail-value">
                              {paymentDetails?.payment_method || "N/A"}
                            </span>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-flex justify-content-between flex-wrap">
                            <span className="text-muted order-detail-label">
                              Payment Status
                            </span>
                            <span className="fw-medium order-detail-value">
                              {paymentDetails?.payment_status || "N/A"}
                            </span>
                          </div>
                        </div>
                        {memberDetails?.agent_ref_no && (
                          <div className="col-12">
                            <div className="d-flex justify-content-between flex-wrap">
                              <span className="text-muted order-detail-label">
                                Agent Reference
                              </span>
                              <span className="fw-medium order-detail-value">
                                {memberDetails?.agent_ref_no || "N/A"}
                              </span>
                            </div>
                          </div>
                        )}
                        {paymentDetails?.coupon_text && (
                          <div className="col-12">
                            <div className="d-flex justify-content-between flex-wrap">
                              <span className="text-muted order-detail-label">
                                Coupon Applied
                              </span>
                              <span className="fw-medium order-detail-value">
                                {paymentDetails?.coupon_text}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Download Receipt Button */}
                  <div className="mt-3">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = `${BASE_URL_AGENT_BOOKING}${paymentDetails.booking_invoice}`;
                        link.download = paymentDetails.booking_invoice
                          .split("/")
                          .pop(); // Extracts file name
                        link.target = "_blank";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      <i className="bi bi-download me-2"></i>
                      Download Receipt
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .order-details-container {
          overflow-x: hidden;
          width: 100%;
        }

        .order-detail-label {
          flex: 1;
          min-width: 120px;
          margin-right: 10px;
        }

        .order-detail-value {
          text-align: right;
          word-break: break-word;
        }

        @media (max-width: 576px) {
          .d-flex.justify-content-between {
            margin-bottom: 8px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            padding-bottom: 8px;
          }

          .d-flex.justify-content-between:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }

          .order-detail-label,
          .order-detail-value {
            display: block;
            width: 100%;
            text-align: left;
          }

          .order-detail-value {
            font-weight: 500;
          }
        }
      `}</style>
    </>
  );
};

export default PaymentSuccess;
