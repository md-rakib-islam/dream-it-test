// import aboutImg from "@/public/img/pages/about/about.webp";
import Image from "next/image";
const Block1 = () => {
  return (
    <>
      <div className="col-lg-5">
        <h2 className="text-30 fw-600">About Dream Tourism</h2>
        <p className="mt-5">Where Journeys Become Spiritual Narratives</p>
        <p className="text-dark-1 mt-30 lg:mt-40 md:mt-20">
          Once upon a time, nestled in the heart of Rome, there was a team of
          travel enthusiasts who shared one common passion: to turn ordinary
          vacations into extraordinary adventures. That team was us – Dream
          Tourism!
          <br />
          <br />
          Our story began with a simple idea: to create unforgettable
          experiences for travelers like you. Armed with a deep love for
          exploration and a knack for planning, we set out to redefine what it
          means to travel.
          <br />
          <br />
          Picture this: skipping the long lines and diving straight into the
          wonders of the Colosseum. Feeling the awe-inspiring presence of
          history at the Vatican. Exploring the hidden gems of Capri and
          uncovering the secrets of Pompeii. These were the dreams we wanted to
          turn into reality for every traveler who crossed our path.
          <br />
          <br />
          From the moment we opened our doors in 2016, our journey has been
          nothing short of magical. We've whisked adventurers away on
          captivating tours across Europe – from the charming streets of Germany
          to the sun-kissed shores of Spain.
          <br />
          <br />
          But our success isn't just measured by the miles we've traveled or the
          landmarks we've seen. It's measured by the smiles on the faces of our
          customers, by the memories we've helped create, and by the stories
          that live on long after the journey ends.
          <br />
          <br />
          With over 10,000 travelers served and countless rave reviews on
          platforms like Viator and TripAdvisor, we've earned our stripes as one
          of the top travel companies in the business. But for us, it's not
          about accolades or awards – it's about sharing our passion for travel
          with the world.
          <br />
          <br />
          So, whether you're a seasoned explorer or a first-time adventurer, we
          invite you to join us on a journey like no other. Let's turn your
          travel dreams into unforgettable stories with dreamtourism.co.uk.
          After all, the best stories are the ones we live.
          <br />
          <br />
          Need your feedback and input so I can make it better or just perfect.
        </p>
      </div>
      {/* End .col */}

      <div className="col-lg-6">
        <Image
          unoptimized
          width={400}
          height={400}
          src="/img/pages/about/about.webp"
          alt="image"
          className="rounded-4 w-100"
        />
      </div>
      {/* End .col */}
    </>
  );
};

export default Block1;
