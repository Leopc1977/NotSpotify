import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['firebase-admin'],
    },
  },
  plugins: [
    svgr(),
    react({
      babel: {
        plugins: [
          [
            "babel-plugin-styled-components",
            { displayName: true, fileName: true },
          ],
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    strictPort: true,
    host: true,
  },
});
