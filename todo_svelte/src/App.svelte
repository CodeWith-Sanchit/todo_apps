<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import { TodoService } from "./lib/todo_service";

  let inputString = "";
  let todos = [];
  const todoService = new TodoService("http://localhost:8080/todos");

  onMount(async () => {
    todos = await todoService.getTodos();
  });
</script>

<header>
  <h1>CodeWithSanchit</h1>
  <h2>TODO app using Svelte JS</h2>
</header>

<main>
  <div class="container">
    <div id="newtodo">
      <input
        type="text"
        placeholder="Enter TODO item"
        maxLength="50"
        bind:value={inputString}
        on:input={(event) => {
          inputString = event.target.value;
        }}
      />
      <button
        disabled={!inputString}
        id="add_todo"
        on:click={() => {
          todoService.addTodo(inputString).then((response) => {
            todos = response;
            inputString = "";
          });
        }}
      >
        ADD
      </button>
    </div>

    <div id="todos">
      {#each todos as { id, status, value }}
        <label class="todo">
          <input
            type="checkbox"
            {id}
            checked={status}
            on:click|preventDefault={(event) => {
              todoService.updateTodo(id, event.target.checked).then((response) => {
                todos = response;
              });
            }}
          />
          <span {id} class={status && "checked_item"}>
            {value}
          </span>
        </label>
      {/each}
    </div>

    <button
      id="clear_todo"
      on:click={() => {
        todoService.clearDoneTodo().then((response) => {
          todos = response;
        });
      }}
    >
      CLEAR COMPLETED
    </button>
  </div>
</main>

<style>
  .container {
    width: 50%;
    top: 50%;
    left: 50%;
    background: rgb(46, 46, 46);
    border-radius: 12px;
    min-width: 500px;
    position: absolute;
    height: 60%;
    transform: translate(-50%, -50%);
    overflow: scroll;
    padding: 20px;
  }

  #newtodo {
    position: relative;
  }

  #newtodo input {
    width: 75%;
    height: 45px;
    padding: 12px;
    color: #111111;
    font-weight: 500;
    position: relative;
    border-radius: 5px;
    font-size: 15px;
    border: 4px solid #fff;
  }

  #newtodo input:focus {
    outline: none;
    border-color: rgb(203, 202, 202);
  }

  #newtodo button {
    position: relative;
    font-weight: 500;
    font-size: 16px;
    background-color: teal;
    border: none;
    color: #ffffff;
    cursor: pointer;
    outline: none;
    width: 20%;
    height: 45px;
    border-radius: 5px;
  }

  #todos {
    border-radius: 10px;
    width: 100%;
    position: relative;
    padding: 30px 20px;
    margin-top: 10px;
    margin-bottom: 50px;
    overflow: scroll;
  }

  .todo {
    border-radius: 5px;
    align-items: center;
    justify-content: start;
    border: 1px solid rgb(203, 202, 202);
    cursor: pointer;
    background-color: #fff;
    height: 50px;
    margin-bottom: 8px;
    padding: 5px 10px;
    display: flex;
  }

  .todo input {
    font-size: 26px;
    font-weight: 400;
  }

  .todo span {
    font-size: 15px;
    font-weight: 400;
    padding-left: 8px;
    color: #000;
  }

  .checked_item {
    text-decoration: line-through;
    text-decoration-color: red;
    text-decoration-thickness: 3px;
  }

  #clear_todo {
    position: relative;
    bottom: 20px;
    left: 0;
    right: 0;
    font-weight: 500;
    font-size: 16px;
    background-color: red;
    border: none;
    color: #ffffff;
    cursor: pointer;
    outline: none;
    width: 80%;
    height: 45px;
    border-radius: 5px;
    margin: auto;
  }

  #clear_todo:disabled {
    background-color: rgb(237, 95, 95);
    cursor: no-drop;
  }
</style>
