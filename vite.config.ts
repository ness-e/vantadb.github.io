import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import glsl from "vite-plugin-glsl";
import path from "path";

export default defineConfig({
  plugins: [TanStackRouterVite(), react(), tailwindcss(), tsConfigPaths(), glsl()],
  // Base path for Vercel deployment
  base: "/",
  resolve: {
    alias: {
      "@experience": path.resolve(__dirname, "./src/components/singularity-master/src/Experience"),
    },
  },
});
