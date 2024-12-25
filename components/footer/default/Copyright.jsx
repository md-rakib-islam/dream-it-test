// import Social from "@/components/common/social/Social";

const Copyright = () => {
  return (
    <div className="row justify-between items-center y-gap-10">
      <div className="col-auto">
        <div className="row x-gap-30 y-gap-10">
          <div className="col-auto">
            <div className="d-flex items-center">
              Copyright © 2024
              <a
                href="https://dreamtourism.it"
                className="mx-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dream Tourism SRLS
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="col-auto">
        <div className="row y-gap-10 items-center">
          <div className="col-auto">
            <div className="d-flex x-gap-20 items-center">
              {/* <Social /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Copyright;
