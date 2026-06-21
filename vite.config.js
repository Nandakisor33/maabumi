import { defineConfig, transformWithOxc } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: '/',
  optimizeDeps: {
    rolldownOptions: {
      moduleTypes: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
    strictPort: true,
  },
  plugins: [
    react(),
    {
      name: "transform-jsx-in-js",
      enforce: "pre",
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) {
          return null;
        }
        return await transformWithOxc(code, id, {
          lang: "jsx",
        });
      },
    }
  ],
  build: {
    rolldownOptions: {
      input: {
        main: resolve('index.html'),
      },
      moduleTypes: {
        '.js': 'jsx',
      },
    },
  },
}))
