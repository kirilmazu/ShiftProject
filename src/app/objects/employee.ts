
export class Employee {
    name: string;
    employeeID: number;

    firstName: string;
    lastName: string;
    email: string;
    password: string;
    company: string;
    team: string;
    role: string;

    constructor(firstName: string,lastName:string, email:string, password:string, company:string, team:string, role:string, employeeid:number){
        this.firstName = firstName;
        this.lastName = lastName;
        this.name = firstName + " " + lastName;
        this.email = email;
        this.password = password;
        this.company = company;
        this.team = team;
        this.role = role;
        this.employeeID = employeeid;
    }

    static getEmployeeID(employeeName:string, employees:Array<Employee>):number{
        for(var emp in employees){
            if(employees[emp].name == employeeName) return employees[emp].employeeID;
        }
        return 0;
    }

    static getEmployeeByID(employeeID:number, employees:Array<Employee>):Employee{
        for(var emp in employees){
            if(employees[emp].employeeID == employeeID) return employees[emp];
        }
        return undefined;
    }
}