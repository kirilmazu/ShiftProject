import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Employee } from '../employee';
import { SheredData } from '../shered-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;
  hide = true;

  //intro text
  introHader:string;
  introBody:string;

  constructor(private route:ActivatedRoute,private router:Router) {
    this.introHader = "Shift project";
    this.introBody = "This site is a finle project for web course, few words about the site...."
   }

  ngOnInit(): void {
  }

  login():void{
    /**use this.username and  this.password*/
    SheredData.thisEmployee = new Employee('fName!','lName!','email1@gmail.com','pass','com', 'team', 'Manager');//todo: remove
    /**get the employee and put him in Employee.thisEmployee */
    this.router.navigate(['/main']);
  }

  goToRegister(): void{
    this.router.navigate(['/register']);
  }

}
