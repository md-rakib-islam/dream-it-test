export const dynamic = "force-dynamic";

import {
  GET_CONTENTS_WITH_URL_BY_MENU_ID,
  GET_MENUS_ALL_NESTED,
  GET_CMS_BLOG_WITHOUT_PAGINATION,
} from "@/constant/constants";

const BASE_URL = "https://dreamtourism.it";

export default async function Sitemap() {
  try {
    // Fetch all data in parallel
    const [contentRes, desRes, blogRes] = await Promise.all([
      fetch(`${GET_CONTENTS_WITH_URL_BY_MENU_ID}/1`, {
        next: { tags: ["blog-list"] },
      }),
      fetch(`${GET_MENUS_ALL_NESTED}`, {
        next: { tags: ["blog-list"] },
      }),
      fetch(`${GET_CMS_BLOG_WITHOUT_PAGINATION}`, {
        next: { tags: ["blog-list"] },
      }),
    ]);

    // Check responses
    if (!contentRes.ok || !desRes.ok || !blogRes.ok) {
      throw new Error(
        `Failed to fetch data: ${contentRes.status} ${contentRes.statusText}, ${desRes.status} ${desRes.statusText}, ${blogRes.status} ${blogRes.statusText}`
      );
    }

    // Parse responses
    const [contentData, destinationData, blogData] = await Promise.all([
      contentRes.json(),
      desRes.json(),
      blogRes.json(),
    ]);

    // Validate data
    if (!Array.isArray(contentData)) {
      throw new TypeError("Content data is not an array");
    }

    if (!Array.isArray(destinationData?.menus)) {
      throw new TypeError("Destination data is not an array");
    }

    if (!Array.isArray(blogData?.blogs)) {
      throw new TypeError("Blog data is not an array");
    }

    // Tours
    const contentsXml = contentData
      .filter((item) => item.type === "Tours")
      .map((item) => ({
        url: `${BASE_URL}/tours/${item.slug}`,
        lastModified: new Date(item.updated_at).toISOString(),
        changeFrequency: "weekly",
        priority: 0.9,
      }));

    // Destinations
    const destinationsXml = destinationData.menus
      .filter((item) => item.name === "Destinations")
      .flatMap((item) =>
        item.children
          .filter((child) => child.name !== "United States")
          .map((child) => ({
            url: `${BASE_URL}/destinations/${encodeURIComponent(
              child.name.toLowerCase()
            )}`,
            lastModified: new Date().toISOString(),
            changeFrequency: "weekly",
            priority: 0.9,
          }))
      );

    // Blogs
    const blogsXml = blogData.blogs.map((blog) => {
      const isThingsToDo = blog.title.toLowerCase().includes("things to do");

      const url = `${BASE_URL}/${isThingsToDo ? "things-to-do" : "blogs"}/${
        blog.slug
      }`;

      return {
        url,
        lastModified: new Date(
          blog.updated_at || blog.created_at || new Date()
        ).toISOString(),
        changeFrequency: "daily",
        priority: 0.8,
      };
    });

    // Static pages
    const main = [
      {
        url: `${BASE_URL}/`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 1,
      },
    ];

    const otherXml = [
      {
        url: `${BASE_URL}/blogs`,
        lastModified: new Date().toISOString(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/things-to-do`,
        lastModified: new Date().toISOString(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/about`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
      {
        url: `${BASE_URL}/contact`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
      {
        url: `${BASE_URL}/privacy-policy`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
      {
        url: `${BASE_URL}/terms-and-conditions`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
    ];

    // Combine all URLs
    const combinedXml = [
      ...main,
      ...destinationsXml,
      ...contentsXml,
      ...blogsXml,
      ...otherXml,
    ];

    return combinedXml;
  } catch (error) {
    throw error;
  }
}
