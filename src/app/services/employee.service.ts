import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../objects/employee';
import { SheredData } from '../shered-data';


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

  async getEmployees(){
    return await this.httpClient.get(this.baseurl+'/',).subscribe(result => {
      console.log(result);
      var employees:Array<Employee> = [];
      var jResult;
      for(var res in result){
        jResult = JSON.parse(JSON.stringify(res));
        employees.push(new Employee(jResult["firstName"], jResult['lastname'], jResult['email'], jResult['password'],
        jResult['company'], jResult['team'], jResult['role'], jResult['ID']));

      }
      SheredData.employees = employees;
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
    });   
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
