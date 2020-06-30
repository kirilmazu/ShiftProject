import { Component, OnInit } from '@angular/core';
import { Shift } from 'src/app/objects/shift';
import { ShiftService } from 'src/app/services/shift.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SheredData } from 'src/app/shered-data';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; //The days names
  firstDayOfWeek:Date;//The first day of week to show
  dayDates:Array<Date>;//The all week dates
  shiftRows: Array<Array<Shift>>;
  allShifts:Array<Shift>;

  shifts:Array<Array<Shift>> = [[],[]];

  //
  getFinish:boolean;
  //
  isManager:boolean;

  shiftATime = '08:00-16:00';
  shiftBTime = '16:00-24:00';

  constructor(private shiftService:ShiftService) {
    this.getFinish = false;
    if(SheredData.thisEmployee == (null || undefined) || SheredData.thisEmployee.role == (null || undefined)) this.isManager = false;
    else this.isManager = SheredData.thisEmployee.role == "Manager";
    //set the start date of the week
    /**the format of date is MM/dd/yyyy */
    this.firstDayOfWeek = new Date('6/7/2020');
    //update the sheduale table
    //this.updateDates(this.firstDayOfWeek);
    console.log(this.shifts);//TODO: remove, for test only
   }

  async ngOnInit(): Promise<void> {
    await this.getShiftsFromServer();
    this.updateDates(this.firstDayOfWeek);
  }

  async getShiftsFromServer(){
    this.getFinish = false;
    await this.shiftService.getshifts().subscribe(results => {
      console.log(results);
      var shifts: Array<Shift> = [];
      for (var res in results) {
        var jResult = JSON.parse(JSON.stringify(results[res]));
        shifts.push(new Shift(jResult['ownerName'], new Date(jResult['date']), jResult['shift']));
      }
      this.allShifts = shifts;
      this.getFinish = true;
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      }
      else {
        console.log("Server-side error occured.");
      }
    });
  }

  updateDates(firstDay:Date):void{
    //update the dates of the week
    this.dayDates = [firstDay, SheredData.addDays(firstDay, 1), SheredData.addDays(firstDay, 2), SheredData.addDays(firstDay, 3),
      SheredData.addDays(firstDay, 4), SheredData.addDays(firstDay, 5), SheredData.addDays(firstDay, 6)];
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
    console.log(this.allShifts);
    //Take the shift from this week only
    var shiftAweek:Array<Shift> = [];
    var shiftBweek:Array<Shift> = [];
    this.shifts=[[],[]];
    //fill the shifts
    for(var day in this.dayDates){
      for(var shift in this.allShifts){
        if(this.dateEquel(this.allShifts[shift].date, this.dayDates[day])){
          if(this.allShifts[shift].shift == this.shiftATime) shiftAweek.push(this.allShifts[shift]);
          else if(this.allShifts[shift].shift == this.shiftBTime) shiftBweek.push(this.allShifts[shift]);
        }
      }
    }
    //TODO: fill the empty shifts.
    var haveShift = false;
    var shiftAweekTemp:Array<Shift> = [];
    var shiftBweekTemp:Array<Shift> = [];
    for(var day in this.dayDates){
      haveShift = false;
      //fill shift A
      for(var shift in shiftAweek){
        if(this.dateEquel(shiftAweek[shift].date, this.dayDates[day])){
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
        if(this.dateEquel(shiftBweek[shift].date, this.dayDates[day])){
          shiftBweekTemp.push(shiftBweek[shift]);
          haveShift = true;
          break;
        }
      }
      //if don't have shift fill with empty shift
      if(!haveShift) shiftBweekTemp.push(new Shift("", this.dayDates[day], ""));
    }
    this.shifts = [shiftAweekTemp, shiftBweekTemp];
    console.log(this.shifts);
  }


  dateEquel(date1:Date, date2:Date ):boolean{
    if(date1.getDate() != date2.getDate()) return false;
    else if(date1.getMonth() != date2.getMonth()) return false;
    else if(date1.getFullYear() != date2.getFullYear()) return false;
    return true;
  }
}