import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/objects/employee';
import { Request } from 'src/app/objects/request';
import { Shift } from 'src/app/objects/shift';
import { WeekReqests } from 'src/app/objects/week-reqests';
import { SheredData } from 'src/app/shered-data';
import { ShiftService } from 'src/app/services/shift.service';
import { RequestService } from 'src/app/services/request.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationService } from 'src/app/services/notificatnotification.service';
import { NotificationItem } from 'src/app/objects/notification-item';

@Component({
  selector: 'app-build-schedule',
  templateUrl: './build-schedule.component.html',
  styleUrls: ['./build-schedule.component.css']
})
export class BuildScheduleComponent implements OnInit {
  firstDayOfWeek:Date; //The date to start the table from
  dayDates:Array<Date>;//The array of days to show (one week for now)
  dayNames = SheredData.dayNames;//The days names 
  employees:Array<Employee>; //list of all employees
  weekReqests:Array<WeekReqests>; //list of week reqests for one employee
  shifts:Array<Array<Shift>> = [[],[]];//the list of shifts for the build schdule table

  constructor(private shiftsService:ShiftService, private requestService:RequestService, private notificationService:NotificationService) { 
    //set the date to start the week
    this.firstDayOfWeek = new Date('6/7/2020');
    //get the list of all employees
    this.employees = EmployeeService.allEmployees;
    //init requests
    this.getAllRequests();
  }

  ngOnInit(): void {
    //update the sheduale table and request tebles
    this.updateDates(this.firstDayOfWeek);
  }

  //Show the next week schedule build and requests
  nextWeek():void{
    this.firstDayOfWeek = SheredData.addDays(this.firstDayOfWeek, 7);
    this.updateDates(this.firstDayOfWeek);
  }

  //Show the previous week schedule build and requests
  previousWeek():void{
    this.firstDayOfWeek = SheredData.addDays(this.firstDayOfWeek, -7);
    this.updateDates(this.firstDayOfWeek);
  }

  //update the list of shifts to show
  updateDates(firstDay:Date):void{
    this.dayDates = SheredData.getDaysOfWeek(firstDay);
    //update the requests
    this.updateRequests();
    //build empty shifts with dates
    this.shifts = this.buildWeekShifts(firstDay);
  }

  //save all the shifts
  save():void{
    console.log(this.shifts);
    for(var val1 in this.shifts){
      for(var val2 in this.shifts[val1]){
        if(this.shifts[val1][val2].ownerName != "undefined")
          //save in the server
          this.shiftsService.addShift(this.shifts[val1][val2]);
      }
    }
    //Add notification about new shifts
    //this.notificationService.addNotification(new NotificationItem('../assets/calendar 2.png', 'New scheduale published.', 'Published scheduale for the dates: ' + SheredData.shedualeDates(this.dayDates)));
    alert("Scheduale saved.");
  }

  //build week of empty shifts to build new sheduale
  buildWeekShifts(firstDay:Date){
    return [
      [
        new Shift("undefined", SheredData.addHours(firstDay,12), this.shiftsService.shiftATime),
        new Shift("undefined",SheredData.addDays(SheredData.addHours(firstDay,12),1),this.shiftsService.shiftATime),
        new Shift("undefined",SheredData.addDays(SheredData.addHours(firstDay,12),2),this.shiftsService.shiftATime),
        new Shift("undefined",SheredData.addDays(SheredData.addHours(firstDay,12),3),this.shiftsService.shiftATime),
        new Shift("undefined",SheredData.addDays(SheredData.addHours(firstDay,12),4),this.shiftsService.shiftATime),
        new Shift("undefined",SheredData.addDays(SheredData.addHours(firstDay,12),5),this.shiftsService.shiftATime),
        new Shift("undefined",SheredData.addDays(SheredData.addHours(firstDay,12),6),this.shiftsService.shiftATime),
      ],
      [
        new Shift("undefined",SheredData.addHours(firstDay,12), this.shiftsService.shiftBTime),
        new Shift("undefined",SheredData.addDays(SheredData.addHours(firstDay,12),1),this.shiftsService.shiftBTime),
        new Shift("undefined",SheredData.addDays(SheredData.addHours(firstDay,12),2),this.shiftsService.shiftBTime),
        new Shift("undefined",SheredData.addDays(SheredData.addHours(firstDay,12),3),this.shiftsService.shiftBTime),
        new Shift("undefined",SheredData.addDays(SheredData.addHours(firstDay,12),4),this.shiftsService.shiftBTime),
        new Shift("undefined",SheredData.addDays(SheredData.addHours(firstDay,12),5),this.shiftsService.shiftBTime),
        new Shift("undefined",SheredData.addDays(SheredData.addHours(firstDay,12),6),this.shiftsService.shiftBTime),
      ]
    ]
  }

  //get requests for any employee for this week
  updateRequests():void{
    var weekReqests:Array<WeekReqests> = [];
    for(var emp in this.employees){
      weekReqests.push(this.getRqestForEmployee(this.employees[emp], this.firstDayOfWeek));
    }
    this.weekReqests = weekReqests;
  }

  //get all request from the server
  async getAllRequests(){
    //if alredy get the requests dont get it again
    if(RequestService.allRequests == (null || undefined)){
      this.requestService.getrequests(this.employees);
    await SheredData.delay(1000);//give time to get data from the server
    }
  }

  //get request for given employee for one week
  getRqestForEmployee(employee:Employee, firstDay:Date):WeekReqests{
    var requestsA : Array<Request> = [];
    var requestsB : Array<Request> = [];
    var requests = RequestService.employeeRequests.get(employee.employeeID);
    
    for(var day in this.dayDates){
      for(var rec in requests){
        if(SheredData.dateEquel(requests[rec].date, this.dayDates[day])){
          if(requests[rec].shift == this.shiftsService.shiftATime) requestsA.push(requests[rec]);
          else if(requests[rec].shift == this.shiftsService.shiftBTime) requestsB.push(requests[rec]);
        }
      }
    }
    return new WeekReqests(firstDay, employee, [requestsA, requestsB]);
  }
}