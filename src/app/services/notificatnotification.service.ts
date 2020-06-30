import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NotificationItem } from '../objects/notification-item';
import { SheredData } from '../shered-data';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseurl: string = "http://localhost:3000/notification";

  constructor(private httpClient : HttpClient) { }

  getNotifications(){
    return this.httpClient.get(this.baseurl + '/');
  }

  addNotification(notification:NotificationItem){
    this.httpClient.post(this.baseurl+'/addNotificationItem',{
      'ownerID': 0,
      'IconPath': notification.iconPath,
      'header': notification.header,
      'body': notification.body,
    }).subscribe(
      res => {
        console.log(res);
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
    });
  }
}