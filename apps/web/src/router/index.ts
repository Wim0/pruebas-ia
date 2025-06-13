/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/web/src/router/index.ts
 * ----------------------------------------------------------------
 * Propósito: Define las rutas (páginas) de nuestra aplicación
 * e implementa un "guardián de navegación" para proteger las rutas privadas.
 */
import { createRouter, createWebHistory } from "vue-router";
import { useClerk } from "@clerk/vue";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
      meta: { requiresAuth: true }, // Esta ruta requiere que el usuario esté autenticado
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

// Guardián de navegación: se ejecuta antes de cada cambio de ruta
router.beforeEach(async (to) => {
  if (!window.Clerk) {
    if (to.meta.requiresAuth) {
      return { name: "login" };
    }
    return true;
  }

  const isSignedIn = window.Clerk.isSignedIn;

  if (to.name === "login" && isSignedIn) {
    return { name: "dashboard" };
  }

  if (to.meta.requiresAuth && !isSignedIn) {
    return { name: "login" };
  }

  return true;
});

export default router;
