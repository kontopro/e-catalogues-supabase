
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production'?'/new-cat':'',
  output: 'export',
  images: { unoptimized: true },
  }
   
  module.exports = nextConfig