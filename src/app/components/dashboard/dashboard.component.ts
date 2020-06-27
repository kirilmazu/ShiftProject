import { Component, OnInit } from '@angular/core';
import { NotificationItem } from 'src/app/objects/notification-item';
import { SheredData } from 'src/app/shered-data';
import { NotificationService } from 'src/app/services/notificatnotification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //list of all events to show in the dashboard 
  notificationItems: Array<NotificationItem>;

  constructor(private notifications:NotificationService) {
  }

  ngOnInit(): void {
    this.notificationItems = this.getNotifications();
    console.log(this.notificationItems);
  }

  getNotifications():Array<NotificationItem>{
    if(SheredData.notifications == (null || undefined)){
      //TODO: wait to finish
      this.notifications.getNotifications();
    }
    return SheredData.notifications;
  }
}