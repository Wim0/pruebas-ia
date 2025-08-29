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
import { useTemplateProgress } from "../composables/useTemplateProgress.js";

const templateHtml = ref("");
const loadingTemplate = ref(true);

// Usar el composable de progreso
const { markFieldCompleted, isFieldCompleted, loadProgressFromAPI } = useTemplateProgress();

onMounted(async () => {
  try {
    const response = await axios.get("/api/templates/iso27001");
    templateHtml.value = response.data.html;
  } catch (error) {
    // Plantilla de respaldo con estructura ISO 27001
    templateHtml.value = `
      <div class="iso27001-template">
        <h1>Política de Seguridad de la Información - ISO 27001</h1>
        
        <div class="template-section">
          <h2>1. Introducción</h2>
          <p>La presente política establece el marco de referencia para la gestión de la seguridad de la información en <span class="fillable-field" data-context="nombre de la organización">[NOMBRE DE LA ORGANIZACIÓN]</span>, en cumplimiento con los requisitos de la norma ISO/IEC 27001:2022.</p>
          
          <h3>1.1 Propósito</h3>
          <div class="fillable-field" data-context="propósito de la política de seguridad">
            Haga clic aquí para definir el propósito específico de esta política de seguridad para su organización...
          </div>
        </div>

        <div class="template-section">
          <h2>A.5 Políticas de Seguridad</h2>
          
          <h3>A.5.1 Políticas para la seguridad de la información</h3>
          <p><strong>Control:</strong> Se debe definir un conjunto de políticas para la seguridad de la información, aprobado por la dirección, publicado y comunicado a los empleados y partes externas relevantes.</p>
          
          <div class="fillable-field" data-context="políticas específicas de seguridad de la información">
            Describa las políticas específicas de seguridad de la información que implementa su organización...
          </div>

          <h3>A.5.2 Revisión de las políticas de seguridad</h3>
          <p><strong>Control:</strong> Las políticas para la seguridad de la información se deben revisar a intervalos planificados o si ocurren cambios significativos.</p>
          
          <div class="fillable-field" data-context="proceso de revisión de políticas de seguridad">
            Defina el proceso y frecuencia de revisión de las políticas de seguridad...
          </div>
        </div>

        <div class="template-section">
          <h2>A.6 Organización de la Seguridad de la Información</h2>
          
          <h3>A.6.1 Organización interna</h3>
          <p><strong>Control:</strong> Se debe establecer un marco de gestión para iniciar y controlar la implementación y operación de la seguridad de la información dentro de la organización.</p>
          
          <div class="fillable-field" data-context="estructura organizacional de seguridad">
            Describa la estructura organizacional responsable de la seguridad de la información...
          </div>

          <h3>A.6.2 Dispositivos móviles y teletrabajo</h3>
          <div class="fillable-field" data-context="políticas de dispositivos móviles y teletrabajo">
            Establezca las políticas y procedimientos para el uso seguro de dispositivos móviles y teletrabajo...
          </div>
        </div>

        <div class="template-section">
          <h2>A.7 Seguridad de Recursos Humanos</h2>
          
          <h3>A.7.1 Antes del empleo</h3>
          <p><strong>Control:</strong> Las verificaciones de antecedentes de todos los candidatos a empleo se deben llevar a cabo de acuerdo con las leyes, reglamentos y ética pertinentes.</p>
          
          <div class="fillable-field" data-context="proceso de verificación de antecedentes">
            Describa el proceso de verificación de antecedentes y evaluación de empleados...
          </div>

          <h3>A.7.2 Durante el empleo</h3>
          <div class="fillable-field" data-context="responsabilidades de seguridad durante el empleo">
            Defina las responsabilidades y procedimientos de seguridad durante la relación laboral...
          </div>

          <h3>A.7.3 Terminación y cambio de empleo</h3>
          <div class="fillable-field" data-context="proceso de terminación de empleo">
            Establezca los procedimientos para la terminación o cambio de empleo, incluyendo devolución de activos...
          </div>
        </div>

        <div class="template-section">
          <h2>A.8 Gestión de Activos</h2>
          
          <h3>A.8.1 Responsabilidad por los activos</h3>
          <p><strong>Control:</strong> Los activos asociados con información e instalaciones de procesamiento de información se deben identificar, y se deben definir e implementar responsabilidades de protección.</p>
          
          <div class="fillable-field" data-context="inventario de activos de información">
            Describa el proceso de inventario y clasificación de activos de información...
          </div>

          <h3>A.8.2 Clasificación de la información</h3>
          <div class="fillable-field" data-context="esquema de clasificación de información">
            Defina el esquema de clasificación de la información y las etiquetas de seguridad...
          </div>

          <h3>A.8.3 Manejo de medios</h3>
          <div class="fillable-field" data-context="procedimientos de manejo de medios">
            Establezca los procedimientos para el manejo seguro de medios de almacenamiento...
          </div>
        </div>

        <div class="template-section">
          <h2>2. Aplicabilidad</h2>
          <div class="fillable-field" data-context="alcance y aplicabilidad de la política">
            Defina el alcance y aplicabilidad de esta política dentro de la organización...
          </div>
        </div>

        <div class="template-section">
          <h2>3. Responsabilidades</h2>
          <div class="fillable-field" data-context="roles y responsabilidades específicas">
            Detalle los roles y responsabilidades específicas para la implementación de esta política...
          </div>
        </div>

        <div class="template-section">
          <h2>4. Cumplimiento</h2>
          <div class="fillable-field" data-context="mecanismos de cumplimiento y monitoreo">
            Describa los mecanismos de cumplimiento, monitoreo y consecuencias por incumplimiento...
          </div>
        </div>

        <div class="template-section">
          <h2>5. Revisión y Actualización</h2>
          <p>Esta política será revisada anualmente o cuando sea necesario debido a cambios en:</p>
          <div class="fillable-field" data-context="criterios para revisión de la política">
            Establezca los criterios específicos que triggearán una revisión de esta política...
          </div>
        </div>

        <div class="template-footer">
          <p><strong>Fecha de aprobación:</strong> <span class="fillable-field" data-context="fecha de aprobación">[FECHA]</span></p>
          <p><strong>Aprobado por:</strong> <span class="fillable-field" data-context="autoridad que aprueba">[CARGO Y NOMBRE]</span></p>
          <p><strong>Próxima revisión:</strong> <span class="fillable-field" data-context="fecha de próxima revisión">[FECHA]</span></p>
        </div>
      </div>
    `;
    console.error(error);
  } finally {
    loadingTemplate.value = false;

    // Cargar progreso desde la API y aplicar estilos después de cargar el template
    setTimeout(async () => {
      await loadProgressFromAPI();
      updateCompletedFieldsVisually();
    }, 100);
  }
});

