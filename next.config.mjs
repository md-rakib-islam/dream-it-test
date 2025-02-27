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
  sassOptions: {
    implementation: "sass",
  },
  experimental: {
    after: true,
  },
  async redirects() {
    return [
      {
        source: "/destinations/:slug",
        destination: "/:slug",
        permanent: true, // Use 301 redirect for SEO
      },
      {
        source: "/blog/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/tour/:slug",
        destination: "/tours/:slug",
        permanent: true, // 301 Redirect (permanent)
      },
    ];
  },
};

export default nextConfig;
