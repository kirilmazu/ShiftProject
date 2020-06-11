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
  //imput filds
  username:string;
  password:string;
  //hide or not the password
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
    //save the employee in the global var
    SheredData.thisEmployee = this.checkUser(this.username, this.password);
    //if employee exist go to main 
    if(SheredData.thisEmployee != null) this.router.navigate(['/main']);
  }

  //get user name and password and if he exist return the employee data
  //if employee not found return null
  checkUser(username:string, password:string): Employee{
    var employee: Employee;
    //check if employee exist in the data
    /**TODO: replase this line by get from server */
    employee = new Employee('fName!','lName!','email1@gmail.com','pass','com', 'team', 'Manager');//for test only
    return employee;
  }

  //check if entered user name and password.
  checkInput():boolean{
    if(this.username == (undefined || null) || this.password == (undefined || null) || this.username.trim() == "" || this.password.trim() == "") {
      alert("Please enter user name and password.");
      return false;
    }
    return true;
  }

  //register button clicked.
  goToRegister(): void{
    //go to register page.
    this.router.navigate(['/register']);
  }
}