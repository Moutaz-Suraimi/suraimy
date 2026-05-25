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
        // Manual chunk splitting for maximum caching efficiency
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Heavy animation library → isolated chunk, cached independently
            if (id.includes("framer-motion")) return "vendor-framer";
            // Icon library → isolated chunk
            if (id.includes("lucide-react")) return "vendor-lucide";
            // Router → small, cached forever
            if (
              id.includes("react-router-dom") ||
              id.includes("react-router") ||
              id.includes("@remix-run")
            )
              return "vendor-router";
            // React core → always cached
            if (id.includes("/react/") || id.includes("/react-dom/"))
              return "vendor-react";
            // Query state management
            if (id.includes("@tanstack/react-query")) return "vendor-query";
            // All other node_modules go into a shared vendor chunk
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
    // Remove console logs and debugger in production
    esbuildOptions: {
      drop: mode === "production" ? ["console", "debugger"] : [],
      legalComments: "none",
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
