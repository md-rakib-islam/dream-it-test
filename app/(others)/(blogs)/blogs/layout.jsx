import { BLOG_CATEGORIES, GET_CMS_BLOGS } from "@/constant/constants";
import { dataFetcher } from "@/utils/dataFetcher";
import BlogProvider from "./BlogProvider";

import React from "react";

export default async function BlogsLayout({ children }) {
  const contentData = await dataFetcher(`${GET_CMS_BLOGS}`);

  const categoryData = await dataFetcher(`${BLOG_CATEGORIES}`);

  const blogData = { blogs: contentData || [], categories: categoryData };

  return (
    <BlogProvider blogs={blogData}>
      <section>{children}</section>
    </BlogProvider>
  );
}
