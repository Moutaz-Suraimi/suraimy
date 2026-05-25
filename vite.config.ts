import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target modern browsers for smaller output
    target: "esnext",
    // Inline small assets as base64 to save requests
    assetsInlineLimit: 4096,
    // Increase chunk size warning threshold
    chunkSizeWarningLimit: 600,
    // Enable CSS code splitting
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Manual chunk splitting for maximum caching efficiency and stability
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
        // Consistent file naming for long-term caching
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
    // Minification: use esbuild (fast) — SWC handles TS already
    minify: "esbuild",
    esbuildOptions: {
      legalComments: "none",
      drop: mode === "production" ? ["console", "debugger"] : [],
    },
    // Enable source maps only in development
    sourcemap: mode !== "production",
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "@tanstack/react-query",
    ],
    // Exclude heavy packages that are already code-split
    exclude: [],
  },
}));
