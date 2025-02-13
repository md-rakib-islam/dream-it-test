import BlogsSide from "@/components/blogs/BlogsSide";
import ExpandableFAQ from "@/components/common/ExpandableFAQ";
import { BLOG_CATEGORIES, GET_CMS_BLOG_BY_TITLE } from "@/constant/constants";
import { dataFetcher } from "@/utils/dataFetcher";
import Image from "next/image";
import { load } from "cheerio";
// Define the generateMetadata function
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const metadata = await dataFetcher(`${GET_CMS_BLOG_BY_TITLE}/${slug}`);
  return {
    title: metadata.meta_title,
    description: metadata.meta_description,
    openGraph: {
      title: metadata.fb_meta_title,
      description: metadata.fb_meta_description,
      images: [
        {
          url: metadata?.fb_meta_image_cloudflare,
          width: 100,
          height: 100,
          alt: metadata?.fb_meta_title,
        },
      ],
      type: "website",
    },
    twitter: {
      title: metadata.meta_title,
      description: metadata.meta_description,
      image: metadata?.meta_image_cloudflare,
    },
  };
}

function getFullUrl(slug) {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://dreamtourism.it";
  const fullPath = `${baseUrl}/blog/${slug}`;
  return fullPath;
}
const BlogSingleDynamic = async ({ params }) => {
  const { slug } = await params;

  const contentData = await dataFetcher(`${GET_CMS_BLOG_BY_TITLE}/${slug}`);
  const categoryData = await dataFetcher(`${BLOG_CATEGORIES}`);
  const faqContent = contentData?.faq_content || "";
  const descriptionHTML = contentData.description;

  // Modify the parseHeadings function to extract the first <p> tag
  const parseHeadingsAndFirstParagraph = (html) => {
    const $ = load(html); // Load HTML into cheerio
    const headings = [];
    let firstParagraph = $("p").first().html() || ""; // Get the first paragraph's HTML content

    $("h1, h2, h3").each((index, element) => {
      const level = $(element).prop("tagName");
      const text = $(element).text().trim();
      const id = text.toLowerCase().replace(/\s+/g, "-");
      $(element).attr("id", id); // Add ID for anchor links
      headings.push({ id, text, level });
    });

    // Remove the first paragraph from the content to avoid duplication
    if (firstParagraph) {
      $("p").first().remove();
    }

    return { headings, firstParagraph, updatedHTML: $.html() };
  };

  // Call the updated function
  const { headings, firstParagraph, updatedHTML } =
    parseHeadingsAndFirstParagraph(descriptionHTML);

  const fullUrl = getFullUrl(slug);

  return (
    <>
      <div className="header-margin"></div>

      <section className="layout-pt-md layout-pb-lg blog-content">
        <div className="container">
          <div className="row x-gap-80 y-gap-80 justify-between">
            <div className="col-md-8">
              <div className="row x-gap-20 y-gap-20">
                <div className="col-md-12">
                  {/* Table of Contents */}

                  <h1 className="text-25 fw-600">{contentData.title}</h1>
                  <span> Updated: {contentData.date}</span>
                  <Image
                    src={contentData.cloudflare_image}
                    width={2000}
                    height={700}
                    alt={contentData.image_alt}
                    className="mt-20"
                  ></Image>
                  <div className="mt-20">
                    <p dangerouslySetInnerHTML={{ __html: firstParagraph }}></p>{" "}
                  </div>
                  <div>
                    {headings.length > 0 && (
                      <div className="table-of-contents mb-30 mt-30">
                        <h2 className="text-25 fw-600">Table of Contents</h2>
                        {/* <ul>
                          {headings.map((heading, index) => (
                            <li
                              key={index}
                              className={`toc-item toc-${heading.level.toLowerCase()}`}
                              style={{
                                marginLeft:
                                  heading.level === "H2"
                                    ? "1rem"
                                    : heading.level === "H3"
                                    ? "2rem"
                                    : "0rem",
                              }}
                            >
                              <a href={`#${heading.id}`}>{heading.text}</a>
                            </li>
                          ))}
                        </ul> */}
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
                                  text: `${acc.length}.${
                                    lastItem.children.length + 1
                                  } ${heading.text}`,
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
                                        <a href={`#${child.id}`}>
                                          {child.text}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                    <div className="blog-content">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: updatedHTML,
                        }}
                      ></div>
                      {/* FAQ Section */}
                      {faqContent && (
                        <div className="faq-section mt-30">
                          <span className="text-25 fw-600 mb-20 text-black">
                            Frequently Asked Questions
                          </span>
                          <ExpandableFAQ faqContent={faqContent} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-40 px-md-0">
              <BlogsSide categories={categoryData} fullUrl={fullUrl} />
            </div>
          </div>
        </div>
      </section>
      {/* Add the script for smooth scrolling */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.addEventListener("DOMContentLoaded", function () {
            const links = document.querySelectorAll(".table-of-contents a");
            links.forEach((link) => {
              link.addEventListener("click", (event) => {
                event.preventDefault();
                const targetId = link.getAttribute("href").slice(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                  const headerHeight = 90; // Adjust based on your header height
                  const elementPosition = targetElement.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.scrollY - headerHeight;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              });
            });
          });
        `,
        }}
      ></script>
    </>
  );
};

export default BlogSingleDynamic;
