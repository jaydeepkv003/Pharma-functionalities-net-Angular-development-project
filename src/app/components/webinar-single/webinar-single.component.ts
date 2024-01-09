import { Component, OnInit, Input } from '@angular/core';
import { Field, ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { Observable, Subscription } from 'rxjs';
import { JssContextService } from '../../jss-context.service';
import { ApolloQueryResult } from 'apollo-client';
import { JssGraphQLService } from '../../jss-graphql.service';
import { WEBINAR_DETAIL } from './webinar-single.graphql';
import { TEMPLATE_PATH_QUERY, PAGE_TYPE } from '../../models/constants';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../_services/shared.service';

@Component({
  selector: 'app-webinar-single',
  templateUrl: './webinar-single.component.html',
  styleUrls: ['./webinar-single.component.scss']
})
export class WebinarSingleComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  contextFields: { [name: string]: Field };
  private contextSubscription: Subscription;
  query$: Observable<ApolloQueryResult<any>>;
  webinarId: any;
  webinar: any = {};
  currentHostName: string = environment.sitecoreApiHost;
  PAGE_TYPE =  PAGE_TYPE;

  constructor(
    private jssContext: JssContextService,
    private graphQLService: JssGraphQLService,
    private route: ActivatedRoute,
    private sharedService: SharedService

  ) { }

  ngOnInit() {
    this.sharedService.startLoader();
    this.contextSubscription = this.jssContext.state.subscribe((state) => {
      this.contextFields = state.sitecore.route.fields;
      this.webinarId = state.sitecore.route.itemId as any;
      this.route.queryParams.subscribe(params => {
        this.query$ = this.graphQLService.query({
          query: WEBINAR_DETAIL,
          variables: Object.assign({}, { webinarId: this.webinarId }, TEMPLATE_PATH_QUERY)
        });
        this.query$.subscribe(res => {
          this.sharedService.stopLoader();
          this.webinar = res.data.search.results.items[0].item;
          this.webinar.coverphoto.src = this.currentHostName + '/-/jssmedia/phrjss' + this.webinar.coverphoto.src;
          console.log('Webinar', this.webinar);
        }, err => {
          this.sharedService.stopLoader();
          console.log(err);
        })
      }, err => {
        this.sharedService.stopLoader();
        console.log(err);
      });
    });
  }

  ngOnDestroy() {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
  }
}
