/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    agentUpgrade: 'security',
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com' }],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
