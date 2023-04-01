const withPWA = require('next-pwa')({
    dest: 'public',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.gegeh.dev',
            },
        ],
    },
}

module.exports = withPWA(nextConfig)
