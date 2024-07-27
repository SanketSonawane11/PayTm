/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['plus.unsplash.com'], 
    },
    experimental: {
        appDir: true,
    }
};

export default nextConfig;
