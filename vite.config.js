import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
    // VitePWA({
    //   registerType: "prompt",
    //   includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
    //   manifest: {
    //     name: "Dashboard Escape Game",
    //     short_name: "Dashboard Escape Game",
    //     description: "Dashboard of escape game workshop of Digital Event 2023 by ESD Bordeaux",
    //     theme_color: "#437AE3",
    //     start_url: "/",
    //     icons: [
    //       {
    //         src: "pwa-192x192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //       {
    //         src: "pwa-512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "pwa-512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //         purpose: "any maskable",
    //       },
    //     ],
    //   },
    // }),
  ],
});
