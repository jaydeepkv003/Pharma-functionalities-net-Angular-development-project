import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { JssContextService } from '../../jss-context.service';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { JssGraphQLService } from '../../jss-graphql.service';
import { WEBINAR_LIST_QUERY, MASTER_LIST_QUERY } from './webinar-tab.graphql';
import { TEMPLATE, TEMPLATE_PATH_QUERY } from '../../models/constants';
import { SharedService } from '../../_services/shared.service';

@Component({
  selector: 'app-webinar-tab',
  templateUrl: './webinar-tab.component.html',
  styleUrls: ['./webinar-tab.component.scss']
})
export class WebinarTabComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  query$: Observable<ApolloQueryResult<any>>;
  masterQuery$: Observable<ApolloQueryResult<any>>;
  TEMPLATE_NAME = TEMPLATE.NAME;
  private querySubscription: Subscription;
  private masterQuerySubscription: Subscription;

  siteCoreItemId: string;
  templateName: string;
  heading: any = "";
  featuredWebinars: any = [];
  pageSize: number = 0;
  webinarsCollection: any = [];
  masterCollection = {
    industriesCollection: [],
    _industriesCollection: [],
    techniquesCollection: [],
    _techniquesCollection: [],
    brandsCollection: [],
    _brandsCollection: []
  };
  filterCluase: string = "";
  filter: any[] = [];
  selectedIndustry: string = null;
  selectedTechnique: string = null;
  selectedBrand: string = null;
  isTypeReload: boolean = false;
  isTitleReload: boolean = false;
  isLoading: boolean = false;

  private contextSubscription: Subscription;

  constructor(private jssContext: JssContextService,
    private sharedService: SharedService,
    private graphQLService: JssGraphQLService) { }

  ngOnInit() {
    console.log('Webinar Tab', this.rendering);
    let origin = '';
    if (window.location.origin.indexOf('localhost') > -1) {
      origin = 'https://dev.phenpreview2.com';
    }

    this.masterQuery$ = this.graphQLService.query({
      query: MASTER_LIST_QUERY,
      variables: TEMPLATE_PATH_QUERY
    });

    this.masterQuerySubscription = this.masterQuery$.subscribe(res => {
      this.masterCollection.industriesCollection = res.data.industries.results.items.filter(d => d.item !== null);
      this.masterCollection.techniquesCollection = res.data.techniques.results.items.filter(d => d.item !== null);
      this.masterCollection.brandsCollection = res.data.brands.results.items.filter(d => d.item !== null);
    }, err => {
      console.log(err);
    });

    this.contextSubscription = this.jssContext.state.subscribe((state) => {

      this.featuredWebinars = this.rendering.fields.featuredWebinars || [];
      this.featuredWebinars.forEach(webinar => {
        if (webinar.coverphoto) {
          webinar.coverphoto = origin + webinar.coverphoto;
        }
      });

      this.siteCoreItemId = state.sitecore.route.itemId.toLowerCase().replace(/-/g, '');
      this.templateName = state.sitecore.route.templateName;
      this.heading = state.sitecore.route.fields.heading.value;

      this.filterTable();
    });

  }

  clearFilter() {
    this.selectedIndustry = null;
    this.selectedTechnique = null;
    this.selectedBrand = null;
    this.pageSize = 0;
    this.filterTable();
  }

  filterTable() {
    this.filter = [
      { name: "_fullpath", value: TEMPLATE_PATH_QUERY.webinarsListPath },
      { name: "_templatename", value: "MarkupWebinarSingle" },
      { name: TEMPLATE.TYPE[this.templateName], value: this.siteCoreItemId },
    ];

    if (this.selectedIndustry) {
      this.filter.push({ name: "industryList", value: this.selectedIndustry });
    }

    if (this.selectedBrand) {
      this.filter.push({ name: "brandsList", value: this.selectedBrand });
    }

    if (this.selectedTechnique) {
      this.filter.push({ name: "techniquesList", value: this.selectedTechnique });
    }

    this.query$ = this.graphQLService.query({
      query: WEBINAR_LIST_QUERY,
      variables: { 'brandItemId': this.siteCoreItemId, 'filterCluase': this.filter }
    });

    this.isLoading = true;
    this.sharedService.startLoader('loader-menu');
    this.querySubscription = this.query$.subscribe(res => {
      this.sharedService.stopLoader('loader-menu');
      this.isLoading = false;
      this.webinarsCollection = res.data.search.results.items.filter(x => x.item && x.item.id);
      this.showMore();
      this.updateFilterByWebinarResults();
    }, err => {
      this.sharedService.stopLoader('loader-menu');
      this.isLoading = false;
      console.log(err);
    });
  }

  showMore() {
    if (this.webinarsCollection.length > this.pageSize) {
      if (this.webinarsCollection.length > this.pageSize + 10) {
        this.pageSize += 10;
      } else {
        this.pageSize = this.webinarsCollection.length;
      }
    }
  }

  updateFilterByWebinarResults() {
    this.masterCollection._industriesCollection = [];
    this.masterCollection._techniquesCollection = [];
    this.masterCollection._brandsCollection = [];

    if (this.webinarsCollection.length === 0) { return; }

    const uniqueTechniques = [];
    const uniqueIndustries = [];
    const uniqueBarnds = [];

    this.webinarsCollection.forEach(webinar => {

      // techniques Collection
      webinar.item.techniquesList.targetItems.forEach(item => {
        if (uniqueTechniques.indexOf(item.id) === -1) {
          uniqueTechniques.push(item.id);
          const foundItem = this.masterCollection.techniquesCollection.find(x => x.item.id === item.id);
          if (foundItem) {
            this.masterCollection._techniquesCollection.push(foundItem);
          }
        }
      });

      // industries Collection
      webinar.item.industryList.targetItems.forEach(item => {
        if (uniqueIndustries.indexOf(item.id) === -1) {
          uniqueIndustries.push(item.id);
          const foundItem = this.masterCollection.industriesCollection.find(x => x.item.id === item.id);
          if (foundItem) {
            this.masterCollection._industriesCollection.push(foundItem);
          }
        }
      });

      // barnds Collection
      webinar.item.brandsList.targetItems.forEach(item => {
        if (uniqueBarnds.indexOf(item.id) === -1) {
          uniqueBarnds.push(item.id);
          const foundItem = this.masterCollection.brandsCollection.find(x => x.item.id === item.id);
          if (foundItem) {
            this.masterCollection._brandsCollection.push(foundItem);
          }
        }
      });

    });
  }

  ChangeIcon(type: string) {
    if (type === '' && this.isTypeReload == false) {
      this.isTypeReload = true;
      this.isTitleReload = false;
    }
    if (type != '' && this.isTitleReload == false) {
      this.isTitleReload = true;
      this.isTypeReload = false;
    }
  }

  ngOnDestroy() {
    if (this.contextSubscription)
      this.contextSubscription.unsubscribe();
    if (this.querySubscription)
      this.querySubscription.unsubscribe();
    if (this.masterQuerySubscription)
      this.masterQuerySubscription.unsubscribe();
  }
}
