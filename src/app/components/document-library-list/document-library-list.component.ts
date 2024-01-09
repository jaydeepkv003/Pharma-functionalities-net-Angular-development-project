import { Component, Input, OnInit } from '@angular/core';
import { ComponentRendering, Field } from '@sitecore-jss/sitecore-jss-angular';
import { ApolloQueryResult } from 'apollo-client';
import { Observable, Subscription } from 'rxjs';
import { PaginatorModel } from '../../models/common-models';
import { PaginationService } from '../../_services/pagination.service';
import { environment } from '../../../environments/environment';
import { JssGraphQLService } from '../../jss-graphql.service';
import { TEMPLATE_PATH_QUERY } from '../../models/constants';
import { SharedService } from '../../_services/shared.service';
import {
  DOCUMENT_LIST_QUERY,
  MASTER_LIST_QUERY,
} from './document-library-list.graphql';
import { JssContextService } from '../../jss-context.service';

@Component({
  selector: 'app-document-library-list',
  templateUrl: './document-library-list.component.html',
  styleUrls: ['./document-library-list.component.scss'],
})
export class DocumentLibraryListComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  query$: Observable<ApolloQueryResult<any>>;
  private contextSubscription: Subscription;

  contextFields: { [name: string]: Field };
  masterCollection = {
    industriesCollection: [],
    _industriesCollection: [],
    techniquesCollection: [],
    _techniquesCollection: [],
    brandsCollection: [],
    _brandsCollection: [],
    separationModesCollection: [],
    _separationModesCollection: [],
    documentTypesCollection: [],
    _documentTypesCollection: [],
  };
  filterCluase: any[] = [];
  docsCollection: any[] = [];
  selectedIndustry: any = null;
  selectedTechnique: any = null;
  selectedSeparationMode: any = null;
  selectedBrand: any = null;
  selectedDocumentType: any = null;
  selectedOrder: any = 'Ascending';
  searchKeyword = '';
  paginatorConfig: PaginatorModel;
  isLoaded: boolean = false;
  currentHostName: string = environment.sitecoreApiHost;

  constructor(
    private graphQLService: JssGraphQLService,
    private sharedService: SharedService,
    private jssContext: JssContextService,
    private pageService: PaginationService
  ) { }

  ngOnInit() {
    this.contextSubscription = this.jssContext.state.subscribe((state) => {
      this.paginatorConfig = this.pageService.preparePagination(state.sitecore.route);

      this.query$ = this.graphQLService.query({
        query: MASTER_LIST_QUERY,
        variables: TEMPLATE_PATH_QUERY,
      });
      this.query$.subscribe(
        (res) => {
          this.masterCollection.industriesCollection =
            res.data.industries.results.items.filter(d => d.item !== null);
          this.masterCollection.techniquesCollection =
            res.data.techniques.results.items.filter(d => d.item !== null);
          this.masterCollection.brandsCollection =
            res.data.brands.results.items.filter(d => d.item !== null);
          this.masterCollection.separationModesCollection =
            res.data.separationmodes.children.filter(d => d.title !== null && d.id !== null);
          this.masterCollection.documentTypesCollection =
            res.data.documenttypes.children.filter(d => d.title !== null && d.id !== null);

            this.filterTable();
          },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  resetFilters() {
    this.selectedIndustry = null;
    this.selectedTechnique = null;
    this.selectedSeparationMode = null;
    this.selectedBrand = null;
    this.selectedDocumentType = null;
    this.searchKeyword = '';
    this.filterTable();
  }

  filterTable() {
    this.isLoaded = false;
    this.docsCollection = [];
    this.filterCluase = [
      { name: '_fullpath', value: TEMPLATE_PATH_QUERY.documentsListPath },
      { name: '_templatename', value: 'Document' },
    ];

    if (this.selectedIndustry) {
      this.filterCluase.push({
        name: 'industryList',
        value: this.selectedIndustry,
      });
    }

    if (this.selectedTechnique) {
      this.filterCluase.push({
        name: 'techniquesList',
        value: this.selectedTechnique,
      });
    }

    if (this.selectedSeparationMode) {
      this.filterCluase.push({
        name: 'separationModeList',
        value: this.selectedSeparationMode,
      });
    }

    if (this.selectedBrand) {
      this.filterCluase.push({ name: 'brandsList', value: this.selectedBrand });
    }

    if (this.selectedDocumentType) {
      this.filterCluase.push({
        name: 'documentTypeList',
        value: this.selectedDocumentType,
      });
    }

    this.query$ = this.graphQLService.query({
      query: DOCUMENT_LIST_QUERY,
      variables: {
        filterCluase: this.filterCluase,
        keyword: this.searchKeyword,
      },
    });

    this.sharedService.startLoader();
    this.query$.subscribe(
      (res) => {
        this.isLoaded = true;
        this.sharedService.stopLoader();
        if (res.data.search.results.items && res.data.search.results.items.length) {
          this.docsCollection = res.data.search.results.items.filter(d => d.item && d.item.doclink);
          this.docsCollection.forEach((doc) => {
            doc.item.doclink.src =
              this.currentHostName + '/-/jssmedia/phrjss' + doc.item.doclink.url;
          });
          if (this.selectedOrder === 'Ascending') {
            this.docsCollection.sort((a, b) =>
              a.item.title.value > b.item.title.value
                ? 1
                : b.item.title.value > a.item.title.value
                  ? -1
                  : 0
            );
          } else {
            this.docsCollection.sort((a, b) =>
              a.item.title.value < b.item.title.value
                ? 1
                : b.item.title.value < a.item.title.value
                  ? -1
                  : 0
            );
          }
        }
        this.updateFilterByDocumentResults();
      },
      (err) => {
        this.isLoaded = true;
        this.sharedService.stopLoader();
        console.log(err);
      }
    );
  }

  showMore() {
    if (this.docsCollection.length > this.paginatorConfig.recordsPerPage) {
      if (this.docsCollection.length > this.paginatorConfig.recordsPerPage + this.paginatorConfig.defaultRecordsPerPage) {
        this.paginatorConfig.recordsPerPage += this.paginatorConfig.defaultRecordsPerPage;
      } else {
        this.paginatorConfig.recordsPerPage = this.docsCollection.length;
      }
    }
  }

  updateFilterByDocumentResults() {
    this.masterCollection._brandsCollection = [];
    this.masterCollection._documentTypesCollection = [];
    this.masterCollection._industriesCollection = [];
    this.masterCollection._separationModesCollection = [];
    this.masterCollection._techniquesCollection = [];

    if (this.docsCollection.length === 0) {
      return;
    }

    let uniqueDocumentTypes = [];
    let uniqueTechniques = [];
    let uniqueIndustries = [];
    let uniqueSeperationModes = [];
    let uniqueBrands = [];
    this.docsCollection.forEach(document => {
      // document type
      document.item.documentTypeList.targetItems.forEach(item => {
        if (uniqueDocumentTypes.indexOf(item.id) === -1) {
          uniqueDocumentTypes.push(item.id);
          let foundItem = this.masterCollection.documentTypesCollection.find(x => x.id === item.id);
          if (foundItem)
            this.masterCollection._documentTypesCollection.push(foundItem);
        }
      });

      // techniques Collection
      document.item.techniquesList.targetItems.forEach(item => {
        if (uniqueTechniques.indexOf(item.id) === -1) {
          uniqueTechniques.push(item.id);
          let foundItem = this.masterCollection.techniquesCollection.find(x => x.item.id === item.id);
          if (foundItem)
            this.masterCollection._techniquesCollection.push(foundItem);
        }
      });

      // industries Collection
      document.item.industryList.targetItems.forEach(item => {
        if (uniqueIndustries.indexOf(item.id) === -1) {
          uniqueIndustries.push(item.id);
          let foundItem = this.masterCollection.industriesCollection.find(x => x.item.id === item.id);
          if (foundItem)
            this.masterCollection._industriesCollection.push(foundItem);
        }
      });

      // separationModes Collection
      document.item.separationModeList.targetItems.forEach(item => {
        if (uniqueSeperationModes.indexOf(item.id) === -1) {
          uniqueSeperationModes.push(item.id);
          let foundItem = this.masterCollection.separationModesCollection.find(x => x.id === item.id);
          if (foundItem)
            this.masterCollection._separationModesCollection.push(foundItem);
        }
      });

      // Brands Collection
      document.item.brandsList.targetItems.forEach(item => {
        if (uniqueBrands.indexOf(item.id) === -1) {
          uniqueBrands.push(item.id);
          let foundItem = this.masterCollection.brandsCollection.find(x => x.item.id === item.id);
          if (foundItem)
            this.masterCollection._brandsCollection.push(foundItem);
        }
      });

    });
  }

  ngOnDestroy() {
    this.sharedService.stopLoader();
    if (this.contextSubscription)
      this.contextSubscription.unsubscribe();
  }
}
