import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { SheredData } from '../shered-data';
import { Request } from '../objects/request';
import { Employee } from '../objects/employee';
import { EmployeeService } from './employee.service';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  baseurl: string = "http://localhost:3000/requests";

  static allRequests : Array<Request> = [];
  static employeeRequests = new Map<number,Array<Request>>();


  constructor(private httpClient : HttpClient) { }

  async getrequests(employees:Array<Employee>){
    this.httpClient.get(this.baseurl + '/').subscribe(results => {
      var requests: Array<Request> = [];
      var employee:Employee;
      for (var res in results) {
        var jResult = JSON.parse(JSON.stringify(results[res]));
        employee = Employee.getEmployeeByID(jResult['ownerID'],employees);
        requests.push(new Request(jResult['shift'],  jResult['priority'], employee, new Date(jResult['date'])));
      }
      RequestService.allRequests = requests;
      this.fillTheMap(employees);
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      }
      else {
        console.log("Server-side error occured.");
      }
    });
  }

  fillTheMap(employees:Array<Employee>):void{
    var requests:Array<Request> = [];
    console.log("requests:");
    console.log(RequestService.allRequests);
    console.log(employees);
    for(var emp in employees){
      requests = [];
      for(var rec in RequestService.allRequests){
        if(RequestService.allRequests[rec].owner.employeeID == employees[emp].employeeID) requests.push(RequestService.allRequests[rec]);
      }
      RequestService.employeeRequests.set(employees[emp].employeeID, requests);
    }
    console.log("map:");
    console.log(RequestService.employeeRequests);
  }

  getMyRequests(employeeID:number){
    var myID = {
      'employeeID': employeeID,
  };
    return this.httpClient.post(this.baseurl+'/myRequests',myID).subscribe(results => {
      console.log(results);
      var requests: Array<Request> = [];
      var employee:Employee;
      for (var res in results) {
        var jResult = JSON.parse(JSON.stringify(results[res]));
        employee = Employee.getEmployeeByID(jResult['ID'],SheredData.employees);
        if(employee == (null || undefined)) employee = SheredData.thisEmployee;
        requests.push(new Request(jResult['shift'],  jResult['priority'], employee, jResult['date']));
      }
      SheredData.requests = requests;
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      }
      else {
        console.log("Server-side error occured.");
      }
    }); 
  }

  addRequest(request:Request){
    this.httpClient.post(this.baseurl+'/addRequest',{
      'ownerID': request.owner.employeeID,
      'ownerName': request.owner.name,
      'date': request.date,
      'shift': request.shift,
      'priority': request.priority,
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
