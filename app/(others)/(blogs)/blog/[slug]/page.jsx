import BlogsSide from "@/components/blogs/BlogsSide";
import { BLOG_CATEGORIES, GET_CMS_BLOG_BY_TITLE } from "@/constant/constants";
import { dataFetcher } from "@/utils/dataFetcher";
import { Interweave } from "interweave";

export const metadata = {
  title: "Blog Single || GoTrip - Travel & Tour React NextJS Template",
  description: "GoTrip - Travel & Tour React NextJS Template",
};

const BlogSingleDynamic = async ({ params }) => {
  const contentData = await dataFetcher(
    `${GET_CMS_BLOG_BY_TITLE}/${params.slug}`
  );
  const categoryData = await dataFetcher(`${BLOG_CATEGORIES}`);

  console.log("rakib", contentData);

  return (
    <>
      <div className="header-margin"></div>
      {/* header top margin */}

      {/* <LocationTopBar /> */}
      {/* End location top bar section */}

      <section className="layout-pt-md layout-pb-lg blog-content">
        <div className="container">
          <div className="row x-gap-80 y-gap-80 justify-between">
            <div className="col-md-8">
              <div className="row x-gap-20 y-gap-20">
                <div className="col-md-12">
                  <h1 className="text-25 fw-600 ">{contentData.title}</h1>
                  <span> Updated: {contentData.date}</span>
                  <div>
                    <div className="interweave-content">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: contentData.description,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-60">
              <BlogsSide categories={categoryData} />
            </div>
          </div>
        </div>
      </section>
      {/* Details Blog Details Content */}
    </>
  );
};

export default BlogSingleDynamic;
