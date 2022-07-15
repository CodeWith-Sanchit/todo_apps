import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, from, of } from 'rxjs';

@Injectable()
export class AppService {
  endpoint = 'http://localhost:8080/todos';
  constructor(private http: HttpClient) {}

  getTodos = () => {
    return this.http.get<any>(this.endpoint);
  };

  addTodo = (todo_string: string) => {
    return this.http
      .post(this.endpoint, {
        value: todo_string,
        status: false,
      })
      .pipe(mergeMap(() => this.getTodos()));
  };

  updateTodo = (id: string | number, status: boolean) => {
    return this.http
      .patch(`${this.endpoint}/${id}`, {
        status,
      })
      .pipe(mergeMap(() => this.getTodos()));
  };

  clearDoneTodo = () => {
    return this.http
      .get(`${this.endpoint}?status=true`)
      .pipe(
        mergeMap((completedTodos: any) => {

          const urls = completedTodos.map(
            (completedTodo: any) => `${this.endpoint}/${completedTodo.id}`
          );

          if(!urls.length){
            return of(true)
          }
          return from([...urls]).pipe(
            mergeMap((url: string) =>
              this.http.delete(url)
            )
          );
        })
      )
      .pipe(mergeMap(() => this.getTodos()));
  };
}
