import { createSignal, onMount } from "solid-js";
import { TodoService } from "./todo_service";

function App() {
  const todoService = new TodoService("http://localhost:8080/todos");
  const [todos, setTodos] = createSignal([]);
  const [inputString, setInputString] = createSignal("");

  onMount(() => {
    todoService.getTodos().then((response) => {
      setTodos(response);
    });
  });

  return (
    <div>
      <header>
        <h1>CodeWithSanchit</h1>
        <h2>TODO app using Solid JS</h2>
      </header>
      <main>
        <div class={"container"}>
          <div id="newtodo">
            <input
              type="text"
              placeholder="Enter TODO item"
              maxLength="50"
              value={inputString()}
              onInput={(e) => setInputString(e.currentTarget.value)}
            />
            <button
              disabled={!inputString()}
              id="add_todo"
              onClick={() => {
                todoService.addTodo(inputString()).then((response) => {
                  setTodos(response);
                  setInputString("");
                });
              }}
            >
              ADD
            </button>
          </div>

          <div id="todos">
            {todos().map((todo) => {
              return (
                <div
                  class={"todo"}
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
