import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "../views/LoginView.vue";
import FileUploadView from "../views/FileUploadView.vue";
import TemplateViewerView from "../views/TemplateViewerView.vue";
import HomeView from "../views/HomeView.vue";
import { useAuth } from "@clerk/vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: false },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: "/upload",
      name: "fileUpload",
      component: FileUploadView,
      meta: { requiresAuth: true },
    },
    {
      path: "/template",
      name: "templateViewer",
      component: TemplateViewerView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { requiresAuth: false },
    },
  ],
});

// Proteger rutas que requieren autenticación
router.beforeEach((to, from) => {
  const { isSignedIn } = useAuth();

  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (to.meta.requiresAuth && !isSignedIn.value) {
    return {
      path: "/",
    };
  }

  // Si el usuario está autenticado e intenta acceder a la página de inicio o login
  if (isSignedIn.value && (to.path === "/" || to.path === "/login")) {
    return {
      path: "/dashboard",
    };
  }
});

export default router;
