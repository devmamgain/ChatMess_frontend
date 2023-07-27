/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env:{
    NEXT_PUBLIC_ZEGO_APP_ID:1234249901,
    NEXT_PUBLIC_ZEGO_SERVER_ID:"ea0ce870cb364fa322deb877708cab46",
  },
  images:{
    domains:["localhost", "chatmess-backend.onrender.com"],
  }
};

module.exports = nextConfig;
