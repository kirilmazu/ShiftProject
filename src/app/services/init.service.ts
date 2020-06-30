import { Injectable } from '@angular/core';
import { NotificationService } from './notificatnotification.service';
import { EmployeeService } from './employee.service';
import { SheredData } from '../shered-data';
import { ShiftService } from './shift.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(private notificatons:NotificationService, private employees:EmployeeService, private shifts:ShiftService) { }

  async doInit(){
    //this.test();
    //get all notifications
    await this.notificatons.getNotifications();
    //get all shifts
    await this.shifts.getshifts();

    if(SheredData.thisEmployee.role == 'Manager'){ //get all data
      //get all employees
      await this.employees.getEmployees();
      //get all shift requests

    } else { //get data only for this employee
      //get only my shift requests

    }
  }
}
