<template>
  <div id="app-container" :class="{ 'sidebar-expanded': !sidebarCollapsed }">
    <SignedIn>
      <Sidebar v-model:collapsed="sidebarCollapsed" />
      <div class="main-content">
        <Navbar @toggle-sidebar="toggleSidebar" />
        <main>
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>
      </div>
    </SignedIn>

    <SignedOut>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </SignedOut>
  </div>
</template>

<script setup>
/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/web/src/App.vue
 * ----------------------------------------------------------------
 * Propósito: El componente raíz de la aplicación. Define el layout principal
 * con un sidebar, cabecera y un área de contenido donde se renderizarán las vistas.
 */
import { ref, onMounted, watch } from "vue";
import { RouterView, useRouter } from "vue-router";
import { SignedIn, SignedOut, useAuth } from "@clerk/vue";
import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";

const sidebarCollapsed = ref(false);
const router = useRouter();
const { isSignedIn } = useAuth();

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

// Escuchar cambios en el estado de autenticación para redireccionar adecuadamente
watch(
  isSignedIn,
  (newValue) => {
    const currentPath = router.currentRoute.value.path;

    if (newValue) {
      // Si está autenticado y está en la página de inicio, redirigir al dashboard
      if (currentPath === "/" || currentPath === "/login") {
        router.push("/dashboard");
      }
    } else {
      // Si no está autenticado y está en una ruta protegida, redirigir a inicio
      if (router.currentRoute.value.meta.requiresAuth) {
        router.push("/");
      }
    }
  },
  { immediate: true }
);

onMounted(() => {
  // Verificar estado de autenticación inicial
  if (isSignedIn.value) {
    const currentPath = router.currentRoute.value.path;
    if (currentPath === "/" || currentPath === "/login") {
      router.push("/dashboard");
    }
  }
});
</script>

<style>
#app-container {
  display: flex;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
}

.sidebar-expanded .main-content {
  margin-left: 250px;
}

main {
  flex-grow: 1;
  padding: 1.5rem;
  background-color: #f8f9fb;
  min-height: calc(100vh - 64px);
}

/* Animaciones para transiciones entre páginas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Estilos globales para botones y tarjetas con animaciones */
.btn-primary,
.btn-secondary {
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.btn-primary:hover,
.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
</style>
