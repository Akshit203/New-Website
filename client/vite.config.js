import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },

  server: {
    proxy: {
      "/api": "http://localhost:1234",
    },
    port: 5173,
  },
});
