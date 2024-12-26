// import { Interweave } from "interweave";
import { useState } from "react";
// import { useSelector } from "react-redux";
const Overview = ({ data }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Function to toggle between showing full description or half of it
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Calculate the length for displaying half of the description
  const halfLength = Math.ceil(data?.description.length / 2);
  return (
    <>
      <div className="row x-gap-40 y-gap-40">
        <div className="col-12 text-dark-1 text-15">
          <h3 className="text-22 fw-600 mb-40">Overview</h3>
          <div className="interweave-content">
            <div
              dangerouslySetInnerHTML={{
                __html: showFullDescription
                  ? data?.description
                  : data?.description.slice(0, halfLength),
              }}
            ></div>
            {/* <Interweave
              allowAttributes
              allowElements
              disableLineBreaks={true}
              content={
                showFullDescription
                  ? data?.description
                  : data?.description.slice(0, halfLength)
              }
            /> */}
          </div>

          <button
            id="cancle-section"
            className="d-block lh-15 text-14 text-blue-1 underline fw-500 mt-5"
            onClick={toggleDescription}
          >
            {showFullDescription ? "See Less" : "See More"}
          </button>
        </div>

        {data?.languages && (
          <div className="col-md-6">
            <h5 className="text-16 fw-600">Available languages</h5>
            <div className="text-15 mt-10">{data?.languages}</div>
          </div>
        )}

        {data?.value && (
          <div className="col-md-6">
            <h5 className="text-16 fw-600">Cancellation policy</h5>
            <div className="interweave-content">
              <div
                dangerouslySetInnerHTML={{
                  __html: data.value,
                }}
              ></div>
              {/* <Interweave
                allowAttributes
                allowElements
                disableLineBreaks={true}
                content={data?.value}
              /> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Overview;
