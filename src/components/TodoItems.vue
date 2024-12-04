<script setup lang="ts">
import { useTodoStore } from '@/stores/TodoStore';
import TodoItem from './TodoItem.vue';

const todoStore = useTodoStore();
</script>

<template>
  <div class="space-y-2">
                <TodoItem 
                v-for="todo in todoStore.todos" 
                :key="todo.id" 
                :todo="todo"
                />
            </div>
</template>