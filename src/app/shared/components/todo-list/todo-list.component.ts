import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Itodo } from '../../models/todo';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todosArr : Array<Itodo> = []
  constructor(
    private _todoService : TodoService,
    private _snackBarService  : SnackBarService
  ) { }

  ngOnInit(): void {
    this._todoService.fetchAllTodos().subscribe(res=>{
      this.todosArr = res
    })
  }
  onToDoRemove(id : string){
   this._todoService.removeTodo(id).subscribe({
    next:res=>{
      this._snackBarService.openSnackBar(`toDo Item  with ${id} Removed Successfully`)
    }
   })
  }
  onstdEdit(etodo : Itodo){
  this._todoService.editToDo$.next(etodo)

  }

}
