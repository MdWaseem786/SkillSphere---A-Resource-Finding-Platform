import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Allow Replit proxy host without editing each time
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    allowedHosts: true,   // allow any host (Replit rotates)
    port: 5173
  }
});
