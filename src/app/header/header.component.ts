import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName = "My name";
  constructor(private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
  }

  logOut(): void{
      alert("Logout");
      /*loguot*/
      this.router.navigate(['/login']);
  }

  userClick():void{
    alert("user");
  }

  
}