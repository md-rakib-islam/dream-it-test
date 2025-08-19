import SharePage from "./SharePage";
import TourSinglePage from "./TourSinglePage";

const TourSingle = ({ children, data, fullUrl, itenarayItems }) => {
  // Refs for scrolling to sections

  return (
    <>
      <div className="header-margin"></div>
      {/* header top margin */}
      <SharePage fullUrl={fullUrl} children={children} />

      {/* End .col */}

      {/* End .col */}

      {/* End gallery grid wrapper */}

      <TourSinglePage tourData={data} itenarayItems={itenarayItems} />
    </>
  );
};

export default TourSingle;
