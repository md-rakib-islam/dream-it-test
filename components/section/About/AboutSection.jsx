import useWindowSize from "@/hooks/useWindowSize";
import OptimizedImage from "../../common/optimized/OptimizedImage";
import React from "react";
import Link from "next/link";

const AboutSection = () => {
  const width = useWindowSize();
  const isMobile = width > 768;
  return (
    <div>
      {!isMobile && (
        <section className="layout-pt-md layout-pb-md">
          <div className="container">
            <div className="row align-items-stretch">
              {/* Left side - Text content */}
              <div className="col-lg-12 col-md-12">
                <div className="  ">
                  <h2 className="sectionTitle__title fw-600">
                    Dream Tourism - Your Trusted Partner for Italy & Europe Tour
                    Tickets
                  </h2>
                  <p className="sectionTitle__text sm:mt-0 text-mobile-11 text align-center ">
                    Dream Tourism is your trusted partner for seamless travel
                    experiences across Italy and Europe. Specializing in
                    skip-the- line tickets for iconic attractions like the
                    Colosseum, Roman Forum, Palatine Hill, Vatican Museums, and
                    more. We help you maximize your time and explore at your own
                    pace. Our offerings also include exclusive access to top
                    destinations such as the Amalfi Coast, Florence, Venice, and
                    the Swiss Alps. Whether you’re booking a day trip or a
                    longer excursion, Dream Tourism ensures you can enjoy the
                    best of Europe without the hassle of long waits. With a
                    focus on convenience, customer satisfaction, and premium
                    service, we make your European adventure stress-free and
                    unforgettable.
                  </p>
                  {/* About Dream Tourism Button */}
                  <div className="pt-4 text-center">
                    <Link
                      href="/about"
                      className="button -md -blue-1 bg-blue-1-05 text-blue-1 inline-block"
                      aria-label="About Dream Tourism company and history"
                    >
                      About Dream Tourism
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End .container */}
        </section>
      )}
      {isMobile && (
        <section className="layout-pt-md layout-pb-md">
          <div className="container">
            <div className="row align-items-stretch">
              {/* Left side - Text content */}
              <div className="col-lg-8 col-md-6 d-flex flex-column">
                <div className="sectionTitle -md">
                  <h2 className="sectionTitle__title text-start">
                    Dream Tourism - Your Trusted Partner for Italy & Europe Tour
                    Tickets
                  </h2>
                  <p className="sectionTitle__text mt-5 text-start">
                    DreamTourism is your trusted UK-based European tour
                    operator, offering expertly crafted travel experiences
                    across iconic destinations like Paris, Rome, Amsterdam, and
                    the Swiss Alps. <br />
                    From scenic multi-day European tours to skip-the-line
                    attraction tickets and day trips, we make your journey
                    effortless and memorable. With customer-first service,
                    flexible booking, and deep local knowledge, DreamTourism
                    turns your European holiday dreams into reality.
                  </p>
                  {/* About Dream Tourism Button */}
                  <div className="pt-4 text-start">
                    <Link
                      href="/about"
                      className="button -md -blue-1 bg-blue-1-05 text-blue-1 d-inline-block"
                      aria-label="About Dream Tourism company and history"
                    >
                      About Dream Tourism
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right side - Image */}
              <div className="col-lg-4 col-md-6 d-flex align-items-center">
                <div className="w-100">
                  <OptimizedImage
                    src="/img/about/About Dream Tourism IT.png"
                    alt="European destinations including Paris, Rome, Amsterdam, and Swiss Alps"
                    width={325}
                    height={350}
                    className="img-fluid rounded-lg shadow-lg"
                    quality={80}
                    priority
                    variant="thumbnail"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AboutSection;
