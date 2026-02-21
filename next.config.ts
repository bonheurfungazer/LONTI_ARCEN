import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Avertissement : cela permet à la construction de production de réussir même si votre projet a des erreurs ESLint.
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
