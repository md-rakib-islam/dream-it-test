// import {
//   BLOG_CATEGORIES,
//   GET_CMS_BLOG_BY_TITLE,
//   GET_CONTENT_BY_MENU_NAME,
//   GET_CONTENT_BY_TITLE,
//   GET_IMAGE_BY_MENU_ID,
//   GET_IMAGE_BY_MENU_NAME,
//   GET_METADATA_BY_CONTENT_NAME,
// } from "@/constant/constants";
// import { dataFetcher } from "@/utils/dataFetcher";

// import DestinationSinglePage from "@/components/destinations/destinationSinglePage/DestinationSinglePage";
// import notFound from "@/app/not-found";
// import { load } from "cheerio";
// import SingleBlogPage from "@/components/blogs/singleBlogPage/SingleBlogPage";

// export async function generateMetadata({ params }) {
//   const { slug } = params;

//   // Try fetching blog data
//   const blogData = await dataFetcher(`${GET_CMS_BLOG_BY_TITLE}/${slug}`);

//   if (blogData && blogData.meta_title) {
//     return {
//       metadataBase: new URL("https://dreamtourism.it"),
//       title: blogData.meta_title,
//       description: blogData.meta_description,
//       openGraph: {
//         title: blogData.meta_title,
//         description: blogData.meta_description,
//         images: [
//           {
//             url: blogData?.cloudflare_image,
//             width: 800,
//             height: 600,
//             alt: blogData?.meta_title,
//           },
//         ],
//         url: `/${slug}`, // Open Graph URL
//         type: "website",
//       },
//       twitter: {
//         title: blogData.meta_title,
//         description: blogData.meta_description,
//         image: blogData?.cloudflare_image,
//       },
//     };
//   }

//   // Try fetching destination data
//   const destinationData = await dataFetcher(
//     `${GET_METADATA_BY_CONTENT_NAME}/${slug}`
//   );

//   if (destinationData && destinationData.meta_title) {
//     return {
//       metadataBase: new URL("https://dreamtourism.it"),
//       title: destinationData.meta_title,
//       description: destinationData.meta_description,
//       openGraph: {
//         title: destinationData.meta_title,
//         description: destinationData.meta_description,
//         images: [
//           {
//             url: destinationData?.cloudflare_image,
//             width: 800,
//             height: 600,
//             alt: destinationData?.meta_title,
//           },
//         ],
//         url: `/${slug}`, // Open Graph URL
//         type: "website",
//       },
//       twitter: {
//         title: destinationData.meta_title,
//         description: destinationData.meta_description,
//         image: destinationData?.cloudflare_image,
//       },
//     };
//   }
// }

// const Destinations = async ({ params }) => {
//   const { slug } = params;
//   let contentImagesData = {},
//     content = {};

//   const destinationContentData = await dataFetcher(
//     `${GET_CONTENT_BY_MENU_NAME}/${slug}`
//   );
//   const destinationContentImages = await dataFetcher(
//     `${GET_IMAGE_BY_MENU_NAME}/${slug}`
//   );
//   contentImagesData = destinationContentImages;
//   content = destinationContentData;

//
//   if (content && content.value) {
//     return (
//       <>
//         <div className="header-margin"></div>
//         {/* header top margin */}
//         <DestinationSinglePage
//           slug={slug}
//           content={content}
//           contentImagesData={contentImagesData}
//         />
//       </>
//     );
//   }
//   // blog content
//   const blogContentData = await dataFetcher(`${GET_CMS_BLOG_BY_TITLE}/${slug}`);
//   const categoryData = await dataFetcher(`${BLOG_CATEGORIES}`);
//   const faqContent = blogContentData?.faq_content || "";
//   const descriptionHTML = blogContentData.description;
//   if (blogContentData && blogContentData.title) {
//     return (
//       <>
//         <div className="header-margin"></div>
//         <SingleBlogPage
//           contentData={blogContentData}
//           categoryData={categoryData}
//           faqContent={faqContent}
//           descriptionHTML={descriptionHTML}
//           load={load}
//           slug={slug}
//         />
//       </>
//     );
//   }
//   return notFound();
// };

