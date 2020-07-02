import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { SheredData } from '../shered-data';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(private employees:EmployeeService, private requests:RequestService) { }

  async doInit(){
    if(SheredData.thisEmployee.role == 'Manager'){ //get all data
      //get all employees
      await this.employees.getEmployees();
      await this.delay(1000);
      await this.requests.getrequests(SheredData.employees);
      //get all shift requests

    } else { //get data only for this employee
      //get only my shift requests

    }
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
