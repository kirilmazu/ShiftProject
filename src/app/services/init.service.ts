import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { SheredData } from '../shered-data';
import { RequestService } from './request.service';
import { ShiftService } from './shift.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(private employees:EmployeeService, private requests:RequestService, private shifts:ShiftService) { }

  async doInit(){
    //get all shifts from the server
    this.shifts.getAllShifts();
    if(EmployeeService.thisEmployee.role == 'Manager'){ //get all data need for manager
      //get all employees
      await this.employees.getEmployees();
      //wait for get all employees, we use it in the requsts sort
      await this.delay(500);
      //get all shift requests
      await this.requests.getrequests(EmployeeService.allEmployees);
    } else { //get data only for this employee
      //get only my shift requests
      this.requests.getMyRequests(EmployeeService.thisEmployee.employeeID);
    }
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
