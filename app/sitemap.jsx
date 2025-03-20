import {
  GET_CONTENTS_WITH_URL_BY_MENU_ID,
  GET_MENUS_ALL_NESTED,
} from "@/constant/constants";

const BASE_URL = "https://dreamtourism.it";

export default async function Sitemap() {
  try {
    // Perform all fetch requests in parallel
    const [contentRes, desRes] = await Promise.all([
      fetch(`${GET_CONTENTS_WITH_URL_BY_MENU_ID}/1`),
      fetch(`${GET_MENUS_ALL_NESTED}`),
    ]);

    // Check if all fetch requests were successful
    if (!contentRes.ok || !desRes.ok) {
      throw new Error(
        `Failed to fetch data: ${contentRes.status} ${contentRes.statusText}, ${desRes.status} ${desRes.statusText}`
      );
    }

    const [contentData, destinationData] = await Promise.all([
      contentRes.json(),
      desRes.json(),
    ]);

    // Validate the fetched data
    if (!Array.isArray(contentData)) {
      throw new TypeError("Content data is not an array");
    }

    if (!Array.isArray(destinationData?.menus)) {
      throw new TypeError("Destination data is not an array");
    }

    // Generate sitemap URLs

    const contentsXml = contentData
      .filter((item) => {
        if (item.type !== "Tours") return false;
        return true;
      })
      .map((item) => ({
        url: `${BASE_URL}/tours/${item.slug}`,
        lastModified: new Date(item.updated_at).toISOString(),
        changeFrequency: "weekly",
        priority: 0.9,
      }));

    const destinationsXml = destinationData.menus
      .filter((item) => item.name === "Destinations")
      .flatMap((item) =>
        item.children
          .filter((child) => child.name !== "United States")
          .map((child) => ({
            url: `${BASE_URL}/${encodeURIComponent(child.name.toLowerCase())}`,
            lastModified: new Date().toISOString(),
            changeFrequency: "weekly",
            priority: 0.9,
          }))
      );
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
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/things-to-do`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
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

    const combinedXml = [
      ...main,
      ...destinationsXml,
      ...contentsXml,
      ...otherXml,
    ];

    return combinedXml;
  } catch (error) {
    throw error;
  }
}
