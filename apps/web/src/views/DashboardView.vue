<template>
  <div class="dashboard">
    <div class="welcome-section">
      <div>
        <h1 class="welcome-title">Bienvenido, {{ userFirstName }}</h1>
        <p class="welcome-subtitle">Panel de control del proceso de implementación ISO 27001</p>
      </div>
      <div class="welcome-role">
        <div class="role-badge">{{ userRole }}</div>
      </div>
    </div>

    <!-- Estadísticas del dashboard -->
    <DashboardStats
      :documents-uploaded="documentsUploaded"
      :completion-percentage="overallCompletion"
      :days-remaining="daysRemaining"
      :pending-sections="pendingSections" />

    <!-- Secciones de la normativa ISO 27001 -->
    <div class="iso-sections">
      <h2>Progreso por Secciones</h2>

      <div class="sections-grid">
        <ProgressIndicator
          v-for="category in categories"
          :key="category.id"
          :title="category.name"
          :sections="category.sections"
          :show-details="true" />
      </div>
    </div>

    <!-- Acciones rápidas -->
    <div class="quick-actions">
      <h2>Acciones Rápidas</h2>

      <div class="actions-grid">
        <RouterLink to="/upload" class="action-card">
          <div class="action-icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
            </svg>
          </div>
          <h3>Subir Documentación</h3>
          <p>Añade documentos de referencia para el análisis IA</p>
        </RouterLink>

        <RouterLink to="/template" class="action-card">
          <div class="action-icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
            </svg>
          </div>
          <h3>Completar Plantilla</h3>
          <p>Trabaja en la documentación con asistencia IA</p>
        </RouterLink>

        <div class="action-card">
          <div class="action-icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z" />
            </svg>
          </div>
          <h3>Ver Historial</h3>
          <p>Revisa tus cambios y versiones anteriores</p>
        </div>

        <div class="action-card">
          <div class="action-icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
            </svg>
          </div>
          <h3>Soporte</h3>
          <p>Obtén ayuda con el proceso de cumplimiento</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUser } from "@clerk/vue";
import { ref, computed, onMounted } from "vue";
import { RouterLink } from "vue-router";
import DashboardStats from "../components/DashboardStats.vue";
import ProgressIndicator from "../components/ProgressIndicator.vue";
import { useTemplateProgress } from "../composables/useTemplateProgress.js";

const { user } = useUser();
const userFirstName = computed(() => user.value?.firstName || "Usuario");
const userRole = computed(() => {
  const role = user.value?.publicMetadata?.role || "administrador";
  return role.charAt(0).toUpperCase() + role.slice(1);
});

// Usar el composable de progreso para datos reales
const {
  documentsUploaded,
  overallProgress,
  categories,
  pendingSections,
  daysRemaining,
  updateDocumentsCount,
} = useTemplateProgress();

// Calcular porcentaje de completado usando datos reales
const overallCompletion = computed(() => overallProgress.value.percentage);

onMounted(async () => {
  // Cargar el número real de documentos subidos
  await updateDocumentsCount();
});
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.welcome-title {
  margin: 0;
  font-size: 2rem;
  color: var(--text-primary);
}

.welcome-subtitle {
  margin: 0.5rem 0 0;
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.role-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: rgba(45, 140, 255, 0.1);
  color: var(--primary-color);
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.9rem;
}

.iso-sections {
  margin-bottom: 3rem;
}

.iso-sections h2,
.quick-actions h2 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: var(--text-primary);
}

.sections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 1.5rem;
}

.quick-actions {
  margin-bottom: 2rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  color: var(--text-primary);
  cursor: pointer;
}

.action-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: rgba(45, 140, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.action-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}

.action-card p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}
</style>
