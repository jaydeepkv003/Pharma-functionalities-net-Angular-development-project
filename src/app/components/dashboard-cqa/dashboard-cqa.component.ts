import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { Subscription } from 'rxjs';
import { NOT_FOUND_URL } from '../../models/constants';
import { CqaService } from '../../_services/cqa.service';
import { MessageService } from '../../_services/message.service';
import { SharedService } from '../../_services/shared.service';
import { AuthService } from '../_core/auth.service';

@Component({
  selector: 'app-dashboard-cqa',
  templateUrl: './dashboard-cqa.component.html',
  styleUrls: ['./dashboard-cqa.component.scss']
})
export class DashboardCqaComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  messageSubscription$: Subscription;

  activeTab = 'LC/SPE';
  tabs: string[] = ['LC/SPE', 'ROQ QUECHERS'];

  constructor(public sharedService: SharedService,
    private messageService: MessageService,
    private authService: AuthService,
    private cqaService: CqaService) {
  }

  ngOnInit() {
    if (this.sharedService.feature.CQA_CofA === false && !this.authService.hasValidToken()) {
      window.location.href = NOT_FOUND_URL;
    }
    this.messageSubscription$ = this.messageService.getMessage()
      .subscribe(msg => {
        if (msg && msg.featureAmsLoaded) {
          if (this.sharedService.feature.CQA_CofA === false && !this.authService.hasValidToken()) {
            window.location.href = NOT_FOUND_URL;
          }
        }
      }, err => {
      });
    if (this.authService.hasValidToken()) {
      this.cqaService.getCertificateHistory(true);
    }
  }

  onTabChange(tab: string): void {
    this.activeTab = tab;
  }

  ngOnDestroy(): void {
    if (this.messageSubscription$) {
      this.messageSubscription$.unsubscribe();
    }
    this.cqaService.onReset();
  }

}
