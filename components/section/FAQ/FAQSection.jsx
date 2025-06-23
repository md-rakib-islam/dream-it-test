import TwoColumnFAQ from "@/components/common/TwoColumnFAQ";
import useWindowSize from "@/hooks/useWindowSize";
import React, { useContext } from "react";
import { LayoutContext } from "@/app/LayoutProvider";
import ExpandablesFAQ from "@/components/common/ExpandablesFAQ";

const FAQSection = () => {
  const width = useWindowSize();
  const isMobile = width > 768;
  const { toursFAQ } = useContext(LayoutContext);

  return (
    <div>
      {isMobile && (
        <section className="layout-pt-md layout-pb-md bg-light">
          <TwoColumnFAQ faqContent={toursFAQ} />
        </section>
      )}
      {!isMobile && (
        <section className="layout-pt-md layout-pb-md bg-light">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="text-center mb-5">
                  <h2 className="sectionTitle__title fw-600">
                    Frequently Asked Questions
                  </h2>
                </div>
              </div>
            </div>

            {/* Mobile View - Expandable FAQ */}
            <div className="d-block d-md-none">
              <ExpandablesFAQ faqContent={toursFAQ[0]?.description} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default FAQSection;
