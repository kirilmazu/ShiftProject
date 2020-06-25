import { Component, OnInit } from '@angular/core';
import { NotificationItem } from 'src/app/notification-item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //list of all events to show in the dashboard 
  notificationItems: Array<NotificationItem>;

  constructor() {
  }

  ngOnInit(): void {
    this.notificationItems = this.getNotifications();
  }

  getNotifications():Array<NotificationItem>{
    //TODO: get all notifications for this user from the data base.
    //TODO: remove, this data it for test only.
      return [
        new NotificationItem("../assets/notification.png", "New shift", "this is message about new shift"),
        new NotificationItem("../assets/calendar 2.png", "New week", "Pleas fill the next week request")
      ]
  }
}