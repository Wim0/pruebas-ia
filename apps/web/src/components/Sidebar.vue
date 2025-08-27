<template>
  <div class="sidebar-container" :class="{ 'sidebar-collapsed': isCollapsed }">
    <div class="sidebar-header">
      <div class="logo">
        <svg width="28" height="28" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M16.75 2a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 .75.75h3.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-.75-.75zM3.75 2a.75.75 0 0 0-.75.75v3.5c0 .414.336.75.75.75h3.5a.75.75 0 0 0 .75-.75v-3.5A.75.75 0 0 0 7.25 2zm13 13a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 .75.75h3.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-.75-.75zm-13 0a.75.75 0 0 0-.75.75v3.5c0 .414.336.75.75.75h3.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-.75-.75z" />
        </svg>
        <span v-if="!isCollapsed">AuditEase</span>
      </div>
      <button @click="toggleCollapse" class="collapse-btn">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
        </svg>
      </button>
    </div>

    <nav class="sidebar-nav">
      <RouterLink to="/" class="nav-item" :class="{ active: currentRoute === '/' }">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
        </svg>
        <span v-if="!isCollapsed">Dashboard</span>
      </RouterLink>

      <RouterLink to="/upload" class="nav-item" :class="{ active: currentRoute === '/upload' }">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
        </svg>
        <span v-if="!isCollapsed">Cargar Documentos</span>
      </RouterLink>

      <RouterLink to="/template" class="nav-item" :class="{ active: currentRoute === '/template' }">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
        <span v-if="!isCollapsed">Plantilla</span>
      </RouterLink>
    </nav>

    <div class="sidebar-footer">
      <div class="user-info" v-if="!isCollapsed && user">
        <UserButton afterSignOutUrl="/" />
        <div class="user-details">
          <div class="user-name">{{ userName }}</div>
        </div>
      </div>
      <UserButton v-else-if="user" afterSignOutUrl="/" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useUser, UserButton } from "@clerk/vue";

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:collapsed"]);

const isCollapsed = ref(props.collapsed);
const route = useRoute();
const { user } = useUser();

const currentRoute = computed(() => route.path);

const userName = computed(() => {
  return user.value ? `${user.value.firstName}` : "";
});

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  emit("update:collapsed", isCollapsed.value);
};

watch(
  () => props.collapsed,
  (newVal) => {
    isCollapsed.value = newVal;
  }
);
</script>

<style scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100vh;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease, transform 0.3s ease;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
}

.sidebar-collapsed {
  width: 70px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid var(--border-color);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--primary-color);
}

.collapse-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.collapse-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.sidebar-collapsed .collapse-btn svg {
  transform: rotate(180deg);
}

.sidebar-nav {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  gap: 1rem;
}

.nav-item:hover {
  background-color: rgba(45, 140, 255, 0.05);
  color: var(--primary-color);
}

.nav-item.active {
  color: var(--primary-color);
  border-left: 3px solid var(--primary-color);
  background-color: rgba(45, 140, 255, 0.08);
}

.sidebar-footer {
  padding: 1.5rem 1rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.user-details {
  overflow: hidden;
}

.user-name {
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
