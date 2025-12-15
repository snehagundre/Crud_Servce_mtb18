import { Injectable } from "@angular/core";
import { IStudent, IsuccessRes } from "../models/std";
import { Observable, of, Subject } from "rxjs";
import { splitNsName } from "@angular/compiler";

@Injectable({
    providedIn : "root"
})


export class StudentService{
 
editObj$ : Subject<IStudent> = new Subject<IStudent>()
updateFlag$ :Subject<boolean> = new Subject<boolean>()
studentsArr: Array<IStudent> = [
  {
    id: "STD001",
    fname: "Aarav",
    lname: "Sharma",
    email: "aarav.sharma@example.com",
    contact: "9876543210"
  },
  {
    id: "STD002",
    fname: "Sneha",
    lname: "Patil",
    email: "sneha.patil@example.com",
    contact: "9123456780"
  },
  {
    id: "STD003",
    fname: "Rohan",
    lname: "Kumar",
    email: "rohan.kumar@example.com",
    contact: "9988776655"
  },
  {
    id: "STD004",
    fname: "Priya",
    lname: "Desai",
    email: "priya.desai@example.com",
    contact: "9090909090"
  },
  {
    id: "STD005",
    fname: "Vikas",
    lname: "Mehta",
    email: "vikas.mehta@example.com",
    contact: "9812345678"
  }
];

fetchAllStds():Observable<Array<IStudent>>{
    return of(this.studentsArr)
}
createStd(std : IStudent): Observable<IsuccessRes<IStudent>>{
this.studentsArr.unshift(std)
return of({
  status:'success',
  messege:'new std Added succesfully',
  data:std
})
}

removeStd(id:string):Observable<IsuccessRes<string>>{
    let get_index = this.studentsArr.findIndex(s=> s.id === id)
    this.studentsArr.splice(get_index , 1)
    return of({
  status:'success',
  messege:'new std removed succesfully',
  data:id
})
}
updateStd(std:IStudent):Observable<IsuccessRes<IStudent>>{
    let get_index = this.studentsArr.findIndex(s=> s.id === std.id)
    this.studentsArr[get_index] =  std
    return of({
  status:'success',
  messege:`new std ${std.fname} updated succesfully`,
  data:std
})
}
}