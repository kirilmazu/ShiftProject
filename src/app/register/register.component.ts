import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {mysql} from '';

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
    mysql : Mysql = new Mysql();
    const db = mysql.createConnection({
      host     : 'sql7.freesqldatabase.com',
      user     : 'sql7345042',
      password : 'XHdPZER6tt',
      database : 'sql7345042'
  });

  }

  SingUp():void{
    /**out put for test */
    var res = "email: " + this.email + ", user: " + this.username + ", pass: " + this.password + ", role: " + this.role;
    alert("sing up\n"+res);
    /*chek input*/
    /*save new user*/ 
    this.router.navigate(['/main']);
  }

  cansel():void{
    this.router.navigate(['/login']);
  }

}