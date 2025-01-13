"use client";
import { useState } from "react";

const ExpandableFAQ = ({ faqContent }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Parse FAQ content into an array of questions and answers
  const faqItems = faqContent
    .replace(/\r\n/g, "") // Remove unnecessary line breaks
    .match(/<li>.*?<\/li>/g) // Match all <li>...</li> items
    ?.map((item) => {
      const questionMatch = item.match(/<strong>(.*?)<\/strong>/);
      const answerMatch = item.match(/<\/strong>(.*)<\/li>/);

      return {
        question: questionMatch
          ? questionMatch[1].replace(/<br\s*\/?>/g, "") // Remove <br /> tags
          : "No question available",
        answer: answerMatch ? answerMatch[1] : "No answer available",
      };
    });

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <div className="accordion -simple row y-gap-20 js-accordion">
        {faqItems?.map((item, idx) => (
          <div className="col-12" key={idx}>
            <div className="accordion__item px-20 py-20 border-light rounded-4">
              <div
                className="accordion__button d-flex items-center"
                data-bs-toggle="collapse"
                data-bs-target={`#${idx}`}
              >
                <div className="accordion__icon size-40 flex-center bg-light-2 rounded-full mr-20">
                  <i className="icon-plus" />
                  <i className="icon-minus" />
                </div>
                <div className="button text-dark-1 text-start text-20 fw-600">
                  {item.question}
                </div>
              </div>
              {/* End accordion button */}

              <div
                className="accordion-collapse collapse"
                id={`${idx}`}
                data-bs-parent="#Faq1"
              >
                <div className="pt-15 pl-60">
                  <p
                    className="text-15"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  ></p>
                </div>
              </div>
              {/* End accordion conent */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExpandableFAQ;
