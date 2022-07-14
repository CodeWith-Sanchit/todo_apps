export class TodoService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getTodos = async () => {
    const response = await fetch(this.endpoint);
    return await response.json();
  };

  addTodo = async (todo_string) => {
    await fetch(this.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        value: todo_string,
        status: false,
      }),
    });
    return this.getTodos();
  };

  updateTodo = async (id, status) => {
    await fetch(`${this.endpoint}/${id}`, {
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
      await fetch(`${this.endpoint}?status=true`)
    ).json();

    const removeCompletedPromises = await completedTodos.map(
      async (completedTodo) => {
        return fetch(`${this.endpoint}/${completedTodo.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
      }
    );

    await Promise.all(removeCompletedPromises);
    return await this.getTodos();
  };
}
