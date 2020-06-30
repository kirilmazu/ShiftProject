import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/objects/employee';
import { Shift } from 'src/app/objects/shift';
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

  isManager:boolean;

  shiftATime = '08:00-16:00';
  shiftBTime = '16:00-24:00';

  constructor() {
    if(SheredData.thisEmployee == (null || undefined) || SheredData.thisEmployee.role == (null || undefined)) this.isManager = false;
    else this.isManager = SheredData.thisEmployee.role == "Manager";
    //set the start date of the week
    /**the format of date is MM/dd/yyyy */
    this.firstDayOfWeek = new Date('6/7/2020');
    //update the sheduale table
    //this.updateDates(this.firstDayOfWeek);
    console.log(this.shifts);//TODO: remove, for test only
   }

  ngOnInit(): void {
    this.updateDates(this.firstDayOfWeek);
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
    console.log(SheredData.shifts);
    //Take the shift from this week only
    var shiftAweek:Array<Shift> = [];
    var shiftBweek:Array<Shift> = [];
    this.shifts=[[],[]];
    for(var day in this.dayDates){
      for(var shift in SheredData.shifts){
        if(this.dateEquel(SheredData.shifts[shift].date, this.dayDates[day])){
          if(SheredData.shifts[shift].shift == this.shiftATime) shiftAweek.push(SheredData.shifts[shift]);
          else if(SheredData.shifts[shift].shift == this.shiftBTime) shiftBweek.push(SheredData.shifts[shift]);
        }
      }
    }
    //TODO: fill the empty shifts.
    this.shifts = [shiftAweek, shiftBweek];
    console.log(this.shifts);
  }


  dateEquel(date1:Date, date2:Date ):boolean{
    if(date1.getDate() != date2.getDate()) return false;
    else if(date1.getMonth() != date2.getMonth()) return false;
    else if(date1.getFullYear() != date2.getFullYear()) return false;
    return true;
  }

  dateAfter(date1:Date, date2:Date ):boolean{
    if(date1.getFullYear() < date2.getFullYear()) return false;
    if(date1.getFullYear() >= date2.getFullYear() && date1.getMonth() < date2.getMonth()) return false;
    if(date1.getMonth() >= date2.getMonth() && date1.getDate() < date2.getDate()) return false;
    return true;
  }


shifts = [
  [
    new Shift("undef", this.firstDayOfWeek, this.shiftATime),
    new Shift("undef",SheredData.addDays(this.firstDayOfWeek,1),this.shiftATime),
    new Shift("undef",SheredData.addDays(this.firstDayOfWeek,2),this.shiftATime),
    new Shift("undef",SheredData.addDays(this.firstDayOfWeek,3),this.shiftATime),
    new Shift("undef",SheredData.addDays(this.firstDayOfWeek,4),this.shiftATime),
    new Shift("undef",SheredData.addDays(this.firstDayOfWeek,5),this.shiftATime),
    new Shift("undef",SheredData.addDays(this.firstDayOfWeek,6),this.shiftATime),
  ],
  [
    new Shift("undef",this.firstDayOfWeek,this.shiftBTime),
    new Shift("undef",SheredData.addDays(this.firstDayOfWeek,1),this.shiftBTime),
    new Shift("undef",SheredData.addDays(this.firstDayOfWeek,2),this.shiftBTime),
    new Shift("undef",SheredData.addDays(this.firstDayOfWeek,3),this.shiftBTime),
    new Shift("undef",SheredData.addDays(this.firstDayOfWeek,4),this.shiftBTime),
    new Shift("undef",SheredData.addDays(this.firstDayOfWeek,5),this.shiftBTime),
    new Shift("undef",SheredData.addDays(this.firstDayOfWeek,6),this.shiftBTime),
  ]
]

}