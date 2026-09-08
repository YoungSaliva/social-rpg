import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Served from https://youngsaliva.github.io/social-rpg/ — asset URLs need
  // this base path so they resolve correctly on GitHub Pages.
  base: '/social-rpg/',
})