// export default Destinations;
import {
  BLOG_CATEGORIES,
  GET_CMS_BLOG_BY_TITLE,
  GET_CONTENT_BY_MENU_NAME,
  GET_IMAGE_BY_MENU_NAME,
  GET_METADATA_BY_CONTENT_NAME,
} from "@/constant/constants";
import { dataFetcher } from "@/utils/dataFetcher";

import DestinationSinglePage from "@/components/destinations/destinationSinglePage/DestinationSinglePage";
import notFound from "@/app/not-found";
import { load } from "cheerio";
import SingleBlogPage from "@/components/blogs/singleBlogPage/SingleBlogPage";
import Head from "next/head";

export async function generateMetadata({ params }) {
  const { slug } = params;

  const [blogData, destinationData] = await Promise.all([
    dataFetcher(`${GET_CMS_BLOG_BY_TITLE}/${slug}`),
    dataFetcher(`${GET_METADATA_BY_CONTENT_NAME}/${slug}`),
  ]);

  if (blogData && blogData.meta_title) {
    return {
      metadataBase: new URL("https://dreamtourism.it"),
      title: blogData.meta_title,
      description: blogData.meta_description,
      openGraph: {
        title: blogData.meta_title,
        description: blogData.meta_description,
        images: [
          {
            url: blogData?.cloudflare_image,
            width: 800,
            height: 600,
            alt: blogData?.meta_title,
          },
        ],
        url: `/${slug}`,
        type: "website",
      },
      twitter: {
        title: blogData.meta_title,
        description: blogData.meta_description,
        image: blogData?.cloudflare_image,
      },
      robots: "index, follow", // Allow indexing and following links on destination pages
    };
  }

  if (destinationData && destinationData.meta_title) {
    return {
      metadataBase: new URL("https://dreamtourism.it"),
      title: destinationData.meta_title,
      description: destinationData.meta_description,
      openGraph: {
        title: destinationData.meta_title,
        description: destinationData.meta_description,
        images: [
          {
            url: destinationData?.cloudflare_image,
            width: 800,
            height: 600,
            alt: destinationData?.meta_title,
          },
        ],
        url: `/${slug}`,
        type: "website",
      },
      twitter: {
        title: destinationData.meta_title,
        description: destinationData.meta_description,
        image: destinationData?.cloudflare_image,
      },
      robots: "index, follow", // Allow indexing and following links on destination pages
    };
  }

  return {
    robots: "noindex, nofollow", // Prevent crawling and following on invalid pages
  };
}

const DestinationsAndBlog = async ({ params }) => {
  const { slug } = params;

  // Fetch data in parallel
  const [destinationContent, destinationImages, blogContent, categoryData] =
    await Promise.all([
      dataFetcher(`${GET_CONTENT_BY_MENU_NAME}/${slug}`),
      dataFetcher(`${GET_IMAGE_BY_MENU_NAME}/${slug}`),
      dataFetcher(`${GET_CMS_BLOG_BY_TITLE}/${slug}`),
      dataFetcher(`${BLOG_CATEGORIES}`),
    ]);

  // Check if it's a destination page
  if (destinationContent && Object.keys(destinationContent).length > 0) {
    return (
      <>
        <div className="header-margin"></div>
        <DestinationSinglePage
          slug={slug}
          content={destinationContent}
          contentImagesData={destinationImages}
        />
      </>
    );
  }

  // Check if it's a blog page
  if (blogContent && blogContent.title) {
    return (
      <>
        <Head>
          <link
            rel="canonical"
            href={`https://dreamtourism.it/${slug}`}
            key="canonical"
          />
        </Head>
        <div className="header-margin"></div>
        <SingleBlogPage
          contentData={blogContent}
          categoryData={categoryData}
          faqContent={blogContent.faq_content || ""}
          descriptionHTML={blogContent.description}
          load={load}
          slug={slug}
        />
      </>
    );
  }

  return notFound();
};

export default DestinationsAndBlog;
