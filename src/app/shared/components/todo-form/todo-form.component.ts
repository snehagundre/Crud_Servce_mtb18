import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Itodo } from '../../models/todo';
import { UuuidService } from '../../services/uuid.service';
import { TodoService } from '../../services/todo.service';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
   @ViewChild('todoForm') todoForm !: NgForm
   isInEditMode : boolean = false
   editObj !: Itodo
   private _uuidService = inject(UuuidService)
   private _toDOService = inject(TodoService)
   private _snackBArService = inject(SnackBarService)
  
  constructor() { }

  ngOnInit(): void {
    this._toDOService.editToDo$.subscribe(res=>{
      this.isInEditMode = true
      this.todoForm.form.patchValue(res)
      this.editObj = res
    })
  }
  ontoAdd(){
    if(this.todoForm.valid){
      let newToDo: Itodo = {
      ...this.todoForm.value, id:this._uuidService.uuid()
    }
    this.todoForm.reset();
    this._toDOService.addToDo(newToDo).subscribe({
      next:res=>{
        this._snackBArService.openSnackBar('todo Item Added SuccesFully')
      },
      error:er=>{
        this._snackBArService.openSnackBar(er)
      }
    })
    }
  }
onToDoUpdate(){
  if(this.todoForm.valid){
let uToDO : Itodo={
...this.todoForm.value,id:this.editObj.id
}
this.isInEditMode=false
this.todoForm.reset()
this._toDOService.updateToDo(uToDO).subscribe({
  next:ers =>{
    this._snackBArService.openSnackBar(`todoItem : ${uToDO.todoItem} Updated Successfully`)
  },
  error:err =>{
    this._snackBArService.openSnackBar(err)

  }
})
  }
}
}
