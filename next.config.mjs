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
  experimental: {
    // Disabling this is probably a bad idea, see https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
    missingSuspenseWithCSRBailout: false,
  },
}

export default nextConfig
