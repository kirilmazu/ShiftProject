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

  isManager = true;//take it from user data

  constructor() {
    //if (SheredData.thisEmployee != (undefined || null) && SheredData.thisEmployee.role=="Manager") this.isManager = true;
    /**get the date of week */
    /**the format of date is MM/dd/yyyy */
    this.firstDayOfWeek = new Date('6/7/2020'); /**todo: get the first day of current week */
    /**update the sheduale table*/
    this.updateDates(this.firstDayOfWeek);
    console.log(this.shifts);//TODO: remove, for test only
   }

  ngOnInit(): void {
  }

  updateDates(firstDay:Date):void{
    //update the dates of the week
    this.dayDates = [firstDay, SheredData.addDays(firstDay, 1), SheredData.addDays(firstDay, 2), SheredData.addDays(firstDay, 3),
      SheredData.addDays(firstDay, 4), SheredData.addDays(firstDay, 5), SheredData.addDays(firstDay, 6)];
    //update the shifts list
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
    new Shift(this.employee1,this.shiftATime,SheredData.addHours(this.shiftATime, 8)),
    new Shift(this.employee1,SheredData.addDays(this.shiftATime,1),SheredData.addDays(SheredData.addHours(this.shiftATime, 8),1)),
    new Shift(this.employee2,SheredData.addDays(this.shiftATime,2),SheredData.addDays(SheredData.addHours(this.shiftATime, 8),2)),
    new Shift(this.employee2,SheredData.addDays(this.shiftATime,3),SheredData.addDays(SheredData.addHours(this.shiftATime, 8),3)),
    new Shift(this.employee1,SheredData.addDays(this.shiftATime,4),SheredData.addDays(SheredData.addHours(this.shiftATime, 8),4)),
    new Shift(this.employee3,SheredData.addDays(this.shiftATime,5),SheredData.addDays(SheredData.addHours(this.shiftATime, 8),5)),
    new Shift(this.employee3,SheredData.addDays(this.shiftATime,6),SheredData.addDays(SheredData.addHours(this.shiftATime, 8),6)),
  ],
  [
    new Shift(this.employee2,this.shiftBTime,SheredData.addHours(this.shiftBTime, 8)),
    new Shift(this.employee3,SheredData.addDays(this.shiftBTime,1),SheredData.addDays(SheredData.addHours(this.shiftBTime, 8),1)),
    new Shift(this.employee3,SheredData.addDays(this.shiftBTime,2),SheredData.addDays(SheredData.addHours(this.shiftBTime, 8),2)),
    new Shift(this.employee3,SheredData.addDays(this.shiftBTime,3),SheredData.addDays(SheredData.addHours(this.shiftBTime, 8),3)),
    new Shift(this.employee2,SheredData.addDays(this.shiftBTime,4),SheredData.addDays(SheredData.addHours(this.shiftBTime, 8),4)),
    new Shift(this.employee2,SheredData.addDays(this.shiftBTime,5),SheredData.addDays(SheredData.addHours(this.shiftBTime, 8),5)),
    new Shift(this.employee1,SheredData.addDays(this.shiftBTime,6),SheredData.addDays(SheredData.addHours(this.shiftBTime, 8),6)),
  ]
]

}