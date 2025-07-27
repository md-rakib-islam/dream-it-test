import React from "react";
import {
  BLOG_CATEGORIES,
  GET_ALL_COUNTRIES,
  GET_CMS_BLOG_BY_TITLE,
} from "@/constant/constants";
import { dataFetcher } from "@/utils/dataFetcher";

import notFound from "@/app/not-found";
import { load } from "cheerio";
import SingleBlogPage from "@/components/blogs/singleBlogPage/SingleBlogPage";
import Head from "next/head";

export async function generateMetadata({ params }) {
  const { slug } = params;

  const [blogData] = await Promise.all([
    dataFetcher(`${GET_CMS_BLOG_BY_TITLE}/${slug}`),
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
        url: `/blog/${slug}`,
        type: "website",
      },
      twitter: {
        title: blogData.meta_title,
        description: blogData.meta_description,
        image: blogData?.cloudflare_image,
      },
      alternates: {
        canonical: `/blog/${slug}`, // Canonical without query params
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
  const [blogContent, categoryData, countriesData] = await Promise.all([
    dataFetcher(`${GET_CMS_BLOG_BY_TITLE}/${slug}`),
    dataFetcher(`${BLOG_CATEGORIES}`),
    dataFetcher(`${GET_ALL_COUNTRIES}`),
  ]);

  // Check if it's a blog page
  if (blogContent && blogContent.title) {
    return (
      <>
        <Head>
          <link
            rel="canonical"
            href={`https://dreamtourism.it/blog/${slug}`}
            key="canonical"
          />
        </Head>
        <div className="header-margin"></div>
        <SingleBlogPage
          contentData={blogContent}
          categoryData={categoryData}
          countriesData={countriesData?.countries}
          faqContent={blogContent.faq_content || ""}
          descriptionHTML={blogContent.description}
          load={load}
          fullUrl={`https://dreamtourism.it/blog/${slug}`}
        />
      </>
    );
  }

  return notFound();
};

export default DestinationsAndBlog;
