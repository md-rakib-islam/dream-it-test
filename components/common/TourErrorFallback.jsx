"use client";

const TourErrorFallback = () => {
  return (
    <div className="container pt-40 pb-40">
      <div className="text-center">
        <h1 className="text-30 fw-600 mb-20">Unable to Load Tour</h1>
        <p className="text-15 text-light-1 mb-30">
          We're experiencing technical difficulties loading this tour. Please try again in a moment.
        </p>
        <div className="d-flex gap-20 justify-content-center">
          <button 
            onClick={() => window.location.reload()} 
            className="button h-50 px-24 -blue-1 bg-blue-1 text-white"
          >
            Try Again
          </button>
          <a href="/tours" className="button h-50 px-24 -blue-1 bg-blue-1-05 text-blue-1">
            Browse All Tours
          </a>
        </div>
      </div>
    </div>
  );
};

export default TourErrorFallback;