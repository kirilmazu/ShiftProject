import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-rout',
  templateUrl: './main-rout.component.html',
  styleUrls: ['./main-rout.component.css']
})
export class MainRoutComponent implements OnInit {
  component_to_show:string;

  constructor() {
    this.component_to_show="dashboard";
   }

  ngOnInit(): void {
  }

}
