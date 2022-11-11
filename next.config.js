/** @type {import('next').NextConfig} */
const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  images: {
    domains: ["racstoragepjatk.blob.core.windows.net"],
  },
  nextConfig: {
    reactStrictMode: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles/sass")],
  },
});
