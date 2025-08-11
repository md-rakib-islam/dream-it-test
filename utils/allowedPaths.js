import fs from "fs";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔽 Replace with your sitemap URL
const sitemapUrl = "https://dreamtourism.it/sitemap.xml";

const fetchSitemapUrls = async () => {
  const res = await fetch(sitemapUrl);
  const xml = await res.text();

  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => {
    const url = new URL(match[1]);
    return url.pathname;
  });

  // Save to JSON
  fs.writeFileSync(
    path.join(__dirname, "allowedPaths.json"),
    JSON.stringify(urls, null, 2)
  );

  console.log("✅ allowedPaths.json generated with", urls.length, "paths.");
};

fetchSitemapUrls();
