const TourSnapShot = ({ data }) => {
  return (
    <div className="aboutTour">
      <div className="row y-gap-20">
        <div className="col-12">
          <div className="d-flex">
            <div className="size-30 flex-center">
              <i className="icon-calendar-2 text-22 text-blue-1"></i>
            </div>
            <div className="ml-10">
              <div className="text-16 fw-500 text-dark-1">
                Free cancellation
              </div>
              <div className="text-14 lh-16 text-light-1 mt-5">
                Cancel up to 24 hours in advance for a full refund
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="d-flex">
            <div className="size-30 flex-center">
              <i className="icon-wallet text-22 text-blue-1"></i>
            </div>
            <div className="ml-10">
              <div className="text-16 fw-500 text-dark-1">
                Reserve now & pay later
              </div>
              <div className="text-14 lh-16 text-light-1 mt-5">
                Keep your travel plans flexible — book your spot and pay nothing
                today.
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="d-flex">
            <div className="size-30 flex-center">
              <i className="icon-clock text-22 text-blue-1"></i>
            </div>
            <div className="ml-10">
              <div className="text-16 fw-500 text-dark-1">
                Duration {data?.duration}
              </div>
              <div className="text-14 lh-16 text-light-1 mt-5">
                Check availability to see starting times.
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="d-flex">
            <div className="size-30 flex-center">
              <i className="icon-ticket text-22 text-blue-1"></i>
            </div>
            <div className="ml-10">
              <div className="text-16 fw-500 text-dark-1">
                Skip the ticket line
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="d-flex">
            <div className="size-30 flex-center">
              <i className="icon-customer text-22 text-blue-1"></i>
            </div>
            <div className="ml-10">
              <div className="text-16 fw-500 text-dark-1">Live tour guide</div>
              <div className="text-14 lh-16 text-light-1 mt-5">
                {data?.languages || "English"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourSnapShot;
