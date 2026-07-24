import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        short_name: "MDN",
        name: "MDN Web Docs",
        icons: [
          {
            src: "/web-app-manifest-192x192.png",
            sizes: "192x192",
          },
          {
            src: "/web-app-manifest-512x512.png",
            sizes: "512x512",

          },
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "black",
        background_color: "white",
      },
    }),
  ],
});