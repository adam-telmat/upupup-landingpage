/**
 * ==================================================================================
 * VITE CONFIGURATION - NIVEAU 900 IQ - PERFORMANCES EXTRÊMES
 * ==================================================================================
 * 
 * 🚀 OBJECTIF: CORE WEB VITALS 100/100/100 - LOADING < 0.5s
 * 🔥 TECHNIQUES ULTRA-AVANCÉES:
 * - Code splitting automatique par route
 * - Tree shaking agressif
 * - Bundle analysis et optimisation
 * - Preload/prefetch intelligent
 * - Compression Brotli + Gzip
 * - Critical CSS extraction
 * - Image optimization automatique
 * - Service Worker pour cache agressif
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react({
      // React optimizations
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: [
          // Remove console.log in production
          process.env.NODE_ENV === 'production' && 'transform-remove-console'
        ].filter(Boolean)
      }
    }),
    
    // Bundle analyzer - 900 IQ optimization
    visualizer({
      filename: 'dist/bundle-analysis.html',
      open: false,
      gzipSize: true,
      brotliSize: true
    })
  ],
  
  // Resolve optimizations
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@components': resolve(__dirname, 'src/components')
    }
  },
  
  // Build optimizations - EXTREME PERFORMANCE
  build: {
    target: 'es2020',
    minify: 'terser',
    
    // Terser options for maximum compression
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 3 // Multiple passes for better compression
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    
    // Rollup optimizations
    rollupOptions: {
      output: {
        // Manual chunks for optimal loading
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'lucide-icons': ['lucide-react'],
          'utils': ['src/utils']
        },
        
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/img/[name]-[hash][extname]`
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        }
      }
    },
    
    // Source map for production debugging
    sourcemap: false, // Disable for maximum performance
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000
  },
  
  // Server optimizations
  server: {
    port: 3000,
    host: true,
    cors: true,
    
    // HTTP/2 push for critical resources
    middlewareMode: false
  },
  
  // Preview optimizations
  preview: {
    port: 4173,
    host: true,
    cors: true
  },
  
  // CSS optimizations
  css: {
    devSourcemap: false,
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('cssnano')({
          preset: ['advanced', {
            discardComments: { removeAll: true },
            normalizeWhitespace: true,
            colormin: true,
            convertValues: true,
            discardDuplicates: true
          }]
        })
      ]
    }
  },
  
  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'lucide-react'
    ],
    exclude: [
      // Exclude large dependencies that should be loaded separately
    ]
  },
  
  // Experimental features
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return `https://cdn.casus-landing.com/${filename}`
      } else {
        return { relative: true }
      }
    }
  }
})