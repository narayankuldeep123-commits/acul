import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    fs: {
      deny: ["dist"],
    },
  },
  clearScreen: false,
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@/screens": resolve(__dirname, "./src/screens"),
      "@/utils": resolve(__dirname, "./src/utils"),
      "@/shared": resolve(__dirname, "./src/shared"),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        'login-id': resolve(__dirname, 'src/screens/login-id/index.tsx'),
        'login-password': resolve(__dirname, 'src/screens/login-password/index.tsx'),
        main: resolve(__dirname, "index.html"),
      },
      output: {
        entryFileNames: 'assets/[name].index.js',
        chunkFileNames: 'assets/shared/[name].[hash].js',
        assetFileNames: 'assets/shared/[name].[ext]',
        manualChunks: undefined,
      },
    },
  },
});