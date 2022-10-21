/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    KAKAO_AUTH_URL: process.env.KAKAO_AUTH_URL,
    KAKAO_TOKEN_URL: process.env.KAKAO_TOKEN_URL,
    KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI,
    KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
    KAKAO_CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET,
    KAKAO_GRANT_TYPE: process.env.KAKAO_GRANT_TYPE,
  },
  reactStrictMode: false,
  swcMinify: true,
}

module.exports = nextConfig
