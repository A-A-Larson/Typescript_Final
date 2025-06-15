import type { NextConfig } from "next";


module.exports = {
  images: {
    domains: ['perenual.com', 'thumb.photo-ac.com', 'media.gettyimages.com', 'gardening.usask.ca'],
  },
};


const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
}


export default nextConfig;
