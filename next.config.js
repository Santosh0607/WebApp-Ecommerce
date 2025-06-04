/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    unoptimized: false,
  },
  env: {
    CUSTOM_KEY: 'value',
  },
}

module.exports = nextConfig 