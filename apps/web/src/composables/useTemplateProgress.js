/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/web/src/composables/useTemplateProgress.js
 * ----------------------------------------------------------------
 * Propósito: Manejar el progreso del template ISO 27001 de forma
 * reactiva y sincronizada entre componentes con persistencia en base de datos.
 */
import { ref, computed, reactive } from "vue";
import axios from "axios";

// Estado global reactivo del progreso del template
const templateProgress = reactive({
  completedFields: new Set(),
  fieldsBySection: {
    "Introducción": [
      "nombre de la organización",
      "propósito de la política de seguridad",
    ],
    "A.5": [
      "políticas específicas de seguridad de la información",
      "proceso de revisión de políticas de seguridad",
    ],
    "A.6": [
      "estructura organizacional de seguridad",
      "políticas de dispositivos móviles y teletrabajo",
    ],
    "A.7": [
      "proceso de verificación de antecedentes",
      "responsabilidades de seguridad durante el empleo",
      "proceso de terminación de empleo",
    ],
    "A.8": [
      "inventario de activos de información",
      "esquema de clasificación de información",
      "procedimientos de manejo de medios",
    ],
    "Aplicabilidad": [
      "alcance y aplicabilidad de la política",
    ],
    "Responsabilidades": [
      "roles y responsabilidades específicas",
    ],
    "Cumplimiento": [
      "mecanismos de cumplimiento y monitoreo",
    ],
    "Revisión": [
      "criterios para revisión de la política",
    ],
    "Aprobación": [
      "fecha de aprobación",
      "autoridad que aprueba",
      "fecha de próxima revisión",
    ],
  },
});

// Total de documentos subidos (por implementar)
const documentsUploaded = ref(0);

