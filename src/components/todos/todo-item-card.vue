<template>
  <div class="user-card">
    <div class="user-card__header">
      <h2 class="user-card__title">User {{ user.userId }}</h2>
      <div class="user-card__stats">
        ✅ {{ user.completedCount }} / ❌ {{ user.incompleteCount }}
      </div>
    </div>

    <ul class="user-card__todo-list">
      <li
        v-for="todo in visibleTodos"
        :key="todo.id"
        class="user-card__todo-item"
        :class="{'user-card__todo-item--completed': todo.completed}"
      >
        {{ todo.title }}
      </li>
    </ul>

    <base-button
      v-if="hasHiddenTodos"
      @click="expanded = !expanded"
      class="user-card__toggle-btn"
    >
      {{ expanded ? 'Show less' : 'Show more' }}
    </base-button>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/base-button.vue';

import { computed, ref } from 'vue';
import type { FormattedTodoItem } from '@/types';

const props = defineProps<{
  user: FormattedTodoItem;
}>()

const expanded = ref(false);

const visibleTodos = computed(() => {
  if (expanded.value) {
    return props.user.todos;
  } else {
    return props.user.todos.slice(0, 5);
  }
})

const hasHiddenTodos = computed(() => props.user.todos.length > 5)
</script>

<style scoped lang="scss">
.user-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  padding: 1.5rem;
  margin-bottom: 10px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.01);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  &__title {
    margin: 0;
    font-size: 1.25rem;
    color: #333;
  }

  &__stats {
    font-size: 0.9rem;
    color: #666;
  }

  &__todo-list {
    padding-left: 1.2rem;
    list-style-type: disc;
    margin-bottom: 1rem;
  }

  &__todo-item {
    font-size: 0.95rem;
    margin-bottom: 0.4rem;
    color: #333;

    &--completed {
      text-decoration: line-through;
      color: #888;
    }
  }
}
</style>