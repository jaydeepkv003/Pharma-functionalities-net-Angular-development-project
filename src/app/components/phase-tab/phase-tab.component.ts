import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { BrandService } from '../../api/phr-webapi/services';
import { TranslateService } from '@ngx-translate/core';
import { ApolloQueryResult } from 'apollo-client';
import { JssContextService } from '../../jss-context.service';
import { Observable, Subscription } from 'rxjs';
import { NO_IMAGE, TEMPLATE } from '../../models/constants';
import { JssGraphQLService } from '../../jss-graphql.service';
import { PHASE_COLLECTION_BY_PHASEID } from './phase-tab.graphql';
import { SharedService } from '../../_services/shared.service';
import { MessageService } from '../../_services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phase-tab',
  templateUrl: './phase-tab.component.html',
  styleUrls: ['./phase-tab.component.scss']
})
export class PhaseTabComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  TEMPLATE_NAME = TEMPLATE.NAME;
  query$: Observable<ApolloQueryResult<any>>;
  private contextSubscription: Subscription;
  private querySubscription: Subscription;
  templateName: string;
  name: string;
  siteCoreItemId: string;
  activeIds: string[] = [];
  noImageUrl: string = NO_IMAGE;

  public brandId: number;
  public phaseObject: Array<any> = [];
  public gridAttributeNames: Array<string> = [];
  public selectedPhases: Array<number> = [];
  public phaseCollection: any = [];
  public phaseDetails: any = [];
  public phaseURL = "";
  public isLoading: boolean = false;

  constructor(private jssContext: JssContextService,
    private brandService: BrandService,
    public translate: TranslateService,
    private graphQLService: JssGraphQLService,
    private sharedService: SharedService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.contextSubscription = this.jssContext.state.subscribe((state) => {

      this.siteCoreItemId = state.sitecore.route.itemId.toLowerCase().replace(/-/g, '');
      this.brandId = state.sitecore.route.fields.brandId.value as number;
      //this.techniqueId = state.sitecore.route.fields.techniqueId.value as number;
      this.name = state.sitecore.route.name;
      this.templateName = state.sitecore.route.templateName;

      this.getPhase();
    });
  }

  public getPhase() {
    this.isLoading = true;
    this.sharedService.startLoader('loader-menu');
    this.brandService.v12BrandBrandIdPhasesGet({ brandID: this.brandId }).subscribe(res => {
      this.sharedService.stopLoader('loader-menu');
      this.isLoading = false;
      this.phaseObject = res;
      this.activeIds = [];
      this.phaseObject.forEach((f, i) => {
        this.activeIds.push('static-' + i);
        f.Phases.forEach(element => {
          this.query$ = this.graphQLService.query({
            query: PHASE_COLLECTION_BY_PHASEID,
            variables: { productsPath: "/sitecore/content/Sandbox/phrjss/home/Products", phaseId: element.PhaseID.toString() }
          });

          this.querySubscription = this.query$.subscribe(res => {
            this.phaseDetails = res.data.search.results.items;
            if (this.phaseDetails.length == 1) {
              element.phaseURL = this.phaseDetails[0].path.replace("/sitecore/content/sandbox/phrjss/home", '');
            }

          }, err => {
            this.isLoading = false;
            console.log(err);
          })
        });
      });

      this.getAttributeNames();
      this.messageService.sendMessage({ checkForTabScroll: true });

    }, err => {
      this.sharedService.stopLoader('loader-menu');
      this.isLoading = false;
    });
  }
  public sortBy(array: any[]) {
    if (!isNaN(parseFloat(array[0]))) {
      return array.sort((a, b) => parseFloat(a) - parseFloat(b));
    } else {
      return array;
    }
  }

  public getAttributeNames() {
    for (let attr of this.phaseObject[0].Phases[0].Attributes) {
      this.gridAttributeNames.push(attr.AttributeName);
    }
  }

  public getAttributeValue(attr: any, attributeID: number) {
    if (attr && attributeID) {
      const data = attr.find(d => d.AttributeID === attributeID);
      if (data && data.Values) {
        return this.sortBy(data.Values).join(', ');
      }
      return '-';
    } else {
      return '-';
    }
  }

  public gotoPhase(phaseUrl: string) {
    if (phaseUrl) {
      this.router.navigateByUrl(phaseUrl);
    }
  }

  ngOnDestroy() {
    if (this.contextSubscription)
      this.contextSubscription.unsubscribe();
    if (this.querySubscription)
      this.querySubscription.unsubscribe();
  }
}
