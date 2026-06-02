/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.clerk.com' },
      { protocol: 'https', hostname: 'images.clerk.dev' },
      { protocol: 'https', hostname: 'wallpapercave.com' },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: [
      '@prisma/client',
      '@neondatabase/serverless',
      'ws',
      'bufferutil',
      'utf-8-validate',
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('ws', 'bufferutil', 'utf-8-validate')
    }
    return config
  },
}

module.exports = nextConfig
