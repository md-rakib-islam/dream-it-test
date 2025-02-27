import Blog from "@/components/blogs/Blog";
import {
  BLOG_CATEGORIES,
  GET_CMS_BLOGS,
  GET_METADATA_BY_CONTENT_NAME,
} from "@/constant/constants";
import { dataFetcher } from "@/utils/dataFetcher";

const fetchMetadata = async () => {
  try {
    const res = await fetch(`${GET_METADATA_BY_CONTENT_NAME}/blogs`);
    if (!res.ok) {
      throw new Error("Failed to fetch metadata");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    return {
      meta_title:
        "Blogs  || Dream Tourism SRLS - Your Place for Amazing Travel Adventure",
      meta_description:
        "Start your dream vacation with Dream Tourism SRLS. Explore fantastic destinations and enjoy unforgettable adventures. Your perfect getaway is just a click away!",
      image:
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/5dbac07d-cbd4-4694-9a38-615bf832f800/public", // Default image
    };
  }
};

// Define the generateMetadata function
export async function generateMetadata() {
  const metadata = await fetchMetadata();
  return {
    metadataBase: new URL("https://dreamtourism.it"),
    title: metadata.meta_title,
    description: metadata.meta_description,
    openGraph: {
      title: metadata.meta_title,
      description: metadata.meta_description,
      images: [
        {
          url: metadata?.cloudflare_image,
          width: 800,
          height: 600,
          alt: metadata?.meta_title,
        },
      ],
      url: `/blogs`, // Open Graph URL

      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.meta_title,
      description: metadata.meta_description,
      image: metadata?.cloudflare_image,
    },
    // alternates: {
    //   canonical: `/blogs`, // Canonical without query params
    // },
  };
}
const index = async () => {
  try {
    // Fetch blog and category data
    const [contentBlogData, categoryData] = await Promise.all([
      dataFetcher(`${GET_CMS_BLOGS}`, { next: { revalidate: 60 } }),
      dataFetcher(`${BLOG_CATEGORIES}`, { next: { revalidate: 60 } }),
    ]);

    // Ensure blogs is always an array to prevent undefined errors
    const blogs = Array.isArray(contentBlogData?.blogs)
      ? contentBlogData.blogs
      : [];

    // Filter logic: If any blog includes "rakib", exclude it.
    const filteredBlogs = blogs.filter((elm) => {
      if (elm.title.toLowerCase().includes("things to do")) {
        return false;
      }
      return true;
    });

    console.log("filteredBlogs", filteredBlogs);

    return (
      <>
        <div className="header-margin"></div>
        <section className="layout-pt-md layout-pb-lg blog-content">
          <div className="container">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div className="sectionTitle -md">
                  <h1 className="sectionTitle__title">Latest Blog Posts</h1>
                  {filteredBlogs?.length === 0 ? (
                    <p className="sectionTitle__text mt-5 sm:mt-0">
                      There are no blog posts.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Show blog list only if filteredBlogs is not empty */}
            {filteredBlogs && (
              <Blog blogs={filteredBlogs} categories={categoryData} />
            )}
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error("Error fetching blog data:", error);

    return (
      <>
        <div className="header-margin"></div>
        <section className="layout-pt-md layout-pb-lg blog-content">
          <div className="container">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div className="sectionTitle -md">
                  <h1 className="sectionTitle__title">Latest Blog Posts</h1>
                  <p className="sectionTitle__text mt-5 sm:mt-0">
                    Something went wrong! Please try again.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default index;
