// app/api/revalidate/blogs/route.js

import { revalidateTag } from "next/cache";

export async function POST() {
  console.log("API: /api/revalidate/blogs POST called");

  try {
    await revalidateTag("blog-list");
    return new Response("Blog list revalidated", { status: 200 });
  } catch (error) {
    console.error("Revalidation failed:", error);
    return new Response("Failed to revalidate", { status: 500 });
  }
}
