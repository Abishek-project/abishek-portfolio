/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // replaces `next export`
  images: {
    unoptimized: true, // needed for <Image> in static exports
  },
};

export default nextConfig;
