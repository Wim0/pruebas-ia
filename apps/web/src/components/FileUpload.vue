<template>
  <div class="upload-area">
    <input
      type="file"
      @change="handleFileChange"
      accept=".pdf"
      class="file-input"
      ref="fileInputRef" />
    <button @click="uploadFile" :disabled="!file || isLoading" class="btn-primary">
      {{ isLoading ? "Subiendo..." : "Subir Archivo" }}
    </button>
    <p v-if="message" class="status-message" :class="{ success: isSuccess, error: !isSuccess }">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/web/src/components/FileUpload.vue
 * ----------------------------------------------------------------
 * Propósito: Componente reutilizable para la carga de archivos.
 * Contiene la lógica para seleccionar un archivo y enviarlo al backend.
 */
import { ref } from "vue";
import axios from "axios";
import { useAuth } from "@clerk/vue";

const file = ref(null);
const isLoading = ref(false);
const message = ref("");
const isSuccess = ref(false);
const fileInputRef = ref(null); // Referencia al input de archivo
const { getToken } = useAuth();

const handleFileChange = (event) => {
  file.value = event.target.files[0];
  message.value = "";
};

const uploadFile = async () => {
  if (!file.value) return;
  isLoading.value = true;
  message.value = "";
  isSuccess.value = false;

  const formData = new FormData();
  formData.append("file", file.value);

  try {
    const token = await getToken();
    const response = await axios.post("/api/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    message.value = response.data.message;
    isSuccess.value = true;
  } catch (error) {
    message.value = error.response?.data?.message || "Error al subir el archivo.";
    isSuccess.value = false;
    console.error(error);
  } finally {
    isLoading.value = false;
    file.value = null;
    if (fileInputRef.value) {
      fileInputRef.value.value = ""; // Resetea el input de archivo
    }
  }
};
</script>

<style scoped>
.upload-area {
  margin-top: 1rem;
}
.file-input {
  margin-right: 1rem;
}
.status-message {
  margin-top: 1rem;
  font-weight: 500;
  padding: 0.75rem;
  border-radius: 5px;
}
.success {
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
}
.error {
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
}
</style>
