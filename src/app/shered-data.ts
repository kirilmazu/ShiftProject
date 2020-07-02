import { Employee } from './objects/employee';
import { NotificationItem } from './objects/notification-item';
import { Shift } from './objects/shift';
import { Request } from './objects/request';

export class SheredData {
  static thisEmployee:Employee;
  static notifications:Array<NotificationItem>;
  static employees:Array<Employee>;
  static shifts:Array<Shift>;
  static requests:Array<Request>;

  //the names of the days to display
  static dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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

  //get array of week days stars from given first day
  static getDaysOfWeek(firstDay:Date):Array<Date>{
    var daysDates = [firstDay, SheredData.addDays(firstDay, 1), SheredData.addDays(firstDay, 2), SheredData.addDays(firstDay, 3),
      SheredData.addDays(firstDay, 4), SheredData.addDays(firstDay, 5), SheredData.addDays(firstDay, 6)];

    return daysDates;
  }

  //check if dates is equel
  static dateEquel(date1:Date, date2:Date ):boolean{
    if(date1.getDate() != date2.getDate()) return false;
    else if(date1.getMonth() != date2.getMonth()) return false;
    else if(date1.getFullYear() != date2.getFullYear()) return false;
    return true;
  }
}