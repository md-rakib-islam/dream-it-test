// import DefaultHeader from "@/components/header/default-header";
// import DefaultFooter from "@/components/footer/default";
import Blog2 from "@/components/blog/Blog2";
import BlogPagination from "@/components/blog/BlogPagination";
import BlogSidebar from "@/components/blog/blog-sidebar";
// import LocationTopBar from "@/components/common/LocationTopBar";

export const metadata = {
  title:
    "Explore Our Insights: Travel, Faith, and Culture - Dream Tourism Blog",
  description:
    "Dive into a world of inspiration with DreamTourism's blog. Discover travel tips, cultural insights, and spiritual reflections. Join us on a virtual exploration that goes beyond destinations, offering a unique perspective on the intersection of travel, faith, and culture.",
};

const BlogListV2 = () => {
  return (
    <>
      <div className="header-margin"></div>
      {/* header top margin */}

      {/* <DefaultHeader /> */}
      {/* End Header 1 */}

      {/* <LocationTopBar /> */}
      {/* End location top bar section */}

      {/* <section className="layout-pt-md">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Travel articles</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Lorem ipsum is placeholder text commonly used in site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* End title */}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30 justify-between">
            <div className="col-xl-8">
              <div className="row y-gap-30">
                <Blog2 />
              </div>
              {/* End .row */}
              <BlogPagination />
            </div>
            {/* End .col */}

            <div className="col-xl-3">
              <BlogSidebar />
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>

      {/* <DefaultFooter /> */}
      {/* End Call To Actions Section */}
    </>
  );
};

export default BlogListV2;
