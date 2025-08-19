"use client";

import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  memo,
  useReducer,
} from "react";

// CSS styles as a constant to avoid recreation
const COMPONENT_STYLES = `
  .counterButton {
    width: 32px;
    height: 32px;
    min-width: 32px;
    min-height: 32px;
    border: 1px solid #e5e7eb;
    border-radius: 50%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    padding: 0;
    margin-right: 10px;
    flex-shrink: 0;
    font-size: 16px;
    line-height: 1;
    box-sizing: border-box;
  }
  
  .counterButton:hover {
    border-color: #d1d5db;
    background-color: #f9fafb;
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: .5; }
  }
  
  .interweave-content {
    min-height: 20px;
  }
  
  .section-container {
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 2rem;
    min-height: 80px;
  }
  
  .mobile-section {
    border-bottom: 1px solid #e5e7eb;
    // margin-bottom: 0.75rem;
    min-height: 60px;
  }
  
  .mobile-section:first-child {
    border-top: 1px solid #e5e7eb;
  }
  
  .faq-item {
    border-top: 1px solid #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
    padding: 0;
  }
  
  .content-transition {
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
  }
  
  .rotate-icon {
    transition: transform 0.2s ease;
  }
`;

// Section key mapping
const SECTION_KEY_MAP = {
  inclution: "inclusions",
  exclusion: "exclusions",
  meetup_point: "meetup",
  additional_info: "additional",
  knw_before_go: "know_before",
  about_ticket: "about_ticket",
  help_center: "help_center",
};

// State reducer for better state management
const initialState = {
  hydratedData: null,
  openSection: null,
  isMobile: false,
  openFaqItems: [],
  isInitialLoad: true,
  isLayoutReady: false,
  faqItems: [],
};

const stateReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        hydratedData: action.payload,
        isInitialLoad: false,
      };
    case "SET_LAYOUT_READY":
      return { ...state, isLayoutReady: true };
    case "SET_MOBILE":
      return { ...state, isMobile: action.payload };
    case "TOGGLE_SECTION":
      return {
        ...state,
        openSection:
          state.openSection === action.payload ? null : action.payload,
      };
    case "TOGGLE_FAQ_ITEM":
      return {
        ...state,
        openFaqItems: state.openFaqItems.includes(action.payload)
          ? state.openFaqItems.filter((i) => i !== action.payload)
          : [...state.openFaqItems, action.payload],
      };
    case "SET_FAQ_ITEMS":
      return { ...state, faqItems: action.payload };
    default:
      return state;
  }
};

// Custom hook for mobile detection
const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 100);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return isMobile;
};

// Custom hook for FAQ parsing
const useFAQParser = (faqContent) => {
  return useMemo(() => {
    if (!faqContent) return [];

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(faqContent, "text/html");
      const faqItems = [];

      // Try ordered list first
      const orderedList = doc.querySelector("ol");
      if (orderedList) {
        const listItems = Array.from(orderedList.querySelectorAll("li"));

        listItems.forEach((li) => {
          const strong = li.querySelector("strong");
          if (strong) {
            const questionText = strong.textContent.trim();
            const liClone = li.cloneNode(true);
            const strongInClone = liClone.querySelector("strong");

            if (strongInClone) {
              strongInClone.remove();
            }

            let answerHtml = liClone.innerHTML.trim();
            if (answerHtml.startsWith("<br>")) {
              answerHtml = answerHtml.substring(4).trim();
            }

            faqItems.push({
              question: questionText,
              answer: answerHtml,
            });
          }
        });
      } else {
        // Fallback to paragraphs
        const paragraphs = Array.from(doc.querySelectorAll("p"));

        for (let i = 0; i < paragraphs.length; i++) {
          const p = paragraphs[i];
          if (p.innerHTML === "&nbsp;" || !p.textContent.trim()) continue;

          const strong = p.querySelector("strong");
          if (strong) {
            const questionText = strong.textContent.trim();
            let answerHtml = "";

            if (i + 1 < paragraphs.length) {
              const nextP = paragraphs[i + 1];
              if (
                nextP &&
                nextP.textContent.trim() &&
                !nextP.querySelector("strong")
              ) {
                answerHtml = nextP.innerHTML;
                i++;
              }
            }

            faqItems.push({
              question: questionText,
              answer: answerHtml,
            });
          }
        }
      }

      return faqItems;
    } catch (error) {
      console.error("Error parsing FAQ HTML:", error);
      return [];
    }
  }, [faqContent]);
};

// Optimized Loading Components
const SkeletonLoader = memo(() => (
  <div className="animate-pulse">
    <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/5"></div>
    </div>
  </div>
));

