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
  return (
    <div className="row x-gap-40 y-gap-40 justify-between pt-20">
      <div className="col-lg-4 col-md-6">
        <div className="fw-600 mb-10">Inclusions</div>
        <div className="interweave-content">
          {/* <Interweave
            allowAttributes
            allowElements
            disableLineBreaks={false}
            content={hydratedData.inclution}
          /> */}
          <div
            dangerouslySetInnerHTML={{
              __html: hydratedData.inclution,
            }}
          ></div>
        </div>
      </div>

      {hydratedData.knw_before_go && (
        <div className="col-lg-5 col-md-6">
          <div className="fw-600 mb-10">Know before you go</div>
          <div className="interweave-content">
            {/* <Interweave
              allowAttributes
              allowElements
              disableLineBreaks={false}
              content={hydratedData.knw_before_go}
            /> */}
            <div
              dangerouslySetInnerHTML={{
                __html: hydratedData.knw_before_go,
              }}
            ></div>
          </div>
        </div>
      )}

      {hydratedData.exclusion && (
        <div className="col-lg-3 col-md-6">
          <div className="fw-600 mb-10">Exclusions</div>

          <div className="interweave-content">
            {/* <Interweave
              allowAttributes
              allowElements
              disableLineBreaks={false}
              conte
              nt={hydratedData.exclusion}
            /> */}
            <div
              dangerouslySetInnerHTML={{
                __html: hydratedData.exclusion,
              }}
            ></div>
          </div>
        </div>
      )}

      {hydratedData.additional_info && (
        <div className="col-12">
          <div className="fw-600 mb-10">Additional information</div>
          <div className="interweave-content">
            {/* <Interweave
              allowAttributes
              allowElements
              disableLineBreaks={false}
              content={hydratedData.additional_info}
            /> */}
            <div
              dangerouslySetInnerHTML={{
                __html: hydratedData.additional_info,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportantInfo;
