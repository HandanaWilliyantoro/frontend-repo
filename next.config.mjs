/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://127.0.0.1:5001/backend-repo-ebuddy-test/us-central1/api/:path*',
          },
        ]
    },
};

export default nextConfig;
