"use client";

import { slightContent } from "@/data/desinations";
import { useMobile } from "@/hooks/useMobile";
import { load } from "cheerio";

const IntroTown = ({ slug, data }) => {
  const isMobile = useMobile();
  let description = "";

  if (data) {
    description = data[0]?.description;
  }

  // Modify the parseHeadings function to extract the first <p> tag
  const parseHeadingsAndFirstParagraph = (html) => {
    const $ = load(html); // Load HTML into cheerio
    const headings = [];

    $("h1, h2, h3").each((index, element) => {
      const level = $(element).prop("tagName");
      const text = $(element).text().trim();
      const id = text.toLowerCase().replace(/\s+/g, "-");
      $(element).attr("id", id); // Add ID for anchor links
      headings.push({ id, text, level });
    });

    return { headings, updatedHTML: $.html() };
  };

  // Call the updated function
  const { headings, updatedHTML } = parseHeadingsAndFirstParagraph(description);

  // Content section component
  const ContentSection = () => (
    <div className="col-xl-8">
      <p className="text-15 text-dark-1">
        <div className="blog-content">
          <div
            dangerouslySetInnerHTML={{
              __html: updatedHTML || null,
            }}
          ></div>
        </div>
      </p>
    </div>
  );

  // Table of contents component
  const TableOfContents = () => (
    <div className="relative d-flex ml-35 xl:ml-0">
      {headings.length > 0 && (
        <div className="table-of-contents mb-30 mt-30">
          <h2 className="text-25 fw-600">Table of Contents</h2>

          <ul>
            {headings
              .reduce((acc, heading, index) => {
                const lastItem = acc[acc.length - 1];
                if (heading.level === "H2") {
                  acc.push({
                    text: `${acc.length + 1}. ${heading.text}`,
                    id: heading.id,
                    children: [],
                  });
                } else if (heading.level === "H3" && lastItem) {
                  lastItem.children.push({
                    text: `${acc.length}.${lastItem.children.length + 1} ${
                      heading.text
                    }`,
                    id: heading.id,
                  });
                }
                return acc;
              }, [])
              .map((heading, idx) => (
                <li key={idx}>
                  <a href={`#${heading.id}`}>{heading.text}</a>
                  {heading.children.length > 0 && (
                    <ul>
                      {heading.children.map((child, childIdx) => (
                        <li key={childIdx}>
                          <a href={`#${child.id}`}>{child.text}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );

  // Map component
  const MapSection = () => (
    <div className="relative d-flex ml-35 xl:ml-0">
      <iframe
        src={slightContent[slug]?.location}
        width="100%"
        height={300}
      ></iframe>

      <div className="absolute d-flex justify-center items-end col-12 h-full z-1 px-35 py-20">
        <button className="button h-50 px-25 -blue-1 bg-white text-dark-1 text-14 fw-500 col-12">
          <i className="icon-eye text-18 mr-10" />
          See popular activities on the map
        </button>
      </div>
    </div>
  );

  // Render different layouts based on device size
  if (isMobile) {
    return (
      <>
        <div className="col-xl-4 col-12">
          <TableOfContents />
        </div>
        <div className="col-xl-8 col-12">
          <ContentSection />
        </div>
      </>
    );
  }

  return (
    <>
      <ContentSection />
      {/* End .col */}

      <div className="col-xl-4">
        <TableOfContents />
        <MapSection />
      </div>
    </>
  );
};

export default IntroTown;
