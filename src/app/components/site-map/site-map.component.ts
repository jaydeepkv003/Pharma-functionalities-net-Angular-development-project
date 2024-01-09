import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { MessageService } from '../../_services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.scss']
})
export class SiteMapComponent implements OnInit, OnDestroy {

  @Input() rendering: ComponentRendering;
  topMenus : any[] = [];
  messageSubscription: Subscription;

  constructor(public messageService : MessageService) { }

  ngOnInit() {
    this.messageSubscription = this.messageService.getMessage().subscribe((data) => {
      if(data && data.topMenus){
        this.topMenus = data.topMenus;
        this.sortMenu(this.topMenus);
      }
    });
  }

  sortMenu(data: any) {
    data.forEach((item: any) => {
      if (item.children && item.children.length) {
        this.sortMenu(item.children);
      }
    });

    return data.sort((a, b) => a.orderNumber.value.localeCompare(b.orderNumber.value));
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
