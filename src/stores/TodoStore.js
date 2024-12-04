import { defineStore } from 'pinia';
import axios from 'axios';

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    todos: [], // Estado inicial
    loading: false,
    title: '',
    completed: false,
  }),

  actions: {
    async fetchTodos() {
      this.loading = true;

      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await axios.get('http://localhost:3000/todos');
        this.todos = response.data; // Atualiza o estado com os dados da API
      } catch (error) {
        console.error('Erro ao buscar todos:', error);
      } finally {
        this.loading = false; // Desliga o spinner
      }
    },

    addTodo() {
      if (!this.title) {
        console.error('O título não pode estar vazio.');
        return false;
      }
      axios
      .post('http://localhost:3000/todos', {
        title: this.title,
        completed: false,
      })
      .then((response) => {
        this.todos.push(response.data); // Atualiza a lista de todos com a nova tarefa
        this.title = ''; // Limpa o campo de título após a adição
      });
    },
    
    updateName($evt, id) {
      const newTitle = $evt.target.value

      if(!newTitle) {
        return
      }

      axios
      .put(`http://localhost:3000/todos/${id}`, {
        title: newTitle,
        completed: this.completed,
      })
      .then((response) => {
        // Atualize apenas o item no array, sem duplicar
        const todoIndex = this.todos.findIndex((todo) => todo.id === id);
        if (todoIndex !== -1) {
          this.todos[todoIndex] = response.data; // Atualiza o item na lista
        }
        this.title = ''; // Limpa o campo de título
        console.log(`Todo atualizado: ${response.data.title}`);
      })
      console.log(newTitle);
    },

    async updateTodo(updatedTodo) {
      try {
        const response = await axios.put(`http://localhost:3000/todos/${updatedTodo.id}`, updatedTodo);
        const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = response.data;
        }
      } catch (error) {
        console.error('Erro ao atualizar o Todo:', error);
      }
    },

    async deleteTodo(id) {
      try {
        if (!id) {
          console.error("O ID do todo é inválido ou undefined.");
          return;
        }
        await axios.delete(`http://localhost:3000/todos/${id}`);
        this.todos = this.todos.filter((todo) => todo.id !== id);
      } catch (error) {
        console.error('Erro ao deletar o Todo:', error);
      }
    },
  }, 
});