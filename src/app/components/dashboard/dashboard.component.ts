import { Component, OnInit } from '@angular/core';
import { NotificationItem } from 'src/app/objects/notification-item';
import { SheredData } from 'src/app/shered-data';

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
    console.log(this.notificationItems);
  }

  getNotifications():Array<NotificationItem>{
    return SheredData.notifications;
  }
}