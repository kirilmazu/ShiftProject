import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { SheredData } from '../shered-data';
import { Request } from '../objects/request';
import { Employee } from '../objects/employee';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  baseurl: string = "http://localhost:3000/requests";

  constructor(private httpClient : HttpClient) { }

  async getrequests(){
    return this.httpClient.get(this.baseurl + '/').subscribe(results => {
      console.log(results);
      var requests: Array<Request> = [];
      var employee:Employee;
      for (var res in results) {
        var jResult = JSON.parse(JSON.stringify(results[res]));
        employee = Employee.getEmployeeByID(jResult['ID'],SheredData.employees);
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
    this.httpClient.post(this.baseurl+'/addRequests',{
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
