/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com' }],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
