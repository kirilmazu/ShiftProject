import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../objects/employee';
import { SheredData } from '../shered-data';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseurl: string = "http://localhost:3000/employee";

  static thisEmployee:Employee;
  static allEmployees:Array<Employee>;

  constructor(private httpClient : HttpClient) { }

  //get the employee with the email and password
  getEmployee(email:string, password:string){
    var user = {
      'email': email,
      'password': password,
  };
    return this.httpClient.post(this.baseurl+'/login',user);    
  }

  //get all employees
  async getEmployees(){
    return await this.httpClient.get(this.baseurl+'/',).subscribe(result => {
      var employees:Array<Employee> = [];
      var jResult;
      for(var res in result){
        jResult = JSON.parse(JSON.stringify(result[res]));
        employees.push(new Employee(jResult["firstName"], jResult['lastname'], jResult['email'], jResult['password'],
        jResult['company'], jResult['team'], jResult['role'], jResult['ID']));
      }
      EmployeeService.allEmployees = employees;
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
    });   
  }

  //add new employee to DB
  addEmployee(employee:Employee){
    this.httpClient.post(this.baseurl+'/addEmplyee',{
      'employee': employee,
    }).subscribe(
      res => {
        console.log(res);
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