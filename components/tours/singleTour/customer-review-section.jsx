import Image from "next/image";
import Link from "next/link";
import TripReview from "./../../common/TripReview";

const CustomerReviewSection = ({ data }) => {
  // Default values if data is not provided
  const reviewCount = data?.numberOfReviews || 838;
  const overallRating = 4.0; // Fixed to 4.0 as requested
  const guideRating = data?.guideRating || 4.8;
  const transportationRating = data?.transportationRating || 4.8;
  const valueRating = data?.valueRating || 4.7;

  return (
    <section className="pt-40">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="d-flex items-center justify-between">
              <h3 className="text-22 fw-600">
                Customer reviews{" "}
                <i className="icon-info text-14 text-light-1 ml-5"></i>
              </h3>
              <Link href="/reviews" className="text-14 text-blue-1">
                See all {reviewCount} reviews
              </Link>
            </div>
            <div className="row y-gap-30 pt-20">
              <div className="col-md-5">
                <div className="d-flex flex-column items-center">
                  <h2 className="text-40 fw-600 text-dark-1">
                    {overallRating}
                    <span className="text-22 text-light-1">/5</span>
                  </h2>

                  {/* Added TripReview component here */}
                  <div className="mt-15 scale-125">
                    {" "}
                    {/* Added scale-125 to make it bigger */}
                    <TripReview title={data?.name?.toLowerCase()} />
                  </div>

                  <p className="text-14 text-light-1 mt-20">
                    based on {reviewCount} reviews
                  </p>
                </div>
              </div>

              <div className="col-md-7">
                <h4 className="text-18 fw-500 mb-20">Review summary</h4>

                <div className="row y-gap-20">
                  <div className="col-12">
                    <div className="d-flex items-center justify-between">
                      <div className="text-15 fw-500">Guide</div>
                      <div className="text-15 fw-500">{guideRating}/5</div>
                    </div>
                    <div className="progressBar mt-10">
                      <div className="progressBar__bg bg-blue-2"></div>
                      <div
                        className="progressBar__bar bg-yellow-1"
                        style={{ width: `${(guideRating / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="d-flex items-center justify-between">
                      <div className="text-15 fw-500">Transportation</div>
                      <div className="text-15 fw-500">
                        {transportationRating}/5
                      </div>
                    </div>
                    <div className="progressBar mt-10">
                      <div className="progressBar__bg bg-blue-2"></div>
                      <div
                        className="progressBar__bar bg-yellow-1"
                        style={{
                          width: `${(transportationRating / 5) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="d-flex items-center justify-between">
                      <div className="text-15 fw-500">Value for money</div>
                      <div className="text-15 fw-500">{valueRating}/5</div>
                    </div>
                    <div className="progressBar mt-10">
                      <div className="progressBar__bg bg-blue-2"></div>
                      <div
                        className="progressBar__bar bg-yellow-1"
                        style={{ width: `${(valueRating / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-top-light mt-40 pt-40">
              <div className="row y-gap-30">
                <div className="col-12">
                  <div className="row justify-between items-center">
                    {/* Available languages section (left side) */}
                    {data?.languages && (
                      <div className="col-md-6">
                        <span className="text-16 fw-600">
                          Available languages
                        </span>
                        <div className="text-15 mt-10">{data?.languages}</div>
                      </div>
                    )}

                    {/* Cancellation policy section (right side) */}
                    {data?.value && (
                      <div className="col-md-6">
                        <span className="text-16 fw-600">
                          Cancellation policy
                        </span>
                        <div className="interweave-content">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: data.value,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviewSection;
