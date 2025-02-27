/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'images.pexels.com',
      'picsum.photos',
      'via.placeholder.com', // Adding placeholder.com domain
    ],
  },
  optimizeFonts: true,
};

module.exports = nextConfig;
