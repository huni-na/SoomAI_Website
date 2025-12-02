module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co', // 외부 이미지 도메인 허용
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;