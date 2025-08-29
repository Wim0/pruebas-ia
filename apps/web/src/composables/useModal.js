/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/web/src/composables/useModal.js
 * ----------------------------------------------------------------
 * Propósito: Composable para manejar modales de confirmación y alerta
 * de forma reactiva y global en la aplicación.
 */
import { ref, reactive } from 'vue'

// Estado global de los modales
const modalState = reactive({
  isOpen: false,
  title: '',
  message: '',
  type: 'info',
  showCancel: false,
  confirmText: 'Aceptar',
  cancelText: 'Cancelar',
  onConfirm: null,
  onCancel: null,
  showCloseButton: true,
  closeOnOverlay: true
})

export function useModal() {
  // Función para mostrar modal de alerta
  const showAlert = (options) => {
    return new Promise((resolve) => {
      Object.assign(modalState, {
        isOpen: true,
        title: options.title || 'Información',
        message: options.message || '',
        type: options.type || 'info',
        showCancel: false,
        confirmText: options.confirmText || 'Aceptar',
        showCloseButton: options.showCloseButton ?? true,
        closeOnOverlay: options.closeOnOverlay ?? true,
        onConfirm: () => {
          modalState.isOpen = false
          resolve(true)
        },
        onCancel: null
      })
    })
  }

  // Función para mostrar modal de confirmación
  const showConfirm = (options) => {
    return new Promise((resolve) => {
      Object.assign(modalState, {
        isOpen: true,
        title: options.title || 'Confirmación',
        message: options.message || '',
        type: options.type || 'warning',
        showCancel: true,
        confirmText: options.confirmText || 'Confirmar',
        cancelText: options.cancelText || 'Cancelar',
        showCloseButton: options.showCloseButton ?? true,
        closeOnOverlay: options.closeOnOverlay ?? true,
        onConfirm: () => {
          modalState.isOpen = false
          resolve(true)
        },
        onCancel: () => {
          modalState.isOpen = false
          resolve(false)
        }
      })
    })
  }

  // Función para cerrar el modal
  const closeModal = () => {
    modalState.isOpen = false
    if (modalState.onCancel) {
      modalState.onCancel()
    }
  }

  // Función para confirmar
  const confirmModal = () => {
    if (modalState.onConfirm) {
      modalState.onConfirm()
    }
  }

  // Función para cancelar
  const cancelModal = () => {
    if (modalState.onCancel) {
      modalState.onCancel()
    }
  }

  return {
    modalState,
    showAlert,
    showConfirm,
    closeModal,
    confirmModal,
    cancelModal
  }
}

// Funciones de conveniencia para uso directo
export const $alert = (message, options = {}) => {
  const { showAlert } = useModal()
  return showAlert({ message, ...options })
}

export const $confirm = (message, options = {}) => {
  const { showConfirm } = useModal()
  return showConfirm({ message, ...options })
}

// Tipos específicos de alerta
export const $success = (message, options = {}) => {
  return $alert(message, { type: 'success', title: 'Éxito', ...options })
}

export const $error = (message, options = {}) => {
  return $alert(message, { type: 'error', title: 'Error', ...options })
}

export const $warning = (message, options = {}) => {
  return $alert(message, { type: 'warning', title: 'Advertencia', ...options })
}

export const $info = (message, options = {}) => {
  return $alert(message, { type: 'info', title: 'Información', ...options })
}
