import { Interweave } from "interweave";
import { useState } from "react";
import { useSelector } from "react-redux";
const Overview = () => {
  const { tourItem } = useSelector((state) => state.tour);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Function to toggle between showing full description or half of it
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Calculate the length for displaying half of the description
  const halfLength = Math.ceil(tourItem?.description.length / 2);
  return (
    <>
      <div className="row x-gap-40 y-gap-40">
        <div className="col-12 text-dark-1 text-15">
          <h3 className="text-22 fw-600">Overview</h3>
          <div className="interweave-content">
            <Interweave
              allowAttributes
              allowElements
              disableLineBreaks={true}
              content={
                showFullDescription
                  ? tourItem?.description
                  : tourItem?.description.slice(0, halfLength)
              }
            />
          </div>

          <button
            id="cancle-section"
            className="d-block lh-15 text-14 text-blue-1 underline fw-600 mt-5"
            onClick={toggleDescription}
          >
            {showFullDescription ? "See Less" : "See More"}
          </button>
        </div>

        {tourItem?.languages && (
          <div className="col-md-6">
            <h5 className="text-16 fw-600">Available languages</h5>
            <div className="text-15 mt-10">{tourItem?.languages}</div>
          </div>
        )}

        {tourItem?.value && (
          <div className="col-md-6">
            <h5 className="text-16 fw-600">Cancellation policy</h5>
            <div className="interweave-content">
              <Interweave
                allowAttributes
                allowElements
                disableLineBreaks={true}
                content={tourItem?.value}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Overview;
