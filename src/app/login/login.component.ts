import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;

  constructor(private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
  }

  login():void{
    this.router.navigate(['/main']);
  }

  goToRegister(): void{
    this.router.navigate(['/register']);
  }

}
