import { Employee } from './employee';

export class Shift {
    ownerName:string;
    date:Date;
    shift:string;

    constructor(ownerName:string, date:Date, shift:string){
        this.ownerName = ownerName;
        this.date = date;
        this.shift = shift;
    }
}