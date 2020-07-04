import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName = "My name";
  constructor(private route:ActivatedRoute,private router:Router, private employeeService:EmployeeService) { 
    if (EmployeeService.thisEmployee != (undefined || null)) 
    this.userName = EmployeeService.thisEmployee.firstName + " " + EmployeeService.thisEmployee.lastName;
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