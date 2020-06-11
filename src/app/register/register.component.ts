import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { SheredData } from '../shered-data';
import { Employee } from '../employee';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:string;
  username:string;
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


  constructor(private route:ActivatedRoute,private router:Router) {
    this.introHader = "Shift project";
    this.introBody = "This site is a finle project for web course, few words about the site.... but it can be longer so let see what hapand ............................................................................................... so long"
   }

  ngOnInit(): void {
  }

  SingUp():void{
    /*chek input*/
    var result = this.checkInput();
    //if the check pass
    if(result){
      //fill not required if empty
      if(this.team == (undefined || null)) this.team = "";
      //get employee data
      var newEmployee = new Employee(this.firstName, this.lastName, this.email, this.password, this.company,this.team, this.role);
      /**save the employee to data storage */
      this.saveEmployee(newEmployee);
      //login with the new user
      SheredData.thisEmployee = newEmployee;
      alert("Hello " + this.firstName + " " + this.lastName + " welcome to ShiftProject.");
      this.router.navigate(['/main']);
    }
  }

  checkInput():boolean{
    if(this.email == (undefined || null) || this.username == (undefined || null) 
    || this.firstName == (undefined || null) || this.lastName == (undefined || null) ||
     this.password == (undefined || null) || this.role == (undefined || null)){
      alert("please fill all the required filds (with the *)");
      return false;
    }
    else{
      if(this.email.trim() == "" || this.username.trim() == "" 
      || this.firstName.trim() == "" || this.lastName.trim() == "" ||
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

  saveEmployee(employee:Employee):void{
    /**todo: implement*/
  }

  cansel():void{
    this.router.navigate(['/login']);
  }

}
