import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    allowedHosts: [
      'refupet.org',
      // ... other allowed hosts
    ]
  }
})