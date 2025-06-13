<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Bienvenido a tu Asistente IA</h1>
      <p>Inicia sesión para comenzar a optimizar tu documentación.</p>
      <SignIn routing="path" :after-sign-in-url="'/'" />
    </div>
  </div>
</template>

<script setup>
/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/web/src/views/LoginView.vue
 * ----------------------------------------------------------------
 * Propósito: La página de inicio de sesión. Muestra el componente
 * de Clerk para que el usuario pueda autenticarse.
 */
import { SignIn, useClerk, useUser } from "@clerk/vue";
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { isSignedIn } = useUser();
const { session } = useClerk();

// Comprobar si ya está autenticado cuando se monta el componente
onMounted(() => {
  if (isSignedIn) {
    router.replace("/");
  }
});

// Observar cambios en el estado de autenticación
watch(isSignedIn, (newValue) => {
  if (newValue === true) {
    router.replace("/");
  }
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
}
.login-box {
  padding: 3rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
}
.login-box h1 {
  font-weight: 600;
}
.login-box p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}
</style>
