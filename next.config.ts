import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  // reactStrictMode: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/:path*`,
  //     },
  //   ];
  // },
};
export default nextConfig;
