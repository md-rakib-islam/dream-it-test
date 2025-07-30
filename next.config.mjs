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
        source: "/tour/:slug",
        destination: "/tours/:slug",
        permanent: true, // 301 Redirect (permanent)
      },
      {
        source: "/netherlands",
        destination: "/destinations/netherlands", // Redirect to the first page of tours
        permanent: true, // 301 Redirect (permanent)
      },
      {
        source: "/switzerland",
        destination: "/destinations/switzerland", // Redirect to the first page of tours
        permanent: true, // 301 Redirect (permanent)
      },
      {
        source: "/germany",
        destination: "/destinations/germany", // Redirect to the first page of tours
        permanent: true, // 301 Redirect (permanent)
      },
      {
        source: "/italy",
        destination: "/destinations/italy", // Redirect to the first page of tours
        permanent: true, // 301 Redirect (permanent)
      },
      {
        source: "/belgium",
        destination: "/destinations/belgium", // Redirect to the first page of tours
        permanent: true, // 301 Redirect (permanent)
      },
      {
        source: "/france",
        destination: "/destinations/france", // Redirect to the first page of tours
        permanent: true, // 301 Redirect (permanent)
      },
      ///////

      {
        source: "/things-to-do-in-sorrento-Italy",
        destination: "/things-to-do/things-to-do-in-sorrento-Italy",
        permanent: true,
      },
      {
        source: "/things-to-do-in-pompeii-ancient-ruins-naples",
        destination:
          "/things-to-do/things-to-do-in-pompeii-ancient-ruins-naples",
        permanent: true,
      },
      {
        source: "/things-to-do-in-underground-naples",
        destination: "/things-to-do/things-to-do-in-underground-naples",
        permanent: true,
      },
      {
        source: "/things-to-do-in-naples-national-archaeological-museum-naples",
        destination:
          "/things-to-do/things-to-do-in-naples-national-archaeological-museum-naples",
        permanent: true,
      },
      {
        source: "/top-things-to-do-in-pompeii-archaeological-excavations",
        destination:
          "/things-to-do/top-things-to-do-in-pompeii-archaeological-excavations",
        permanent: true,
      },
      {
        source: "/things-to-do-in-pompeii-and-mount-vesuvius-naples",
        destination:
          "/things-to-do/things-to-do-in-pompeii-and-mount-vesuvius-naples",
        permanent: true,
      },
      {
        source: "/things-to-do-in-naples",
        destination: "/things-to-do/things-to-do-in-naples",
        permanent: true,
      },
      {
        source: "/things-to-do-in-milan-cathedral",
        destination: "/things-to-do/things-to-do-in-milan-cathedral",
        permanent: true,
      },
      {
        source: "/things-to-do-in-milan-last-supper-art",
        destination: "/things-to-do/things-to-do-in-milan-last-supper-art",
        permanent: true,
      },
      {
        source: "/things-to-do-in-milan-history-and-art",
        destination: "/things-to-do/things-to-do-in-milan-history-and-art",
        permanent: true,
      },
      {
        source: "/things-to-do-in-milan",
        destination: "/things-to-do/things-to-do-in-milan",
        permanent: true,
      },
      {
        source: "/things-to-do-in-grand-canal-and-St-marks-square",
        destination:
          "/things-to-do/things-to-do-in-grand-canal-and-St-marks-square",
        permanent: true,
      },
      {
        source:
          "/things-to-do-in-venice-mask-making-and-cultural-workshop-venice",
        destination:
          "/things-to-do/things-to-do-in-venice-mask-making-and-cultural-workshop-venice",
        permanent: true,
      },
      {
        source: "/things-to-do-in-venice-historical-walking-venice",
        destination:
          "/things-to-do/things-to-do-in-venice-historical-walking-venice",
        permanent: true,
      },
      {
        source: "/things-to-do-in-venice",
        destination: "/things-to-do/things-to-do-in-venice",
        permanent: true,
      },
      {
        source: "/things-to-do-in-florence-medici-palaces-tuscany",
        destination:
          "/things-to-do/things-to-do-in-florence-medici-palaces-tuscany",
        permanent: true,
      },
      {
        source: "/things-to-do-in_florence-renaissance-art-tuscany",
        destination:
          "/things-to-do/things-to-do-in_florence-renaissance-art-tuscany",
        permanent: true,
      },
      {
        source: "/things-to-do-in-florence-duomo-uffizi-gallery",
        destination:
          "/things-to-do/things-to-do-in-florence-duomo-uffizi-gallery",
        permanent: true,
      },
      {
        source: "/things-to-do-in-florence",
        destination: "/things-to-do/things-to-do-in-florence",
        permanent: true,
      },

      // Blogs below
      {
        source: "/is-it-better-to-buy-rome-attraction-tickets-in-advance",
        destination:
          "/blogs/is-it-better-to-buy-rome-attraction-tickets-in-advance",
        permanent: true,
      },
      {
        source: "/is-the-roma-pass-worth-it",
        destination: "/blogs/is-the-roma-pass-worth-it",
        permanent: true,
      },
      {
        source: "/best-rome-city-passes-for-tourists",
        destination: "/blogs/best-rome-city-passes-for-tourists",
        permanent: true,
      },
      {
        source: "/romes-best-selling-tourist-attraction-tickets",
        destination: "/blogs/romes-best-selling-tourist-attraction-tickets",
        permanent: true,
      },
      {
        source: "/cheapest-rome-attraction-tickets-for-families",
        destination: "/blogs/cheapest-rome-attraction-tickets-for-families",
        permanent: true,
      },
      {
        source: "/best-rome-attraction-passes-for-tourists",
        destination: "/blogs/best-rome-attraction-passes-for-tourists",
        permanent: true,
      },
      {
        source: "/exploring-romes-underground-catacombs",
        destination: "/blogs/exploring-romes-underground-catacombs",
        permanent: true,
      },
      {
        source: "/romes-best-walking-tours-for-food-lovers",
        destination: "/blogs/romes-best-walking-tours-for-food-lovers",
        permanent: true,
      },
      {
        source: "/rome-guided-night-tours-with-colosseum-access",
        destination: "/blogs/rome-guided-night-tours-with-colosseum-access",
        permanent: true,
      },
      {
        source: "/colosseum-night-tour",
        destination: "/blogs/colosseum-night-tour",
        permanent: true,
      },
      {
        source: "/colosseum-self-tour-vs-guided-tour",
        destination: "/blogs/colosseum-self-tour-vs-guided-tour",
        permanent: true,
      },
      {
        source: "/is-a-colosseum-underground-tour-worth-it",
        destination: "/blogs/is-a-colosseum-underground-tour-worth-it",
        permanent: true,
      },
      {
        source: "/best-colosseum-guided-tours",
        destination: "/blogs/best-colosseum-guided-tours",
        permanent: true,
      },
      {
        source: "/colosseum-and-palatine-hill-ticket-package-deals",
        destination: "/blogs/colosseum-and-palatine-hill-ticket-package-deals",
        permanent: true,
      },
      {
        source: "/fast-track-entry-colosseum-tickets-vs-guided-tour",
        destination: "/blogs/fast-track-entry-colosseum-tickets-vs-guided-tour",
        permanent: true,
      },
      {
        source: "/best-combo-tickets-for-the-colosseum-and-the-roman-forum",
        destination:
          "/blogs/best-combo-tickets-for-the-colosseum-and-the-roman-forum",
        permanent: true,
      },
      {
        source: "/the-fastest-way-to-get-colosseum-tickets",
        destination: "/blogs/the-fastest-way-to-get-colosseum-tickets",
        permanent: true,
      },
      {
        source: "/where-to-book-last-minute-colosseum-tickets",
        destination: "/blogs/where-to-book-last-minute-colosseum-tickets",
        permanent: true,
      },
      {
        source: "/how-to-buy-colosseum-skip-the-line-tickets-online",
        destination: "/blogs/how-to-buy-colosseum-skip-the-line-tickets-online",
        permanent: true,
      },
      {
        source: "/blog/cheapest-rome-attraction-tickets-for-families",
        destination: "/blogs/cheapest-rome-attraction-tickets-for-families",
        permanent: true,
      },
      {
        source: "/blog/the-fastest-way-to-get-colosseum-tickets",
        destination: "/blogs/the-fastest-way-to-get-colosseum-tickets",
        permanent: true,
      },
      {
        source: "/blog/is-a-colosseum-underground-tour-worth-it",
        destination: "/blogs/is-a-colosseum-underground-tour-worth-it",
        permanent: true,
      },
      {
        source: "/blog/colosseum-night-tour",
        destination: "/blogs/colosseum-night-tour",
        permanent: true,
      },
      {
        source: "/blog/best-rome-city-passes-for-tourists",
        destination: "/blogs/best-rome-city-passes-for-tourists",
        permanent: true,
      },
      {
        source: "/blog/things-to-do-in-venice",
        destination: "/things-to-do/things-to-do-in-venice",
        permanent: true,
      },
      {
        source: "/blog/things-to-do-in-milan-last-supper-art",
        destination: "/things-to-do/things-to-do-in-milan-last-supper-art",
        permanent: true,
      },
      {
        source: "/blog/things-to-do-in-sorrento-Italy",
        destination: "/things-to-do/things-to-do-in-sorrento-Italy",
        permanent: true,
      },
      {
        source: "/blog/top-things-to-do-in-pompeii-archaeological-excavations",
        destination:
          "/things-to-do/top-things-to-do-in-pompeii-archaeological-excavations",
        permanent: true,
      },
      {
        source: "/blog/things-to-do-in-milan-history-and-art",
        destination: "/things-to-do/things-to-do-in-milan-history-and-art",
        permanent: true,
      },
      {
        source: "/blog/things-to-do-in-milan",
        destination: "/things-to-do/things-to-do-in-milan",
        permanent: true,
      },
      {
        source:
          "/blog/things-to-do-in-naples-national-archaeological-museum-naples",
        destination:
          "/things-to-do/things-to-do-in-naples-national-archaeological-museum-naples",
        permanent: true,
      },
      {
        source: "/blog/things-to-do-in-naples",
        destination: "/things-to-do/things-to-do-in-naples",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
