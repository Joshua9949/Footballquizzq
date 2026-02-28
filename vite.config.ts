import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import { copyFileSync, mkdirSync, existsSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    build(),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    }),
    {
      name: 'copy-static',
      closeBundle() {
        // Ensure public/static files are copied to dist
        const staticDir = resolve(__dirname, 'dist/static')
        if (!existsSync(staticDir)) {
          mkdirSync(staticDir, { recursive: true })
        }
        try {
          copyFileSync(
            resolve(__dirname, 'public/static/styles.css'),
            resolve(__dirname, 'dist/static/styles.css')
          )
          copyFileSync(
            resolve(__dirname, 'public/static/app.js'),
            resolve(__dirname, 'dist/static/app.js')
          )
        } catch(e) {
          console.warn('Could not copy static files:', e)
        }
      }
    }
  ],
  build: {
    outDir: 'dist'
  }
})
