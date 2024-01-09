import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { Subscription } from 'rxjs';
import { PaginationService } from '../../_services/pagination.service';
import { environment as env } from '../../../environments/environment';
import { PAGE_TYPE, PART_TYPES } from '../../models/constants';
import { SearchService } from '../../_services/search.service';
import { SharedService } from '../../_services/shared.service';
import { PaginatorModel } from '../../models/common-models';

@Component({
  selector: 'app-baby-search',
  templateUrl: './baby-search.component.html',
  styleUrls: ['./baby-search.component.scss']
})
export class BabySearchComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  private subscription$: Subscription;
  private subscriptionTopLevel$: Subscription;
  private routeSubscription$: Subscription;
  records: any[] = [];
  paginatorConfig: PaginatorModel;
  isLoading = false;
  isSubFilterApplied = false;
  PAGE_TYPE = PAGE_TYPE;
  selectedFilters: any = {};
  selectedTopFilter: any = {};
  facets = [];
  topLevelFacets = [];
  linkToShare = '';
  label = {
    PAGE_TYPE: 'Filter by:',
    TYPE: 'Page Type',
  };
  ordering = ['label', 'count_desc'];
  search_fields = ["page_title", "description", 'partNumber', 'extra_search_field', 'Techniques', 'Separation Modes', 'Official Method', 'Phases', 'Brands', 'Pharmacological Effect', 'Industries', 'Compound Class', 'Document Type', 'url'];

  constructor(
    private searchService: SearchService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private serializer: UrlSerializer,
    private sharedService: SharedService,
    private pageService: PaginationService
  ) {
    this.sharedService.startLoader();
    this.isLoading = true;
    PART_TYPES.forEach(element => {
      this.search_fields.push(...element.Attributes.map(x => x.AttributeFacetName));
    });
  }

  ngOnInit() {
    this.paginatorConfig = this.pageService.preparePagination(this.rendering);

    this.routeSubscription$ = this.activateRoute.queryParams.subscribe(params => {
      if (params["search_string"]) {
        this.searchService.searchString = params["search_string"];
      }
      if (params["top_filter"]) {
        this.selectedTopFilter = JSON.parse(params["top_filter"]);
      }
      if (params["filters"]) {
        this.selectedFilters = JSON.parse(params["filters"]);
        this.checkforSubfilterApplied();
      }
      this.search();
      this.searchTopLevel();
    });
  }

  searchTopLevel() {
    this.subscriptionTopLevel$ = this.searchService
      .searchTopLevel({
        engine_key: env.babySearch.engine_key,
        q: this.searchService.searchString,
        page: this.paginatorConfig.currentPage,
        per_page: this.paginatorConfig.recordsPerPage,
        facets: {
          page: ['PAGE_TYPE'],
        },
        filters: {
          page: {
            // ...this.selectedFilters
          }
        },
        fetch_fields: {
          page: ['page_title'],
        },
        search_fields: {
          page: this.search_fields
        },
      })
      .subscribe(
        (res: any) => {
          this.topLevelFacets = [];
          Object.entries(res.info.page.facets).forEach((entry) => {
            const [facetType, facetObjs] = entry;
            const facet = {
              type: facetType,
              values: [],
              order: -1,
              orderByColumn: this.ordering[0],
              collapsed: true
            };

            Object.entries(facetObjs).forEach(facetObj => {
              const [facetLabel, count] = facetObj;
              if (this.selectedFilters[facetType] && this.selectedFilters[facetType].indexOf(facetLabel) > -1) {
                facet.values.push({ label: facetLabel, count: count, selected: true });
              } else {
                facet.values.push({ label: facetLabel, count: count, selected: false });
              }
            });
            if (facet.values.length > 0) {
              this.topLevelFacets.push(facet);
            }
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }

  search() {
    const facets = this.selectedTopFilter['PAGE_TYPE']
      ? this.searchService.filter[this.selectedTopFilter['PAGE_TYPE']].facets
      : this.searchService.filter['All'].facets;

    this.subscription$ = this.searchService
      .search({
        engine_key: env.babySearch.engine_key,
        q: this.searchService.searchString,
        page: this.paginatorConfig.currentPage,
        per_page: this.paginatorConfig.recordsPerPage,
        facets: {
          page: [...facets],
        },
        filters: {
          page: {
            ...this.selectedTopFilter,
            ...this.selectedFilters
          }
        },
        fetch_fields: {
          page: ['page_title', 'PAGE_TYPE', 'TYPE', 'url', 'description', 'partNumber', 'phaseNavigationURL', 'Document Type', 'title'],
        },
        search_fields: {
          page: this.search_fields
        },
      })
      .subscribe(
        (res: any) => {
          this.paginatorConfig.searchTerm =
            res.info && res.info.page && res.info.page.query
              ? res.info.page.query
              : '';
          this.paginatorConfig.totalRecords =
            res.info && res.info.page && res.info.page.total_result_count
              ? res.info.page.total_result_count
              : 0;

          res.records.page.forEach((element) => {
            element.absUrl = element.url.replace(/^.*\/\/[^\/]+/, '');
            element.page_title = element.page_title || element.title
          });

          this.facets = [];
          Object.entries(res.info.page.facets).forEach((entry) => {
            const [facetType, facetObjs] = entry;
            const facet = {
              type: facetType,
              values: [],
              order: -1,
              orderByColumn: this.ordering[0],
              collapsed: true
            };

            if (facetType !== 'PAGE_TYPE') {
              const page_type = this.selectedTopFilter['PAGE_TYPE'];
              if (page_type) {
                facet.order = this.searchService.filter[page_type].facets.indexOf(facetType);
              } else {
                facet.order = this.searchService.filter['All'].facets.indexOf(facetType);
              }
            }

            Object.entries(facetObjs).forEach(facetObj => {
              const [facetLabel, count] = facetObj;
              if (this.selectedFilters[facetType] && this.selectedFilters[facetType].indexOf(facetLabel) > -1) {
                facet.values.push({ label: facetLabel, count: count, selected: true });
                facet.collapsed = false;
              } else {
                facet.values.push({ label: facetLabel, count: count, selected: false });
              }
            });
            if (facet.values.length > 0) {
              this.facets.push(facet);
            }
          });

          this.facets.sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));

          if (this.facets.length > 0) {
            // To keep first accordion open
            this.facets[0].collapsed = false;
          }

          if (res.records && res.records.page.length) {
            this.records.push(...res.records.page);
          }
          this.paginatorConfig.currentPage++;
          this.sharedService.stopLoader();
          this.isLoading = false;
        },
        (err) => {
          this.sharedService.stopLoader();
          this.isLoading = false;
          console.log(err);
        }
      );
  }

  onTopFilterClick(type, filter) {
    this.selectedFilters = {};
    this.facets = [];
    if (this.selectedTopFilter[type] === filter) {
      this.selectedTopFilter = {};
    } else {
      this.selectedTopFilter[type] = filter;
    }
    this.onSearchParamChange();
  }

  onFilterClick() {
    this.selectedFilters = {};
    this.facets.forEach((facet) => {
      facet.values.forEach((facetVal) => {
        if (facetVal.selected) {
          if (!this.selectedFilters[facet.type]) {
            this.selectedFilters[facet.type] = [];
          }
          this.selectedFilters[facet.type].push(facetVal.label);
        }
      });
    });
    this.onSearchParamChange();
  }

  removeFilter() {
    this.selectedTopFilter = {};
    this.selectedFilters = {};
    this.facets = [];
    this.onSearchParamChange();
  }

  getTypeFilter() {
    if (this.selectedFilters && this.selectedFilters.children) {
      return this.selectedFilters.children.filter((x) => x.selected);
    }
  }

  shareLink() {
    const queryParams = {
      search_string: this.searchService.searchString,
      top_filter: Object.keys(this.selectedTopFilter).length ? JSON.stringify(this.selectedTopFilter) : null,
      filters: Object.keys(this.selectedFilters).length ? JSON.stringify(this.selectedFilters) : null
    };

    this.linkToShare = window.location.origin + this.serializer.serialize(this.router.createUrlTree(['/search'],
      {
        queryParams: queryParams
      }));
  }

  onSearchParamChange() {
    const queryParams = {
      search_string: this.searchService.searchString,
      top_filter: Object.keys(this.selectedTopFilter).length ? JSON.stringify(this.selectedTopFilter) : null,
      filters: Object.keys(this.selectedFilters).length ? JSON.stringify(this.selectedFilters) : null
    };

    this.router.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }

  copyMessage(message: string) {
    this.sharedService.copyToClipboard(message);
  }

  getLabel(labelKey: string) {
    if (this.label[labelKey]) {
      return this.label[labelKey];
    }
    return labelKey;
  }

  toggleOrdering(facet) {
    const index = this.ordering.indexOf(facet.orderByColumn) + 1;
    facet.orderByColumn = this.ordering[index % this.ordering.length];
  }

  sortBy(array: any[], prop: string) {
    //check if value are float
    const orderAttr = prop.split('_');
    if (orderAttr.length === 2) {
      //desc
      prop = orderAttr[0];
      if (!isNaN(array[0][prop])) {
        return array.sort((a, b) => parseFloat(b[prop]) - parseFloat(a[prop]));
      } else {
        return array.sort((a, b) => a[prop] < b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
      }
    } else {
      if (!isNaN(array[0][prop])) {
        return array.sort((a, b) => parseFloat(a[prop]) - parseFloat(b[prop]));
      } else {
        return array.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
      }
    }
  }

  checkforSubfilterApplied() {
    this.isSubFilterApplied = Object.keys(this.selectedFilters).length
      ? true
      : false;
  }

  goTo(url) {
    window.location.href = url;
  }

  ngOnDestroy() {
    this.sharedService.stopLoader();
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
    if (this.subscriptionTopLevel$) {
      this.subscriptionTopLevel$.unsubscribe();
    }
    if (this.routeSubscription$) {
      this.routeSubscription$.unsubscribe();
    }
  }
}

export interface ShowMorePagination {
  PageSize?: number;
  CurrentPage?: number;
  TotalRecords?: number;
  SearchTerm?: string;
}
