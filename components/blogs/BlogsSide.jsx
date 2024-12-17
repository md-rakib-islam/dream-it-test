import Image from "next/image";

const BlogsSide = () => {
  const filterOptions = [
    { label: "Art and culture", value: "art_culture" },
    { label: "Beaches", value: "beaches" },
    { label: "Adventure travel", value: "adventure_travel" },
    { label: "Explore", value: "explore" },
    { label: "Family holidays", value: "family_holidays" },
    { label: "Air travel", value: "air_travel" },
    { label: "Food and drink", value: "food_drink" },
    // add more options as needed
  ];
  return (
    <>
      <div className="row x-gap-20 y-gap-20">
        <div className="col-12">
          <div className="blog-sidebar">
            <div className="mb-20">
              <h5> My Personal Favarite </h5>
            </div>
            <div className="d-flex justify-between mb-20">
              <Image src="/img/blogs/blog.jpg" width={150} height={50}></Image>
              <div className="ml-10">
                <h2 className="text-18 ">This is the Demo Post Title </h2>
                <p>Read More</p>
              </div>
            </div>
            <div className="d-flex justify-between mb-20">
              <Image src="/img/blogs/blog.jpg" width={150} height={50}></Image>
              <div className="ml-10">
                <h2 className="text-18 ">This is the Demo Post Title </h2>
                <p>Read More</p>
              </div>
            </div>
            <div className="d-flex justify-between mb-20">
              <Image src="/img/blogs/blog.jpg" width={150} height={50}></Image>
              <div className="ml-10">
                <h2 className="text-18 ">This is the Demo Post Title </h2>
                <p>Read More</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="blog-sidebar">
            <div className="mb-30 mt-20">
              <h5> Categories</h5>
            </div>
            <div className="category">
              <ul>
                {filterOptions.map((option) => (
                  <li>{option.label}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="blog-sidebar">
            <div className="mb-30 mt-20">
              <h5> Sponsor</h5>
            </div>
            <div className="sponsor">
              <div className="sponsor-contetn">
                <div
                  className={`sponsor-bg`}
                  style={{
                    backgroundImage:
                      "url(https://blog.dreamtourism.co.uk/wp-content/uploads/2024/07/public-2-1024x682.jpg)",
                  }}
                >
                  <div className="sponsor-overlay"></div>
                </div>
              </div>
              <div className="sponsor-text-content">
                <h2 className="sm:text-20"> Capri Island Day Trip </h2>
                <button
                  //   disabled={!email || isLoading}
                  //   onClick={handleSubmit}
                  className="mt-15 px-20 py-10 fw-500 text-14 border-white -outline-white   text-white   pointer"
                >
                  Book Now
                </button>
              </div>
              <div className="sponsor-conter-text">
                <div className="conter-text"> SELLING FAST</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="blog-sidebar">
            <div className="mb-20 mt-20">
              <h5> Explore</h5>
            </div>
            <div className="explore mb-20">
              <div className="explore-contetn">
                <div
                  className={`explore-bg`}
                  style={{
                    backgroundImage:
                      "url(https://blog.dreamtourism.co.uk/wp-content/uploads/2024/07/public-2-1024x682.jpg)",
                  }}
                >
                  <div className="explore-overlay"></div>
                </div>
              </div>
              <div className="explore-text-content">
                <h2 className="sm:text-20">
                  Colosseum Full Experience With Arena Ticket{" "}
                </h2>
                <button
                  //   disabled={!email || isLoading}
                  //   onClick={handleSubmit}
                  className="mt-15 px-20 fw-500 text-14 border-white -outline-white h-50 text-white   pointer"
                >
                  Book Now
                </button>
              </div>
            </div>
            <div className="explore mb-20">
              <div className="explore-contetn">
                <div
                  className={`explore-bg`}
                  style={{
                    backgroundImage:
                      "url(https://blog.dreamtourism.co.uk/wp-content/uploads/2024/07/public-2-1024x682.jpg)",
                  }}
                >
                  <div className="explore-overlay"></div>
                </div>
              </div>
              <div className="explore-text-content">
                <h2> Capri Island Tour With Blue Grotto </h2>
                <button
                  //   disabled={!email || isLoading}
                  //   onClick={handleSubmit}
                  className="mt-15 px-20 fw-500 text-14 border-white -outline-white h-50 text-white   pointer"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsSide;
