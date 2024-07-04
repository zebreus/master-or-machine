/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
      },
    ],
  },
  headers() {
    return [
      {
        source: "/data/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=100000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=100000, immutable",
          },
        ],
      },
    ];
  },
  experimental: {
    // Disabling this is probably a bad idea, see https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
    missingSuspenseWithCSRBailout: false,
  },
}

export default nextConfig
