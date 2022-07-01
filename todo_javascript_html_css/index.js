import { TodoService } from "./todo_service.js";

const todoService = new TodoService("http://localhost:8080/todos");

window.onload = () => {
  todoService.getTodos().then((response) => {
    populateTodoOnUi(response);
  });
};

const populateTodoOnUi = (todos) => {
  document.querySelector("#todos").innerHTML = "";
  document.querySelector("#clear_todo").disabled = !todos.length;

  todos.forEach((todo) => {
    document.querySelector("#todos").innerHTML += `
        <div class="todo" data-id="${todo.id}">
            <input type="checkbox" id="${todo.id}" ${todo.status ? "checked" : ""}>
                <span id="${todo.id}" ${todo.status ? 'class="checked_item"' : ""}>${todo.value}</span>
            </input>
        </div>
    `;
  });

  var current_todos = document.querySelectorAll(".todo");
  for (var i = 0; i < current_todos.length; i++) {
    current_todos[i].onclick = (event) => {
      if (event.target.querySelector("input")) {
        todoService
          .updateTodo(
            event.target.getAttribute("data-id"),
            !event.target.querySelector("input").checked
          ).then((response) => {
            populateTodoOnUi(response);
          });
      }
      return true;
    };
  }
};

const addNewTodoFromInput = () =>{
  const newTodoValue = document.querySelector("#newtodo input").value;

  if (newTodoValue.length == 0) {
    alert("Please Enter a todo");
  } else {
    todoService.addTodo(newTodoValue).then((response) => {
      populateTodoOnUi(response);
    });
    document.querySelector("#newtodo input").value = "";
  }
}

document.querySelector("#newtodo input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addNewTodoFromInput()
  }
});


document.querySelector("#add_todo").onclick = () => {
  addNewTodoFromInput()
};

document.querySelector("#clear_todo").onclick = () => {
  todoService.clearDoneTodo().then((response) => {
    populateTodoOnUi(response);
  });
};
