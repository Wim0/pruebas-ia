<template>
  <div class="template-viewer-page">
    <div class="page-header">
      <h1>Plantilla ISO 27001</h1>
      <p class="subtitle">
        Completa tu documentación con ayuda de IA basada en tus documentos de referencia.
      </p>
    </div>

    <div class="template-container card">
      <div class="template-header">
        <h2>Política de Seguridad de la Información</h2>
        <div class="template-actions">
          <button class="btn-secondary" @click="downloadTemplate">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
            </svg>
            Descargar
          </button>
          <button class="btn-danger" @click="resetProgress" title="Reinicia todo el progreso">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
            </svg>
            Reiniciar
          </button>
          <button class="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
            </svg>
            Guardar
          </button>
        </div>
      </div>

      <div class="template-viewer-wrapper">
        <TemplateViewer ref="templateViewerRef" />
      </div>

      <div class="template-tips">
        <div class="tip">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <span>Haz clic en los campos resaltados para recibir sugerencias de IA.</span>
        </div>
        <div class="tip">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
          <span>Las sugerencias son generadas automáticamente basadas en tus documentos.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TemplateViewer from "../components/TemplateViewer.vue";
import { useTemplateProgress } from "../composables/useTemplateProgress.js";

const templateViewerRef = ref(null);
const { resetAllProgress } = useTemplateProgress();

// Función para descargar el template como PDF
const downloadTemplate = () => {
  if (templateViewerRef.value) {
    templateViewerRef.value.downloadPDF();
  }
};

// Función para reiniciar todo el progreso
const resetProgress = () => {
  if (confirm("¿Estás seguro de que quieres reiniciar todo el progreso? Esta acción no se puede deshacer.")) {
    // Reiniciar el progreso
    resetAllProgress();
    
    // Actualizar visualmente el template
    if (templateViewerRef.value) {
      setTimeout(() => {
        templateViewerRef.value.updateCompletedFieldsVisually();
      }, 100);
    }
    
    alert("El progreso ha sido reiniciado completamente.");
  }
};
</script>

<style scoped>
.template-viewer-page {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.template-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.template-header h2 {
  margin: 0;
}

.template-actions {
  display: flex;
  gap: 1rem;
}

.template-viewer-wrapper {
  margin-bottom: 2rem;
}

.template-tips {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.tip {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.tip svg {
  margin-right: 0.5rem;
  color: var(--primary-color);
}

.btn-primary,
.btn-secondary,
.btn-danger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
}

.btn-secondary {
  background-color: white;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background-color: #f8f9fb;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
}

.btn-danger:hover {
  background-color: #c82333;
}
</style>
