"use client";

import { useState } from "react";
import TripReview from "./../../common/TripReview";

const CustomerReviewSection = ({ data }) => {
  // State for modal visibility
  const [showModal, setShowModal] = useState(false);

  // Default values if data is not provided
  const reviewCount = data?.reviews || 838;
  const overallRating = 4.0; // Fixed to 4.0 as requested
  const guideRating = data?.guideRating || 4.8;
  const transportationRating = data?.transportationRating || 4.8;
  const valueRating = data?.valueRating || 4.7;

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="pt-40">
      <div className="row">
        <div className="col-lg-6">
          <div className="d-flex items-center justify-between">
            <h3 className="text-22 fw-600">
              Customer reviews{" "}
              <i
                className="icon-info text-14 text-light-1 ml-5 cursor-pointer"
                onClick={toggleModal}
              ></i>
            </h3>
          </div>
          <div className="row y-gap-30 pt-20">
            <div className="col-md-5">
              <div className="d-flex flex-column items-center">
                <h2 className="text-40 fw-600 text-dark-1">
                  {overallRating}
                  <span className="text-22 text-light-1">/5</span>
                </h2>

                {/* Added TripReview component here */}
                <div className="mt-15 scale-125">
                  {" "}
                  {/* Added scale-125 to make it bigger */}
                  <TripReview title={data?.name?.toLowerCase()} />
                </div>

                <p className="text-14 text-light-1 mt-20">
                  based on {reviewCount} reviews
                </p>
              </div>
            </div>

            <div className="col-md-7">
              <h4 className="text-18 fw-500 mb-20">Review summary</h4>

              <div className="row y-gap-20">
                <div className="col-12">
                  <div className="d-flex items-center justify-between">
                    <div className="text-15 fw-500">Guide</div>
                    <div className="text-15 fw-500">{guideRating}/5</div>
                  </div>
                  <div className="progressBar mt-10">
                    <div className="progressBar__bg bg-blue-2"></div>
                    <div
                      className="progressBar__bar"
                      style={{
                        width: `${(guideRating / 5) * 100}%`,
                        backgroundColor: "#00AA6C",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="d-flex items-center justify-between">
                    <div className="text-15 fw-500">Transportation</div>
                    <div className="text-15 fw-500">
                      {transportationRating}/5
                    </div>
                  </div>
                  <div className="progressBar mt-10">
                    <div className="progressBar__bg bg-blue-2"></div>
                    <div
                      className="progressBar__bar"
                      style={{
                        width: `${(transportationRating / 5) * 100}%`,
                        backgroundColor: "#00AA6C",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="d-flex items-center justify-between">
                    <div className="text-15 fw-500">Value for money</div>
                    <div className="text-15 fw-500">{valueRating}/5</div>
                  </div>
                  <div className="progressBar mt-10">
                    <div className="progressBar__bg bg-blue-2"></div>
                    <div
                      className="progressBar__bar"
                      style={{
                        width: `${(valueRating / 5) * 100}%`,
                        backgroundColor: "#00AA6C",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup - Completely solid, perfectly centered */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              padding: "30px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              maxWidth: "480px",
              width: "100%",
              position: "relative",
              margin: "0 auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              onClick={closeModal}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div style={{ textAlign: "center", paddingTop: "10px" }}>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: 600,
                  marginBottom: "15px",
                }}
              >
                Customer reviews
              </h3>
              <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
                All reviews are from verified customers who purchased the
                activity. Reviews can only be submitted after the activity takes
                place.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CustomerReviewSection;
