import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../objects/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  baseurl: string = "http://localhost:3000/employee";

  constructor(private httpClient : HttpClient) { }

  getEmployee(email:string, password:string){
    var user = {
      'email': email,
      'password': password,
  };
    return this.httpClient.post(this.baseurl+'/login',user);    
  }


  addEmployee(employee:Employee){
    this.httpClient.post(this.baseurl+'/addEmplyee',{
      'employee': employee,
    }).subscribe(
      res => {
        console.log(res);
       // event.confirm.resolve(event.newData);
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
    });

  }


}
