import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { Shift } from '../shift';
import { SheredData } from '../shered-data';

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

  isManager = true;//take it from user data

  constructor() {
    /** */
    //if (SheredData.thisEmployee != (undefined || null) && SheredData.thisEmployee.role=="Manager") this.isManager = true;
    /**get the date of week */
    /**the format of date is MM/dd/yyyy */
    this.firstDayOfWeek = new Date('6/7/2020'); /**todo: get the first day of current week */
    /**update the sheduale table*/
    this.updateDates(this.firstDayOfWeek);
    console.log(this.shifts);
   }

  ngOnInit(): void {
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

  nextWeek():void{
    this.firstDayOfWeek = this.addDays(this.firstDayOfWeek, 7);
    this.updateDates(this.firstDayOfWeek);
  }

  previousWeek():void{
    this.firstDayOfWeek = this.addDays(this.firstDayOfWeek, -7);
    this.updateDates(this.firstDayOfWeek);
  }

  updateShifts():void{
    /**Take the shift from this week only */
    //this.shiftRows = 
  }



  /**For test only */
 employee1 = new Employee('fName1','lName','email1@gmail.com','pass','com', 'team', 'role');
 employee2 = new Employee('fName2','lName','email2@gmail.com','pass','com', 'team', 'role');
 employee3 = new Employee('fName3','lName','email3@gmail.com','pass','com', 'team', 'role');

 shiftATime = new Date('6/7/2020 8:00:00');
 shiftBTime = new Date('6/7/2020 16:00:00');

 
shifts = [
  [
    new Shift(this.employee1,this.shiftATime,this.addHours(this.shiftATime, 8)),
    new Shift(this.employee1,this.addDays(this.shiftATime,1),this.addDays(this.addHours(this.shiftATime, 8),1)),
    new Shift(this.employee2,this.addDays(this.shiftATime,2),this.addDays(this.addHours(this.shiftATime, 8),2)),
    new Shift(this.employee2,this.addDays(this.shiftATime,3),this.addDays(this.addHours(this.shiftATime, 8),3)),
    new Shift(this.employee1,this.addDays(this.shiftATime,4),this.addDays(this.addHours(this.shiftATime, 8),4)),
    new Shift(this.employee3,this.addDays(this.shiftATime,5),this.addDays(this.addHours(this.shiftATime, 8),5)),
    new Shift(this.employee3,this.addDays(this.shiftATime,6),this.addDays(this.addHours(this.shiftATime, 8),6)),
    //new Shift(this.employee1,this.addDays(this.shiftATime,7),this.addDays(this.addHours(this.shiftATime, 8),7)),
    //new Shift(this.employee2,this.addDays(this.shiftATime,8),this.addDays(this.addHours(this.shiftATime, 8),8))
  ],
  [
    new Shift(this.employee2,this.shiftBTime,this.addHours(this.shiftBTime, 8)),
    new Shift(this.employee3,this.addDays(this.shiftBTime,1),this.addDays(this.addHours(this.shiftBTime, 8),1)),
    new Shift(this.employee3,this.addDays(this.shiftBTime,2),this.addDays(this.addHours(this.shiftBTime, 8),2)),
    new Shift(this.employee3,this.addDays(this.shiftBTime,3),this.addDays(this.addHours(this.shiftBTime, 8),3)),
    new Shift(this.employee2,this.addDays(this.shiftBTime,4),this.addDays(this.addHours(this.shiftBTime, 8),4)),
    new Shift(this.employee2,this.addDays(this.shiftBTime,5),this.addDays(this.addHours(this.shiftBTime, 8),5)),
    new Shift(this.employee1,this.addDays(this.shiftBTime,6),this.addDays(this.addHours(this.shiftBTime, 8),6)),
    //new Shift(this.employee2,this.addDays(this.shiftBTime,7),this.addDays(this.addHours(this.shiftBTime, 8),7)),
    //new Shift(this.employee1,this.addDays(this.shiftBTime,8),this.addDays(this.addHours(this.shiftBTime, 8),8))
  ]
]


addHours(date: Date, hours: number): Date {
  var newDay = new Date(date);
  newDay.setHours(date.getHours() + hours);
  return newDay;
}




}
