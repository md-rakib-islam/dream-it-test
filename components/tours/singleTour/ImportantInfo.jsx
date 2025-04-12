"use client"

import { useEffect, useState } from "react"

const ImportantInfo = ({ data }) => {
  const [hydratedData, setHydratedData] = useState({})
  const [openSection, setOpenSection] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setHydratedData(data)

    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [data])

  if (!hydratedData) {
    return null // or a loading spinner
  }

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null)
    } else {
      setOpenSection(section)
    }
  }

  // Desktop layout
  const desktopLayout = (
    <div className="pt-20">
      <div style={{ display: "table", width: "100%", borderCollapse: "collapse" }}>
        {hydratedData.inclution && (
          <div style={{ display: "table-row", borderBottom: "1px solid #e5e7eb", marginBottom: "2rem" }}>
            <div
              style={{
                display: "table-cell",
                width: "25%",
                paddingRight: "1rem",
                paddingBottom: "2rem",
                verticalAlign: "top",
              }}
            >
              <div className="fw-600 mb-10">Inclusions</div>
            </div>
            <div style={{ display: "table-cell", width: "75%", paddingBottom: "2rem", verticalAlign: "top" }}>
              <div className="interweave-content">
                <div dangerouslySetInnerHTML={{ __html: hydratedData.inclution }}></div>
              </div>
            </div>
          </div>
        )}

        {hydratedData.knw_before_go && (
          <div style={{ display: "table-row", borderBottom: "1px solid #e5e7eb", marginBottom: "2rem" }}>
            <div
              style={{
                display: "table-cell",
                width: "25%",
                paddingRight: "1rem",
                paddingBottom: "2rem",
                verticalAlign: "top",
              }}
            >
              <div className="fw-600 mb-10">Know before you go</div>
            </div>
            <div style={{ display: "table-cell", width: "75%", paddingBottom: "2rem", verticalAlign: "top" }}>
              <div className="interweave-content">
                <div dangerouslySetInnerHTML={{ __html: hydratedData.knw_before_go }}></div>
              </div>
            </div>
          </div>
        )}

        {hydratedData.exclusion && (
          <div style={{ display: "table-row", borderBottom: "1px solid #e5e7eb", marginBottom: "2rem" }}>
            <div
              style={{
                display: "table-cell",
                width: "25%",
                paddingRight: "1rem",
                paddingBottom: "2rem",
                verticalAlign: "top",
              }}
            >
              <div className="fw-600 mb-10">Exclusions</div>
            </div>
            <div style={{ display: "table-cell", width: "75%", paddingBottom: "2rem", verticalAlign: "top" }}>
              <div className="interweave-content">
                <div dangerouslySetInnerHTML={{ __html: hydratedData.exclusion }}></div>
              </div>
            </div>
          </div>
        )}

        {hydratedData.additional_info && (
          <div style={{ display: "table-row", borderBottom: "1px solid #e5e7eb", marginBottom: "2rem" }}>
            <div
              style={{
                display: "table-cell",
                width: "25%",
                paddingRight: "1rem",
                paddingBottom: "2rem",
                verticalAlign: "top",
              }}
            >
              <div className="fw-600 mb-10">Additional information</div>
            </div>
            <div style={{ display: "table-cell", width: "75%", paddingBottom: "2rem", verticalAlign: "top" }}>
              <div className="interweave-content">
                <div dangerouslySetInnerHTML={{ __html: hydratedData.additional_info }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  // Mobile accordion layout
  const mobileLayout = (
    <div className="pt-20">
      {hydratedData.inclution && (
        <div className="border-b">
          <div
            className="py-4 cursor-pointer"
            onClick={() => toggleSection("inclusions")}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <div className="fw-600">Inclusions</div>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderStyle: "solid",
                borderWidth: "0 2px 2px 0",
                display: "inline-block",
                padding: "3px",
                transform: openSection === "inclusions" ? "rotate(-135deg)" : "rotate(45deg)",
                transition: "transform 0.2s ease",
              }}
            ></div>
          </div>
          {openSection === "inclusions" && (
            <div className="pb-4">
              <div className="interweave-content">
                <div dangerouslySetInnerHTML={{ __html: hydratedData.inclution }}></div>
              </div>
            </div>
          )}
        </div>
      )}

      {hydratedData.knw_before_go && (
        <div className="border-b">
          <div
            className="py-4 cursor-pointer"
            onClick={() => toggleSection("know_before")}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <div className="fw-600">Know before you go</div>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderStyle: "solid",
                borderWidth: "0 2px 2px 0",
                display: "inline-block",
                padding: "3px",
                transform: openSection === "know_before" ? "rotate(-135deg)" : "rotate(45deg)",
                transition: "transform 0.2s ease",
              }}
            ></div>
          </div>
          {openSection === "know_before" && (
            <div className="pb-4">
              <div className="interweave-content">
                <div dangerouslySetInnerHTML={{ __html: hydratedData.knw_before_go }}></div>
              </div>
            </div>
          )}
        </div>
      )}

      {hydratedData.exclusion && (
        <div className="border-b">
          <div
            className="py-4 cursor-pointer"
            onClick={() => toggleSection("exclusions")}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <div className="fw-600">Exclusions</div>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderStyle: "solid",
                borderWidth: "0 2px 2px 0",
                display: "inline-block",
                padding: "3px",
                transform: openSection === "exclusions" ? "rotate(-135deg)" : "rotate(45deg)",
                transition: "transform 0.2s ease",
              }}
            ></div>
          </div>
          {openSection === "exclusions" && (
            <div className="pb-4">
              <div className="interweave-content">
                <div dangerouslySetInnerHTML={{ __html: hydratedData.exclusion }}></div>
              </div>
            </div>
          )}
        </div>
      )}

      {hydratedData.additional_info && (
        <div className="border-b">
          <div
            className="py-4 cursor-pointer"
            onClick={() => toggleSection("additional")}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <div className="fw-600">Additional information</div>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderStyle: "solid",
                borderWidth: "0 2px 2px 0",
                display: "inline-block",
                padding: "3px",
                transform: openSection === "additional" ? "rotate(-135deg)" : "rotate(45deg)",
                transition: "transform 0.2s ease",
              }}
            ></div>
          </div>
          {openSection === "additional" && (
            <div className="pb-4">
              <div className="interweave-content">
                <div dangerouslySetInnerHTML={{ __html: hydratedData.additional_info }}></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )

  return isMobile ? mobileLayout : desktopLayout
}

export default ImportantInfo
