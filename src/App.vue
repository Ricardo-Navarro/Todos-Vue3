<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TodoSpinner from './components/TodoSpinner.vue';
import TodoFormAdd from './components/TodoFormAdd.vue';
import TodoItems from './components/TodoItems.vue';
import TodoEmpty from './components/TodoEmpty.vue';
import { useTodoStore } from './stores/TodoStore';
import { onMounted, ref } from 'vue';

const TodoStore = useTodoStore();

// Busca os dados quando o componente é montado
onMounted(() => {
  TodoStore.fetchTodos();
});

const loading = ref(false)

loading.value = true
TodoStore.fetchTodos()
  .finally(() => {
    loading.value = false;
  });

</script>

<template>
  <!-- Content -->
  <div class="px-3 py-10 md:px-10">
        <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">

            <TodoSpinner v-if="loading"/>
            
            <template v-else>
              <TodoFormAdd />
              <TodoItems v-if="TodoStore.$state.todos.length"/>
              <TodoEmpty v-else/>
            </template>
            
        </div>
    </div>
    <!--/ Content -->
</template>

