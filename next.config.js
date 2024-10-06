/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net", // Previously in images.domains
        pathname: "/**", // Match all image paths
      },
    ],
    imageSizes: [16, 32, 48, 50, 64, 96, 128, 256, 384],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 86400, // 1 day
  },
  output: "standalone",

  async redirects() {
    return [
      // {
      //   source: "/tour/contact",
      //   destination: "/contact",
      //   permanent: true, // Set to true for a 308 permanent redirect, or false for a 307 temporary redirect
      // },
      {
        source: "/tour/terms-and-conditions",
        destination: "/terms?type=general_terms_of_use",
        permanent: true, // Set to true for a 308 permanent redirect, or false for a 307 temporary redirect
      },
      {
        source: "/tour/privacy-policy",
        destination: "/terms?type=privacy_policy",
        permanent: true, // Set to true for a 308 permanent redirect, or false for a 307 temporary redirect
      },
      {
        source: "/tour/404",
        destination: "/404",
        permanent: true, // Set to true for a 308 permanent redirect, or false for a 307 temporary redirect
      },
      {
        source: "/tour/about",
        destination: "/about",
        permanent: true, // Set to true for a 308 permanent redirect, or false for a 307 temporary redirect
      },
      {
        source: "/italy",
        destination: "/destinations/italy",
        permanent: true, // Set to true for a 308 permanent redirect, or false for a 307 temporary redirect
      },
      {
        source: "/netherlands",
        destination: "/destinations/netherlands",
        permanent: true, // Set to true for a 308 permanent redirect, or false for a 307 temporary redirect
      },
      {
        source: "/switzerland",
        destination: "/destinations/switzerland",
        permanent: true, // Set to true for a 308 permanent redirect, or false for a 307 temporary redirect
      },
      {
        source: "/germany",
        destination: "/destinations/germany",
        permanent: true, // Set to true for a 308 permanent redirect, or false for a 307 temporary redirect
      },
      {
        source: "/belgium",
        destination: "/destinations/belgium",
        permanent: true, // Set to true for a 308 permanent redirect, or false for a 307 temporary redirect
      },
      {
        source: "/france",
        destination: "/destinations/france",
        permanent: true, // Set to true for a 308 permanent redirect, or false for a 307 temporary redirect
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.dreamtourism.it",
          },
        ],
        destination: "https://dreamtourism.it/:path*", // Redirect to non-www
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "http.dreamtourism.it",
          },
        ],
        destination: "https://dreamtourism.it/:path*", // Redirect to non-www
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Match all static assets
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // Cache for 1 year
          },
        ],
      },
      {
        // Match all images
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // Cache for 1 year
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
