import { Injectable } from '@angular/core';
import { NotificationService } from './notificatnotification.service';
import { EmployeeService } from './employee.service';
import { SheredData } from '../shered-data';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(private notificatons:NotificationService, private employees:EmployeeService) { }

  async doInit(){
    //get all notifications
    await this.notificatons.getNotifications();
    //get all shifts

    if(SheredData.thisEmployee.role == 'manager'){ //get all data
      //get all employees
      await this.employees.getEmployees();
      //get only my shift requests

    } else { //get data only for this employee
      //get only my shift requests

    }
  }
}
