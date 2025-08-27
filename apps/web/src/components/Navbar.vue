<template>
  <header class="navbar">
    <SignedIn>
      <div class="menu-toggle">
        <button @click="$emit('toggle-sidebar')" class="toggle-btn">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
      </div>
    </SignedIn>

    <div class="logo">
      <svg width="32" height="32" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M16.75 2a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 .75.75h3.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-.75-.75zM3.75 2a.75.75 0 0 0-.75.75v3.5c0 .414.336.75.75.75h3.5a.75.75 0 0 0 .75-.75v-3.5A.75.75 0 0 0 7.25 2zm13 13a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 .75.75h3.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-.75-.75zm-13 0a.75.75 0 0 0-.75.75v3.5c0 .414.336.75.75.75h3.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-.75-.75z" />
      </svg>
      <span>AuditEase</span>
    </div>

    <div class="user-controls">
      <SignedIn>
        <OrganizationSwitcher />
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  </header>
</template>

<script setup>
/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/web/src/components/Navbar.vue
 * ----------------------------------------------------------------
 * Propósito: Barra de navegación superior de la aplicación.
 * Muestra el logo para usuarios no autenticados y los controles de
 * usuario para los autenticados.
 */
import { SignedIn, UserButton, OrganizationSwitcher } from "@clerk/vue";

defineEmits(["toggle-sidebar"]);
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: var(--surface-color);
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  height: 64px;
}

.menu-toggle {
  display: flex;
  align-items: center;
}

.toggle-btn {
  background: none;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.toggle-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: var(--text-primary);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.user-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
