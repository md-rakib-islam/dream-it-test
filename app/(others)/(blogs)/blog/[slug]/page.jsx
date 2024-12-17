import BlogsSide from "@/components/blogs/BlogsSide";
import Image from "next/image";

export const metadata = {
  title: "Blog Single || GoTrip - Travel & Tour React NextJS Template",
  description: "GoTrip - Travel & Tour React NextJS Template",
};

const BlogSingleDynamic = ({ params }) => {
  //   const id = params.id;
  //   const blog = blogsData.find((item) => item.id == id) || blogsData[0];

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
                  <h1 className="text-25 fw-600 ">
                    This is the Demo Post Title
                  </h1>
                  <span> Updated: November 1, 2024</span>
                  <div>
                    <Image
                      src="/img/blogs/blog.jpg"
                      width={1000}
                      height={395}
                      className="mt-20 mb-20"
                    ></Image>

                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry’s
                      standard dummy text Lorem Ipsum is simply dummy text of
                      the printing and typesetting industry. Lorem Ipsum has
                      been the industry’s standard dummy text Lorem Ipsum is
                      simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry’s standard
                      dummy text Lorem Ipsum is simply dummy text of the
                      printing and typesetting industry. Lorem Ipsum has been
                      the industry’s standard dummy text Lorem Ipsum is simply
                      dummy text of the printing and typesetting industry. Lorem
                      Ipsum has been the industry’s standard dummy text Lorem
                      Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry’s standard
                      dummy text Lorem Ipsum is simply dummy text of the
                      printing and typesetting industry. Lorem Ipsum has been
                      the industry’s standard dummy text Lorem Ipsum is simply
                      dummy text of the printing and typesetting industry. Lorem
                      Ipsum has been the industry’s standard dummy text
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-60">
              <BlogsSide />
            </div>
          </div>
        </div>
      </section>
      {/* Details Blog Details Content */}
    </>
  );
};

export default BlogSingleDynamic;
