<template>
  <main class="page-main">
    <div v-if="buttonVisible" class="page-main__content">
      <base-button type="button" @click="todoListStore.loadList()"> Load </base-button>
    </div>

    <div v-else class="page-main__content">
      <base-loader v-if="isLoading" />
      <div v-else>
        <todo-list :user-list="sortedByUserCompleted" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/base-button.vue';
import BaseLoader from '@/components/ui/base-loader.vue';
import TodoList from '@/components/todos/todo-list.vue';

import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useTodoListStore } from '@/stores/todo-list.ts';

const todoListStore = useTodoListStore()

const { sortedByUserCompleted, isLoading } = storeToRefs(todoListStore)

const buttonVisible = computed<boolean>(() => {
  return sortedByUserCompleted.value.length === 0
})
</script>
<style scoped lang="scss">
.page-main {
  display: flex;
  justify-content: center;

  &__content {
    display: flex;
    flex-direction: column;
    align-content: center;
  }
}
</style>
