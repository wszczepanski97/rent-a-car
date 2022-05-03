/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  nextConfig: {
    reactStrictMode: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles/sass")],
  },
  images: {
    domains: ["racstoragepjatk.blob.core.windows.net"],
  },
};
