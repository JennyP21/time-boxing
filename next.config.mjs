/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname:
          "k9dxn7hfxj6lhojk.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
