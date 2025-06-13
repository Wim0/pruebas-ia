<template>
  <div class="template-container">
    <div v-if="loadingTemplate" class="loader">
      <p>Cargando plantilla interactiva...</p>
    </div>
    <!-- Usamos v-html para renderizar el HTML que viene de la API -->
    <div v-else v-html="templateHtml" @click="handleFieldClick" class="template-content"></div>
  </div>
</template>

<script setup>
/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/web/src/components/TemplateViewer.vue
 * ----------------------------------------------------------------
 * Propósito: El componente más inteligente. Carga la plantilla HTML,
 * detecta clics en los campos y llama a la IA para obtener sugerencias.
 */
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuth } from "@clerk/vue";

const templateHtml = ref("");
const loadingTemplate = ref(true);
const { getToken } = useAuth();

onMounted(async () => {
  try {
    const token = await getToken();
    const response = await axios.get("/api/templates/iso27001", {
      headers: { Authorization: `Bearer ${token}` },
    });
    templateHtml.value = response.data.html;
  } catch (error) {
    templateHtml.value =
      '<p class="error">Error al cargar la plantilla. Por favor, recarga la página.</p>';
    console.error(error);
  } finally {
    loadingTemplate.value = false;
  }
});

const handleFieldClick = async (event) => {
  const field = event.target.closest(".fillable-field");
  // Si ya está cargando, no hacemos nada
  if (!field || field.dataset.loading === "true") return;

  const originalText = field.innerHTML;
  const fieldContext = field.getAttribute("data-context");
  if (!fieldContext) return;

  field.dataset.loading = "true";
  field.innerHTML = '<span class="pulsing-loader">✨ Generando sugerencia con IA...</span>';
  field.classList.add("loading");

  try {
    const token = await getToken();
    const response = await axios.post(
      "/api/suggestions/generate",
      { context: fieldContext },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // Reemplazamos el contenido y los saltos de línea por <br> para HTML
    field.innerHTML = response.data.suggestion.replace(/\n/g, "<br>");
  } catch (error) {
    field.innerHTML = originalText;
    alert(
      "Error al generar la sugerencia. Asegúrate de haber subido documentos y sincronizado la Base de Conocimiento en AWS."
    );
    console.error(error);
  } finally {
    field.dataset.loading = "false";
    field.classList.remove("loading");
  }
};
</script>

<style>
.template-content h1,
.template-content h3 {
  color: var(--text-primary);
}
.template-content h3 {
  margin-top: 2rem;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.5rem;
}
.fillable-field {
  border: 1px dashed #ccc;
  padding: 15px;
  margin-top: 1rem;
  background-color: #f9fafb;
  cursor: pointer;
  min-height: 50px;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  color: var(--text-secondary);
  line-height: 1.6;
}
.fillable-field:hover {
  background-color: #f0f5ff;
  border-color: var(--primary-color);
}
.fillable-field.loading {
  cursor: wait;
  background-color: #f0f5ff;
}
.pulsing-loader {
  animation: pulse 1.5s infinite;
  color: var(--primary-color);
  font-weight: 500;
}
@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
</style>
