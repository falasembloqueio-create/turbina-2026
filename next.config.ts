/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/turbina-2026',
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
}
export default nextConfig