<template>
  <div class="dashboard-stats">
    <div class="stats-card" v-for="stat in stats" :key="stat.title">
      <div class="stat-icon" :style="{ backgroundColor: stat.iconBg }">
        <component :is="stat.icon" />
      </div>
      <div class="stat-content">
        <h3 class="stat-value">{{ stat.value }}</h3>
        <p class="stat-title">{{ stat.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h } from "vue";

// Íconos como componentes renderizados
const DocumentIcon = () =>
  h(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
    },
    [
      h("path", {
        fill: "currentColor",
        d: "M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z",
      }),
    ]
  );

const ChecklistIcon = () =>
  h(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
    },
    [
      h("path", {
        fill: "currentColor",
        d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
      }),
    ]
  );

const CalendarIcon = () =>
  h(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
    },
    [
      h("path", {
        fill: "currentColor",
        d: "M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z",
      }),
    ]
  );

const WarningIcon = () =>
  h(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
    },
    [
      h("path", {
        fill: "currentColor",
        d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z",
      }),
    ]
  );

const props = defineProps({
  documentsUploaded: {
    type: Number,
    default: 0,
  },
  completionPercentage: {
    type: Number,
    default: 0,
  },
  daysRemaining: {
    type: Number,
    default: 0,
  },
  pendingSections: {
    type: Number,
    default: 0,
  },
});

const stats = [
  {
    title: "Documentos Cargados",
    value: props.documentsUploaded,
    icon: DocumentIcon,
    iconBg: "rgba(52, 152, 219, 0.1)",
  },
  {
    title: "Completado",
    value: `${props.completionPercentage}%`,
    icon: ChecklistIcon,
    iconBg: "rgba(39, 174, 96, 0.1)",
  },
  {
    title: "Días Restantes",
    value: props.daysRemaining,
    icon: CalendarIcon,
    iconBg: "rgba(142, 68, 173, 0.1)",
  },
  {
    title: "Secciones Pendientes",
    value: props.pendingSections,
    icon: WarningIcon,
    iconBg: "rgba(231, 76, 60, 0.1)",
  },
];
</script>

<style scoped>
.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stats-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.stat-content {
  flex: 1;
}

.stat-value {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
}

.stat-title {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}
</style>
