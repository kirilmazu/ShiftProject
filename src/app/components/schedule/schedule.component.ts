import { Component, OnInit } from '@angular/core';
import { Shift } from 'src/app/objects/shift';
import { ShiftService } from 'src/app/services/shift.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SheredData } from 'src/app/shered-data';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  dayNames = SheredData.dayNames; //The days names
  firstDayOfWeek:Date;//The first day of week to show
  dayDates:Array<Date>;//The all week dates
  shiftRows: Array<Array<Shift>>;
  allShifts:Array<Shift>;
  //the list of shift to show
  shifts:Array<Array<Shift>> = [[],[]];

  //finish to get all the shifts
  getFinish:boolean;
  //if the connected employee is a managet show the build-scheduale part
  isManager:boolean;

  constructor (private shiftService:ShiftService, private employeeService:EmployeeService) {
    this.getFinish = false;
    if(EmployeeService.thisEmployee == (null || undefined) || EmployeeService.thisEmployee.role == (null || undefined)) this.isManager = false;
    else this.isManager = EmployeeService.thisEmployee.role == "Manager";
    //set the start date of the week
    /**the format of date is MM/dd/yyyy */
    this.firstDayOfWeek = new Date('6/7/2020');
   }

  async ngOnInit(): Promise<void> {
    await this.getShiftsFromServer();
    this.updateDates(this.firstDayOfWeek);
  }

  //get all the shift from the server
  async getShiftsFromServer(){
    this.getFinish = false;
    await this.shiftService.getshifts().subscribe(results => {
      var shifts: Array<Shift> = [];
      for (var res in results) {
        var jResult = JSON.parse(JSON.stringify(results[res]));
        shifts.push(new Shift(jResult['ownerName'], new Date(jResult['date']), jResult['shift']));
      }
      this.allShifts = shifts;
      this.getFinish = true;
      //do if to represh the GUI
      this.nextWeek();
      this.previousWeek();
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      }
      else {
        console.log("Server-side error occured.");
      }
    });
  }

  //update the week dates and shifts for this week
  updateDates(firstDay:Date):void{
    //update the dates of the week
    this.dayDates = SheredData.weekDates(firstDay);
    //update the shifts list
    this.updateShifts();
  }

  //Show the next week schedule
  nextWeek():void{
    this.firstDayOfWeek = SheredData.addDays(this.firstDayOfWeek, 7);
    this.updateDates(this.firstDayOfWeek);
  }

  //Show the previous week schedule
  previousWeek():void{
    this.firstDayOfWeek = SheredData.addDays(this.firstDayOfWeek, -7);
    this.updateDates(this.firstDayOfWeek);
  }

  //update the list of shifts to show
  updateShifts():void{
    //Take the shift from this week only
    var shiftAweek:Array<Shift> = [];
    var shiftBweek:Array<Shift> = [];
    this.shifts=[[],[]];
    //fill the shifts
    for(var day in this.dayDates){
      for(var shift in this.allShifts){
        if(SheredData.dateEquel(this.allShifts[shift].date, this.dayDates[day])){
          if(this.allShifts[shift].shift == this.shiftService.shiftATime) shiftAweek.push(this.allShifts[shift]);
          else if(this.allShifts[shift].shift == this.shiftService.shiftBTime) shiftBweek.push(this.allShifts[shift]);
        }
      }
    }
    //fill the empty shifts.
    var haveShift = false;
    var shiftAweekTemp:Array<Shift> = [];
    var shiftBweekTemp:Array<Shift> = [];
    for(var day in this.dayDates){
      haveShift = false;
      //fill shift A
      for(var shift in shiftAweek){
        if(SheredData.dateEquel(shiftAweek[shift].date, this.dayDates[day])){
          shiftAweekTemp.push(shiftAweek[shift]);
          haveShift = true;
          break;
        }
      }
      //if don't have shift fill with empty shift
      if(!haveShift) shiftAweekTemp.push(new Shift("", this.dayDates[day], ""));
      haveShift = false;
      //fill shift B
      for(var shift in shiftBweek){
        if(SheredData.dateEquel(shiftBweek[shift].date, this.dayDates[day])){
          shiftBweekTemp.push(shiftBweek[shift]);
          haveShift = true;
          break;
        }
      }
      //if don't have shift fill with empty shift
      if(!haveShift) shiftBweekTemp.push(new Shift("", this.dayDates[day], ""));
    }
    this.shifts = [shiftAweekTemp, shiftBweekTemp];
  }

}