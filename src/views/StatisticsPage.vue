<template>
  <div class="chart-container">
    <div v-if="isUserListEmpty" class="">
      Statistics are not available yet<br/>
      Click <router-link to="/" style="font-weight: 700">here</router-link> to load data.
    </div>
    <Bar v-else :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useTodoListStore } from '@/stores/todo-list.ts';
import type { FormattedTodoItem } from '@/types';

const todoListStore = useTodoListStore();
const { sortedByUserCompleted, isLoading } = storeToRefs(todoListStore);

const isUserListEmpty = computed<boolean>(() => {
  return sortedByUserCompleted.value.length === 0;
})

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = computed(() => ({
  labels: sortedByUserCompleted.value.map((user) => `User ${user.userId}`),
  datasets: [
    {
      label: '✅ Completed',
      data: sortedByUserCompleted.value.map((user) => user.completedCount),
      backgroundColor: '#4caf50',
    },
    {
      label: '❌ Incomplete',
      data: sortedByUserCompleted.value.map((user) => user.incompleteCount),
      backgroundColor: '#f44336',
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: false,
      title: {
        display: true,
        text: 'User ID',
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Task Count',
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
    },
  },
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 900px;
  height: 400px;
  margin: 40px auto;
  padding: 0 16px;
  align-content: center;
}
</style>
