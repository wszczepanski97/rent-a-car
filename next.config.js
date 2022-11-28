/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  images: {
    domains: ["racstoragepjatk.blob.core.windows.net"],
  },
  nextConfig: {
    reactStrictMode: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles/sass")],
  },
};
