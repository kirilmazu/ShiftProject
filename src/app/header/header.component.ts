import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName = "My name";
  constructor() { }

  ngOnInit(): void {
  }

  logOut(): void{
      alert("Logout");
  }

  userClick():void{
    alert("user");
  }

  
}