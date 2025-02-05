/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', //commenting this out will break the .next folder
  // images: {
  //   unoptimized: true,
  // },
  distDir: 'out',
};

module.exports = nextConfig;