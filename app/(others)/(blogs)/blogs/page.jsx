import Blog from "@/components/blogs/Blog";
import {
  GET_ALL_COUNTRIES,
  GET_CMS_BLOG_WITHOUT_PAGINATION,
  GET_METADATA_BY_CONTENT_NAME,
} from "@/constant/constants";
import { dataFetcher } from "@/utils/dataFetcher";

const fetchMetadata = async () => {
  try {
    const res = await fetch(`${GET_METADATA_BY_CONTENT_NAME}/blogs`);
    if (!res.ok) throw new Error("Failed to fetch metadata");
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
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/5dbac07d-cbd4-4694-9a38-615bf832f800/public",
    };
  }
};

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
          url: metadata?.cloudflare_image || metadata.image,
          width: 800,
          height: 600,
          alt: metadata?.meta_title,
        },
      ],
      url: `/blogs`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.meta_title,
      description: metadata.meta_description,
      image: metadata?.cloudflare_image || metadata.image,
    },
    alternates: {
      canonical: `/blogs`,
    },
  };
}

export default async function BlogsPage() {
  const [contentBlogData, categoryData] = await Promise.all([
    dataFetcher(`${GET_CMS_BLOG_WITHOUT_PAGINATION}`, {
      next: { tags: ["blog-list"] },
    }),
    dataFetcher(`${GET_ALL_COUNTRIES}`, {
      next: { revalidate: 60 },
    }),
  ]);

  const blogs = Array.isArray(contentBlogData?.blogs)
    ? contentBlogData.blogs
    : [];

  const filteredBlogs = blogs.filter(
    (elm) => !elm.title.toLowerCase().includes("things to do")
  );

  return (
    <>
      <div className="header-margin"></div>
      <section
        className={`layout-pt-md layout-pb-lg blog-content ${
          filteredBlogs?.length === 0 ? "vh-100" : ""
        }`}
      >
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h1 className="sectionTitle__title">Latest Blog Posts</h1>
                {filteredBlogs.length === 0 && (
                  <p className="sectionTitle__text mt-5 sm:mt-0">
                    There are no blog posts.
                  </p>
                )}
              </div>
            </div>
          </div>

          {filteredBlogs && (
            <Blog blogs={filteredBlogs} countries={categoryData?.countries} />
          )}
        </div>
      </section>
    </>
  );
}
