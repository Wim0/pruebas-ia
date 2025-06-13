<template>
  <div class="dashboard">
    <h1 class="welcome-title">Bienvenido, {{ userFirstName }} - {{ userRole }}</h1>
    <p class="welcome-subtitle">
      Aquí puedes gestionar tus documentos y acelerar tu proceso de cumplimiento.
    </p>

    <div class="grid-container">
      <div class="card">
        <h2>Paso 1: Cargar Documentos</h2>
        <p>
          Sube tus documentos de referencia (PDF) para que la IA aprenda el contexto de tu empresa.
          La IA usará esta información para darte sugerencias personalizadas.
        </p>
        <FileUpload />
      </div>

      <div class="card">
        <h2>Paso 2: Completar Plantilla</h2>
        <p>
          Interactúa con la plantilla de ISO 27001. Haz clic en los campos rellenables para recibir
          sugerencias de la IA basadas en los documentos que subiste.
        </p>
        <TemplateViewer />
      </div>
    </div>
  </div>
</template>

<script setup>
/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/web/src/views/DashboardView.vue
 * ----------------------------------------------------------------
 * Propósito: El panel principal que el usuario ve después de iniciar sesión.
 * Contiene los componentes para cargar archivos y ver la plantilla.
 */
import { useUser, useOrganization } from "@clerk/vue";
import { ref, onMounted, computed } from "vue";
import FileUpload from "../components/FileUpload.vue";
import TemplateViewer from "../components/TemplateViewer.vue";

const { user } = useUser();
const userFirstName = computed(() => user.value?.firstName);
const userRole = computed(() => user.value?.publicMetadata?.role);
</script>

<style scoped>
.welcome-title {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}
.welcome-subtitle {
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}
.user-role {
  font-size: 0.9em;
  color: var(--text-secondary);
  font-weight: normal;
}
</style>
