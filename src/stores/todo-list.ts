import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { TodoItemList, FormattedTodoItem } from '@/types';

export const useTodoListStore = defineStore('todoList', () => {
  const list = ref<TodoItemList>([])
  const isLoading = ref(false)

  const loadList = async () => {
    try {
      isLoading.value = true

      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        headers: {
          Origin: 'localhost',
        },
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data: TodoItemList = await response.json();
      list.value = data;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  const sortedByUserCompleted = computed<FormattedTodoItem[]>(() => {
    const map = new Map<number, FormattedTodoItem>()

    for (const item of list.value) {
      const { userId, ...rest } = item;

      if (!map.has(userId)) {
        map.set(userId, {
          userId,
          completedCount: 0,
          incompleteCount: 0,
          todos: [],
        });
      }

      const group = map.get(userId)!

      group.todos.push(rest);
      item.completed ? group.completedCount++ : group.incompleteCount++;
    }

    return [...map.values()].sort((a, b) => {
      if (b.completedCount !== a.completedCount) {
        return b.completedCount - a.completedCount;
      }
      return a.userId - b.userId;
    })
  })

  return { list, isLoading, sortedByUserCompleted, loadList }
})
