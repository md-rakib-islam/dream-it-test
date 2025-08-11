// import { NextResponse } from "next/server";
// import allowedPaths from "./allowedPaths.json"; // must be in root or public dir

// export function middleware(req) {
//   const url = req.nextUrl.pathname;

//   // ✅ Always allow assets and sitemap-related routes
//   if (
//     url === "/sitemap.xml" ||
//     url === "/robots.txt" ||
//     url.startsWith("/_next/") ||
//     url.startsWith("/favicon.ico") ||
//     url.startsWith("/fonts/") ||
//     url.startsWith("/api/") ||
//     url.endsWith(".js") ||
//     url.endsWith(".css") ||
//     url.endsWith(".png") ||
//     url.endsWith(".jpg") ||
//     url.endsWith(".webp")
//   ) {
//     return NextResponse.next();
//   }

//   // ✅ Allow sitemap-included valid paths
//   if (allowedPaths.includes(url)) {
//     return NextResponse.next();
//   }

//   // ❌ Everything else → 410 Gone
//   return new NextResponse("Gone", { status: 410 });
// }

// export const config = {
//   matcher: ["/:path*"],
// };

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

    return NextResponse.redirect(nextUrl, 410);
  }

  // ✅ Default: Allow all other requests
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
