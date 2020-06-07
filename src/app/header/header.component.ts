import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Employee } from '../employee';
import { SheredData } from '../shered-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName = "My name";
  constructor(private route:ActivatedRoute,private router:Router) { 
    if (SheredData.thisEmployee != (undefined || null)) 
    this.userName = SheredData.thisEmployee.firstName + " " + SheredData.thisEmployee.LastName;
  }

  ngOnInit(): void {
  }

  logOut(): void{
      alert("Logout");
      /*loguot*/
      this.router.navigate(['/login']);
  }

  userClick():void{
    alert("user");
  }

  
}