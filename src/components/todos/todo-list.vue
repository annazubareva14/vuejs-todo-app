<template>
  <div class="list-wrapper">
    <DynamicScroller
      :items="userList"
      :min-item-size="290"
      :grid-items="true"
      :buffer="20"
      key-field="userId"
      class="scroller"
    >
      <template #default="{ item, index, active }">
        <DynamicScrollerItem :item="item" :active="active" :data-index="index">
          <div class="card-wrapper">
            <todo-item-card :user="item" />
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>

<script setup lang="ts">
import { DynamicScroller, DynamicScrollerItem } from 'vue3-virtual-scroller';
import TodoItemCard from '@/components/todos/todo-item-card.vue';
import type { FormattedTodoItem } from '@/types';

defineProps<{
  userList: FormattedTodoItem[];
}>();
</script>

<style scoped lang="scss">
@import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css';

.scroller {
  height: 70vh;
  padding: 10px;
  grid-gap: 10px;
}
 
:deep(.vue-recycle-scroller__item-view){
  margin-top: -270px;
}

:deep(.vue-recycle-scroller__item-view:first-child){
  margin-top: 0;
}
</style>
