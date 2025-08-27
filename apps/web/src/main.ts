/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/web/src/main.ts
 * ----------------------------------------------------------------
 * Propósito: El punto de entrada de nuestra aplicación Vue.
 * Aquí inicializamos Vue, el router y el plugin de Clerk.
 */
import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { clerkPlugin } from "@clerk/vue";

const app = createApp(App);

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY from .env");
}

app.use(clerkPlugin, {
  publishableKey: clerkPubKey,
});

app.use(router);

app.mount("#app");
