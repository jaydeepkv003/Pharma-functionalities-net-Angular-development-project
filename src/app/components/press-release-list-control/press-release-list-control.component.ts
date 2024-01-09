import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Field, ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { environment } from '../../../environments/environment';
import { Subscription, Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { PRESS_RELEASE_LIST_QUERY } from './press-release-list-control.graphql';
import { JssGraphQLService } from '../../jss-graphql.service';
import { SharedService } from '../../_services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-press-release-list-control',
  templateUrl: './press-release-list-control.component.html',
  styleUrls: ['./press-release-list-control.component.scss']
})
export class PressReleaseListControlComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  query$: Observable<ApolloQueryResult<any>>;
  private contextSubscription: Subscription;

  contextFields: { [name: string]: Field };
  isEditing = false;
  filterCluase: any[] = [];
  currentYear = "";
  currentHostName: string = environment.sitecoreApiHost;
  pressReleaseList: any[] = [];
  isLoaded: boolean = false;

  constructor(
    private router: Router,
    private graphQLService: JssGraphQLService,
    private sharedService: SharedService) { }

  ngOnInit() {
    console.log('press-release-list-control', this.rendering);
    this.sharedService.startLoader();
    this.pressReleaseList = [];
    this.currentYear = this.rendering.fields.year['value'];

    this.filterCluase = [
      { name: '_fullpath', value: `/sitecore/content/Sandbox/phrjss/home/News/Press-Release/*` },
      { name: '_templatename', value: 'PressReleaseSingle' },
    ];

    this.query$ = this.graphQLService.query({
      query: PRESS_RELEASE_LIST_QUERY,
      variables: {
        filterCluase: this.filterCluase
      },
    });

    this.contextSubscription = this.query$.subscribe(res => {
      this.isLoaded = true;
      this.sharedService.stopLoader();
      if (res.data.search.results.items && res.data.search.results.items.length) {
        this.pressReleaseList = (res.data.search.results.items as any[]).filter(x => x.item.parent.name === this.currentYear);
      }
    }, err => {
      this.isLoaded = true;
      this.sharedService.stopLoader();
      console.log(err);
    });
  }

  gotoLink(link) {
    if (link.linktype === 'external') {
      if (link.target === '_blank') {
        window.open(link.url, link.target);
      } else {
        window.location.href = link.url;
      }
    } else {
      this.router.navigateByUrl(link.url);
    }
  }

  ngOnDestroy() {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
  }
}
