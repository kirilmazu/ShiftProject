import { Component, OnInit } from '@angular/core';
import { NotificationItem } from '../notification-item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  notificationItems: Array<NotificationItem>;

  constructor() {
    this.notificationItems = [
      new NotificationItem("../assets/notification.png", "New shift", "this is message about new shift"),
      new NotificationItem("../assets/calendar 2.png", "New week", "Pleas fill the next week request")
    ]
   }

  ngOnInit(): void {
  }

  

}


