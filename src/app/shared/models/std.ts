export interface IStudent {
  id: string;
  fname: string;
  lname: string;
  email: string;
  contact: string;
}
export interface IsuccessRes<T>{
  status: string;
    messege: string;
    data: T;
}