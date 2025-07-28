// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.pathname;

  // Dynamically block patterns
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
