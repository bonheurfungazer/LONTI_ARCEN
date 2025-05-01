import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output : "true",
  eslint: {
    // Avertissement : cela permet à la construction de production de réussir même si votre projet a des erreurs ESLint.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
