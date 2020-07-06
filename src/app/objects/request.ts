import { Employee } from './employee';

export class Request {
    shift:string; /*need to be string of time like 00-08/08-16/.... or Shift A/Shift B/... */
    owner:Employee;
    date:Date;
    priority:number; /*need to be number 0-4*/

    constructor(shift:string, priority:number, owner:Employee, date:Date){
        this.shift = shift;
        this.owner = owner;
        this.date = date;
        this.priority = priority;
    }
    
}