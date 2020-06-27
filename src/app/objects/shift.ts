import { Employee } from './employee';

export class Shift {
    ownerName: String;
    from: Date;
    to:   Date;
    duration: number;

    constructor(ownerName:String, from:Date, to:Date){
        this.ownerName = ownerName;
        this.from = from;
        this.to = to;
    }

    getNumberToPrint(num:number):string{
        if(num>10) return num.toString();
        if(num==0) return "00";
        return "0" + num.toString();
    }

    getHoursAndMinutis(date:Date){
        return this.getNumberToPrint(date.getHours())+":"+this.getNumberToPrint(date.getMinutes());
    }

    getFromTo():string{
        return this.getHoursAndMinutis(this.from) + " - " + this.getHoursAndMinutis(this.to);
    }
}