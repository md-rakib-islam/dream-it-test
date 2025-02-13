// import CategoryTypes from "../sidebar/CategoryTypes";
// import OthersFilter from "../sidebar/OthersFilter";
// import Duration from "../sidebar/Duration";
// import Languages from "../sidebar/Languages";
// import PirceSlider from "../sidebar/PirceSlider";
import MainFilterSearchBox from "./MainFilterSearchBox";
import CategoryTypes from "./sidebar/CategoryTypes";
import Duration from "./sidebar/Duration";
import Languages from "./sidebar/Languages";
import OthersFilter from "./sidebar/OthersFilter";
import PirceSlider from "./sidebar/PirceSlider";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar__item -no-border">
        <div className="px-20 py-20 bg-light-2 rounded-4">
          <span className="text-18 fw-500 mb-10">Search Tours</span>

          <div className="row y-gap-20 pt-20">
            <MainFilterSearchBox />
          </div>
        </div>
      </div>
      {/* End search tours */}

      <div className="sidebar__item -no-border">
        <span className="text-18 fw-500 mb-10">Category Types</span>
        <div className="sidebar-checkbox">
          <CategoryTypes />
        </div>
        {/* End Sidebar-checkbox */}
      </div>
      {/* End popular filter */}

      <div className="sidebar__item">
        <span className="text-18 fw-500 mb-10">Other</span>
        <div className="sidebar-checkbox">
          <OthersFilter />
        </div>
        {/* End Sidebar-checkbox */}
      </div>
      {/* End Aminities filter */}

      <div className="sidebar__item pb-30">
        <span className="text-18 fw-500 mb-10">Price</span>
        <div className="row x-gap-10 y-gap-30">
          <div className="col-12">
            <PirceSlider />
          </div>
        </div>
      </div>
      {/* End Nightly priceslider */}

      <div className="sidebar__item">
        <span className="text-18 fw-500 mb-10">Duration</span>
        <div className="sidebar-checkbox">
          <Duration />
        </div>
      </div>
      {/* End style filter */}

      <div className="sidebar__item">
        <span className="text-18 fw-500 mb-10">Languages</span>
        <div className="sidebar-checkbox">
          <Languages />
        </div>
        {/* End Sidebar-checkbox */}
      </div>
      {/* End Aminities filter */}
    </>
  );
};

export default Sidebar;
