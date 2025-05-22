import Image from "next/image";

const TripReview = ({ title }) => {
  const normalizedTitle = title?.toLowerCase();

  const fourStar = normalizedTitle?.includes("colosseum, roman forum,");
  const nullStar =
    normalizedTitle?.includes("visit europe in summer holiday") ||
    normalizedTitle?.includes("dream meets the blue") ||
    normalizedTitle?.includes(
      "capri island day trip from rome with blue grotto"
    );
  const fiveStar =
    normalizedTitle?.includes("capri island day trip from rome by bus") &&
    !nullStar;

  let stars = 0;

  if (fourStar) {
    stars = 4;
  } else if (fiveStar) {
    stars = 5;
  } else if (nullStar) {
    stars = 0;
  }

  const renderStars = () => {
    const fullStar = (
      <path
        fill="#00aa6c"
        d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z"
      />
    );

    const halfStar = (
      <path
        fill="#00aa6c"
        d="M 12 0C5.389 0 0 5.389 0 12c0 6.62 5.389 12 12 12 6.62 0 12-5.379 12-12S18.621 0 12 0zm0 2a9.984 9.984 0 0110 10 9.976 9.976 0 01-10 10z"
      />
    );

    const emptyStar = (
      <path
        fill="#00aa6c"
        d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12zm0 2a9.983 9.983 0 019.995 10 10 10 0 01-10 10A10 10 0 012 12 10 10 0 0112 2z"
      />
    );

    const starPaths = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(stars)) {
        starPaths.push(
          <g key={i} transform={`translate(${i * 26} 0)`}>
            {fullStar}
          </g>
        );
      } else if (i === Math.floor(stars) && stars % 1 !== 0) {
        starPaths.push(
          <g key={i} transform={`translate(${i * 26} 0)`}>
            {halfStar}
          </g>
        );
      } else {
        starPaths.push(
          <g key={i} transform={`translate(${i * 26} 0)`}>
            {emptyStar}
          </g>
        );
      }
    }

    return starPaths;
  };

  return (
    <div className="d-flex x-gap-5 items-center">
      <div className="trip-advisor-icon mr-4">
        <Image
          height={411}
          width={640}
          priority={true}
          src="https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/c58745ac-f736-4a19-8692-edea09e1dc00/public"
          alt="review"
        />
      </div>

      <svg
        className="UctUV d H0 hzzSG my-svg"
        viewBox="0 0 128 24"
        width="88"
        height="16"
        aria-labelledby=":lithium-rcs:"
      >
        <title id=":lithium-rcs:" />
        {renderStars()}
      </svg>
    </div>
  );
};

export default TripReview;
