import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { Subscription } from 'rxjs';
import { PaginatorModel } from '../../models/common-models';
import { PaginationService } from '../../_services/pagination.service';
import { NOT_FOUND_URL } from '../../models/constants';
import { MessageService } from '../../_services/message.service';
import { QuickorderService } from './../../_services/quickorder.service';
import { SharedService } from './../../_services/shared.service';

@Component({
  selector: 'app-quick-order',
  templateUrl: './quick-order.component.html',
  styleUrls: ['./quick-order.component.scss'],
})
export class QuickOrderComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  messageSubscription$: Subscription;

  activeTab = 'search';
  tabs: string[] = ['search', 'upload order'];
  private amsSubscription: Subscription;
  paginatorConfig: PaginatorModel;

  constructor(
    private quickorderService: QuickorderService,
    private activatedRoute: ActivatedRoute,
    public sharedService: SharedService,
    private messageService: MessageService,
    private pageService: PaginationService,
    public router: Router) {
    this.onGetParam();
  }

  async ngOnInit(): Promise<void> {
    this.paginatorConfig = await this.pageService.preparePagination(this.rendering);
    this.quickorderService.Pagination.PageSize = this.paginatorConfig.recordsPerPage;
    if (this.sharedService.feature.QuickOrder === false) {
      window.location.href = NOT_FOUND_URL;
    }
    this.messageSubscription$ = this.messageService.getMessage().subscribe(
      (msg) => {
        if (msg && msg.featureAmsLoaded) {
          if (this.sharedService.feature.QuickOrder === false) {
            window.location.href = NOT_FOUND_URL;
          }
        }
      },
      (err) => { });
  }

  onTabChange(tab: string): void {
    this.activeTab = tab;
  }

  onGetParam() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params && params.tab) {
        this.activeTab = params.tab;
      }
    });
  }

  ngOnDestroy() {
    this.quickorderService.onReset();
    if (this.amsSubscription) {
      this.amsSubscription.unsubscribe();
    }
  }
}
