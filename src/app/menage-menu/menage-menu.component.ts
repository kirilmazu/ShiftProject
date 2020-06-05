import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menage-menu',
  templateUrl: './menage-menu.component.html',
  styleUrls: ['./menage-menu.component.css']
})
export class MenageMenuComponent implements OnInit {
  @Input() component_to_show:string;
  @Output() toChange = new EventEmitter<string>(); 

  constructor() { }

  ngOnInit(): void {
  }

  DashboardClick():void{
    this.toChange.emit("Dashboard");
  }

  ScheduleClick():void{
    this.toChange.emit("Schedule");
  }

  RequestsClick():void{
    this.toChange.emit("Requests");
  }
}