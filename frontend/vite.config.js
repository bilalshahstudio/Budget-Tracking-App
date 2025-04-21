import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "./", // important if routing breaks
  build: {
    outDir: "dist",
  },
  plugins: [react()],
});
