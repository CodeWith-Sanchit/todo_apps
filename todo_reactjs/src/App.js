import { useEffect, useState } from "react";
import "./App.css";
import { TodoService } from "./todo_service.js";

function App() {
  const todoService = new TodoService("http://localhost:8080/todos");
  const [todos, setTodos] = useState([]);
  const [inputString, setInputString] = useState("");

  useEffect(() => {
    todoService.getTodos().then((response) => {
      setTodos(response);
    });
  }, []);

  return (
    <div className="App">
      <main>
        <h1>CodeWithSanchit</h1>
        <h2>TODO - Javascript (No Library / Framework)</h2>

        <div class="container">
          <div id="newtodo">
            <input
              type="text"
              placeholder="Enter TODO item"
              maxLength="50"
              value={inputString}
              onChange={(event) => {
                setInputString(event.target.value);
              }}
            />
            <button
              disabled={!inputString}
              id="add_todo"
              onClick={() => {
                todoService.addTodo(inputString).then((response) => {
                  setTodos(response);
                  setInputString("")
                });
              }}
            >
              ADD
            </button>
          </div>

          <div id="todos">
            {todos.map((todo) => {
              return (
                <div
                  class="todo"
                  data-id="${todo.id}"
                  onClick={() => {
                    todoService
                      .updateTodo(todo.id, !todo.status)
                      .then((response) => {
                        setTodos(response);
                      });
                  }}
                >
                  <input type="checkbox" id={todo.id} checked={todo.status} />
                  <span id={todo.id} className={todo.status && "checked_item"}>
                    {todo.value}
                  </span>
                </div>
              );
            })}
          </div>

          <button
            id="clear_todo"
            onClick={() => {
              todoService.clearDoneTodo().then((response) => {
                setTodos(response);
              });
            }}
          >
            CLEAR COMPLETED
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
