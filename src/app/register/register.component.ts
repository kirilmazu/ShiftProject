import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  email:string;
  username:string;
  password:string;
  rePassword:string;
  firstName:string;
  lastName:string;
  company:string;
  team:string;
  role:string;

  hidePass = true;
  hideRePass = true;

  //intro text
  introHader:string;
  introBody:string;



  constructor(private route:ActivatedRoute,private router:Router) {
    this.introHader = "Shift project";
    this.introBody = "This site is a finle project for web course, few words about the site...."
   }

  ngOnInit(): void {
    // Connect
  db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
  });
  
}

  SingUp():void{
    /**out put for test */
    var res = "email: " + this.email + ", user: " + this.username + ", pass: " + this.password + ", role: " + this.role;
    alert("sing up\n"+res);
    /*chek input*/
    if((this.password==this.rePassword) &&
      (this.email.includes("@")))
    /*save new user*/ 
    app.get('/addomer', (req, res) => {
      let employee = {email:this.email, password:this.password,
                  firstName:this.firstName, lastname:this.lastName, company:this.company,
                  team:this.team, role:this.role};
      let sql = 'INSERT INTO employees SET ?';
      let query = db.query(sql, employee, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.send('employee added...');
      });
  });
    this.router.navigate(['/main']);
  }

  cansel():void{
    this.router.navigate(['/login']);
  }
}
