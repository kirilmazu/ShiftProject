import { Employee } from './employee';
import { Request } from './request';

export class WeekReqests {
    firstDayOfWeek:Date; //The first day of this week
    employee: Employee; //employee data
    requests: Array<Array<Request>>; //all requests for one week
    

    constructor(firstDayOfWeek:Date, employee: Employee, requests: Array<Array<Request>>){
        this.firstDayOfWeek = firstDayOfWeek;
        this.employee = employee;
        this.requests = requests;
    }
}
