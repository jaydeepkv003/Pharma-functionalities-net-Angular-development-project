import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { JssContextService } from '../../jss-context.service';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { JssGraphQLService } from '../../jss-graphql.service';
import { DOCUMENT_COLLECTION_BY_BRANDID, MASTER_LIST_QUERY } from './document-tab.graphql';
import { TEMPLATE, TEMPLATE_PATH_QUERY } from '../../models/constants';
import { SharedService } from '../../_services/shared.service';


@Component({
  selector: 'app-document-tab',
  templateUrl: './document-tab.component.html',
  styleUrls: ['./document-tab.component.scss']
})
export class DocumentTabComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  query$: Observable<ApolloQueryResult<any>>;
  private contextSubscription: Subscription;
  private querySubscription: Subscription;
  private featurDocumentQuerySubscription: Subscription;
  siteCoreItemId: string;
  templateName: string;
  techniqueId: number;
  brandId: number;
  heading: any;
  siteCoreItemID: string;
  pageSize: number = 0;
  selectedDocType: any = null;
  featuredDocuments: any = [];
  documents: any[] = [];
  documentTypes: any[] = [];
  filteredDocumentTypes: any[] = [];
  filter: any[] = [];
  isTypeReload: boolean = false;
  isTitleReload: boolean = false;
  isLoading: boolean = false;

  constructor(private jssContext: JssContextService,
    private sharedService: SharedService,
    private graphQLService: JssGraphQLService) { }

  ngOnInit() {

    this.contextSubscription = this.jssContext.state.subscribe((state) => {
      this.siteCoreItemId = state.sitecore.route.itemId.toLowerCase().replace(/-/g, '');
      this.siteCoreItemID = state.sitecore.route.itemId;
      this.brandId = state.sitecore.route.fields.brandId.value as number;
      this.templateName = state.sitecore.route.templateName;
      this.techniqueId = state.sitecore.route.fields.techniqueId.value as number;
      this.heading = state.sitecore.route.fields.heading.value;

      this.filterTable();
    });

    this.loadDropdownData();
    this.featuredDocuments = this.rendering.fields.featuredDocuments;

    let origin = window.location.origin;
    if (origin.indexOf('localhost') > -1) {
      origin = 'https://dev.phenpreview2.com';
    }
    this.featuredDocuments.forEach(listItem => {
      if (listItem.doclink) {
        if (listItem.doclink.indexOf('/media/phrjss/') > -1) {
          listItem.doclink = origin + listItem.doclink;
        }
        else {
          listItem.doclink = origin + '/-/media/phrjss' + listItem.doclink;
        }

        listItem.doclink = listItem.doclink.replace('/sitecore/media-library/phrjss', '');
      }
    });
  }

  loadDropdownData() {
    this.query$ = this.graphQLService.query({
      query: MASTER_LIST_QUERY,
      variables: TEMPLATE_PATH_QUERY
    });

    this.querySubscription = this.query$.subscribe(res => {
      this.documentTypes = res.data.documenttypes.children.filter(d => d.id !== null && d.title !== null);
      this.updateFilterByDocumentResults();
    }, err => {
      console.log(err);
    });
  }

  filterTable() {
    this.filter = [
      { name: "_fullpath", value: TEMPLATE_PATH_QUERY.documentsListPath },
      { name: TEMPLATE.TYPE[this.templateName], value: this.siteCoreItemId },
    ];
    if (this.selectedDocType) {
      this.filter.push({ name: "documentTypeList", value: this.selectedDocType });
    }
    this.query$ = this.graphQLService.query({
      query: DOCUMENT_COLLECTION_BY_BRANDID,
      variables: { filter: this.filter }
    });

    this.isLoading = true;
    this.sharedService.startLoader('loader-menu');
    this.query$.subscribe(res => {
      this.sharedService.stopLoader('loader-menu');
      this.isLoading = false;
      this.documents = res.data.search.results.items.filter(x => x.item && x.item.id);
      this.showMore();
    }, err => {
      this.sharedService.stopLoader('loader-menu');
      this.isLoading = false;
      console.log(err);
    })
  }

  updateFilterByDocumentResults() {
    this.filteredDocumentTypes = [];
    if (this.documents.length === 0) {
      return;
    }

    let uniqueDocumentTypes = [];
    this.documents.forEach(document => {
      document.item.documentTypeList.targetItems.forEach(item => {
        if (uniqueDocumentTypes.indexOf(item.id) === -1) {
          uniqueDocumentTypes.push(item.id);
          let foundItem = this.documentTypes.find(x => x.id === item.id);
          if (foundItem)
            this.filteredDocumentTypes.push(foundItem);
        }
      });
    });
  }

  showMore() {
    if (this.documents.length > this.pageSize) {
      if (this.documents.length > this.pageSize + 10) {
        this.pageSize += 10;
      } else {
        this.pageSize = this.documents.length;
      }
    }
  }

  clearFilter() {
    this.selectedDocType = null;
    this.pageSize = 0;
    this.filterTable();
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
    if (this.featurDocumentQuerySubscription)
      this.featurDocumentQuerySubscription.unsubscribe();
  }
}
