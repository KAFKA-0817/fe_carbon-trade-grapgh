import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // 跨域代理
      "/apis": {
        target: "http://localhost:8081", //
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apis/, ""),
      },
    },
  },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  compilerOptions: {
    types: ["element-plus/global"],
  },
});
