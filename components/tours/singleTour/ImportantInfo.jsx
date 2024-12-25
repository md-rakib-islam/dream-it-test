import { Interweave } from "interweave";
import { useSelector } from "react-redux";

const ImportantInfo = () => {
  const { tourItem } = useSelector((state) => state.tour);
  return (
    <div className="row x-gap-40 y-gap-40 justify-between pt-20">
      <div className="col-lg-4 col-md-6">
        <div className="fw-600 mb-10">Inclusions</div>
        <div className="interweave-content">
          <Interweave
            allowAttributes
            allowElements
            disableLineBreaks={false}
            content={tourItem?.inclution}
          />
        </div>
      </div>

      {tourItem?.knw_before_go && (
        <div className="col-lg-5 col-md-6">
          <div className="fw-600 mb-10">Know before you go</div>
          <div className="interweave-content">
            <Interweave
              allowAttributes
              allowElements
              disableLineBreaks={false}
              content={tourItem?.knw_before_go}
            />
          </div>
        </div>
      )}

      {tourItem?.exclusion && (
        <div className="col-lg-3 col-md-6">
          <div className="fw-600 mb-10">Exclusions</div>

          <div className="interweave-content">
            <Interweave
              allowAttributes
              allowElements
              disableLineBreaks={false}
              content={tourItem?.exclusion}
            />
          </div>
        </div>
      )}

      {tourItem?.additional_info && (
        <div className="col-12">
          <div className="fw-600 mb-10">Additional information</div>
          <div className="interweave-content">
            <Interweave
              allowAttributes
              allowElements
              disableLineBreaks={false}
              content={tourItem?.additional_info}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportantInfo;
