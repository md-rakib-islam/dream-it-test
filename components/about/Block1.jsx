"use client";
import { useState } from "react";

import Image from "next/image";
const Block1 = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  // Function to toggle between showing full description or half of it
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const fullContent = `
    Once upon a time, nestled in the heart of Rome, there was a team of travel enthusiasts who shared one common passion: to turn ordinary vacations into extraordinary adventures. That team was us – Dream Tourism!

    Our story began with a simple idea: to create unforgettable experiences for travelers like you. Armed with a deep love for exploration and a knack for planning, we set out to redefine what it means to travel.

    Picture this: skipping the long lines and diving straight into the wonders of the Colosseum. Feeling the awe-inspiring presence of history at the Vatican. Exploring the hidden gems of Capri and uncovering the secrets of Pompeii. These were the dreams we wanted to turn into reality for every traveler who crossed our path.

    From the moment we opened our doors in 2016, our journey has been nothing short of magical. We've whisked adventurers away on captivating tours across Europe – from the charming streets of Germany to the sun-kissed shores of Spain.

    But our success isn't just measured by the miles we've traveled or the landmarks we've seen. It's measured by the smiles on the faces of our customers, by the memories we've helped create, and by the stories that live on long after the journey ends.

    With over 10,000 travelers served and countless rave reviews on platforms like Viator and TripAdvisor, we've earned our stripes as one of the top travel companies in the business. But for us, it's not about accolades or awards – it's about sharing our passion for travel with the world.

    So, whether you're a seasoned explorer or a first-time adventurer, we invite you to join us on a journey like no other. Let's turn your travel dreams into unforgettable stories with dreamtourism.co.uk. After all, the best stories are the ones we live.

    Need your feedback and input so I can make it better or just perfect.
  `;

  const truncatedContent = `
    Once upon a time, nestled in the heart of Rome, there was a team of travel enthusiasts who shared one common passion: to turn ordinary vacations into extraordinary adventures. That team was us – Dream Tourism!

    Our story began with a simple idea: to create unforgettable experiences for travelers like you. Armed with a deep love for exploration and a knack for planning, we set out to redefine what it means to travel.
  `;

  // Convert string content into an array of paragraphs using line breaks
  const getContentParagraphs = (content) => {
    return content
      .trim()
      .split("\n\n") // Split by double line breaks to get paragraphs
      .map((paragraph, index) => (
        <p key={index} className="text-dark-1 mt-10 text-justify">
          {paragraph}
        </p>
      ));
  };
  // Get all paragraphs from the full content
  const allParagraphs = getContentParagraphs(fullContent);

  // Determine which paragraphs to show
  const paragraphsToShow = showFullDescription
    ? allParagraphs
    : allParagraphs.slice(0, 3);
  return (
    <>
      {/* <div className="col-lg-5">
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

      <div className="col-lg-6">
        <Image
          unoptimized
          width={400}
          height={400}
          src="/img/pages/about/about.webp"
          alt="image"
          className="rounded-4 w-100"
        />
      </div> */}
      {/* new design as tripex */}
      {/* <div className="home2-about-section pt-120 mb-120">
        <div className="container">
          <div className="row mb-90">
            <div className="col-lg-6">
              <div className="about-content">
                <div className="section-title2 mb-30">
                  <div className="eg-section-tag">
                    <span>About Us</span>
                  </div>
                  <h2>We provide the best tour facilities.</h2>
                  {paragraphsToShow}
                  <button
                    id="cancle-section"
                    className="d-block lh-15 text-14 text-blue-1 underline fw-500 mt-5"
                    onClick={toggleDescription}
                  >
                    {showFullDescription ? "See Less" : "See More"}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center">
              <div className="about-img-wrap">
                <div className="about-img">
                  <Image
                    width={600}
                    height={600}
                    src="/img/pages/about/about.png"
                    alt=""
                    className="about-img"
                  />
                </div>
                <div className="experience">
                  <h3>12</h3>
                  <p>Years of experience</p>
                </div>
                <Image
                  width={400}
                  height={400}
                  src="/img/vector/plane-vector.svg"
                  alt=""
                  className="vector"
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="about-section-design">
        <div className="simple-image">
          <Image
            src="/img/about/svgviewer-output.svg"
            alt="About Image"
            width={273.95}
            height={300.42}
          ></Image>
        </div>
        <div className="simple-image-two">
          <Image
            src="/img/about/svgviewer-output.svg"
            alt="About Image"
            width={203.73}
            height={223.42}
          ></Image>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className=" text-center content">
                <div className="top-content">
                  <h2 className="mb-10">
                    About Dream Tourism SRLS: Your Trusted Travel Partner in
                    Italy
                  </h2>
                  <p>
                    At Dream Tourism, our mission is simple yet powerful:{" "}
                    <b>to make travel easy, memorable, and truly worthwhile.</b>{" "}
                    Founded with a passion for exploration and a deep
                    understanding of what travelers seek, we are dedicated to
                    providing exceptional experiences that go beyond
                    expectations. As avid travelers ourselves, we know how
                    important each journey is, and we've made it our mission to
                    offer the best service possible.
                  </p>
                </div>
                <div className="mt-40 mb-40 content-image">
                  <Image
                    src="/img/about/image.png"
                    alt="About Image"
                    width={844}
                    height={444}
                  ></Image>
                </div>
                <div className="main-content text-left">
                  <h5 className="text-left mb-10">What Sets Us Apart?</h5>
                  <p className="mb-10">
                    Dream Tourism is proud to be one of the{" "}
                    <b>largest suppliers of Colosseum and Vatican tickets,</b>{" "}
                    offering seamless access to Rome's most iconic sites. Our
                    exclusive tours in <b>Rome</b> and <b>Capri Island</b> stand
                    out due to our local expertise and commitment to
                    personalized service. Whether you’re skipping the ticket
                    line at the Colosseum or exploring the beauty of Capri, we
                    ensure a smooth, enriching experience.
                  </p>
                  <h5 className="mb-10">Our Popular Tours:</h5>

                  <p className="mb-10">
                    Our most sought-after offering is the Skip-the-Line
                    Colosseum Tour, designed to save you time while providing
                    in-depth insights into ancient history. We specialize in
                    Rome and its treasures, ensuring you experience the heart of
                    Italy with authenticity and ease.
                  </p>
                  <h5 className="mb-10">Our Values:</h5>

                  <p className="mb-10">
                    We believe in being an easy-to-reach, locally registered
                    company that travelers can trust. Our core values focus on
                    delivering the best customer service with genuine care,
                    ensuring that we provide you with the best things to do in
                    Rome.
                  </p>
                  <h5 className="mb-10">Meet Our Team:</h5>

                  <p className="mb-10">
                    Dream Tourism is powered by a team of professional customer
                    support executives, local expert guides, and passionate
                    hosts. Each member is committed to making your journey
                    unforgettable. From continuous communication after booking
                    to having a dedicated host for your Colosseum tour, we
                    prioritize your comfort and satisfaction.
                  </p>
                  <p className="mb-10">
                    With over 10,000 travelers served and countless rave reviews
                    on platforms like Viator and TripAdvisor, we've earned our
                    stripes as one of the top travel companies in the business.
                    But for us, it's not about accolades or awards – it's about
                    sharing our passion for travel with the world.
                  </p>
                  <h5 className="mb-10">Trusted Partnerships:</h5>

                  <p className="mb-10">
                    We are proud partners of leading platforms like TripAdvisor,
                    Viator, GetYourGuide, Klook, and many more. These
                    partnerships reflect our commitment to quality and
                    reliability in the global travel community.
                  </p>
                  <h5 className="mb-10">A Personal Promise:</h5>

                  <p>
                    "If you book with us, you’re not just purchasing a
                    tour—you’re securing the best travel experience in Rome. We
                    take care of the details, so you can focus on making
                    memories."
                  </p>
                </div>
                <div className="footer-content mt-40 mb-40">
                  {/* <div className="footer-content-image">
                    <Image
                      src="/img/about/svgviewer-output.svg"
                      alt="About Image"
                      width={185.51}
                      height={203.44}
                    ></Image>
                  </div> */}
                  <div className="content-details">
                    <div className="">
                      <p>Company registered name :</p>
                      <p>Registration Number : </p>
                      <p>PIVA: </p>
                      <p>Contact Number :</p>
                    </div>
                    <div className="">
                      <p>Dream Tourism SRLS</p>
                      <p>RM - 1575592</p>
                      <p>15216381002</p>
                      <p>+39 388 774 8015</p>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Block1;
