import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/objects/employee';
import { Request } from 'src/app/objects/request';
import { SheredData } from 'src/app/shered-data';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requestrows: Array<Array<Request>>;
  employee: Employee; /*this employee (need to be global) */

  dayDates:Array<Date>;

  firstDayOfWeek:Date;

  dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  constructor() { 
    this.employee=this.getThisEmployee();
    /**get the date of week */
    /**the format of date is MM/dd/yyyy */
    this.firstDayOfWeek = new Date('6/7/2020'); /**todo: get the first day of current week */
    this.updateDates(this.firstDayOfWeek);
    /**get the employee request if don't have request for some shift set default 2*/
    this.getRequsts();
    console.log(this.requestrows);
  }

  ngOnInit(): void {
  }

  nextWeek():void{
    this.firstDayOfWeek = this.addDays(this.firstDayOfWeek, 7);
    this.updateDates(this.firstDayOfWeek);
  }

  previousWeek():void{
    this.firstDayOfWeek = this.addDays(this.firstDayOfWeek, -7);
    this.updateDates(this.firstDayOfWeek);
  }

  inputOnChange():void{
    /**chang the color of the input*/
  }

  getDaysOfWeek(firstDay:Date):Array<Date>{
    /*todo: need to get the date from week (default curent week)*/ 
    var daysDates = [firstDay, this.addDays(firstDay, 1), this.addDays(firstDay, 2), this.addDays(firstDay, 3),
      this.addDays(firstDay, 4), this.addDays(firstDay, 5), this.addDays(firstDay, 6)];

    return daysDates;
  }

  updateDates(firstDay:Date):void{
    this.dayDates = [firstDay, this.addDays(firstDay, 1), this.addDays(firstDay, 2), this.addDays(firstDay, 3),
                    this.addDays(firstDay, 4), this.addDays(firstDay, 5), this.addDays(firstDay, 6)];
  }

  addDays(date: Date, days: number): Date {
    var newDay = new Date(date);
    newDay.setDate(newDay.getDate() + days);
    return newDay;
  }

  getRequsts():void{
    /**get all requsts ant put them as lines*/
    this.requestrows = this.buildRequstsForTest();
  }

  /**For tests*/
  getThisEmployee():Employee{
    /**Todo: get the loged in employee */
    if(SheredData.thisEmployee != (null || undefined)) return SheredData.thisEmployee;
    return new Employee('fName','lName','email@gmail.com','pass','com', 'team', 'role',1);/**for test only */
  }

  buildRequstsForTest():Array<Array<Request>>{
      var rows = [this.buildNewRequestRow(new Date('7/6/2020'), "Shift A", 7),
      this.buildNewRequestRow(new Date('7/6/2020'), "Shift B", 7)]
      return rows;
  }

 buildNewRequestRow(firstDay:Date, shift:string, days:number):Array<Request>{
    var row = new Array<Request>(days);
    for(var _i = 0; _i < days; _i++){
        row[_i] = (new Request(shift, 2, this.employee, this.addDays(firstDay, _i)));
    }
    for(let request of row) request.priority=2;
    return row;
  }

}
