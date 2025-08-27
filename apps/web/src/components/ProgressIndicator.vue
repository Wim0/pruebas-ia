<template>
  <div class="progress-indicator">
    <div class="progress-heading">
      <h3>{{ title }}</h3>
      <span class="percent">{{ completionPercent }}%</span>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: `${completionPercent}%` }"></div>
    </div>

    <div class="section-list" v-if="showDetails">
      <div
        v-for="section in sections"
        :key="section.id"
        class="section-item"
        :class="{ completed: section.completed }">
        <div class="section-status">
          <svg v-if="section.completed" width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 13H5v-2h14v2z" />
          </svg>
        </div>
        <span>{{ section.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  sections: {
    type: Array,
    required: true,
  },
  showDetails: {
    type: Boolean,
    default: false,
  },
});

const completionPercent = computed(() => {
  if (!props.sections.length) return 0;
  const completedCount = props.sections.filter((section) => section.completed).length;
  return Math.round((completedCount / props.sections.length) * 100);
});
</script>

<style scoped>
.progress-indicator {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
}

.progress-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.progress-heading h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.percent {
  font-weight: 600;
  color: var(--primary-color);
}

.progress-bar-container {
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 4px;
  transition: width 0.5s ease-in-out;
}

.section-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.section-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.section-item:hover {
  background-color: #f8f9fb;
}

.section-item.completed {
  color: #28a745;
}

.section-status {
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-status svg {
  margin-top: 2px;
}
</style>
