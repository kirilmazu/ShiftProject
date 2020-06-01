import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
  }

  SingUp():void{
    alert("sing up")
    /*chek input*/
    /*save new user*/ 
    this.router.navigate(['/main']);
  }

  cansel():void{
    this.router.navigate(['/login']);
  }

}
