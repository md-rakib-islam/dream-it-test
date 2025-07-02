"use client";
import { useState, useEffect } from "react";

const TwoColumnFAQ = ({ faqContent }) => {
  const [leftColumnFAQs, setLeftColumnFAQs] = useState([]);
  const [rightColumnFAQs, setRightColumnFAQs] = useState([]);
  const [leftExpandedIndex, setLeftExpandedIndex] = useState(null);
  const [rightExpandedIndex, setRightExpandedIndex] = useState(null);

  useEffect(() => {
    if (
      !faqContent ||
      !Array.isArray(faqContent) ||
      !faqContent[0]?.description
    ) {
      return;
    }

    const htmlContent = faqContent[0].description;

    if (typeof htmlContent !== "string") {
      return;
    }

    const cleaned = htmlContent.replace(/\n|\r/g, "");

    // Match all <strong>Question</strong><br />Answer blocks
    const regex =
      /<strong>(.*?)<\/strong><br\s*\/?>\s*(.*?)(?=<br\s*\/?>\s*<strong>|<\/p>)/gs;

    const matches = [...cleaned.matchAll(regex)];

    const parsed = matches.map((match) => {
      const question = match[1].replace(/<br\s*\/?>/g, "").trim();

      const answer = match[2]
        .replace(/<br\s*\/?>/g, " ")
        .replace(/<\/?[^>]+(>|$)/g, "")
        .trim();

      return {
        question: question || "No question found",
        answer: answer || "No answer found",
      };
    });

    // Split into two columns
    const mid = Math.ceil(parsed.length / 2);
    setLeftColumnFAQs(parsed.slice(0, mid));
    setRightColumnFAQs(parsed.slice(mid));
  }, [faqContent]);

  const toggleLeftExpand = (index) => {
    setLeftExpandedIndex(index === leftExpandedIndex ? null : index);
  };

  const toggleRightExpand = (index) => {
    setRightExpandedIndex(index === rightExpandedIndex ? null : index);
  };

  const renderAccordion = (faqItems, expandedIndex, toggleFunction) => {
    return (
      <div className="accordion -simple row y-gap-10 js-accordion">
        {faqItems.map((item, idx) => (
          <div className="col-12" key={idx}>
            <div className="accordion__item px-20 py-20 border-light rounded-4">
              <div
                className="accordion__button d-flex items-center cursor-pointer"
                onClick={() => toggleFunction(idx)}
              >
                <div className="accordion__icon size-40 flex-center bg-light-2 rounded-full mr-20">
                  <i
                    className={
                      expandedIndex === idx ? "icon-minus" : "icon-plus"
                    }
                  />
                </div>
                <div className="button text-dark-1 text-start text-15 fw-500">
                  {item.question}
                </div>
              </div>

              {expandedIndex === idx && (
                <div className="pt-15 pl-60">
                  <p className="text-13">{item.answer}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="layout-pt-md layout-pb-md bg-light">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="text-center mb-5">
              <h2 className="sectionTitle__title">
                Frequently Asked Questions
              </h2>
            </div>
          </div>
        </div>

        {/* Desktop View - Two Column Layout */}
        <div className="desktop-faq mt-3">
          <div className="row">
            {/* Left Column */}
            <div className="col-lg-6 col-md-6 mb-4">
              <div className="bg-white p-4 rounded shadow-sm h-100">
                {renderAccordion(
                  leftColumnFAQs,
                  leftExpandedIndex,
                  toggleLeftExpand
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="col-lg-6 col-md-6 mb-4">
              <div className="bg-white p-4 rounded shadow-sm h-100">
                {renderAccordion(
                  rightColumnFAQs,
                  rightExpandedIndex,
                  toggleRightExpand
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoColumnFAQ;
