import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";

const pwaConfig = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touch-icon-180x180.png", "masked-icon.svg"],
  manifest: {
    name: "WakeMeCrypto",
    short_name: "WakeMeCrypto",
    description: "WakeMeCrypto is a decentralized alarm clock",
    icons: [
      {
        "src": "pwa-64x64.png",
        "sizes": "64x64",
        "type": "image/png"
      },
      {
        "src": "pwa-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "pwa-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      },
      {
        "src": "maskable-icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "maskable"
      }
    ],
    theme_color: "#171717",
    background_color: "#e8ebf2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait"
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(pwaConfig)]
});