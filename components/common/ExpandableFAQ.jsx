"use client";
import { useState, useEffect } from "react";

const ExpandableFAQ = ({ faqContent }) => {
  const [faqItems, setFaqItems] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    if (!faqContent) return;

    // Clean the content and extract <li> items
    const cleaned = faqContent.replace(/\n|\r/g, "");
    const matches = cleaned.match(/<li.*?>(.*?)<\/li>/g);

    if (matches) {
      const parsed = matches.map((item) => {
        const questionMatch = item.match(/<strong>(.*?)<\/strong>/);
        const answerMatch = item.replace(/<strong>.*?<\/strong>/, "").trim();

        return {
          question: questionMatch
            ? questionMatch[1].replace(/<br\s*\/?>/g, "").trim()
            : "No question found",
          answer: answerMatch
            ? answerMatch.replace(/<\/?[^>]+(>|$)/g, "").trim() // remove all HTML tags
            : "No answer found",
        };
      });

      setFaqItems(parsed);
    }
  }, [faqContent]);

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div className="accordion -simple row y-gap-20 js-accordion">
      {faqItems.map((item, idx) => (
        <div className="col-12" key={idx}>
          <div className="accordion__item px-20 py-20 border-light rounded-4">
            <div
              className="accordion__button d-flex items-center cursor-pointer"
              onClick={() => toggleExpand(idx)}
            >
              <div className="accordion__icon size-40 flex-center bg-light-2 rounded-full mr-20">
                <i
                  className={expandedIndex === idx ? "icon-minus" : "icon-plus"}
                />
              </div>
              <div className="button text-dark-1 text-start text-20 fw-600">
                {item.question}
              </div>
            </div>

            {expandedIndex === idx && (
              <div className="pt-15 pl-60">
                <p className="text-15">{item.answer}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpandableFAQ;
