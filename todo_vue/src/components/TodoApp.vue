<template>
  <div class="container">
    <div id="newtodo">
      <input type="text" v-model="newTodoString" placeholder="Enter TODO item" maxlength="50" />
      <button :disabled="!newTodoString.length" type="button" id="add_todo" @click="addNewTodo()">Add</button>
    </div>

    <div id="todos">
      <label class="todo" :class="todo.status ? 'checked_item' : ''" v-for="todo in todos">
        <input type="checkbox" :id="todo.id" :checked="todo.status" @change="check($event)" />
        <span>{{ todo.value }}</span>
      </label>
    </div>
    <button id="clear_todo" @click="removeDoneTodo">CLEAR COMPLETED</button>
  </div>
</template>

<script>
import TodoService from '../services/TodoService';
export default {
  data() {
    return {
      todos: [],
      newTodoString: ''
    }
  },
  methods: {
    ...TodoService,
    addNewTodo: function () {
      TodoService.addTodo(this.newTodoString).then(res => {
        this.todos = res;
        this.newTodoString = "";
      })
    },
    removeDoneTodo: function () {
      TodoService.clearDoneTodo().then(res => {
        this.todos = res;
      })
    },
    isDisabled(newTodoString) {
      return !!newTodoString && newTodoString.length > 0;
    },
    check: function (event) {
      TodoService.updateTodo(event.target.id, event.target.checked).then(res => {
        this.todos = res;
      })
    }
  },
  mounted() {
    TodoService.getTodos().then(res => {
      this.todos = res;
    })
  },
  watch: {
    '$todos': {
      handler: function (newValue) {
        console.log('Current vaules:' + newValue.FirstName + ' ' + newValue.LastName);
      },
      deep: true
    }
  }

}

</script>
