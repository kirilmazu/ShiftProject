import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'app-main-rout',
  templateUrl: './main-rout.component.html',
  styleUrls: ['./main-rout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainRoutComponent implements OnInit {
  component_to_show:string;
  show_dashboard = true;
  show_schedule = false;
  show_requests = false;
  

  constructor() {
    this.component_to_show="Dashboard";//set the defult component
    this.onChange(this.component_to_show);
   }

   

  ngOnInit(): void {
  }

  onChange(toShow:string){
      this.show_dashboard = toShow=="Dashboard";
      this.show_schedule = toShow=="Schedule";
      this.show_requests = toShow=="Requests";
  }

  
}