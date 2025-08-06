<template>
    <button
      :type="type"
      :disabled="disabled"
      @click="onClick"
      class="base-button"
    >
      <slot />
    </button>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps<{
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>();
  
  const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void
  }>();
  
  const onClick = (event: MouseEvent) => {
    if (!props.disabled) {
      emit('click', event);
    }
  }
  </script>
  
  <style scoped>
  .base-button {
    padding: 0.5rem 1rem;
    background-color: #4f46e5;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .base-button:disabled {
    background-color: #a5b4fc;
    cursor: not-allowed;
  }
  </style>
  