// Función para actualizar visualmente los campos completados
const updateCompletedFieldsVisually = async () => {
  const fillableFields = document.querySelectorAll(".fillable-field");

  for (const field of fillableFields) {
    const fieldContext = field.getAttribute("data-context");
    if (fieldContext && isFieldCompleted(fieldContext)) {
      // Cargar el contenido desde la API
      try {
        const response = await axios.get(
          `/api/templates/fields/context/${encodeURIComponent(fieldContext)}`
        );
        if (response.data && response.data.success && response.data.data) {
          // Actualizar el contenido del campo con el texto guardado
          field.innerHTML = response.data.data.fieldContent.replace(/\n/g, "<br>");
        }
      } catch (error) {
        console.warn(`No se pudo cargar el contenido para el campo: ${fieldContext}`, error);
      }

      // Aplicar estilos de campo completado
      field.style.borderColor = "#28a745";
      field.style.backgroundColor = "#f8fff9";
      field.classList.add("completed");
    } else {
      // Limpiar estilos si el campo no está completado
      field.style.borderColor = "#ccc";
      field.style.backgroundColor = "#f9fafb";
      field.classList.remove("completed");
    }
  }
};

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
    console.log("Enviando petición con contexto:", fieldContext);
    const response = await axios.post("/api/suggestions/generate", { context: fieldContext });
    console.log("Respuesta recibida:", response.data);
    // Reemplazamos el contenido y los saltos de línea por <br> para HTML
    field.innerHTML = response.data.suggestion.replace(/\n/g, "<br>");

    // NO llamar a markFieldCompleted aquí porque el servicio de sugerencias
    // ya guarda automáticamente el campo en la base de datos
    // markFieldCompleted(fieldContext); // ← REMOVIDO

    // Actualizar estilos visuales para mostrar que está completado
    field.style.borderColor = "#28a745";
    field.style.backgroundColor = "#f8fff9";
    field.classList.add("completed");
  } catch (error) {
    field.innerHTML = originalText;
    console.error("Error completo:", error);
    console.error("Error response:", error.response);

    let errorMessage = "Error al generar la sugerencia.";
    if (error.response) {
      errorMessage += ` Status: ${error.response.status}. ${error.response.data?.message || ""}`;
    }

    alert(errorMessage);
    console.error(error);
  } finally {
    field.dataset.loading = "false";
    field.classList.remove("loading");
  }
};

