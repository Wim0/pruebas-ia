<template>
  <div class="file-upload">
    <div
      @drop="handleDrop"
      @dragover.prevent
      @dragenter.prevent
      class="drop-zone"
      :class="{ 'drop-zone--active': isDragging, 'drop-zone--disabled': uploading }">
      <div class="drop-zone-content">
        <svg width="48" height="48" viewBox="0 0 24 24" class="upload-icon">
          <path
            fill="currentColor"
            d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        </svg>

        <div v-if="!uploading">
          <h3>Arrastra tu archivo PDF aquí</h3>
          <p>
            o
            <button type="button" @click="selectFile" class="link-button">
              haz clic para seleccionar
            </button>
          </p>
          <p class="file-requirements">Máximo 10MB • Solo archivos PDF</p>
        </div>

        <div v-else class="uploading-state">
          <div class="upload-spinner"></div>
          <p>Subiendo archivo...</p>
          <div class="upload-progress">
            <div class="upload-progress-bar" :style="{ width: uploadProgress + '%' }"></div>
          </div>
        </div>
      </div>

      <input
        ref="fileInput"
        type="file"
        accept=".pdf"
        @change="handleFileSelect"
        style="display: none" />
    </div>

    <div v-if="error" class="error-message">
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2Z" />
      </svg>
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const emit = defineEmits(["upload-success"]);

const fileInput = ref(null);
const isDragging = ref(false);
const uploading = ref(false);
const uploadProgress = ref(0);
const error = ref("");

const selectFile = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    uploadFile(file);
  }
};

const handleDrop = (event) => {
  event.preventDefault();
  isDragging.value = false;

  const files = event.dataTransfer.files;
  if (files.length > 0) {
    uploadFile(files[0]);
  }
};

const validateFile = (file) => {
  // Verificar tipo de archivo
  if (file.type !== "application/pdf") {
    return "Solo se permiten archivos PDF";
  }

  // Verificar tamaño (10MB)
  if (file.size > 10 * 1024 * 1024) {
    return "El archivo no puede ser mayor a 10MB";
  }

  return null;
};

const uploadFile = async (file) => {
  error.value = "";

  // Validar archivo
  const validationError = validateFile(file);
  if (validationError) {
    error.value = validationError;
    return;
  }

  uploading.value = true;
  uploadProgress.value = 0;

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("/api/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      },
    });

    emit("upload-success", response.data.file);

    // Limpiar el input
    if (fileInput.value) {
      fileInput.value.value = "";
    }
  } catch (err) {
    console.error("Error al subir archivo:", err);
    error.value = err.response?.data?.message || "Error al subir el archivo";
  } finally {
    uploading.value = false;
    uploadProgress.value = 0;
  }
};
</script>

<style scoped>
.file-upload {
  width: 100%;
}

.drop-zone {
  border: 2px dashed #cbd5e0;
  border-radius: 8px;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: #f8fafc;
}

.drop-zone:hover:not(.drop-zone--disabled) {
  border-color: var(--primary-color);
  background-color: #f0f5ff;
}

.drop-zone--active {
  border-color: var(--primary-color);
  background-color: #e6f3ff;
}

.drop-zone--disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.upload-icon {
  color: #a0aec0;
  margin-bottom: 1rem;
}

.drop-zone-content h3 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
  font-weight: 500;
}

.drop-zone-content p {
  margin: 0.25rem 0;
  color: var(--text-secondary);
}

.link-button {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  text-decoration: underline;
  font: inherit;
}

.link-button:hover {
  color: var(--primary-dark);
}

.file-requirements {
  font-size: 0.85rem;
  margin-top: 1rem !important;
}

.uploading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.upload-progress {
  width: 200px;
  height: 6px;
  background-color: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.upload-progress-bar {
  height: 100%;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #fee;
  border: 1px solid #fecaca;
  border-radius: 6px;
  color: #dc2626;
  font-size: 0.9rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
