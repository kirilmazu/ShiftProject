import { Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-main-rout',
  templateUrl: './main-rout.component.html',
  styleUrls: ['./main-rout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainRoutComponent implements OnInit {
  //components to show
  hide_dashboard:boolean;
  hide_schedule:boolean;
  hide_requests:boolean;

  constructor() {
    //Set the defult component to show
    this.onChange("Dashboard");
   }

  ngOnInit(): void {
  }

  //show only the selected component
  onChange(toShow:string){
      this.hide_dashboard = toShow != "Dashboard";
      this.hide_schedule = toShow != "Schedule";
      this.hide_requests = toShow != "Requests";
  }
}