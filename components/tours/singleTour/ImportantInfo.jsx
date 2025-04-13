"use client";

import { useEffect, useState } from "react";

const ImportantInfo = ({ data }) => {
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
                <div className="fw-600 text-22" style={{ marginTop: "0.5rem" }}>
                  Inclusions
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
                    dangerouslySetInnerHTML={{ __html: hydratedData.inclution }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {(hydratedData.knw_before_go || hydratedData.exclusion) && (
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
                <div className="fw-600 text-22" style={{ marginTop: "0.5rem" }}>
                  Important information
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
                  <div className="fw-600">Know before you go</div>
                  {hydratedData.knw_before_go && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: hydratedData.knw_before_go,
                      }}
                    ></div>
                  )}
                  <div className="fw-600">Exclusions</div>
                  {hydratedData.exclusion && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: hydratedData.exclusion,
                      }}
                    ></div>
                  )}
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
                <div className="fw-600 text-22" style={{ marginTop: "0.5rem" }}>
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
                <div className="interweave-content">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: hydratedData.additional_info,
                    }}
                  ></div>

                  <div className=" pt-40">
                    <div className="row y-gap-30">
                      <div className="col-12">
                        <div className="row justify-between">
                          {/* Available languages section */}
                          {data?.languages && (
                            <div className="col-md-6">
                              <div className="d-flex flex-column">
                                <span className="text-16 fw-600">
                                  Available languages
                                </span>
                                <div className="text-15 mt-10">
                                  {data.languages}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Cancellation policy section */}
                          {data?.value && (
                            <div className="col-md-6">
                              <div className="d-flex flex-column">
                                <span className="text-16 fw-600">
                                  Cancellation policy
                                </span>
                                <div className="interweave-content text-15 mt-10">
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: hydratedData.value,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
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
            <div className="fw-600 text-22">Inclusions</div>
            <div
              style={{
                width: "10px",
                height: "10px",
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

      {(hydratedData.knw_before_go || hydratedData.exclusion) && (
        <div
          style={{
            borderBottom: "1px solid #e5e7eb",
            marginBottom: "0.75rem",
          }}
        >
          <div
            className="py-4 cursor-pointer"
            onClick={() => toggleSection("important_info")}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="fw-600 text-22">Important information</div>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderStyle: "solid",
                borderWidth: "0 2px 2px 0",
                display: "inline-block",
                padding: "3px",
                transform:
                  openSection === "important_info"
                    ? "rotate(-135deg)"
                    : "rotate(45deg)",
                transition: "transform 0.2s ease",
              }}
            ></div>
          </div>
          {openSection === "important_info" && (
            <div className="pb-4">
              <div className="interweave-content">
                <div className="fw-600">Know before you go</div>
                {hydratedData.knw_before_go && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: hydratedData.knw_before_go,
                    }}
                  ></div>
                )}
                <div className="fw-600">Exclusions</div>
                {hydratedData.exclusion && (
                  <div
                    dangerouslySetInnerHTML={{ __html: hydratedData.exclusion }}
                  ></div>
                )}
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
            <div className="fw-600 text-22">Additional information</div>
            <div
              style={{
                width: "10px",
                height: "10px",
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
                <div className="pt-20">
                  <div className="row y-gap-30">
                    <div className="col-12">
                      <div className="row justify-between">
                        {/* Available languages section */}
                        {data?.languages && (
                          <div className="col-md-6">
                            <div className="d-flex flex-column">
                              <span className="text-16 fw-600">
                                Available languages
                              </span>
                              <div className="text-15 mt-10">
                                {data.languages}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Cancellation policy section */}
                        {data?.value && (
                          <div className="col-md-6">
                            <div className="d-flex flex-column">
                              <span className="text-16 fw-600">
                                Cancellation policy
                              </span>
                              <div className="interweave-content text-15 mt-10">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: hydratedData.value,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
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