export function useTemplateProgress() {
  // Cargar progreso desde la base de datos
  const loadProgressFromAPI = async () => {
    try {
      const response = await axios.get("/api/templates/fields");
      if (response.data && response.data.success && response.data.data) {
        // Limpiar el conjunto actual
        templateProgress.completedFields.clear();
        // Agregar los campos completados desde la base de datos
        response.data.data.forEach(field => {
          if (field.isCompleted) {
            templateProgress.completedFields.add(field.fieldContext);
          }
        });
      }
    } catch (error) {
      console.error("Error loading progress from API:", error);
      // Fallback a localStorage si la API falla
      loadProgressFromStorage();
    }
  };

  // Marcar un campo como completado
  const markFieldCompleted = async (fieldContext) => {
    templateProgress.completedFields.add(fieldContext);
    
    // Guardar en la base de datos
    try {
      await axios.post("/api/templates/fields", {
        fieldContext,
        fieldContent: "", // Se llenará cuando se genere contenido
        templateType: "iso27001",
        isCompleted: true
      });
    } catch (error) {
      console.error("Error saving progress to API:", error);
      // Fallback a localStorage
      saveProgressToStorage();
    }
  };

  // Desmarcar un campo como completado
  const markFieldIncomplete = async (fieldContext) => {
    templateProgress.completedFields.delete(fieldContext);
    
    // Actualizar en la base de datos
    try {
      const response = await axios.get(`/api/templates/fields/context/${encodeURIComponent(fieldContext)}`);
      if (response.data && response.data.data) {
        await axios.put(`/api/templates/fields/${response.data.data.id}`, {
          isCompleted: false
        });
      }
    } catch (error) {
      console.error("Error updating progress in API:", error);
      // Fallback a localStorage
      saveProgressToStorage();
    }
  };

  // Verificar si un campo está completado
  const isFieldCompleted = (fieldContext) => {
    return templateProgress.completedFields.has(fieldContext);
  };

  // Calcular progreso por sección
  const getSectionProgress = (sectionKey) => {
    const sectionFields = templateProgress.fieldsBySection[sectionKey] || [];
    const completedInSection = sectionFields.filter((field) =>
      templateProgress.completedFields.has(field)
    ).length;

    return {
      completed: completedInSection,
      total: sectionFields.length,
      percentage:
        sectionFields.length > 0
          ? Math.round((completedInSection / sectionFields.length) * 100)
          : 0,
    };
  };

  // Progreso general del template
  const overallProgress = computed(() => {
    const allFields = Object.values(templateProgress.fieldsBySection).flat();
    const completedCount = allFields.filter((field) =>
      templateProgress.completedFields.has(field)
    ).length;

    return {
      completed: completedCount,
      total: allFields.length,
      percentage: allFields.length > 0 ? Math.round((completedCount / allFields.length) * 100) : 0,
    };
  });

  // Categorías para el dashboard con progreso real
  const categories = computed(() => [
    {
      id: 1,
      name: "1. Introducción",
      sections: [
        {
          id: "1.1",
          name: "Nombre de la organización",
          completed: isFieldCompleted("nombre de la organización"),
        },
        {
          id: "1.2",
          name: "Propósito de la política",
          completed: isFieldCompleted("propósito de la política de seguridad"),
        },
      ],
    },
    {
      id: 2,
      name: "A.5 Políticas de Seguridad",
      sections: [
        {
          id: "5.1.1",
          name: "Políticas para la seguridad de la información",
          completed: isFieldCompleted("políticas específicas de seguridad de la información"),
        },
        {
          id: "5.1.2",
          name: "Revisión de las políticas de seguridad",
          completed: isFieldCompleted("proceso de revisión de políticas de seguridad"),
        },
      ],
    },
    {
      id: 3,
      name: "A.6 Organización de la Seguridad",
      sections: [
        {
          id: "6.1.1",
          name: "Organización interna",
          completed: isFieldCompleted("estructura organizacional de seguridad"),
        },
        {
          id: "6.1.2",
          name: "Dispositivos móviles y teletrabajo",
          completed: isFieldCompleted("políticas de dispositivos móviles y teletrabajo"),
        },
      ],
    },
    {
      id: 4,
      name: "A.7 Seguridad de RRHH",
      sections: [
        {
          id: "7.1.1",
          name: "Antes del empleo",
          completed: isFieldCompleted("proceso de verificación de antecedentes"),
        },
        {
          id: "7.2.1",
          name: "Durante el empleo",
          completed: isFieldCompleted("responsabilidades de seguridad durante el empleo"),
        },
        {
          id: "7.3.1",
          name: "Terminación de empleo",
          completed: isFieldCompleted("proceso de terminación de empleo"),
        },
      ],
    },
    {
      id: 5,
      name: "A.8 Gestión de Activos",
      sections: [
        {
          id: "8.1.1",
          name: "Inventario de activos",
          completed: isFieldCompleted("inventario de activos de información"),
        },
        {
          id: "8.1.2",
          name: "Clasificación de información",
          completed: isFieldCompleted("esquema de clasificación de información"),
        },
        {
          id: "8.1.3",
          name: "Manejo de medios",
          completed: isFieldCompleted("procedimientos de manejo de medios"),
        },
      ],
    },
    {
      id: 6,
      name: "2. Aplicabilidad",
      sections: [
        {
          id: "2.1",
          name: "Alcance y aplicabilidad",
          completed: isFieldCompleted("alcance y aplicabilidad de la política"),
        },
      ],
    },
    {
      id: 7,
      name: "3. Responsabilidades",
      sections: [
        {
          id: "3.1",
          name: "Roles y responsabilidades",
          completed: isFieldCompleted("roles y responsabilidades específicas"),
        },
      ],
    },
    {
      id: 8,
      name: "4. Cumplimiento",
      sections: [
        {
          id: "4.1",
          name: "Mecanismos de cumplimiento",
          completed: isFieldCompleted("mecanismos de cumplimiento y monitoreo"),
        },
      ],
    },
    {
      id: 9,
      name: "5. Revisión y Actualización",
      sections: [
        {
          id: "5.1",
          name: "Criterios para revisión",
          completed: isFieldCompleted("criterios para revisión de la política"),
        },
      ],
    },
    {
      id: 10,
      name: "Información de Aprobación",
      sections: [
        {
          id: "approval.1",
          name: "Fecha de aprobación",
          completed: isFieldCompleted("fecha de aprobación"),
        },
        {
          id: "approval.2",
          name: "Autoridad que aprueba",
          completed: isFieldCompleted("autoridad que aprueba"),
        },
        {
          id: "approval.3",
          name: "Próxima revisión",
          completed: isFieldCompleted("fecha de próxima revisión"),
        },
      ],
    },
  ]);

  // Campos pendientes
  const pendingSections = computed(() => {
    return overallProgress.value.total - overallProgress.value.completed;
  });

  // Cargar progreso desde localStorage
  const loadProgressFromStorage = () => {
    try {
      const saved = localStorage.getItem("templateProgress");
      if (saved) {
        const savedFields = JSON.parse(saved);
        templateProgress.completedFields = new Set(savedFields);
      }
    } catch (error) {
      console.error("Error loading progress from storage:", error);
    }
  };

  // Guardar progreso en localStorage
  const saveProgressToStorage = () => {
    try {
      const fieldsArray = Array.from(templateProgress.completedFields);
      localStorage.setItem("templateProgress", JSON.stringify(fieldsArray));
    } catch (error) {
      console.error("Error saving progress to storage:", error);
    }
  };

  // Cargar número de documentos subidos
  const updateDocumentsCount = async () => {
    try {
      const response = await fetch("/api/files/list");
      if (response.ok) {
        const data = await response.json();
        documentsUploaded.value = data.files?.length || 0;
      }
    } catch (error) {
      console.error("Error loading documents count:", error);
    }
  };

  // Inicializar al cargar - ahora carga desde la API
  loadProgressFromAPI();

  // Función para reiniciar todos los registros de progreso
  const resetAllProgress = async () => {
    try {
      // Limpiar en la base de datos
      await axios.delete("/api/templates/fields");
      // Limpiar localmente
      templateProgress.completedFields.clear();
      // Limpiar localStorage como backup
      localStorage.removeItem("templateProgress");
      console.log("Progreso del template reiniciado completamente");
    } catch (error) {
      console.error("Error resetting progress in API:", error);
      // Fallback a solo limpiar localStorage
      templateProgress.completedFields.clear();
      localStorage.removeItem("templateProgress");
    }
  };

  return {
    // Estado
    templateProgress,
    documentsUploaded,

    // Métodos
    markFieldCompleted,
    markFieldIncomplete,
    isFieldCompleted,
    getSectionProgress,
    updateDocumentsCount,
    resetAllProgress,
    loadProgressFromAPI,

    // Computed
    overallProgress,
    categories,
    pendingSections,

    // Días restantes (estático por ahora)
    daysRemaining: ref(45),
  };
}
