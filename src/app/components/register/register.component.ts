import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { SheredData } from 'src/app/shered-data';
import { Employee } from 'src/app/objects/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:string;
  password:string;
  rePassword:string;
  firstName:string;
  lastName:string;
  company:string;
  team:string;
  role:string;

  hidePass = true;
  hideRePass = true;

  //intro text
  introHader:string;
  introBody:string;


  constructor(private route:ActivatedRoute,private router:Router, private employeeService:EmployeeService) {
    this.introHader = "Shift project";
    this.introBody = "This site is a finle project for web course, few words about the site.... but it can be longer so let see what hapand ............................................................................................... so long"
   }

  ngOnInit(): void {
  }

  SingUp():void{
    //chek input
    var result = this.checkInput();
    //if the check pass
    if(result){
      //fill not required if empty
      if(this.team == (undefined || null)) this.team = "";
      //get employee data
      var newEmployee = new Employee(this.firstName, this.lastName, this.email, this.password, this.company,this.team, this.role,0);
      //save the employee to data storage
      this.saveEmployee(newEmployee);
      //login with the new user
      SheredData.thisEmployee = newEmployee;
      alert("Hello " + this.firstName + " " + this.lastName + " welcome to ShiftProject.");
      //go to the main page
      this.router.navigate(['/main']);
    }
  }

  //check if all filds filled
  checkInput():boolean{
    if(this.email == (undefined || null) || this.firstName == (undefined || null) || this.lastName == (undefined || null) ||
     this.password == (undefined || null) || this.role == (undefined || null)){
      alert("please fill all the required filds (with the *)");
      return false;
    }
    else{
      if(this.email.trim() == "" || this.firstName.trim() == "" || this.lastName.trim() == "" ||
     this.password.trim() == "" || this.role == ""){
      alert("please fill all the required filds (with the *) you can't fill just spasess.");
      return false;
    }
    }

    if(this.password != this.rePassword){
      alert("The password don't much");
      return false;
    }
    return true;
  }

  //save the new user in the server
  saveEmployee(employee:Employee):void{
    this.employeeService.addEmployee(employee);
    /**todo: implement*/
  }

  //cencel button clicked
  cansel():void{
    //return to login page
    this.router.navigate(['/login']);
  }

}