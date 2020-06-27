import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { SheredData } from 'src/app/shered-data';
import { EmployeeService } from 'src/app/services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from 'src/app/objects/employee';
import { InitService } from 'src/app/services/init.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //imput filds
  email:string;
  password:string;
  //hide or not the password
  hide = true;

  //intro text
  introHader:string;
  introBody:string;

  constructor(private route:ActivatedRoute,private router:Router, private user:EmployeeService, private init:InitService) {
    this.introHader = "Shift project";
    this.introBody = "This site is a finle project for web course, few words about the site...."
   }

  ngOnInit(): void {
  }

  async login(){
    var employee: Employee;
    //check if employee exist in the data
    this.user.getEmployee(this.email, this.password).subscribe(async result => {
      var jResult = JSON.parse(JSON.stringify(result[0]));
      console.log(result);
      employee = new Employee(jResult["firstName"], jResult['lastname'], jResult['email'], jResult['password'],
       jResult['company'], jResult['team'], jResult['role'],jResult['ID']);
      console.log(employee);  
      if(employee == (undefined || null) || employee.firstName == (undefined || null) ){
        alert('Login failed.');
      } else {
        SheredData.thisEmployee = employee
        alert('loged in successfuly');
        await this.init.doInit();
        //TODO: replase it
        await this.delay(3000);//give time to get data from the server
        this.router.navigate(['/main']);
      }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }

  //check if entered user name and password.
  checkInput():boolean{
    if(this.email == (undefined || null) || this.password == (undefined || null) || this.email.trim() == "" || this.password.trim() == "") {
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

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}