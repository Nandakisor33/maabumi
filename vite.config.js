import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',

  server: {
    host: true,
    port: process.env.PORT ? Number(process.env.PORT) : undefined
  },

  preview: {
    host: true,
    port: process.env.PORT ? Number(process.env.PORT) : undefined
  },

  plugins: [
    react()
  ],

  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})