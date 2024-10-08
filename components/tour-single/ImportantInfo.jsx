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

        {/* <ul className="list-disc">
          <li>Superior Coach, Wi-Fi and USB Charging On-board</li>
          <li>Expert guide</li>
          <li>Admission to Windsor Castle (if option selected)</li>
          <li>Admission to Stonehenge</li>
        </ul> */}
      </div>

      {/* {tourItem?.name?.toLowerCase()?.includes("colosseum") ||
      tourItem?.name?.toLowerCase()?.includes("capri") ? (
        ""
      ) : (
        <div className="col-lg-4 col-md-6">
          <div className="fw-600 mb-10">Departure details</div>
          <div className="text-15">
            Our service includes convenient traveler pickup within the Makkah
            City area, within a distance not exceeding 9 kilometers from your
            hotel. We are pleased to offer pickup services for all tourists and
            Umrah pilgrims from their respective hotels. We ensure a timely and
            efficient pickup process to make your journey as smooth as possible.
            Please be ready for pickup at your hotel within the specified
            distance limit in the Makkah City area.
          </div>
        </div>
      )} */}

      <div className="col-lg-5 col-md-6">
        <div className="fw-600 mb-10">Know before you go</div>
        <ul className="list-disc">
          <li>Duration: {tourItem?.duration}</li>
          <li>Mobile tickets accepted</li>
          <li>Instant confirmation</li>
          {tourItem?.name?.toLowerCase()?.includes("colosseum") ? (
            <>
              <li>Confirmation will be received at the time of booking.</li>
              <li>Wheelchair accessible.</li>
              <li>Stroller accessible.</li>
              <li>Conveniently located near public transportation.</li>
              <li>Infants must sit on laps.</li>
              <li>Not recommended for travelers with back problems.</li>
              <li>Not recommended for pregnant travelers.</li>
              <li>Not suitable for individuals with heart problems</li>
              <li>Suitable for most travelers.</li>
            </>
          ) : tourItem?.name?.toLowerCase()?.includes("vatican museum") ? (
            <>
              <li>Confirmation will be received at the time of booking.</li>
              <li>Wheelchair accessible.</li>
              <li>Stroller accessible.</li>
              <li>Conveniently located near public transportation.</li>
              <li>Infants must sit on laps.</li>
              <li>Not recommended for travelers with back problems.</li>
              <li>Not recommended for pregnant travelers.</li>
              <li>Not suitable for individuals with heart problems</li>
              <li>
                Students (underage of 26) must have in possession of their valid
                student ID.
              </li>
              <li>
                Children less than 6 years old are free however they need to
                show the valid Photo ID.
              </li>
              <li>
                ONE MUST BE COVERED FROM THEIR SHOULDER DOWN TO THEIR KNEES.
              </li>
              <li>
                Children under the age of 18 must arrive with their valid ID.
              </li>
              <div className="fw-600 mb-10 mt-10">Not allowed</div>
              <li>Pets</li>
              <li>Shorts</li>
              <li>Weapons or sharp objects</li>
              <li>Short skirts</li>
              <li>Sleeveless shirts</li>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>

      <div className="col-lg-3 col-md-6">
        <div className="fw-600 mb-10">Exclusions</div>
        {/* <ul className="list-disc">
          <li>Hotel pick-up and drop-off</li>
          <li>Gratuities</li>
          <li>Lunch</li>
        </ul> */}
        <div className="interweave-content">
          <Interweave
            allowAttributes
            allowElements
            disableLineBreaks={false}
            content={tourItem?.exclusion}
          />
        </div>
      </div>

      <div className="col-12">
        <div className="fw-600 mb-10">Additional information</div>
        {tourItem?.name?.toLowerCase()?.includes("colosseum") ||
        tourItem?.name?.toLowerCase()?.includes("vatican") ? (
          <ul className="list-disc">
            <li>
              <span className="text-dark fw-600">Confirmation:</span> You will
              receive a confirmation at the time of booking.
            </li>
            <li>
              <span className="text-dark fw-600">Traveler Information:</span>{" "}
              Please provide the full names of all travelers when booking.
              Failure to present a voucher with all travelers' full names at the
              box office may result in denied entry to the Colosseum and Roman
              Forum.
            </li>
            <li>
              <span className="text-dark fw-600">Entry Validity:</span> The
              entry pass will be invalid 15 minutes after the designated entry
              time. Each traveler must present a valid passport or ID document
              that matches the name provided at the time of booking for
              successful entry to the Colosseum and Roman Forum.
            </li>
            <li>
              <span className="text-dark fw-600">Arrival Time:</span> Please
              arrive at the Colosseum entrance 15 minutes before your scheduled
              entry time.
            </li>
            <li>
              <span className="text-dark fw-600">Security Check:</span> Despite
              having priority access, all visitors must follow the queue for the
              security check.
            </li>

            <li>
              <span className="text-dark fw-600">Child Entry Pass:</span> To
              redeem the child entry pass (for those under 18), you must show a
              valid photo ID.
            </li>
            <li>
              <span className="text-dark fw-600">Refund Window:</span> This
              experience is non-refundable and cannot be changed for any reason.
              If you cancel or ask for an amendment, the amount you paid will
              not be refunded.
            </li>

            <li>
              <span className="text-dark fw-600">Participant Suitability:</span>{" "}
              Most travelers can participate.
            </li>
          </ul>
        ) : (
          <ul className="list-disc">
            <li>
              <span className="text-dark fw-600">Confirmation:</span> You will
              receive a confirmation at the time of booking.
            </li>
            <li>
              <span className="text-dark fw-600">Participant Suitability:</span>{" "}
              Most travelers can participate.
            </li>

            <li>
              <span className="text-dark fw-600">Refund Window:</span> To
              receive a full refund, please cancel at least{" "}
              {`${
                tourItem?.name
                  ?.toLowerCase()
                  ?.includes("dream meets the blue at santorini") ||
                tourItem?.name
                  ?.toLowerCase()
                  ?.includes("visit europe in summer holiday")
                  ? "15 days"
                  : "24 hours"
              }`}{" "}
              before the experience start date.
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ImportantInfo;
