class Employee{
    name: string;

    firstName: string;
    LastName: string;
    email: string;
    password: string;
    company: string;
    team: string;
    role: string;

    constructor(firstName: string,lastName:string, email:string, password:string, company:string, team:string, role:string){
        this.firstName = firstName;
        this.LastName = lastName;
        this.name = firstName + " " + lastName;
        this.email = email;
        this.password = password;
        this.company = company;
        this.team = team;
        this.role = role;
    }

}