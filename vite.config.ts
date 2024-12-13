import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
    }
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-helmet'],
          'ui-vendor': ['@headlessui/react', 'framer-motion', 'lucide-react'],
          'date-vendor': ['date-fns'],
          'grpc-vendor': ['@improbable-eng/grpc-web', 'google-protobuf'],
          'convai-vendor': ['convai-web-sdk'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        passes: 2
      },
      mangle: {
        toplevel: true,
        safari10: true
      },
      format: {
        comments: false,
        ascii_only: true
      },
      safari10: true
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'react-helmet': 'react-helmet'
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-helmet',
      'lucide-react',
      '@headlessui/react',
      'framer-motion',
      'date-fns',
      'convai-web-sdk',
      '@improbable-eng/grpc-web',
      'google-protobuf'
    ]
  }
});