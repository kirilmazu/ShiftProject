export class NotificationItem {
    iconPath: string;
    header: string;
    body: string;

    constructor(iconPath: string, header:string, body:string){
        this.iconPath = iconPath;
        this.header = header;
        this.body = body;
    }
}
