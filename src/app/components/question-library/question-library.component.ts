import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { JssContextService } from '../../jss-context.service';
import { Field, ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import {
  MASTER_LIST_QUERY,
  QUESTIONS_LIST_QUERY,
} from './question-library.graphql';
import { ApolloQueryResult } from 'apollo-client';
import { JssGraphQLService } from '../../jss-graphql.service';
import { Observable, Subscription } from 'rxjs';
import { TEMPLATE_PATH_QUERY } from '../../models/constants';
import { SharedService } from '../../_services/shared.service';
import { PaginationService } from '../../_services/pagination.service';
import { PaginatorModel } from '../../models/common-models';

@Component({
  selector: 'app-question-library',
  templateUrl: './question-library.component.html',
  styleUrls: ['./question-library.component.scss'],
})
export class QuestionLibraryComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  query$: Observable<ApolloQueryResult<any>>;
  private contextSubscription: Subscription;
  paginatorConfig: PaginatorModel;
  isLoading: boolean = false;

  selectedQueryIndex = null;
  selectedIndustry: any = null;
  selectedTechnique: any = null;
  selectedSeparationMode: any = null;
  selectedBrand: any = null;
  searchKeyword = '';
  _timeout: any = null;

  contextFields: { [name: string]: Field };
  quesCollection: any = [];
  quesFeatured: any = [];
  filterClause: any = [];
  masterCollection = {
    industriesCollection: [],
    _industriesCollection: [],
    techniquesCollection: [],
    _techniquesCollection: [],
    brandsCollection: [],
    _brandsCollection: [],
    separationModesCollection: [],
    _separationModesCollection: []
  };

  constructor(
    private jssContext: JssContextService,
    private graphQLService: JssGraphQLService,
    private sharedService: SharedService,
    private pageService: PaginationService
  ) { }

  ngOnInit() {
    this.paginatorConfig = this.pageService.preparePagination(this.rendering);

    // Load master data for filters
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
        this.masterCollection.brandsCollection = res.data.brands.results.items.filter(d => d.item !== null);
        this.masterCollection.separationModesCollection =
          res.data.separationmodes.children.filter(d => d.id !== null && d.title !== null);
      },
      (err) => {
        console.log(err);
      }
    );

    // load featured questions
    this.contextSubscription = this.jssContext.state.subscribe((state) => {
      this.contextFields = state.sitecore.route.fields;
      if (this.contextFields.questionList) {
        this.quesFeatured = this.contextFields.questionList;
      }
      this.filterData();
    });
  }

  search() {
    this._timeout = null;
    if (this._timeout) {
      // if there is already a timeout in process cancel it
      window.clearTimeout(this._timeout);
    }
    this._timeout = window.setTimeout(() => {
      this._timeout = null;
      this.filterData();
    }, 1000);
  }

  clearFilter() {
    this.selectedIndustry = null;
    this.selectedTechnique = null;
    this.selectedBrand = null;
    this.selectedSeparationMode = null;
    this.searchKeyword = '';
    this.filterData();
  }

  filterData() {
    this.paginatorConfig.recordsPerPage = 0;
    this.quesCollection = [];
    this.sharedService.startLoader();
    this.filterClause = [
      { name: '_fullpath', value: TEMPLATE_PATH_QUERY.questionsListPath },
    ];

    if (this.selectedIndustry) {
      this.filterClause.push({
        name: 'industryList',
        value: this.selectedIndustry,
      });
    }

    if (this.selectedTechnique) {
      this.filterClause.push({
        name: 'techniquesList',
        value: this.selectedTechnique,
      });
    }

    if (this.selectedSeparationMode) {
      this.filterClause.push({
        name: 'separationModeList',
        value: this.selectedSeparationMode,
      });
    }

    if (this.selectedBrand) {
      this.filterClause.push({ name: 'brandsList', value: this.selectedBrand });
    }

    this.query$ = this.graphQLService.query({
      query: QUESTIONS_LIST_QUERY,
      variables: {
        filterClause: this.filterClause,
        keyword: this.searchKeyword,
      },
    });

    this.isLoading = true;
    this.query$.subscribe(
      (res) => {
        this.isLoading = false;
        this.sharedService.stopLoader();
        if (res.data.search.results.items && res.data.search.results.items.length) {
          this.quesCollection = res.data.search.results.items.filter(x => x.item && x.item.id)
        }
        // Remove Duplicates from Featured Questions List
        // create array of questionstatements (unique identifier)
        const b = [];
        this.quesFeatured.forEach((element) => {
          b.push(element.fields.questionstatement.value);
        });
        // Loop through new array. If there are matches on questionstatement, remove from quesCollection
        b.forEach((questionStatement) => {
          this.quesCollection.forEach((element, index) => {
            if (questionStatement === element.item.questionstatement.value) {
              this.quesCollection.splice(index, 1);
            }
          });
        });

        this.showMore();
        this.updateFilterByQuestionsResults();
      },
      (err) => {
        this.sharedService.stopLoader();
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  updateFilterByQuestionsResults() {
    this.masterCollection._brandsCollection = [];
    this.masterCollection._industriesCollection = [];
    this.masterCollection._separationModesCollection = [];
    this.masterCollection._techniquesCollection = [];

    if (this.quesCollection.length === 0) { return; }

    const uniqueBrands = [];
    const uniqueIndustries = [];
    const uniqueSeparationModes = [];
    const uniqueTechniques = [];

    this.quesCollection.forEach(question => {
      // brands collection
      question.item.brandsList.targetItems.forEach(item => {
        if (uniqueBrands.indexOf(item.id) === -1) {
          uniqueBrands.push(item.id);
          const foundItem = this.masterCollection.brandsCollection.find(x => x.item.id === item.id);
          if (foundItem) {
            this.masterCollection._brandsCollection.push(foundItem);
          }
        }
      });

      // industries collection
      question.item.industryList.targetItems.forEach(item => {
        if (uniqueIndustries.indexOf(item.id) === -1) {
          uniqueIndustries.push(item.id);
          const foundItem = this.masterCollection.industriesCollection.find(x => x.item.id === item.id);
          if (foundItem) {
            this.masterCollection._industriesCollection.push(foundItem);
          }
        }
      });

      // separationModes collection
      question.item.separationModeList.targetItems.forEach(item => {
        if (uniqueSeparationModes.indexOf(item.id) === -1) {
          uniqueSeparationModes.push(item.id);
          const foundItem = this.masterCollection.separationModesCollection.find(x => x.id === item.id);
          if (foundItem) {
            this.masterCollection._separationModesCollection.push(foundItem);
          }
        }
      });

      // techniques collection
      question.item.techniquesList.targetItems.forEach(item => {
        if (uniqueTechniques.indexOf(item.id) === -1) {
          uniqueTechniques.push(item.id);
          const foundItem = this.masterCollection.techniquesCollection.find(x => x.item.id === item.id);
          if (foundItem) {
            this.masterCollection._techniquesCollection.push(foundItem);
          }
        }
      });

    });
  }

  showMore() {
    if (this.quesCollection.length > this.paginatorConfig.recordsPerPage) {
      if (this.quesCollection.length > this.paginatorConfig.recordsPerPage + this.paginatorConfig.defaultRecordsPerPage) {
        this.paginatorConfig.recordsPerPage += this.paginatorConfig.defaultRecordsPerPage;
      } else {
        this.paginatorConfig.recordsPerPage = this.quesCollection.length;
      }
    }
  }

  ngOnDestroy() {
    this.contextSubscription.unsubscribe();
  }
}
