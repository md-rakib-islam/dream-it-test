"use client";

import { useEffect, useState } from "react";

const ImportantInfo = ({ data }) => {
  console.log("ImportantInfo data", data);
  const [hydratedData, setHydratedData] = useState({});
  const [openSection, setOpenSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setHydratedData(data);

    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [data]);

  if (!hydratedData) {
    return null; // or a loading spinner
  }

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  // Desktop layout
  const desktopLayout = (
    <div className="pt-20">
      <div className="border-top-light">
        <div
          style={{
            display: "table",
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          {hydratedData.inclution && (
            <div
              style={{
                display: "table-row",
                borderBottom: "1px solid #e5e7eb",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  display: "table-cell",
                  width: "25%",
                  paddingRight: "1rem",
                  paddingBottom: "2rem",
                  verticalAlign: "middle",
                }}
              >
                <div
                  className="fw-600 text-22 sm:text-18"
                  style={{ marginTop: "0.5rem" }}
                >
                  What's Included
                </div>
              </div>
              <div
                style={{
                  display: "table-cell",
                  width: "75%",
                  paddingBottom: "2rem",
                  verticalAlign: "top",
                }}
              >
                <div
                  className="interweave-content"
                  style={{ paddingTop: "0.5rem" }}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: hydratedData.inclution }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {hydratedData.exclusion && (
            <div
              style={{
                display: "table-row",
                borderBottom: "1px solid #e5e7eb",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  display: "table-cell",
                  width: "25%",
                  paddingRight: "1rem",
                  paddingBottom: "2rem",
                  verticalAlign: "middle",
                }}
              >
                <div
                  className="fw-600 text-22 sm:text-18"
                  style={{ marginTop: "0.5rem" }}
                >
                  What's not included
                </div>
              </div>
              <div
                style={{
                  display: "table-cell",
                  width: "75%",
                  paddingBottom: "2rem",
                  verticalAlign: "top",
                }}
              >
                <div
                  className="interweave-content"
                  style={{ paddingTop: "0.5rem" }}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: hydratedData.exclusion }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {hydratedData.meetup_point && (
            <div
              style={{
                display: "table-row",
                borderBottom: "1px solid #e5e7eb",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  display: "table-cell",
                  width: "25%",
                  paddingRight: "1rem",
                  paddingBottom: "2rem",
                  verticalAlign: "middle",
                }}
              >
                <div
                  className="fw-600 text-22 sm:text-18"
                  style={{ marginTop: "0.5rem" }}
                >
                  Meetup Point (Location)
                </div>
              </div>
              <div
                style={{
                  display: "table-cell",
                  width: "75%",
                  paddingBottom: "2rem",
                  verticalAlign: "top",
                }}
              >
                <div
                  className="interweave-content"
                  style={{ paddingTop: "0.5rem" }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: hydratedData.meetup_point,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {hydratedData.additional_info && (
            <div
              style={{
                display: "table-row",
                borderBottom: "1px solid #e5e7eb",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  display: "table-cell",
                  width: "25%",
                  paddingRight: "1rem",
                  paddingBottom: "2rem",
                  verticalAlign: "middle",
                }}
              >
                <div
                  className="fw-600 text-22 sm:text-18"
                  style={{ marginTop: "0.5rem" }}
                >
                  Additional information
                </div>
              </div>
              <div
                style={{
                  display: "table-cell",
                  width: "75%",
                  paddingBottom: "2rem",
                  verticalAlign: "top",
                }}
              >
                <div
                  className="interweave-content"
                  style={{ paddingTop: "0.5rem" }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: hydratedData.additional_info,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {hydratedData.knw_before_go && (
            <div
              style={{
                display: "table-row",
                borderBottom: "1px solid #e5e7eb",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  display: "table-cell",
                  width: "25%",
                  paddingRight: "1rem",
                  paddingBottom: "2rem",
                  verticalAlign: "middle",
                }}
              >
                <div
                  className="fw-600 text-22 sm:text-18"
                  style={{ marginTop: "0.5rem" }}
                >
                  Know Before You Go
                </div>
              </div>
              <div
                style={{
                  display: "table-cell",
                  width: "75%",
                  paddingBottom: "2rem",
                  verticalAlign: "top",
                }}
              >
                <div
                  className="interweave-content"
                  style={{ paddingTop: "0.5rem" }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: hydratedData.knw_before_go,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {hydratedData.about_ticket && (
            <div
              style={{
                display: "table-row",
                borderBottom: "1px solid #e5e7eb",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  display: "table-cell",
                  width: "25%",
                  paddingRight: "1rem",
                  paddingBottom: "2rem",
                  verticalAlign: "middle",
                }}
              >
                <div
                  className="fw-600 text-22 sm:text-18"
                  style={{ marginTop: "0.5rem" }}
                >
                  About this ticket
                </div>
              </div>
              <div
                style={{
                  display: "table-cell",
                  width: "75%",
                  paddingBottom: "2rem",
                  verticalAlign: "top",
                }}
              >
                <div
                  className="interweave-content"
                  style={{ paddingTop: "0.5rem" }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: hydratedData.about_ticket,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {hydratedData.help_center && (
            <div
              style={{
                display: "table-row",
                borderBottom: "1px solid #e5e7eb",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  display: "table-cell",
                  width: "25%",
                  paddingRight: "1rem",
                  paddingBottom: "2rem",
                  verticalAlign: "middle",
                }}
              >
                <div
                  className="fw-600 text-22 sm:text-18"
                  style={{ marginTop: "0.5rem" }}
                >
                  Help Center
                </div>
              </div>
              <div
                style={{
                  display: "table-cell",
                  width: "75%",
                  paddingBottom: "2rem",
                  verticalAlign: "top",
                }}
              >
                <div className="interweave-content">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: hydratedData.help_center,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {hydratedData.faq && (
            <div
              style={{
                display: "table-row",
                // borderBottom: "1px solid #e5e7eb",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  display: "table-cell",
                  width: "25%",
                  paddingRight: "1rem",
                  paddingBottom: "2rem",
                  verticalAlign: "middle",
                }}
              >
                <div
                  className="fw-600 text-22 sm:text-18"
                  style={{ marginTop: "0.5rem" }}
                >
                  FAQ
                </div>
              </div>
              <div
                style={{
                  display: "table-cell",
                  width: "75%",
                  paddingBottom: "2rem",
                  verticalAlign: "top",
                }}
              >
                <div className="interweave-content">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: hydratedData.faq,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Mobile accordion layout
  const mobileLayout = (
    <div className="pt-20">
      {hydratedData.inclution && (
        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            borderBottom: "1px solid #e5e7eb",
            marginTop: "0.75rem",
            marginBottom: "0.75rem",
          }}
        >
          <div
            className="py-4 cursor-pointer"
            onClick={() => toggleSection("inclusions")}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="fw-600 text-22 sm:text-18">What's Included</div>
            <div
              style={{
                width: "5px",
                height: "5px",
                borderStyle: "solid",
                borderWidth: "0 2px 2px 0",
                display: "inline-block",
                padding: "3px",
                transform:
                  openSection === "inclusions"
                    ? "rotate(-135deg)"
                    : "rotate(45deg)",
                transition: "transform 0.2s ease",
              }}
            ></div>
          </div>
          {openSection === "inclusions" && (
            <div className="pb-4">
              <div className="interweave-content">
                <div
                  dangerouslySetInnerHTML={{ __html: hydratedData.inclution }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}

      {hydratedData.exclusion && (
        <div
          style={{
            borderBottom: "1px solid #e5e7eb",
            marginBottom: "0.75rem",
          }}
        >
          <div
            className="py-4 cursor-pointer"
            onClick={() => toggleSection("exclusions")}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="fw-600 text-22 sm:text-18">What's not included</div>
            <div
              style={{
                width: "5px",
                height: "5px",
                borderStyle: "solid",
                borderWidth: "0 2px 2px 0",
                display: "inline-block",
                padding: "3px",
                transform:
                  openSection === "exclusions"
                    ? "rotate(-135deg)"
                    : "rotate(45deg)",
                transition: "transform 0.2s ease",
              }}
            ></div>
          </div>
          {openSection === "exclusions" && (
            <div className="pb-4">
              <div className="interweave-content">
                <div
                  dangerouslySetInnerHTML={{ __html: hydratedData.exclusion }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}

      {hydratedData.meetup_point && (
        <div
          style={{
            borderBottom: "1px solid #e5e7eb",
            marginBottom: "0.75rem",
          }}
        >
          <div
            className="py-4 cursor-pointer"
            onClick={() => toggleSection("meetup")}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="fw-600 text-22 sm:text-18">
              Meetup Point (Location)
            </div>
            <div
              style={{
                width: "5px",
                height: "5px",
                borderStyle: "solid",
                borderWidth: "0 2px 2px 0",
                display: "inline-block",
                padding: "3px",
                transform:
                  openSection === "meetup"
                    ? "rotate(-135deg)"
                    : "rotate(45deg)",
                transition: "transform 0.2s ease",
              }}
            ></div>
          </div>
          {openSection === "meetup" && (
            <div className="pb-4">
              <div className="interweave-content">
                <div
                  dangerouslySetInnerHTML={{
                    __html: hydratedData.meetup_point,
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}

      {hydratedData.additional_info && (
        <div
          style={{
            borderBottom: "1px solid #e5e7eb",
            marginBottom: "0.75rem",
          }}
        >
          <div
            className="py-4 cursor-pointer"
            onClick={() => toggleSection("additional")}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="fw-600 text-22 sm:text-18">
              Additional information
            </div>
            <div
              style={{
                width: "5px",
                height: "5px",
                borderStyle: "solid",
                borderWidth: "0 2px 2px 0",
                display: "inline-block",
                padding: "3px",
                transform:
                  openSection === "additional"
                    ? "rotate(-135deg)"
                    : "rotate(45deg)",
                transition: "transform 0.2s ease",
              }}
            ></div>
          </div>
          {openSection === "additional" && (
            <div className="pb-4">
              <div className="interweave-content">
                <div
                  dangerouslySetInnerHTML={{
                    __html: hydratedData.additional_info,
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}

      {hydratedData.knw_before_go && (
        <div
          style={{
            borderBottom: "1px solid #e5e7eb",
            marginBottom: "0.75rem",
          }}
        >
          <div
            className="py-4 cursor-pointer"
            onClick={() => toggleSection("know_before")}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="fw-600 text-22 sm:text-18">Know Before You Go</div>
            <div
              style={{
                width: "5px",
                height: "5px",
                borderStyle: "solid",
                borderWidth: "0 2px 2px 0",
                display: "inline-block",
                padding: "3px",
                transform:
                  openSection === "know_before"
                    ? "rotate(-135deg)"
                    : "rotate(45deg)",
                transition: "transform 0.2s ease",
              }}
            ></div>
          </div>
          {openSection === "know_before" && (
            <div className="pb-4">
              <div className="interweave-content">
                <div
                  dangerouslySetInnerHTML={{
                    __html: hydratedData.knw_before_go,
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}

      {hydratedData.about_ticket && (
        <div
          style={{
            borderBottom: "1px solid #e5e7eb",
            marginBottom: "0.75rem",
          }}
        >
          <div
            className="py-4 cursor-pointer"
            onClick={() => toggleSection("about_ticket")}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="fw-600 text-22 sm:text-18">About this ticket</div>
            <div
              style={{
                width: "5px",
                height: "5px",
                borderStyle: "solid",
                borderWidth: "0 2px 2px 0",
                display: "inline-block",
                padding: "3px",
                transform:
                  openSection === "about_ticket"
                    ? "rotate(-135deg)"
                    : "rotate(45deg)",
                transition: "transform 0.2s ease",
              }}
            ></div>
          </div>
          {openSection === "about_ticket" && (
            <div className="pb-4">
              <div className="interweave-content">
                <div
                  dangerouslySetInnerHTML={{
                    __html: hydratedData.about_ticket,
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}

      {hydratedData.help_center && (
        <div
          style={{
            borderBottom: "1px solid #e5e7eb",
            marginBottom: "0.75rem",
          }}
        >
          <div
            className="py-4 cursor-pointer"
            onClick={() => toggleSection("help_center")}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="fw-600 text-22 sm:text-18">Help Center</div>
            <div
              style={{
                width: "5px",
                height: "5px",
                borderStyle: "solid",
                borderWidth: "0 2px 2px 0",
                display: "inline-block",
                padding: "3px",
                transform:
                  openSection === "help_center"
                    ? "rotate(-135deg)"
                    : "rotate(45deg)",
                transition: "transform 0.2s ease",
              }}
            ></div>
          </div>
          {openSection === "help_center" && (
            <div className="pb-4">
              <div className="interweave-content">
                <div
                  dangerouslySetInnerHTML={{
                    __html: hydratedData.help_center,
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}

      {hydratedData.faq && (
        <div
          style={{
            borderBottom: "1px solid #e5e7eb",
            marginBottom: "0.75rem",
          }}
        >
          <div
            className="py-4 cursor-pointer"
            onClick={() => toggleSection("faq")}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="fw-600 text-22 sm:text-18">FAQ</div>
            <div
              style={{
                width: "5px",
                height: "5px",
                borderStyle: "solid",
                borderWidth: "0 2px 2px 0",
                display: "inline-block",
                padding: "3px",
                transform:
                  openSection === "faq" ? "rotate(-135deg)" : "rotate(45deg)",
                transition: "transform 0.2s ease",
              }}
            ></div>
          </div>
          {openSection === "faq" && (
            <div className="pb-4">
              <div className="interweave-content">
                <div
                  dangerouslySetInnerHTML={{
                    __html: hydratedData.faq,
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return isMobile ? mobileLayout : desktopLayout;
};

export default ImportantInfo;
