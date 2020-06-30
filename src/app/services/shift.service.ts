import { Injectable } from '@angular/core';
import { Shift } from '../objects/shift';
import { SheredData } from '../shered-data';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../objects/employee';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  baseurl: string = "http://localhost:3000/shift";

  constructor(private httpClient : HttpClient) { }

  getshifts(){
    return this.httpClient.get(this.baseurl + '/');
  }

  addShift(shift:Shift){
    var ownerID = Employee.getEmployeeID(shift.ownerName, SheredData.employees);
    if(ownerID == (null || undefined)) ownerID = 0;
    this.httpClient.post(this.baseurl+'/addShift',{
      'ownerID': ownerID,
      'ownerName': shift.ownerName,
      'date': shift.date,
      'shift': shift.shift,
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