const FAQSkeleton = memo(() => (
  <div className="animate-pulse space-y-4">
    {Array.from({ length: 3 }, (_, i) => (
      <div key={i} className="faq-item py-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    ))}
  </div>
));

// Optimized FAQ Item Component
const FAQItem = memo(({ item, index, isOpen, onToggle }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const handleToggle = useCallback(() => {
    setIsAnimating(true);
    onToggle(index);
    setTimeout(() => setIsAnimating(false), 200);
  }, [index, onToggle]);

  const contentRef = useCallback(
    (node) => {
      if (node && isOpen && contentHeight === 0) {
        setContentHeight(node.scrollHeight);
      }
    },
    [isOpen, contentHeight]
  );

  return (
    <div className="faq-item" itemScope itemType="https://schema.org/Question">
      <button
        className="w-full py-4 text-left"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        style={{ minHeight: "60px", display: "flex", alignItems: "center" }}
      >
        <div className="counterButton" style={{ flexShrink: 0 }}>
          <span
            className="rotate-icon"
            style={{
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              display: "inline-block",
            }}
          >
            {isOpen ? "−" : "+"}
          </span>
        </div>
        <h3
          className="fw-600 flex-1 text-16"
          itemProp="name"
          style={{ margin: 0 }}
        >
          {item.question}
        </h3>
      </button>

      <div
        className="content-transition"
        style={{
          maxHeight: isOpen ? contentHeight || "2000px" : 0,
          transition: isAnimating ? "max-height 0.2s ease-in-out" : "none",
        }}
        id={`faq-answer-${index}`}
        itemScope
        itemType="https://schema.org/Answer"
      >
        <div
          ref={contentRef}
          className="pb-4 flex items-start"
          style={{ display: "flex", minHeight: isOpen ? "40px" : 0 }}
        >
          <div
            className="counterButton"
            style={{ visibility: "hidden", flexShrink: 0 }}
            aria-hidden="true"
          >
            +
          </div>
          <div
            itemProp="text"
            dangerouslySetInnerHTML={{ __html: item.answer }}
            style={{ flex: 1 }}
          />
        </div>
      </div>
    </div>
  );
});

// Desktop Section Component
const DesktopSection = memo(({ title, content, className = "" }) => (
  <div className="section-container" style={{ display: "table-row" }}>
    <div
      style={{
        display: "table-cell",
        width: "25%",
        paddingRight: "1rem",
        paddingBottom: "0.5rem",
        verticalAlign: "top",
      }}
    >
      <h2
        className="fw-600 text-22 sm:text-18"
        style={{ marginTop: "0.5rem", marginBottom: 0 }}
      >
        {title}
      </h2>
    </div>
    <div
      style={{
        display: "table-cell",
        width: "75%",
        paddingBottom: "0.5rem",
        verticalAlign: "top",
        minHeight: "60px",
      }}
    >
      <div
        className={`interweave-content ${className}`}
        style={{ paddingTop: "0.5rem" }}
      >
        {content}
      </div>
    </div>
  </div>
));

// Mobile Section Component
const MobileSection = memo(
  ({ title, content, sectionKey, isOpen, onToggle, className = "" }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleToggle = useCallback(() => {
      setIsAnimating(true);
      onToggle(sectionKey);
      setTimeout(() => setIsAnimating(false), 200);
    }, [sectionKey, onToggle]);

    return (
      <div className="mobile-section">
        <button
          className="w-full py-4 text-left"
          onClick={handleToggle}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "60px",
          }}
        >
          <h2
            className="fw-600 text-22 sm:text-18"
            style={{ margin: 0, flex: 1 }}
          >
            {title}
          </h2>
          <div
            className="rotate-icon"
            style={{
              width: "5px",
              height: "5px",
              borderStyle: "solid",
              borderWidth: "0 2px 2px 0",
              display: "inline-block",
              padding: "3px",
              transform: isOpen ? "rotate(-135deg)" : "rotate(45deg)",
              flexShrink: 0,
              marginLeft: "10px",
            }}
            aria-hidden="true"
          />
        </button>

        <div
          className="content-transition"
          style={{
            maxHeight: isOpen ? "2000px" : 0,
            transition: isAnimating ? "max-height 0.3s ease-in-out" : "none",
          }}
        >
          <div className="pb-4" style={{ minHeight: isOpen ? "40px" : 0 }}>
            <div className={`interweave-content ${className}`}>{content}</div>
          </div>
        </div>
      </div>
    );
  }
);

// Main Component
const ImportantInfo = memo(({ data }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const isMobile = useMobileDetection();
  const faqItems = useFAQParser(state.hydratedData?.faq);

  // Initialize data
  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_DATA", payload: data });
      setTimeout(() => dispatch({ type: "SET_LAYOUT_READY" }), 100);
    }
  }, [data]);

  // Sync mobile state
  useEffect(() => {
    dispatch({ type: "SET_MOBILE", payload: isMobile });
  }, [isMobile]);

  // Memoized sections
  const sections = useMemo(() => {
    if (!state.hydratedData) return [];

    return [
      {
        key: "inclution",
        title: "Inclusion",
        content: state.hydratedData.inclution,
      },
      {
        key: "exclusion",
        title: "Exclusion",
        content: state.hydratedData.exclusion,
      },
      {
        key: "meetup_point",
        title: "Meetup Point (Location)",
        content: state.hydratedData.meetup_point,
      },
      {
        key: "additional_info",
        title: "Additional information",
        content: state.hydratedData.additional_info,
      },
      {
        key: "knw_before_go",
        title: "Know Before You Go",
        content: state.hydratedData.knw_before_go,
      },
      {
        key: "about_ticket",
        title: "About this ticket",
        content: state.hydratedData.about_ticket,
      },
      {
        key: "help_center",
        title: "Help Center",
        content: state.hydratedData.help_center,
      },
    ].filter((section) => section.content);
  }, [state.hydratedData]);

  // Event handlers
  const toggleSection = useCallback((section) => {
    dispatch({ type: "TOGGLE_SECTION", payload: section });
  }, []);

  const toggleFaqItem = useCallback((index) => {
    dispatch({ type: "TOGGLE_FAQ_ITEM", payload: index });
  }, []);

  // Loading state
  if (!state.hydratedData || state.isInitialLoad) {
    return (
      <div className="pt-20" style={{ minHeight: "400px" }}>
        <style>{COMPONENT_STYLES}</style>
        <div className="border-top-light">
          <SkeletonLoader />
          <div className="mt-8">
            <FAQSkeleton />
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout
  if (!state.isMobile) {
    return (
      <div className="pt-20" style={{ minHeight: "400px" }}>
        <style>{COMPONENT_STYLES}</style>
        <div className="border-top-light">
          <div
            style={{
              display: "table",
              width: "100%",
              borderCollapse: "collapse",
              tableLayout: "fixed",
            }}
          >
            {sections.map(({ key, title, content }) => (
              <DesktopSection
                key={key}
                title={title}
                content={<div dangerouslySetInnerHTML={{ __html: content }} />}
              />
            ))}

            {state.hydratedData.faq && faqItems.length > 0 && (
              <div style={{ display: "table-row", minHeight: "200px" }}>
                <div
                  style={{
                    display: "table-cell",
                    width: "25%",
                    paddingRight: "1rem",
                    paddingBottom: "0.5rem",
                    verticalAlign: "top",
                  }}
                >
                  <h2
                    className="fw-600 text-22 sm:text-18"
                    style={{ marginTop: "0.5rem", marginBottom: 0 }}
                    id="faq-heading"
                  >
                    FAQ
                  </h2>
                </div>
                <div
                  style={{
                    display: "table-cell",
                    width: "75%",
                    paddingBottom: "0.5rem",
                    verticalAlign: "top",
                    paddingTop: "0.5rem",
                  }}
                >
                  <div
                    className="interweave-content"
                    role="region"
                    aria-labelledby="faq-heading"
                  >
                    {!state.isLayoutReady ? (
                      <FAQSkeleton />
                    ) : (
                      <div className="space-y-0">
                        {faqItems.map((item, index) => (
                          <FAQItem
                            key={`faq-${index}`}
                            item={item}
                            index={index}
                            isOpen={state.openFaqItems.includes(index)}
                            onToggle={toggleFaqItem}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Mobile Layout
  return (
    <div className="pt-20" style={{ minHeight: "400px" }}>
      <style>{COMPONENT_STYLES}</style>

      {sections.map(({ key, title, content }) => {
        const sectionKey = SECTION_KEY_MAP[key] || key;

        return (
          <MobileSection
            key={key}
            title={title}
            content={<div dangerouslySetInnerHTML={{ __html: content }} />}
            sectionKey={sectionKey}
            isOpen={state.openSection === sectionKey}
            onToggle={toggleSection}
          />
        );
      })}

      {state.hydratedData.faq && faqItems.length > 0 && (
        <MobileSection
          title="FAQ"
          sectionKey="faq"
          isOpen={state.openSection === "faq"}
          onToggle={toggleSection}
          content={
            !state.isLayoutReady ? (
              <FAQSkeleton />
            ) : (
              <div className="space-y-0">
                {faqItems.map((item, index) => (
                  <FAQItem
                    key={`faq-mobile-${index}`}
                    item={item}
                    index={index}
                    isOpen={state.openFaqItems.includes(index)}
                    onToggle={toggleFaqItem}
                  />
                ))}
              </div>
            )
          }
        />
      )}
    </div>
  );
});

ImportantInfo.displayName = "ImportantInfo";

export default ImportantInfo;

// "use client";

// import { useEffect, useState } from "react";

// const ImportantInfo = ({ data }) => {
//   const [hydratedData, setHydratedData] = useState({});
//   const [openSection, setOpenSection] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [openFaqItems, setOpenFaqItems] = useState([0]);

//   useEffect(() => {
//     setHydratedData(data);

//     // Check if we're on mobile
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);

//     return () => {
//       window.removeEventListener("resize", checkMobile);
//     };
//   }, [data]);

//   if (!hydratedData) {
//     return null; // or a loading spinner
//   }

//   const toggleSection = (section) => {
//     if (openSection === section) {
//       setOpenSection(null);
//     } else {
//       setOpenSection(section);
//     }
//   };

//   const toggleFaqItem = (index) => {
//     if (openFaqItems.includes(index)) {
//       setOpenFaqItems([]);
//     } else {
//       setOpenFaqItems([index]); // Only keep the current item open
//     }
//   };

//   // Function to parse FAQ content from different formats
//   const parseFaqContent = (htmlContent) => {
//     try {
//       const tempDiv = document.createElement("div");
//       tempDiv.innerHTML = htmlContent;

//       const faqItems = [];

//       // Check if content is in ordered list format
//       const orderedList = tempDiv.querySelector("ol");

//       if (orderedList) {
//         // Process list items
//         const listItems = Array.from(orderedList.querySelectorAll("li"));

//         listItems.forEach((li) => {
//           const strong = li.querySelector("strong");

//           if (strong) {
//             const questionText = strong.textContent.trim();
//             let answerHtml = "";

//             // Clone the li element to work with
//             const liClone = li.cloneNode(true);

//             // Remove the strong tag from the clone
//             const strongInClone = liClone.querySelector("strong");
//             if (strongInClone) {
//               strongInClone.remove();
//             }

//             // The remaining content is the answer
//             answerHtml = liClone.innerHTML.trim();

//             // Clean up the answer - remove leading <br> if present
//             if (answerHtml.startsWith("<br>")) {
//               answerHtml = answerHtml.substring(4).trim();
//             }

//             faqItems.push({
//               question: questionText,
//               answer: answerHtml,
//             });
//           }
//         });
//       } else {
//         // Fallback to paragraph-based parsing
//         const paragraphs = Array.from(tempDiv.querySelectorAll("p"));

//         for (let i = 0; i < paragraphs.length; i++) {
//           const p = paragraphs[i];

//           // Skip empty paragraphs
//           if (p.innerHTML === "&nbsp;" || !p.textContent.trim()) continue;

//           // Check if this paragraph contains a question (strong tag)
//           const strong = p.querySelector("strong");
//           if (strong) {
//             // This is a question paragraph
//             const questionText = strong.textContent.trim();

//             // Look for the next non-empty paragraph which should contain the answer
//             let answerHtml = "";
//             if (i + 1 < paragraphs.length) {
//               const nextP = paragraphs[i + 1];
//               if (
//                 nextP &&
//                 nextP.textContent.trim() &&
//                 !nextP.querySelector("strong")
//               ) {
//                 answerHtml = nextP.innerHTML;
//                 i++; // Skip the answer paragraph in the next iteration
//               }
//             }

//             faqItems.push({
//               question: questionText,
//               answer: answerHtml,
//             });
//           }
//         }
//       }

//       return faqItems;
//     } catch (error) {
//       console.error("Error parsing FAQ HTML:", error);
//       return [];
//     }
//   };

//   // CSS for the counter button
//   const styles = `
//     .counterButton {
//       width: 32px;
//       height: 32px;
//       min-width: 32px; /* Add this to prevent shrinking */
//       min-height: 32px; /* Add this to prevent shrinking */
//       border: 1px solid #e5e7eb;
//       border-radius: 50%;
//       background: white;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       cursor: pointer;
//       transition: all 0.2s;
//       padding: 0;
//       margin-right: 10px;
//       flex-shrink: 0; /* Add this to prevent shrinking */
//       font-size: 16px; /* Add consistent font size */
//       line-height: 1; /* Add consistent line height */
//     }
//   `;

//   // Desktop layout
//   const desktopLayout = (
//     <div className="pt-20">
//       <style>{styles}</style>
//       <div className="border-top-light">
//         <div
//           style={{
//             display: "table",
//             width: "100%",
//             borderCollapse: "collapse",
//           }}
//         >
//           {hydratedData.inclution && (
//             <div
//               style={{
//                 display: "table-row",
//                 borderBottom: "1px solid #e5e7eb",
//                 marginBottom: "2rem",
//               }}
//             >
//               <div
//                 style={{
//                   display: "table-cell",
//                   width: "25%",
//                   paddingRight: "1rem",
//                   paddingBottom: "0.5rem",
//                   verticalAlign: "middle",
//                 }}
//               >
//                 <div
//                   className="fw-600 text-22 sm:text-18"
//                   style={{ marginTop: "0.5rem" }}
//                 >
//                   Inclusion
//                 </div>
//               </div>
//               <div
//                 style={{
//                   display: "table-cell",
//                   width: "75%",
//                   paddingBottom: "0.5rem",
//                   verticalAlign: "top",
//                 }}
//               >
//                 <div
//                   className="interweave-content"
//                   style={{ paddingTop: "0.5rem" }}
//                 >
//                   <div
//                     dangerouslySetInnerHTML={{ __html: hydratedData.inclution }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {hydratedData.exclusion && (
//             <div
//               style={{
//                 display: "table-row",
//                 borderBottom: "1px solid #e5e7eb",
//                 marginBottom: "2rem",
//               }}
//             >
//               <div
//                 style={{
//                   display: "table-cell",
//                   width: "25%",
//                   paddingRight: "1rem",
//                   paddingBottom: "0.5rem",
//                   verticalAlign: "middle",
//                 }}
//               >
//                 <div
//                   className="fw-600 text-22 sm:text-18"
//                   style={{ marginTop: "0.5rem" }}
//                 >
//                   Exclusion
//                 </div>
//               </div>
//               <div
//                 style={{
//                   display: "table-cell",
//                   width: "75%",
//                   paddingBottom: "0.5rem",
//                   verticalAlign: "top",
//                 }}
//               >
//                 <div
//                   className="interweave-content"
//                   style={{ paddingTop: "0.5rem" }}
//                 >
//                   <div
//                     dangerouslySetInnerHTML={{ __html: hydratedData.exclusion }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {hydratedData.meetup_point && (
//             <div
//               style={{
//                 display: "table-row",
//                 borderBottom: "1px solid #e5e7eb",
//                 marginBottom: "2rem",
//               }}
//             >
//               <div
//                 style={{
//                   display: "table-cell",
//                   width: "25%",
//                   paddingRight: "1rem",
//                   paddingBottom: "0.5rem",
//                   verticalAlign: "middle",
//                 }}
//               >
//                 <div
//                   className="fw-600 text-22 sm:text-18"
//                   style={{ marginTop: "0.5rem" }}
//                 >
//                   Meetup Point (Location)
//                 </div>
//               </div>
//               <div
//                 style={{
//                   display: "table-cell",
//                   width: "75%",
//                   paddingBottom: "0.5rem",
//                   verticalAlign: "top",
//                 }}
//               >
//                 <div
//                   className="interweave-content"
//                   style={{ paddingTop: "0.5rem" }}
//                 >
//                   <div
//                     dangerouslySetInnerHTML={{
//                       __html: hydratedData.meetup_point,
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {hydratedData.additional_info && (
//             <div
//               style={{
//                 display: "table-row",
//                 borderBottom: "1px solid #e5e7eb",
//                 marginBottom: "2rem",
//               }}
//             >
//               <div
//                 style={{
//                   display: "table-cell",
//                   width: "25%",
//                   paddingRight: "1rem",
//                   paddingBottom: "0.5rem",
//                   verticalAlign: "middle",
//                 }}
//               >
//                 <div
//                   className="fw-600 text-22 sm:text-18"
//                   style={{ marginTop: "0.5rem" }}
//                 >
//                   Additional information
//                 </div>
//               </div>
//               <div
//                 style={{
//                   display: "table-cell",
//                   width: "75%",
//                   paddingBottom: "0.5rem",
//                   verticalAlign: "top",
//                 }}
//               >
//                 <div
//                   className="interweave-content"
//                   style={{ paddingTop: "0.5rem" }}
//                 >
//                   <div
//                     dangerouslySetInnerHTML={{
//                       __html: hydratedData.additional_info,
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {hydratedData.knw_before_go && (
//             <div
//               style={{
//                 display: "table-row",
//                 borderBottom: "1px solid #e5e7eb",
//                 marginBottom: "2rem",
//               }}
//             >
//               <div
//                 style={{
//                   display: "table-cell",
//                   width: "25%",
//                   paddingRight: "1rem",
//                   paddingBottom: "0.5rem",
//                   verticalAlign: "middle",
//                 }}
//               >
//                 <div
//                   className="fw-600 text-22 sm:text-18"
//                   style={{ marginTop: "0.5rem" }}
//                 >
//                   Know Before You Go
//                 </div>
//               </div>
//               <div
//                 style={{
//                   display: "table-cell",
//                   width: "75%",
//                   paddingBottom: "0.5rem",
//                   verticalAlign: "top",
//                 }}
//               >
//                 <div
//                   className="interweave-content"
//                   style={{ paddingTop: "0.5rem" }}
//                 >
//                   <div
//                     dangerouslySetInnerHTML={{
//                       __html: hydratedData.knw_before_go,
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {hydratedData.about_ticket && (
//             <div
//               style={{
//                 display: "table-row",
//                 borderBottom: "1px solid #e5e7eb",
//                 marginBottom: "2rem",
//               }}
//             >
//               <div
//                 style={{
//                   display: "table-cell",
//                   width: "25%",
//                   paddingRight: "1rem",
//                   paddingBottom: "0.5rem",
//                   verticalAlign: "middle",
//                 }}
//               >
//                 <div
//                   className="fw-600 text-22 sm:text-18"
//                   style={{ marginTop: "0.5rem" }}
//                 >
//                   About this ticket
//                 </div>
//               </div>
//               <div
//                 style={{
//                   display: "table-cell",
//                   width: "75%",
//                   paddingBottom: "0.5rem",
//                   verticalAlign: "top",
//                 }}
//               >
//                 <div
//                   className="interweave-content"
//                   style={{ paddingTop: "0.5rem" }}
//                 >
//                   <div
//                     dangerouslySetInnerHTML={{
//                       __html: hydratedData.about_ticket,
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {hydratedData.help_center && (
//             <div
//               style={{
//                 display: "table-row",
//                 borderBottom: "1px solid #e5e7eb",
//                 marginBottom: "2rem",
//               }}
//             >
//               <div
//                 style={{
//                   display: "table-cell",
//                   width: "25%",
//                   paddingRight: "1rem",
//                   paddingBottom: "0.5rem",
//                   verticalAlign: "middle",
//                 }}
//               >
//                 <div
//                   className="fw-600 text-22 sm:text-18"
//                   style={{ marginTop: "0.5rem" }}
//                 >
//                   Help Center
//                 </div>
//               </div>
//               <div
//                 style={{
//                   display: "table-cell",
//                   width: "75%",
//                   paddingBottom: "0.5rem",
//                   verticalAlign: "top",
//                 }}
//               >
//                 <div
//                   className="interweave-content "
//                   style={{ paddingTop: "0.5rem" }}
//                 >
//                   <div
//                     dangerouslySetInnerHTML={{
//                       __html: hydratedData.help_center,
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {hydratedData.faq && (
//             <div
//               style={{
//                 display: "table-row",
//                 marginBottom: "2rem",
//               }}
//             >
//               <div
//                 style={{
//                   display: "table-cell",
//                   width: "25%",
//                   paddingRight: "1rem",
//                   paddingBottom: "0.5rem",
//                   verticalAlign: "middle",
//                 }}
//               >
//                 <div
//                   className="fw-600 text-22 sm:text-18"
//                   style={{ marginTop: "0.5rem" }}
//                 >
//                   FAQ
//                 </div>
//               </div>
//               <div
//                 style={{
//                   display: "table-cell",
//                   width: "75%",
//                   paddingBottom: "0.5rem",
//                   verticalAlign: "top",
//                   paddingTop: "0.5rem",
//                 }}
//               >
//                 <div className="interweave-content">
//                   {(() => {
//                     try {
//                       const faqItems = parseFaqContent(hydratedData.faq);

//                       return (
//                         <div className="space-y-0">
//                           {faqItems.map((item, index) => (
//                             <div
//                               key={index}
//                               // className="border-t border-b border-gray-200 border-bottom-light"
//                               className={`border-t border-b border-gray-200 ${
//                                 openFaqItems.includes(index)
//                                   ? "border-bottom-light"
//                                   : ""
//                               }`}
//                               style={{ borderColor: "#e5e7eb" }}
//                             >
//                               <div
//                                 className="cursor-pointer py-4"
//                                 onClick={() => toggleFaqItem(index)}
//                               >
//                                 <div
//                                   className="flex items-center"
//                                   style={{ display: "flex" }}
//                                 >
//                                   <button
//                                     className="counterButton"
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       toggleFaqItem(index);
//                                     }}
//                                   >
//                                     {openFaqItems.includes(index) ? "-" : "+"}
//                                   </button>
//                                   <div className="fw-600">{item.question}</div>
//                                 </div>
//                               </div>
//                               {openFaqItems.includes(index) && (
//                                 <div
//                                   className="pb-4 flex items-center"
//                                   style={{ display: "flex" }}
//                                 >
//                                   <button
//                                     className="counterButton"
//                                     style={{
//                                       visibility: "hidden",
//                                       marginRight: "25px",
//                                     }}
//                                   >
//                                     {openFaqItems.includes(index) ? "-" : "+"}
//                                   </button>
//                                   <div
//                                     dangerouslySetInnerHTML={{
//                                       __html: item.answer,
//                                     }}
//                                   ></div>
//                                 </div>
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       );
//                     } catch (error) {
//                       console.error("Error parsing FAQ HTML:", error);
//                       // Fallback to original rendering if parsing fails
//                       return (
//                         <div
//                           dangerouslySetInnerHTML={{ __html: hydratedData.faq }}
//                         ></div>
//                       );
//                     }
//                   })()}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   // Mobile accordion layout
//   const mobileLayout = (
//     <div className="pt-20">
//       <style>{styles}</style>
//       {hydratedData.inclution && (
//         <div
//           style={{
//             borderTop: "1px solid #e5e7eb",
//             borderBottom: "1px solid #e5e7eb",
//             marginTop: "0.75rem",
//             marginBottom: "0.75rem",
//           }}
//         >
//           <div
//             className="py-4 cursor-pointer"
//             onClick={() => toggleSection("inclusions")}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <div className="fw-600 text-22 sm:text-18">Inclusion</div>
//             <div
//               style={{
//                 width: "5px",
//                 height: "5px",
//                 borderStyle: "solid",
//                 borderWidth: "0 2px 2px 0",
//                 display: "inline-block",
//                 padding: "3px",
//                 transform:
//                   openSection === "inclusions"
//                     ? "rotate(-135deg)"
//                     : "rotate(45deg)",
//                 transition: "transform 0.2s ease",
//               }}
//             ></div>
//           </div>
//           {openSection === "inclusions" && (
//             <div className="pb-4">
//               <div className="interweave-content">
//                 <div
//                   dangerouslySetInnerHTML={{ __html: hydratedData.inclution }}
//                 ></div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {hydratedData.exclusion && (
//         <div
//           style={{
//             borderBottom: "1px solid #e5e7eb",
//             marginBottom: "0.75rem",
//           }}
//         >
//           <div
//             className="py-4 cursor-pointer"
//             onClick={() => toggleSection("exclusions")}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <div className="fw-600 text-22 sm:text-18">Exclusion</div>
//             <div
//               style={{
//                 width: "5px",
//                 height: "5px",
//                 borderStyle: "solid",
//                 borderWidth: "0 2px 2px 0",
//                 display: "inline-block",
//                 padding: "3px",
//                 transform:
//                   openSection === "exclusions"
//                     ? "rotate(-135deg)"
//                     : "rotate(45deg)",
//                 transition: "transform 0.2s ease",
//               }}
//             ></div>
//           </div>
//           {openSection === "exclusions" && (
//             <div className="pb-4">
//               <div className="interweave-content">
//                 <div
//                   dangerouslySetInnerHTML={{ __html: hydratedData.exclusion }}
//                 ></div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {hydratedData.meetup_point && (
//         <div
//           style={{
//             borderBottom: "1px solid #e5e7eb",
//             marginBottom: "0.75rem",
//           }}
//         >
//           <div
//             className="py-4 cursor-pointer"
//             onClick={() => toggleSection("meetup")}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <div className="fw-600 text-22 sm:text-18">
//               Meetup Point (Location)
//             </div>
//             <div
//               style={{
//                 width: "5px",
//                 height: "5px",
//                 borderStyle: "solid",
//                 borderWidth: "0 2px 2px 0",
//                 display: "inline-block",
//                 padding: "3px",
//                 transform:
//                   openSection === "meetup"
//                     ? "rotate(-135deg)"
//                     : "rotate(45deg)",
//                 transition: "transform 0.2s ease",
//               }}
//             ></div>
//           </div>
//           {openSection === "meetup" && (
//             <div className="pb-4">
//               <div className="interweave-content">
//                 <div
//                   dangerouslySetInnerHTML={{
//                     __html: hydratedData.meetup_point,
//                   }}
//                 ></div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {hydratedData.additional_info && (
//         <div
//           style={{
//             borderBottom: "1px solid #e5e7eb",
//             marginBottom: "0.75rem",
//           }}
//         >
//           <div
//             className="py-4 cursor-pointer"
//             onClick={() => toggleSection("additional")}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <div className="fw-600 text-22 sm:text-18">
//               Additional information
//             </div>
//             <div
//               style={{
//                 width: "5px",
//                 height: "5px",
//                 borderStyle: "solid",
//                 borderWidth: "0 2px 2px 0",
//                 display: "inline-block",
//                 padding: "3px",
//                 transform:
//                   openSection === "additional"
//                     ? "rotate(-135deg)"
//                     : "rotate(45deg)",
//                 transition: "transform 0.2s ease",
//               }}
//             ></div>
//           </div>
//           {openSection === "additional" && (
//             <div className="pb-4">
//               <div className="interweave-content">
//                 <div
//                   dangerouslySetInnerHTML={{
//                     __html: hydratedData.additional_info,
//                   }}
//                 ></div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {hydratedData.knw_before_go && (
//         <div
//           style={{
//             borderBottom: "1px solid #e5e7eb",
//             marginBottom: "0.75rem",
//           }}
//         >
//           <div
//             className="py-4 cursor-pointer"
//             onClick={() => toggleSection("know_before")}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <div className="fw-600 text-22 sm:text-18">Know Before You Go</div>
//             <div
//               style={{
//                 width: "5px",
//                 height: "5px",
//                 borderStyle: "solid",
//                 borderWidth: "0 2px 2px 0",
//                 display: "inline-block",
//                 padding: "3px",
//                 transform:
//                   openSection === "know_before"
//                     ? "rotate(-135deg)"
//                     : "rotate(45deg)",
//                 transition: "transform 0.2s ease",
//               }}
//             ></div>
//           </div>
//           {openSection === "know_before" && (
//             <div className="pb-4">
//               <div className="interweave-content">
//                 <div
//                   dangerouslySetInnerHTML={{
//                     __html: hydratedData.knw_before_go,
//                   }}
//                 ></div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {hydratedData.about_ticket && (
//         <div
//           style={{
//             borderBottom: "1px solid #e5e7eb",
//             marginBottom: "0.75rem",
//           }}
//         >
//           <div
//             className="py-4 cursor-pointer"
//             onClick={() => toggleSection("about_ticket")}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <div className="fw-600 text-22 sm:text-18">About this ticket</div>
//             <div
//               style={{
//                 width: "5px",
//                 height: "5px",
//                 borderStyle: "solid",
//                 borderWidth: "0 2px 2px 0",
//                 display: "inline-block",
//                 padding: "3px",
//                 transform:
//                   openSection === "about_ticket"
//                     ? "rotate(-135deg)"
//                     : "rotate(45deg)",
//                 transition: "transform 0.2s ease",
//               }}
//             ></div>
//           </div>
//           {openSection === "about_ticket" && (
//             <div className="pb-4">
//               <div className="interweave-content">
//                 <div
//                   dangerouslySetInnerHTML={{
//                     __html: hydratedData.about_ticket,
//                   }}
//                 ></div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {hydratedData.help_center && (
//         <div
//           style={{
//             borderBottom: "1px solid #e5e7eb",
//             marginBottom: "0.75rem",
//           }}
//         >
//           <div
//             className="py-4 cursor-pointer"
//             onClick={() => toggleSection("help_center")}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <div className="fw-600 text-22 sm:text-18">Help Center</div>
//             <div
//               style={{
//                 width: "5px",
//                 height: "5px",
//                 borderStyle: "solid",
//                 borderWidth: "0 2px 2px 0",
//                 display: "inline-block",
//                 padding: "3px",
//                 transform:
//                   openSection === "help_center"
//                     ? "rotate(-135deg)"
//                     : "rotate(45deg)",
//                 transition: "transform 0.2s ease",
//               }}
//             ></div>
//           </div>
//           {openSection === "help_center" && (
//             <div className="pb-4">
//               <div className="interweave-content">
//                 <div
//                   dangerouslySetInnerHTML={{
//                     __html: hydratedData.help_center,
//                   }}
//                 ></div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {hydratedData.faq && (
//         <div
//           style={{
//             borderBottom: "1px solid #e5e7eb",
//             marginBottom: "0.75rem",
//           }}
//         >
//           <div
//             className="py-4 cursor-pointer"
//             onClick={() => toggleSection("faq")}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <div className="fw-600 text-22 sm:text-18">FAQ</div>
//             <div
//               style={{
//                 width: "5px",
//                 height: "5px",
//                 borderStyle: "solid",
//                 borderWidth: "0 2px 2px 0",
//                 display: "inline-block",
//                 padding: "3px",
//                 transform:
//                   openSection === "faq" ? "rotate(-135deg)" : "rotate(45deg)",
//                 transition: "transform 0.2s ease",
//               }}
//             ></div>
//           </div>
//           {openSection === "faq" && (
//             <div className="pb-4">
//               <div className="interweave-content">
//                 {(() => {
//                   try {
//                     const faqItems = parseFaqContent(hydratedData.faq);

//                     return (
//                       <div className="space-y-0">
//                         {faqItems.map((item, index) => (
//                           <div
//                             key={index}
//                             className={`border-t border-b border-gray-200 ${
//                               openFaqItems.includes(index)
//                                 ? "border-bottom-light"
//                                 : ""
//                             }`}
//                             style={{ borderColor: "#e5e7eb" }}
//                           >
//                             <div
//                               className="cursor-pointer py-4"
//                               onClick={() => toggleFaqItem(index)}
//                             >
//                               <div
//                                 className="items-center"
//                                 style={{ display: "flex" }}
//                               >
//                                 <button
//                                   className="counterButton"
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     toggleFaqItem(index);
//                                   }}
//                                 >
//                                   {openFaqItems.includes(index) ? "-" : "+"}
//                                 </button>
//                                 <div className="fw-600">{item.question}</div>
//                               </div>
//                             </div>
//                             {openFaqItems.includes(index) && (
//                               <div
//                                 className="pb-4 flex items-center"
//                                 style={{ display: "flex" }}
//                               >
//                                 <button
//                                   className="counterButton"
//                                   style={{
//                                     visibility: "hidden",
//                                     marginRight: "25px",
//                                   }}
//                                 >
//                                   {openFaqItems.includes(index) ? "-" : "+"}
//                                 </button>
//                                 <div
//                                   dangerouslySetInnerHTML={{
//                                     __html: item.answer,
//                                   }}
//                                 ></div>
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     );
//                   } catch (error) {
//                     console.error("Error parsing FAQ HTML:", error);
//                     // Fallback to original rendering if parsing fails
//                     return (
//                       <div
//                         dangerouslySetInnerHTML={{ __html: hydratedData.faq }}
//                       ></div>
//                     );
//                   }
//                 })()}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );

//   return isMobile ? mobileLayout : desktopLayout;
// };

// export default ImportantInfo;
