import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  newTodoString = '';

  todos: any = [];

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.showTodo();
  }

  addTodo = () => {
    this.appService.addTodo(this.newTodoString).subscribe((data: any) => {
      this.todos = data;
      this.newTodoString = '';
    });
  };

  clearTodo = () => {
    this.appService.clearDoneTodo().subscribe((data: any) => {
      this.todos = data;
    });
  };

  showTodo() {
    this.appService.getTodos().subscribe((data: any) => {
      this.todos = data;
    });
  }

  handleSelected($event: any, id: string | number) {
    this.appService
      .updateTodo(id, $event.target.checked)
      .subscribe((data: any) => {
        this.todos = data;
      });
  }
}
