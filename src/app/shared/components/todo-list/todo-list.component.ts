import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Itodo } from '../../models/todo';
import { SnackBarService } from '../../services/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todosArr : Array<Itodo> = []
  constructor(
    private _todoService : TodoService,
    private _snackBarService  : SnackBarService,
    private _matDilog : MatDialog
    
  ) { }

  ngOnInit(): void {
    this._todoService.fetchAllTodos().subscribe(res=>{
      this.todosArr = res
    })
  }
  onToDoRemove(id : string){
    const matDialogConfig = new MatDialogConfig()
    matDialogConfig.width = '400px'
    matDialogConfig.maxWidth = "90%",
    matDialogConfig.data = 'Are You Sure You Want To Remove todo?'

    let matDialogRef = this._matDilog.open(GetConfirmComponent,matDialogConfig)
    matDialogRef.afterClosed().subscribe(res=>{
      if(res){
         this._todoService.removeTodo(id).subscribe({
    next:res=>{
      this._snackBarService.openSnackBar(`toDo Item  with ${id} Removed Successfully`)
    },
    error:err=>{
      this._snackBarService.openSnackBar(err)

    }
   })
      }
    })

  
  }
  onstdEdit(etodo : Itodo){
  this._todoService.editToDo$.next(etodo)

  }

}
