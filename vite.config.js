import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Base path for GitHub Pages: https://<user>.github.io/<repo>/
  // Repo: ShravanShenoy4477/personal-portfolio-site
  base: '/personal-portfolio-site/',
})


