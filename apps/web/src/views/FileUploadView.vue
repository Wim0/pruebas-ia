<template>
  <div class="file-upload-page">
    <div class="page-header">
      <h1>Gestión de Documentos</h1>
      <p class="subtitle">
        Sube tus documentos de referencia (PDF) para que la IA aprenda el contexto de tu empresa.
      </p>
    </div>

    <div class="upload-section card">
      <h2>Cargar Nuevo Documento</h2>
      <p>
        La IA analizará estos documentos para proporcionarte sugerencias personalizadas al completar
        la plantilla ISO 27001.
      </p>

      <FileUpload @upload-success="onUploadSuccess" />
    </div>

    <div class="documents-section card">
      <h2>Documentos Cargados</h2>

      <div v-if="loading" class="documents-loading">
        <div class="loading-spinner"></div>
        <p>Cargando documentos...</p>
      </div>

      <div v-else-if="documents.length === 0" class="no-documents">
        <svg width="64" height="64" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
          <path fill="currentColor" d="M13 9h5l-5-5v5z" />
        </svg>
        <p>No hay documentos cargados.</p>
        <p class="hint">Los documentos que subas aparecerán aquí.</p>
      </div>

      <div v-else class="documents-list">
        <div v-for="doc in documents" :key="doc.id" class="document-item">
          <div class="document-icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z" />
              <path
                fill="currentColor"
                d="M14 3v5h5v13H6V3h8zm-1 10H7v-1h6v1zm4 3H7v-1h10v1zm0 3H7v-1h10v1z" />
            </svg>
          </div>
          <div class="document-info">
            <h3>{{ doc.name }}</h3>
            <p>{{ formatDate(doc.uploadDate) }} • {{ formatSize(doc.size) }}</p>
          </div>
          <button
            class="btn-icon"
            @click="deleteDocument(doc.id)"
            title="Eliminar documento"
            :disabled="deleting === doc.id">
            <svg v-if="deleting !== doc.id" width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
            <div v-else class="delete-spinner"></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import FileUpload from "../components/FileUpload.vue";
import axios from "axios";

const documents = ref([]);
const loading = ref(true);
const deleting = ref(null);

// Función para cargar la lista de documentos
const loadDocuments = async () => {
  loading.value = true;
  try {
    const response = await axios.get("/api/files/list");
    documents.value = response.data.files || [];
  } catch (error) {
    console.error("Error al cargar documentos:", error);
    documents.value = [];
  } finally {
    loading.value = false;
  }
};

// Función para manejar subida exitosa
const onUploadSuccess = (newFile) => {
  documents.value.unshift(newFile);
};

// Función para eliminar un documento
const deleteDocument = async (id) => {
  if (!confirm("¿Estás seguro de querer eliminar este documento?")) return;

  deleting.value = id;
  try {
    await axios.delete(`/api/files/${encodeURIComponent(id)}`);
    documents.value = documents.value.filter((doc) => doc.id !== id);
  } catch (error) {
    console.error("Error al eliminar documento:", error);
    alert("Error al eliminar el documento.");
  } finally {
    deleting.value = null;
  }
};

// Función para formatear fechas
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Función para formatear tamaños de archivo
const formatSize = (bytes) => {
  if (!bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

onMounted(() => {
  loadDocuments();
});
</script>

<style scoped>
.file-upload-page {
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

.upload-section p {
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
}

.documents-section h2 {
  margin-bottom: 1.5rem;
}

.no-documents {
  text-align: center;
  padding: 3rem 0;
  color: var(--text-secondary);
}

.no-documents svg {
  opacity: 0.5;
  margin-bottom: 1rem;
}

.hint {
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.documents-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  color: var(--text-secondary);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  margin-bottom: 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.documents-list {
  display: grid;
  gap: 1rem;
}

.document-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f9fafb;
  transition: all 0.2s ease;
}

.document-item:hover {
  background-color: #f0f5ff;
}

.document-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: #e74c3c;
}

.document-info {
  flex: 1;
}

.document-info h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
}

.document-info p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.btn-icon {
  background: none;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.btn-icon:hover {
  background-color: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.btn-icon:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.delete-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #e74c3c;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
</style>
