import { Employee } from './objects/employee';
import { NotificationItem } from './objects/notification-item';
import { Shift } from './objects/shift';

export class SheredData {
  static thisEmployee:Employee;
  static notifications:Array<NotificationItem>;
  static employees:Array<Employee>;
  static shifts:Array<Shift>;

  //Get the date + [number] day's
  static addDays(date: Date, days: number): Date {
    var newDay = new Date(date);
    newDay.setDate(newDay.getDate() + days);
    return newDay;
  }

  //get date and add to this [number] hours
  static addHours(date: Date, hours: number): Date {
    var newDay = new Date(date);
    newDay.setHours(date.getHours() + hours);
    return newDay;
  }
}