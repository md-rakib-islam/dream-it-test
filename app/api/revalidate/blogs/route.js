import { revalidateTag } from "next/cache";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://admin.dreamtourism.it",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== "r4nD0m$Tr0nG-S3cr3T_K3y_93x7fL2") {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "Access-Control-Allow-Origin": "https://admin.dreamtourism.it",
      },
    });
  }

  try {
    await revalidateTag("blog-list");

    return new Response("Blog list revalidated", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://admin.dreamtourism.it",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response("Error revalidating", {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "https://admin.dreamtourism.it",
      },
    });
  }
}
