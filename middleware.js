import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.pathname;
  const nextUrl = req.nextUrl.clone();

  // 🔒 410 Gone for blocked assets or paths
  if (
    url.startsWith("/media/") ||
    // url.startsWith("/img/") ||
    url.startsWith("/wp-content/") ||
    url.includes("/MetaImage/") ||
    url.includes("/BlogImage/") ||
    url === "/.well-known/apple-app-site-association"
  ) {
    return new NextResponse("Gone", { status: 410 });
  }

  // 🔁 Conditional redirect for /blog/:slug
  if (url.startsWith("/blog/")) {
    const slug = url.replace("/blog/", "");

    if (slug.includes("things-to-do")) {
      nextUrl.pathname = `/things-to-do/${slug}`;
    } else {
      nextUrl.pathname = `/blogs/${slug}`;
    }

    return NextResponse.redirect(nextUrl, 301);
  }

  // ✅ Default: Allow all other requests
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
