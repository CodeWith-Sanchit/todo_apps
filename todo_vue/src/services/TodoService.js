const endpoint = "http://localhost:8080/todos";

class TodoService {
  getTodos = async () => {
    const response = await fetch(endpoint);
    return await response.json();
  };

  addTodo = async (todo_string) => {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        value: todo_string,
        status: false,
      }),
    });
    return await this.getTodos();
  };

  updateTodo = async (id, status) => {
    await fetch(`${endpoint}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status,
      }),
    });
    return await this.getTodos();
  };

  clearDoneTodo = async () => {
    const completedTodos = await (
      await fetch(`${endpoint}?status=true`)
    ).json();

    const removeCompletedPromises = await completedTodos.map(
      async (completedTodo) => {
        return fetch(`${endpoint}/${completedTodo.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
      }
    );
    await Promise.all(removeCompletedPromises);
    return await this.getTodos();
  };
}


export default new TodoService();