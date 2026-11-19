/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Photos live in /public/images, so no outside image hosts are needed
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
