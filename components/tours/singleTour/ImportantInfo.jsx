const ImportantInfo = ({ data }) => {
  return (
    <div className="row x-gap-40 y-gap-40 justify-between pt-20">
      <div className="col-lg-4 col-md-6">
        <div className="fw-600 mb-10">Inclusions</div>
        <div className="interweave-content">
          {/* <Interweave
            allowAttributes
            allowElements
            disableLineBreaks={false}
            content={data?.inclution}
          /> */}
          <div
            dangerouslySetInnerHTML={{
              __html: data?.inclution,
            }}
          ></div>
        </div>
      </div>

      {data?.knw_before_go && (
        <div className="col-lg-5 col-md-6">
          <div className="fw-600 mb-10">Know before you go</div>
          <div className="interweave-content">
            {/* <Interweave
              allowAttributes
              allowElements
              disableLineBreaks={false}
              content={data?.knw_before_go}
            /> */}
            <div
              dangerouslySetInnerHTML={{
                __html: data?.knw_before_go,
              }}
            ></div>
          </div>
        </div>
      )}

      {data?.exclusion && (
        <div className="col-lg-3 col-md-6">
          <div className="fw-600 mb-10">Exclusions</div>

          <div className="interweave-content">
            {/* <Interweave
              allowAttributes
              allowElements
              disableLineBreaks={false}
              conte
              nt={data?.exclusion}
            /> */}
            <div
              dangerouslySetInnerHTML={{
                __html: data?.exclusion,
              }}
            ></div>
          </div>
        </div>
      )}

      {data?.additional_info && (
        <div className="col-12">
          <div className="fw-600 mb-10">Additional information</div>
          <div className="interweave-content">
            {/* <Interweave
              allowAttributes
              allowElements
              disableLineBreaks={false}
              content={data?.additional_info}
            /> */}
            <div
              dangerouslySetInnerHTML={{
                __html: data?.additional_info,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportantInfo;
