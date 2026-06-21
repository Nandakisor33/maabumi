import { defineConfig, transformWithOxc } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',

  server: {
    host: true,
    port: process.env.PORT ? Number(process.env.PORT) : 5173
  },

  preview: {
    host: true,
    port: process.env.PORT ? Number(process.env.PORT) : 5173
  },

  plugins: [
    react(),

    {
      name: 'transform-jsx-in-js',
      enforce: 'pre',

      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) {
          return null
        }

        return await transformWithOxc(code, id, {
          lang: 'jsx'
        })
      }
    }
  ],

  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})