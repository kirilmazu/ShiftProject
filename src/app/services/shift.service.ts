import { Injectable } from '@angular/core';
import { Shift } from '../objects/shift';
import { SheredData } from '../shered-data';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  baseurl: string = "http://localhost:3000/shift";

  constructor(private httpClient : HttpClient) { }

  async getshifts(){
    return this.httpClient.get(this.baseurl + '/').subscribe(results => {
      console.log(results);
      var shifts: Array<Shift> = [];
      for (var res in results) {
        var jResult = JSON.parse(JSON.stringify(results[res]));
        shifts.push(new Shift(jResult['ownerName'], jResult['from'], jResult['to']));
      }
      SheredData.shifts = shifts;
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      }
      else {
        console.log("Server-side error occured.");
      }
    });
  }

  addNotification(shift:Shift){
    this.httpClient.post(this.baseurl+'/addShift',{
      'ownerID': 0,
      'ownerName': shift.ownerName,
      'from': shift.from,
      'to': shift.to,
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
