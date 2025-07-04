/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is the important part
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/, // Look for files with these extensions
      exclude: /node_modules/,
      use: ['raw-loader'], // Use raw-loader on them
    });

    return config;
  },
};

export default nextConfig;
