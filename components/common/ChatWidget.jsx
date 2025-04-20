"use client";
import React, { useState } from "react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatIcons = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatWidget d-flex items-end">
      <div className={`chatIcons ${isOpen ? "open" : ""}`}>
        <div
          className="d-flex items-end"
          style={{ flexDirection: "row-reverse" }}
        >
          <button
            className={`chatIcon ml-5 ${isOpen ? "rotate" : ""}`}
            onClick={toggleChatIcons}
          >
            {/* SVG for Close Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 10.586l-4.95-4.95-1.414 1.414L10.586 12l-4.95 4.95 1.414 1.414L12 13.414l4.95 4.95 1.414-1.414L13.414 12l4.95-4.95-1.414-1.414L12 10.586z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div>
            <a
              href="https://api.whatsapp.com/send/?phone=442071012544&amp;text=Hi DreamTourism, I need assistance&amp;type=phone_number&amp;lang=en"
              target="_blank"
            >
              <button className="chatIcon">
                {/* SVG for WhatsApp Icon */}
                <svg
                  width="30"
                  height="30"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z"
                  />
                </svg>
              </button>
            </a>

            <a href="tel:+390645259865">
              <button
                className={`chatIcon dialIcon ${isOpen ? "animate" : ""}`}
              >
                {/* SVG for Dial Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.62 10.79a15.002 15.002 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.26 1.12.33 2.33.51 3.57.51.55 0 1 .45 1 1v3.5c0 .55-.45 1-1 1C10.16 22 2 13.84 2 4.5c0-.55.45-1 1-1H6.5c.55 0 1 .45 1 1 0 1.24.18 2.45.51 3.57.1.35.01.74-.26 1.02l-2.13 2.7z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </a>
          </div>
        </div>
      </div>
      <button
        className={`chatIcon ${isOpen ? "hidden" : ""}`}
        onClick={toggleChatIcons}
      >
        {/* SVG for Main Chat Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M12 2a10 10 0 00-10 10 9.93 9.93 0 004.8 8.48l-.8 2.6a1 1 0 001.28 1.28l2.6-.8A10 10 0 1012 2zm1 17.93V19a1 1 0 00-1-1H9.72A7.93 7.93 0 013 12a8 8 0 1110 7.93z" />
        </svg>
      </button>
    </div>
  );
};

export default ChatWidget;
