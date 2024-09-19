/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: "/eventease/",
  basePath: "/eventease",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
