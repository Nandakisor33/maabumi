import { defineConfig, transformWithOxc } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: './',
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
    },
    {
      name: "postbuild-copy-to-root",
      closeBundle() {
        if (fs.existsSync('./dist/dev-index.html')) {
          fs.renameSync('./dist/dev-index.html', './index.html');
          
          const files = fs.readdirSync('./dist');
          for (const file of files) {
            const srcPath = resolve('./dist', file);
            const destPath = resolve('./', file);
            
            if (fs.existsSync(destPath)) {
              fs.rmSync(destPath, { recursive: true, force: true });
            }
            fs.renameSync(srcPath, destPath);
          }
          
          fs.rmSync('./dist', { recursive: true, force: true });
        }
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve('dev-index.html'),
      },
    },
  },
})
