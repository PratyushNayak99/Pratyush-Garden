import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */

const withMDX = createMDX({
  extension: /\.mdx?$/
});

const nextConfig = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
});

export default nextConfig;
