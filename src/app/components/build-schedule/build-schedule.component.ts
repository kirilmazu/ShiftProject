import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/objects/employee';
import { Request } from 'src/app/objects/request';
import { Shift } from 'src/app/objects/shift';
import {WeekReqests} from 'src/app/objects/week-reqests';
import { SheredData } from 'src/app/shered-data';
import { ShiftService } from 'src/app/services/shift.service';

@Component({
  selector: 'app-build-schedule',
  templateUrl: './build-schedule.component.html',
  styleUrls: ['./build-schedule.component.css']
})
export class BuildScheduleComponent implements OnInit {
  firstDayOfWeek:Date; //The date to start the table from
  dayDates:Array<Date>;//The array of days to show (one week for now)
  dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];//The days names 
  //list of all employees
  employees:Array<Employee>; 
  //list of week reqests for one employee
  weekReqests:Array<WeekReqests>;
  shifts;
  shiftATime = "08:00-16:00";
  shiftBTime = "16:00-24:00";
  

  constructor(private shiftsService:ShiftService) { 
    //set the date to start the week
    this.firstDayOfWeek = new Date('6/7/2020');
    //update the sheduale table
    this.updateDates(this.firstDayOfWeek);
    //get the list of all employees
    this.employees = SheredData.employees;
    //init requests
    this.initTest();
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

  updateDates(firstDay:Date):void{
    this.dayDates = [firstDay, SheredData.addDays(firstDay, 1), SheredData.addDays(firstDay, 2), SheredData.addDays(firstDay, 3),
      SheredData.addDays(firstDay, 4), SheredData.addDays(firstDay, 5), SheredData.addDays(firstDay, 6)];

    //build empty shifts with dates
    this.shifts = this.buildWeekShifts(firstDay);
  }

  //save all the shifts
  save():void{
    console.log(this.shifts);
    for(var val1 in this.shifts){
      for(var val2 in this.shifts[val1]){
        this.shiftsService.addShift(this.shifts[val1][val2]);
      }
    }
  }


  buildWeekShifts(firstDay:Date){
    return [
      [
        new Shift("undefined", firstDay, this.shiftATime),
        new Shift("undefined",SheredData.addDays(firstDay,1),this.shiftATime),
        new Shift("undefined",SheredData.addDays(firstDay,2),this.shiftATime),
        new Shift("undefined",SheredData.addDays(firstDay,3),this.shiftATime),
        new Shift("undefined",SheredData.addDays(firstDay,4),this.shiftATime),
        new Shift("undefined",SheredData.addDays(firstDay,5),this.shiftATime),
        new Shift("undefined",SheredData.addDays(firstDay,6),this.shiftATime),
      ],
      [
        new Shift("undefined",firstDay, this.shiftBTime),
        new Shift("undefined",SheredData.addDays(firstDay,1),this.shiftBTime),
        new Shift("undefined",SheredData.addDays(firstDay,2),this.shiftBTime),
        new Shift("undefined",SheredData.addDays(firstDay,3),this.shiftBTime),
        new Shift("undefined",SheredData.addDays(firstDay,4),this.shiftBTime),
        new Shift("undefined",SheredData.addDays(firstDay,5),this.shiftBTime),
        new Shift("undefined",SheredData.addDays(firstDay,6),this.shiftBTime),
      ]
    ]
  }

/*buils requests for tests*/
buildRequests(employee:Employee):Array<Array<Request>>{
 var requestsT = [
  [
    new Request("shiftATime",2,employee,this.firstDayOfWeek),
    new Request("shiftATime",3,employee,SheredData.addDays(this.firstDayOfWeek, 1)),
    new Request("shiftATime",1,employee,SheredData.addDays(this.firstDayOfWeek, 2)),
    new Request("shiftATime",2,employee,SheredData.addDays(this.firstDayOfWeek, 3)),
    new Request("shiftATime",2,employee,SheredData.addDays(this.firstDayOfWeek, 4)),
    new Request("shiftATime",0,employee,SheredData.addDays(this.firstDayOfWeek, 5)),
    new Request("shiftATime",2,employee,SheredData.addDays(this.firstDayOfWeek, 6)),
  ],
  [
    new Request("shiftBTime",2,employee,this.firstDayOfWeek),
    new Request("shiftBTime",4,employee,SheredData.addDays(this.firstDayOfWeek, 1)),
    new Request("shiftBTime",2,employee,SheredData.addDays(this.firstDayOfWeek, 2)),
    new Request("shiftBTime",3,employee,SheredData.addDays(this.firstDayOfWeek, 3)),
    new Request("shiftBTime",2,employee,SheredData.addDays(this.firstDayOfWeek, 4)),
    new Request("shiftBTime",1,employee,SheredData.addDays(this.firstDayOfWeek, 5)),
    new Request("shiftBTime",0,employee,SheredData.addDays(this.firstDayOfWeek, 6)),
  ]
] 
for(let request of requestsT[0]) request.priority = this.getRandomPriority();
for(let request of requestsT[1]) request.priority = this.getRandomPriority();
return requestsT;
}

getRandomPriority():number{
  return Math.floor(Math.random() * 5);
}

initTest():void{
  this.weekReqests = [
    new WeekReqests(this.firstDayOfWeek, SheredData.thisEmployee, this.buildRequests(SheredData.thisEmployee)),
    new WeekReqests(this.firstDayOfWeek, SheredData.thisEmployee, this.buildRequests(SheredData.thisEmployee)),
  ]
}
}