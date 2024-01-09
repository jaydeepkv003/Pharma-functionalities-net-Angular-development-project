import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { SearchService } from '../../_services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PAGE_TYPE } from '../../models/constants';

@Component({
  selector: 'app-header-search-modal',
  templateUrl: './header-search-modal.component.html',
  styleUrls: ['./header-search-modal.component.scss']
})
export class HeaderSearchModalComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  @ViewChild('searchElement', { static: false }) searchElement: ElementRef;

  showSearchPop: boolean = false;
  searchStr: string = '';
  filters: any[] = [];
  topLevelFacets = [{
    label: PAGE_TYPE.DOCUMENT,
    displayLabel: PAGE_TYPE.DOCUMENT,
    count: 0,
    icon: 'description'
  }, {
    label: PAGE_TYPE.PART_NUMBER,
    displayLabel: PAGE_TYPE.PART_NUMBER,
    count: 0,
    icon: 'widgets'
  }, {
    label: PAGE_TYPE.CMS_PAGES,
    displayLabel: PAGE_TYPE.CMS_PAGES,
    count: 0,
    icon: 'web'
  }, {
    label: PAGE_TYPE.WEBINAR,
    displayLabel: PAGE_TYPE.WEBINAR,
    count: 0,
    icon: 'desktop_mac'
  }];

  constructor(private searchService: SearchService,
    private activateRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    // remove this after implementation is done
    // console.log('header-search-modal component initialized with component data', this.rendering);
    if (this.searchService.searchString) {
      this.searchStr = this.searchService.searchString;
    }

    this.activateRoute.queryParams.subscribe(params => {
      if (params["search_string"]) {
        this.searchStr = params["search_string"];
      }
    });
  }

  showSearch() {
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 100);
    this.showSearchPop = true;
  }

  hideSearch() {
    this.showSearchPop = false;
  }

  clearSearch() {
    this.searchStr = '';
    this.showSearchPop = false;
  }

  search(item: any = {}) {
    this.hideSearch();
    this.searchService.searchString = this.searchStr;
    this.router.navigate(['/search'], {
      relativeTo: this.activateRoute,
      queryParams: {
        search_string: this.searchService.searchString,
        top_filter: JSON.stringify({
          page_type: item.label
        })
      }
    });
  }

  onKeydown(event) {
    event.preventDefault();
  }
}
