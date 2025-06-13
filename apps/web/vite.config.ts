import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      // Cualquier petición que comience con /api será redirigida
      "/api": {
        target: "http://localhost:3000", // El puerto de API NestJS
        changeOrigin: true, // Necesario para el proxy
        rewrite: (path) => path.replace(/^\/api/, ""), // Elimina /api de la ruta final
      },
    },
  },
});
