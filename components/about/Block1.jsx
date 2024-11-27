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
      <div className="home2-about-section pt-120 mb-120">
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
      </div>
    </>
  );
};

export default Block1;
