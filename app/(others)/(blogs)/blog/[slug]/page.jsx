import BlogsSide from "@/components/blogs/BlogsSide";
import { BLOG_CATEGORIES, GET_CMS_BLOG_BY_TITLE } from "@/constant/constants";
import { dataFetcher } from "@/utils/dataFetcher";
import Image from "next/image";

// Define the generateMetadata function
export async function generateMetadata({ params }) {
  const metadata = await dataFetcher(`${GET_CMS_BLOG_BY_TITLE}/${params.slug}`);
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

const BlogSingleDynamic = async ({ params }) => {
  const contentData = await dataFetcher(
    `${GET_CMS_BLOG_BY_TITLE}/${params.slug}`
  );
  const categoryData = await dataFetcher(`${BLOG_CATEGORIES}`);

  return (
    <>
      <div className="header-margin"></div>

      <section className="layout-pt-md layout-pb-lg blog-content">
        <div className="container">
          <div className="row x-gap-80 y-gap-80 justify-between">
            <div className="col-md-8">
              <div className="row x-gap-20 y-gap-20">
                <div className="col-md-12">
                  <h1 className="text-25 fw-600 ">{contentData.title}</h1>
                  <span> Updated: {contentData.date}</span>
                  <Image
                    src={contentData.cloudflare_image}
                    width={2000}
                    height={700}
                    alt={contentData.image_alt}
                    className="mt-20"
                  ></Image>
                  <div>
                    <div className=" blog-content">
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
            <div className="col-md-4 mt-60 px-md-0">
              <BlogsSide categories={categoryData} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSingleDynamic;
