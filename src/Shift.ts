import { Time } from "@angular/common";

class Shift{
    owner: Employee;
    from: Time;
    to:   Time;
    duration: number;
    date: Date;

    constructor(owner:Employee, from:Time, to:Time, date:Date){
        this.owner = owner;
        this.from = from;
        this.to = to;
        this.date = date;  
    }
}