/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚀 PERFORMANCE: Enhanced image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        pathname: "/**",
      },
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 86400, // 1 day
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // 🚀 PERFORMANCE: Enhanced Sass compilation
  sassOptions: {
    implementation: "sass",
    silenceDeprecations: ['legacy-js-api'], // Silence deprecation warnings
  },
  
  // 🚀 PERFORMANCE: Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // 🚀 PERFORMANCE: Enable compression and optimizations
  compress: true,
  poweredByHeader: false,
  
  // 🚀 PERFORMANCE: Headers for performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
      {
        source: '/tours/:slug*',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=3600, stale-while-revalidate=86400'
          }
        ],
      },
      {
        source: '/:all*(svg|jpg|png|webp|avif)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300'
          }
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Link',
            value: '</fonts/inter.woff2>; rel=preload; as=font; type=font/woff2; crossorigin'
          }
        ],
      },
    ];
  },
  
  // 🚀 PERFORMANCE: Bundle optimization and code splitting
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Bundle splitting for better caching
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
            maxSize: 244000, // 244KB
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            priority: 20,
            chunks: 'all',
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          }
        }
      };
    }

    // Optimize bundle size
    config.optimization.usedExports = true;
    
    // Add bundle analyzer in production
    if (!dev && process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: isServer ? 'server.html' : 'client.html',
        })
      );
    }

    return config;
  },

  experimental: {
    webVitalsAttribution: ['CLS', 'LCP'],
    // Enable modern features for better performance
    esmExternals: true,
    serverComponentsExternalPackages: ['sharp', 'ssr-window', 'dom7'],
    optimizePackageImports: ['lodash', 'date-fns', 'react-icons'],
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
import nextBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
