import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { JssContextService } from '../../jss-context.service';
import { Subscription } from 'rxjs';

import { ApolloQueryResult } from 'apollo-client';
import { JssGraphQLService } from '../../jss-graphql.service';
import { PRODUCT_FINDER_QUERY } from './product-finder-tab.graphql';
import { Observable } from 'rxjs';
import { TEMPLATE } from '../../models/constants';
import { SharedService } from '../../_services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-finder-tab',
  templateUrl: './product-finder-tab.component.html',
  styleUrls: ['./product-finder-tab.component.scss']
})
export class ProductFinderTabComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  query$: Observable<ApolloQueryResult<any>>;
  heading: any;
  name: string;
  templateName: string;
  tabs: any[] = [];
  activeTab: any;
  serverRoute: string;
  cindex: number = 0;
  selectedIndex: number = 0;

  isEditing = false;
  private contextSubscription: Subscription;
  private querySubscription: Subscription;

  constructor(
    private jssContext: JssContextService,
    private sharedService: SharedService,
    private graphQLService: JssGraphQLService,
    private router: Router
  ) { }

  ngOnInit() {
    this.contextSubscription = this.jssContext.state.subscribe((state) => {
      this.serverRoute = state.serverRoute.split("?")[0];
      this.isEditing = state.sitecore && state.sitecore.context.pageEditing;
      this.heading = state.sitecore.route.fields.heading.value;
      this.name = state.sitecore.route.name;
      this.templateName = state.sitecore.route.templateName;
      this.load();
    });
  }

  load() {
    if (!this.serverRoute) {
      this.serverRoute = `/${TEMPLATE.FOLDER_NAME[this.templateName]}/${this.name}`;
    }
    let path = `/sitecore/content/Sandbox/phrjss/home${this.serverRoute}/Page Components/Product Finder`;
    console.log('Product Finder Path', path);
    this.query$ = this.graphQLService.query({
      query: PRODUCT_FINDER_QUERY,
      variables: {
        path: path,
      },
    });

    this.sharedService.startLoader('loader-menu');
    this.querySubscription = this.query$.subscribe(
      (res) => {
        this.sharedService.stopLoader('loader-menu');
        if (res.data.item) {
          this.tabs = res.data.item.children;
          this.tabs.forEach(tab => {
            tab.state = 'right';
          });
          this.tabs[0].state = 'active';
          this.activeTab = this.tabs[0];
        }
      },
      (err) => {
        this.sharedService.stopLoader('loader-menu');
        console.log(err);
      }
    );
  }

  gotoLink(link) {
    if (link.linkType === 'external') {
      if (link.target === '_blank') {
        window.open(link.url, link.target);
      } else {
        window.location.href = link.url;
      }
    } else {
      this.router.navigateByUrl(link.url);
    }
  }

  selectTab(index: number) {
    if (this.cindex > index) {
      this.tabs[this.cindex].state = 'right';
      this.cindex = this.cindex - 1;
      this.tabs[this.cindex].state = 'active';
      this.activeTab = this.tabs[this.cindex];
      this.selectTab(index);
    } else if (this.cindex < index) {
      this.tabs[this.cindex].state = 'left';
      this.cindex = this.cindex + 1;
      this.tabs[this.cindex].state = 'active';
      this.activeTab = this.tabs[this.cindex];
      this.selectTab(index);
    } else {
      setTimeout(() => {
        this.selectedIndex = index;
      }, 600);
    }
  }

  ngOnDestroy() {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
