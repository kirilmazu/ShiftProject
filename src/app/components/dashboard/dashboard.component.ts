import { Component, OnInit } from '@angular/core';
import { NotificationItem } from 'src/app/objects/notification-item';
import { NotificationService } from 'src/app/services/notificatnotification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //list of all events to show in the dashboard 
  notificationItems: Array<NotificationItem>;

  getFinish:boolean;

  constructor(private notifications:NotificationService) {
    this.getFinish = false;
  }

  ngOnInit(): void {
    //get notification from the server
    this.getNotifications();
  }

  getNotifications():void{
    this.getFinish = false;
    this.notifications.getNotifications().subscribe(results => {
      var notifications: Array<NotificationItem> = [];
      for (var res in results) {
        var jResult = JSON.parse(JSON.stringify(results[res]));
        notifications.push(new NotificationItem(jResult['IconPath'], jResult['header'], jResult['body']));
      }
      //if empty add no notification message
      if(notifications.length < 1) notifications.push(new NotificationItem("../assets/notification.png", "Is no new notifications for you.", ""));
      else this.notificationItems = notifications;
      
      this.getFinish = true;
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      }
      else {
        console.log("Server-side error occured.");
      }
    });
  }
}