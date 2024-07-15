import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true,
    proxy: {
      // Using the proxy instance
      "/api/movie": {
        target: "http://localhost:8081",
        changeOrigin: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api/account": {
        target: "http://localhost:8082",
        changeOrigin: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api/communication": {
        target: "http://localhost:8005",
        changeOrigin: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // Proxying websockets or socket.io: ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
      "/socket.io": {
        target: "ws://localhost:5174",
        ws: true,
      },
    },
  },

  build: {
    outDir: "build",
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      /**
       * Ignore "use client" waning since we are not using SSR
       * @see {@link https://github.com/TanStack/query/pull/5161#issuecomment-1477389761 Preserve 'use client' directives TanStack/query#5161}
       */
      onwarn(warning, warn) {
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" &&
          warning.message.includes(`"use client"`)
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
});
