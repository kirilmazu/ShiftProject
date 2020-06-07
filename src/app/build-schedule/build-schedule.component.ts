import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { Request } from '../request';
import { Shift } from '../shift';
import {WeekReqests} from '../week-reqests';

@Component({
  selector: 'app-build-schedule',
  templateUrl: './build-schedule.component.html',
  styleUrls: ['./build-schedule.component.css']
})
export class BuildScheduleComponent implements OnInit {
  firstDayOfWeek:Date; //The date to start the table from
  dayDates:Array<Date>;//The array of days to show (one week for now)
  dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];//The days names 

  employees:Array<Employee>; //list of all employees
  //list of week reqests for one employee
  weekReqests:Array<WeekReqests>;
  

  constructor() { 
    //this data only for tests!
    this.firstDayOfWeek = new Date('6/7/2020'); /**todo: get the first day of current week */
    //this.getFirstDateOfWeek(new Date());
    /**update the sheduale table*/
    this.updateDates(this.firstDayOfWeek);
    this.employees = [this.employee1, this.employee2, this.employee3]; //Take all employees
    this.initTest();
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

  addDays(date: Date, days: number): Date {
    var newDay = new Date(date);
    newDay.setDate(newDay.getDate() + days);
    return newDay;
  }

  updateDates(firstDay:Date):void{
    this.dayDates = [firstDay, this.addDays(firstDay, 1), this.addDays(firstDay, 2), this.addDays(firstDay, 3),
                    this.addDays(firstDay, 4), this.addDays(firstDay, 5), this.addDays(firstDay, 6)];
  }

  getFirstDateOfWeek(date: Date) : Date{
    var _date = date;
    
    while (_date.getDay()!=1){
      _date.setDate(_date.getDate()-1);
      console.debug(_date);
    }
    console.debug("Finished" + _date);
    return _date;
  }







  /**For test only */
 employee1 = new Employee('fName1','lName1','email1@gmail.com','pass','com', 'team', 'role');
 employee2 = new Employee('fName2','lName2','email2@gmail.com','pass','com', 'team', 'role');
 employee3 = new Employee('fName3','lName3','email3@gmail.com','pass','com', 'team', 'role');

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
  ],
  [
    new Shift(this.employee2,this.shiftBTime,this.addHours(this.shiftBTime, 8)),
    new Shift(this.employee3,this.addDays(this.shiftBTime,1),this.addDays(this.addHours(this.shiftBTime, 8),1)),
    new Shift(this.employee3,this.addDays(this.shiftBTime,2),this.addDays(this.addHours(this.shiftBTime, 8),2)),
    new Shift(this.employee3,this.addDays(this.shiftBTime,3),this.addDays(this.addHours(this.shiftBTime, 8),3)),
    new Shift(this.employee2,this.addDays(this.shiftBTime,4),this.addDays(this.addHours(this.shiftBTime, 8),4)),
    new Shift(this.employee2,this.addDays(this.shiftBTime,5),this.addDays(this.addHours(this.shiftBTime, 8),5)),
    new Shift(this.employee1,this.addDays(this.shiftBTime,6),this.addDays(this.addHours(this.shiftBTime, 8),6)),
  ]
]


addHours(date: Date, hours: number): Date {
  var newDay = new Date(date);
  newDay.setHours(date.getHours() + hours);
  return newDay;
}

buildRequests(employee:Employee):Array<Array<Request>>{
 var requestsT = [
  [
    new Request("siftA",2,employee,this.firstDayOfWeek),
    new Request("siftA",3,employee,this.addDays(this.firstDayOfWeek, 1)),
    new Request("siftA",1,employee,this.addDays(this.firstDayOfWeek, 2)),
    new Request("siftA",2,employee,this.addDays(this.firstDayOfWeek, 3)),
    new Request("siftA",2,employee,this.addDays(this.firstDayOfWeek, 4)),
    new Request("siftA",0,employee,this.addDays(this.firstDayOfWeek, 5)),
    new Request("siftA",2,employee,this.addDays(this.firstDayOfWeek, 6)),
  ],
  [
    new Request("siftB",2,employee,this.firstDayOfWeek),
    new Request("siftB",4,employee,this.addDays(this.firstDayOfWeek, 1)),
    new Request("siftB",2,employee,this.addDays(this.firstDayOfWeek, 2)),
    new Request("siftB",3,employee,this.addDays(this.firstDayOfWeek, 3)),
    new Request("siftB",2,employee,this.addDays(this.firstDayOfWeek, 4)),
    new Request("siftB",1,employee,this.addDays(this.firstDayOfWeek, 5)),
    new Request("siftB",0,employee,this.addDays(this.firstDayOfWeek, 6)),
  ]
] 
for(let request of requestsT[0]) request.priority=this.getRandomPriority();
for(let request of requestsT[1]) request.priority=this.getRandomPriority();
return requestsT;
}

getRandomPriority():number{
  return Math.floor(Math.random() * 5);
}

initTest():void{
  this.weekReqests = [
    new WeekReqests(this.firstDayOfWeek, this.employee1, this.buildRequests(this.employee1)),
    new WeekReqests(this.firstDayOfWeek, this.employee1, this.buildRequests(this.employee2)),
    new WeekReqests(this.firstDayOfWeek, this.employee1, this.buildRequests(this.employee3)),

  ]
}

}
