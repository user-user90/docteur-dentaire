/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
  },
  // اضف هذا الجزء هنا لرفع حد حجم الملفات المرسلة
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // يسمح برفع صور حتى 10 ميجابايت
    },
  },
};

export default nextConfig;