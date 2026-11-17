import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

const cspDirectives = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' ws: wss: http://localhost:3001 http://localhost:5173",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const devCspDirectives = cspDirectives.replace(
  "script-src 'self'",
  "script-src 'self' 'unsafe-inline'"
);

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      components: path.resolve(import.meta.dirname, 'src/components'),
      pages: path.resolve(import.meta.dirname, 'src/pages'),
      store: path.resolve(import.meta.dirname, 'src/store'),
      services: path.resolve(import.meta.dirname, 'src/services'),
      hooks: path.resolve(import.meta.dirname, 'src/hooks'),
      assets: path.resolve(import.meta.dirname, 'src/assets'),
      styles: path.resolve(import.meta.dirname, 'src/styles'),
      routes: path.resolve(import.meta.dirname, 'src/routes.tsx'),
    },
  },
  server: {
    port: 3000,
    headers: {
      'Content-Security-Policy': devCspDirectives,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  preview: {
    port: 3000,
    headers: {
      'Content-Security-Policy': cspDirectives,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router') || id.includes('react-dom') || id.includes('/react/')) {
              return 'react';
            }
            if (id.includes('@reduxjs') || id.includes('react-redux')) {
              return 'redux';
            }
          }
        },
      },
    },
  },
});
