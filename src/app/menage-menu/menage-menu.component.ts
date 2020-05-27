import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menage-menu',
  templateUrl: './menage-menu.component.html',
  styleUrls: ['./menage-menu.component.css']
})
export class MenageMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  DashboardClick():void{
      alert("Dashboard");
  }

  ScheduleClick():void{
    alert("Schedule");
  }

  RequestsClick():void{
    alert("Requests");
  }

  TimesheetClick():void{
    alert("Timesheet");
  }

}
