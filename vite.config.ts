import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: ".",

  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
  },

  server: {
    host: "0.0.0.0",
    port: 5173,

    watch: {
      usePolling: true,
    },

    proxy: {
      "/compactURL": {
        target: "http://app:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});