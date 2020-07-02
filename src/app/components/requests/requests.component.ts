import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/objects/employee';
import { Request } from 'src/app/objects/request';
import { SheredData } from 'src/app/shered-data';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requestrows: Array<Array<Request>>;

  dayDates:Array<Date>;

  firstDayOfWeek:Date;

  hiddSave = (SheredData.thisEmployee == (null || undefined));

  dayNames = SheredData.dayNames;

  employee = SheredData.thisEmployee;

  colores = ["red", "orange", "yellow", "blue", "green"];


  constructor(private requestService:RequestService) { 
    /**get the date of week */
    /**the format of date is MM/dd/yyyy */
    this.firstDayOfWeek = new Date('6/7/2020'); /**todo: get the first day of current week */
    if(this.employee != (null || undefined)) this.updateDates(this.firstDayOfWeek);
  }

  ngOnInit(): void {
  }

  nextWeek():void{
    this.firstDayOfWeek = SheredData.addDays(this.firstDayOfWeek, 7);
    this.updateDates(this.firstDayOfWeek);
  }

  previousWeek():void{
    this.firstDayOfWeek = SheredData.addDays(this.firstDayOfWeek, -7);
    this.updateDates(this.firstDayOfWeek);
  }

  inputOnChange():void{
    /**chang the color of the input*/
  }

  save():void{
    console.log(this.requestrows);
    for(var val1 in this.requestrows){
      for(var val2 in this.requestrows[val1]){
        this.requestService.addRequest(this.requestrows[val1][val2]);
      }
    }
  }

 
  updateDates(firstDay:Date):void{
    this.dayDates = SheredData.getDaysOfWeek(firstDay);
    this.getRequsts(firstDay);
  }

  getRequsts(firstDay:Date):void{
    //get all requsts and put them as lines
    this.requestrows = this.buildRequsts(firstDay);
  }

  buildRequsts(firstDay:Date):Array<Array<Request>>{
      var rows = [this.buildNewRequestRow(SheredData.addHours(firstDay, 12), "08:00-16:00", 7),
      this.buildNewRequestRow(SheredData.addHours(firstDay, 12), "16:00-24:00", 7)]
      return rows;
  }

 buildNewRequestRow(firstDay:Date, shift:string, days:number):Array<Request>{
    var row = new Array<Request>(days);
    for(var _i = 0; _i < days; _i++){
        row[_i] = (new Request(shift, 2, SheredData.thisEmployee, SheredData.addDays(firstDay, _i)));
    }
    return row;
  }

}
