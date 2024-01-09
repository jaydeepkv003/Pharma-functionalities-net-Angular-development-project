import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { ApplicationService } from '../../api/phr-webapi/services';
import { SharedService } from '../../_services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AZURE_STORAGE_PATH, DOJOXD_PATH, JSDRAW_PATH } from '../../models/constants';
import { CompoundSearchViewModel } from '../../../app/api/phr-webapi/models';
declare const dojo: any;
declare const JSDraw: any;
@Component({
  selector: 'app-compound-search',
  templateUrl: './compound-search.component.html',
  styleUrls: ['./compound-search.component.css'],
})
export class CompoundSearchComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  searchControl = new FormControl();
  searchCompounds: string[] = [];
  applicationListObj: Array<any> = [];
  jsd2: any = null;
  public filterObj: CompoundSearchViewModel = {};
  errorMessage: string = '';

  public filter: {
    CompoundName?: null | string;
    Technique?: null | string;
    SeparationMode?: null | string;
    ColumnPhase?: null | string;
    Limit: number;
    Offset: number;
  };

  public searchTerm: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService,
    private sharedService: SharedService
  ) {
    this.loadScript(`${AZURE_STORAGE_PATH}${DOJOXD_PATH}`);
    this.loadScript(`${AZURE_STORAGE_PATH}${JSDRAW_PATH}`);
  }

  ngOnInit() {
    this.filter = {
      CompoundName: null,
      SeparationMode: null,
      ColumnPhase: null,
      Technique: null,
      Limit: null,
      Offset: null,
    };
    // get the query string value - compoundName
    this.filter.CompoundName =
      this.activatedRoute.snapshot.queryParamMap.get('compoundName');
    if (this.filter.CompoundName) {
      this.getCompound();
    }
  }

  public clearFilter() {
    this.filter.Technique = null;
    this.filter.SeparationMode = null;
    this.filter.ColumnPhase = null;

    this.getCompound();
  }

  getCompound() {
    if (this.filter.CompoundName) {
      this.errorMessage = '';
      this.sharedService.startLoader();
      this.applicationService.v12ApplicationsCompoundSearchFiltersGet(this.filter).subscribe(
        (res) => {
          this.sharedService.stopLoader();
          if (res) {
            this.filterObj = res;
            this.filter.Limit = this.filterObj.Limit;
            this.filter.Offset = this.filterObj.Offset;
            this.applicationListObj = this.filterObj.Results;
            this.loadMolData(this.filterObj.CompoundDetails.MoleData);
          } else {
            this.filterObj = null;
            this.applicationListObj = null;
          }
        },
        (err) => {
          this.sharedService.stopLoader();
          if (err.status === 404) {
            this.errorMessage = this.filter.CompoundName + ' not found.';
            this.filter.CompoundName = null;
          } else if (err.status === 400) {
            console.log(err);
          } else {
            console.log(err);
          }
        }
      );
    } else {
      this.errorMessage = 'Kindly select compound from the list';
    }
  }

  // Load the mole data in the JSDraw view
  loadMolData(molData) {
    setTimeout(() => {
      // get the instance for the jsdraw latest version
      try {
        dojo.addOnLoad(() => {
          var removeH = false;
          if (document.cookie.indexOf('phenH=true') == -1) {
            removeH = true;
          }
          this.jsd2 = new JSDraw('draw', { removehydrogens: removeH });
          dojo.ready(() => {
            this.jsd2.setMolfile(molData);
          });
          if (this.jsd2.m.removeHydrogens() > 0) {
            this.jsd2.m.calcHCount(true);
            this.jsd2.moveCenter();
          }
          this.jsd2.fitToWindow(30);
        });
      } catch (err) {
        console.log(err);
      }
    }, 1000);
  }

  // after click on compound serach list this method is called to get the compound details
  getCompoundAlias() {
    if (this.searchTerm.length > 2) {
      this.applicationService
        .v12ApplicationsCompoundAliasListGet({ compoundName: this.searchTerm, searchAll: false })
        .subscribe((res) => {
          if (res) {
            this.searchCompounds = res;
          } else {
            this.searchCompounds = [];
          }
        });
    }
  }

  // Click on show more to get more list for applications
  public showMore() {
    this.filter.Limit = this.filter.Limit + this.filterObj.Limit;
    this.getCompound();
  }

  searchCompound() {
    if (this.searchTerm) {
      this.filter.CompoundName = this.searchTerm;
      this.router.navigate([], {
        queryParams: {
          compoundName: this.filter.CompoundName,
        },
      });
    }
  }
  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}
