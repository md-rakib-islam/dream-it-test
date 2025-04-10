"use client";

import { useEffect, useState } from "react";

const ImportantInfo = ({ data }) => {
  const [hydratedData, setHydratedData] = useState({});

  useEffect(() => {
    setHydratedData(data);
  }, [data]);

  if (!hydratedData) {
    return null; // or a loading spinner
  }

  // Styles to ensure horizontal layout
  const containerStyle = {
    display: "table",
    width: "100%",
    borderCollapse: "collapse",
  };

  const rowStyle = {
    display: "table-row",
    borderBottom: "1px solid #e5e7eb",
    marginBottom: "2rem",
  };

  const titleCellStyle = {
    display: "table-cell",
    width: "25%",
    paddingRight: "1rem",
    paddingBottom: "2rem",
    verticalAlign: "top",
  };

  const contentCellStyle = {
    display: "table-cell",
    width: "75%",
    paddingBottom: "2rem",
    verticalAlign: "top",
  };

  return (
    <div className="pt-20">
      <div style={containerStyle}>
        {hydratedData.inclution && (
          <div style={rowStyle}>
            <div style={titleCellStyle}>
              <div className="fw-600 mb-10">Inclusions</div>
            </div>
            <div style={contentCellStyle}>
              <div className="interweave-content">
                <div
                  dangerouslySetInnerHTML={{
                    __html: hydratedData.inclution,
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {hydratedData.knw_before_go && (
          <div style={rowStyle}>
            <div style={titleCellStyle}>
              <div className="fw-600 mb-10">Know before you go</div>
            </div>
            <div style={contentCellStyle}>
              <div className="interweave-content">
                <div
                  dangerouslySetInnerHTML={{
                    __html: hydratedData.knw_before_go,
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {hydratedData.exclusion && (
          <div style={rowStyle}>
            <div style={titleCellStyle}>
              <div className="fw-600 mb-10">Exclusions</div>
            </div>
            <div style={contentCellStyle}>
              <div className="interweave-content">
                <div
                  dangerouslySetInnerHTML={{
                    __html: hydratedData.exclusion,
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {hydratedData.additional_info && (
          <div style={rowStyle}>
            <div style={titleCellStyle}>
              <div className="fw-600 mb-10">Additional information</div>
            </div>
            <div style={contentCellStyle}>
              <div className="interweave-content">
                <div
                  dangerouslySetInnerHTML={{
                    __html: hydratedData.additional_info,
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportantInfo;
