import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { SheredData } from '../shered-data';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(private employees:EmployeeService) { }

  async doInit(){
    if(SheredData.thisEmployee.role == 'Manager'){ //get all data
      //get all employees
      await this.employees.getEmployees();
      //get all shift requests

    } else { //get data only for this employee
      //get only my shift requests

    }
  }
}
