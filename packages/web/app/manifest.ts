import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dokets VouchAI - Trust in Every Deal',
    short_name: 'VouchAI',
    description: 'AI-Powered Micro-Escrow Platform',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      { src: '/logo.jpeg', sizes: '192x192', type: 'image/jpeg' },
      { src: '/logo.jpeg', sizes: '512x512', type: 'image/jpeg' },
    ],
  };
}