const downloadPDF = () => {
  // Crear una nueva ventana con el contenido para impresión
  const printWindow = window.open("", "_blank");

  // Obtener el contenido actual del template (sin los elementos interactivos)
  const templateContent = document.querySelector(".template-content").cloneNode(true);

  // Remover elementos interactivos y reemplazar con contenido estático
  const fillableFields = templateContent.querySelectorAll(".fillable-field");
  fillableFields.forEach((field) => {
    field.style.border = "none";
    field.style.backgroundColor = "transparent";
    field.style.cursor = "default";
    field.classList.remove("fillable-field");

    // Si el campo está vacío o tiene texto de placeholder, poner contenido por defecto
    if (
      field.innerHTML.includes("Haga clic aquí") ||
      field.innerHTML.includes("Describa") ||
      field.innerHTML.includes("Defina") ||
      field.innerHTML.includes("Establezca")
    ) {
      field.innerHTML = "[PENDIENTE DE COMPLETAR]";
    }
  });

  // HTML para la ventana de impresión
  const printHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Política de Seguridad ISO 27001</title>
      <style>
        body {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }
        .iso27001-template h1 {
          text-align: center;
          color: #2c3e50;
          border-bottom: 3px solid #3498db;
          padding-bottom: 1rem;
          margin-bottom: 2rem;
        }
        .iso27001-template h2 {
          color: #2980b9;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          border-left: 4px solid #3498db;
          padding-left: 1rem;
        }
        .iso27001-template h3 {
          color: #34495e;
          margin-top: 1.5rem;
          margin-bottom: 0.8rem;
        }
        .template-section {
          margin-bottom: 2rem;
          padding: 1rem;
          background-color: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }
        .template-footer {
          margin-top: 3rem;
          padding: 1.5rem;
          background-color: #f1f3f4;
          border-radius: 8px;
          border: 2px solid #d1d9e0;
        }
        @media print {
          body { margin: 0; padding: 1rem; }
          .template-section { break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      ${templateContent.innerHTML}
    </body>
    </html>
  `;

  printWindow.document.write(printHTML);
  printWindow.document.close();

  // Esperar a que se cargue y luego abrir el diálogo de impresión
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };
};

// Exponer funciones para que puedan ser llamadas desde el componente padre
defineExpose({
  downloadPDF,
  updateCompletedFieldsVisually,
});
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

/* Estilos específicos para la plantilla ISO 27001 */
.iso27001-template {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
}

.iso27001-template h1 {
  text-align: center;
  color: #2c3e50;
  border-bottom: 3px solid #3498db;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}

.iso27001-template h2 {
  color: #2980b9;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  border-left: 4px solid #3498db;
  padding-left: 1rem;
}

.iso27001-template h3 {
  color: #34495e;
  margin-top: 1.5rem;
  margin-bottom: 0.8rem;
}

.template-section {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.template-footer {
  margin-top: 3rem;
  padding: 1.5rem;
  background-color: #f1f3f4;
  border-radius: 8px;
  border: 2px solid #d1d9e0;
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
  display: inline-block;
  min-width: 200px;
}

.fillable-field:hover {
  background-color: #f0f5ff;
  border-color: var(--primary-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.fillable-field.loading {
  cursor: wait;
  background-color: #f0f5ff;
}

.fillable-field.completed {
  border-color: #28a745;
  background-color: #f8fff9;
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
