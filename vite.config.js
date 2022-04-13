import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      components: path.resolve(__dirname, "src/components"),
      views: path.resolve(__dirname, "src/views"),
    },
  },
  build: {
    assetsDir: "static",
  },
  plugins: [
    vue(),
  ],
});
