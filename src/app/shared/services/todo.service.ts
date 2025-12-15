import { Injectable } from '@angular/core';
import { Itodo } from '../models/todo';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

 editToDo$ : Subject<Itodo> = new Subject<Itodo>()

  todoArr: Array<Itodo> = [
    {
      todoItem:"java",
      id:"456"
    },
    {
      todoItem:"javascipt",
      id:"4566"
    },
    {
      todoItem:"angular",
      id:"45986"
    },
    {
      todoItem:"rxjs",
      id:"46756"
    },
  ]
  constructor() { }

  fetchAllTodos():Observable<Itodo[]>{
    return of(this.todoArr)
  }

  addToDo(todo : Itodo) : Observable<Itodo>{
    this.todoArr.push(todo)
    return of(todo)
  }
  updateToDo(utodo : Itodo) : Observable<Itodo>{
    let get_index = this.todoArr.findIndex(t => t.id === utodo.id)
    this.todoArr[get_index] =  utodo
    return of(utodo)
  }
  removeTodo(id:string):Observable<string>{
    let cnf = confirm('Are You Sure To Remove?')
    if(cnf){
      let get_index = this.todoArr.findIndex(t => t.id === id)
    this.todoArr.splice(get_index,1)
    }
    return of(id)
  }
}
