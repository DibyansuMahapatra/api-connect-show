import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: ".", // <-- make sure root is project root where index.html lives
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // default, ensures build output goes to /app/dist
    emptyOutDir: true, // cleans dist before build
  },
  server: {
    port: 8081,
  },
});