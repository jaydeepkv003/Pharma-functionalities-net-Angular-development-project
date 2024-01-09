import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { CompoundMatchModel, StructureSearchModel } from '../../api/phr-webapi/models';
import { AZURE_STORAGE_PATH, DOJOXD_PATH, JSDRAW_PATH } from '../../models/constants';
import { ApplicationService } from '../../api/phr-webapi/services';
import { SharedService } from '../../_services/shared.service';

declare const dojo: any;
declare const JSDraw: any;
//declare const JSDraw2: any;
@Component({
  selector: 'app-structure-search',
  templateUrl: './structure-search.component.html',
  styleUrls: ['./structure-search.component.css'],

})
export class StructureSearchComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  public filterObj: StructureSearchModel = {};

  public filter: {
    Id: null | string;
    Technique?: null | string;
    SeparationMode?: null | string;
    ColumnPhase?: null | string;
    MatchType?: null | string;
    Limit: number;
    Offset: number;
  };

  public searchResults: number = 0;
  public applicationListObj: Array<CompoundMatchModel> = [];
  heading: any;
  pageSize: number = 25;
  offset = 0;
  isLoading = false;
  jsd: any = null;
  jsd2: any = null;
  appCount: number = 0;
  currentMolWeight: any = '0.0000';
  currentMolFormula: any = '';
  currentMolFormula3d: any = '';
  matchType: string;
  searchForm: FormGroup;

  public defaultPageCount: number = 25;
  public defaultPageIndex: number = 1;

  constructor(
    fb: FormBuilder,
    private sharedService: SharedService,
    private applicationService: ApplicationService,
  ) {
    this.loadScript(`${AZURE_STORAGE_PATH}${DOJOXD_PATH}`);
    this.loadScript(`${AZURE_STORAGE_PATH}${JSDRAW_PATH}`);
    this.searchForm = fb.group({
      MatchType: ['sub', Validators.required],
    });
  }

  ngOnInit() {
    this.filter = {
      Id: null,
      SeparationMode: null,
      ColumnPhase: null,
      Technique: null,
      MatchType: null,
      Limit: Number(this.defaultPageCount),
      Offset: Number(this.defaultPageIndex),
    };

    // remove this after implementation is done
    this.loadScilligence();

    let self = this;
    $('#editor').on('DOMSubtreeModified', function () {
      self.changeOccured();
    });

    this.applicationListObj = this.filterObj.CompoundList;
  }

  changeOccured() {
    if (this.jsd) {
      this.currentMolWeight = this.jsd.getMolWeight();
      this.currentMolFormula = this.jsd.getFormula(true);
      this.filter.Id = this.jsd.getSmiles(true);
    }
  }

  loadScilligence(): void {
    try {
      setTimeout(() => {
        try {
          dojo.addOnLoad(() => {
            var removeH = false;
            if (document.cookie.indexOf('phenH=true') == -1) {
              removeH = true;
            }
            this.jsd = new JSDraw('editor', { removehydrogens: removeH });
          });
          dojo.ready(() => {
            //this.calculateHeight();
          });
        } catch (err) {
          console.log(err);
        }
        setTimeout(() => { }, 500);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  }

  onSubmit() {
    this.filter.MatchType = this.searchForm.value.MatchType;
    this.sharedService.startLoader();
    this.applicationService
      .v12ApplicationsApplicationStructureSearchGet(this.filter)
      .subscribe((res) => {
        this.sharedService.stopLoader();
        if (res) {
          this.filterObj = res;
          this.appCount = res.Total;
          this.applicationListObj = this.filterObj.CompoundList;
          if (this.applicationListObj.length > 0)
            this.onUpdate(this.applicationListObj[0])
        } else {
          this.filterObj = null;
          this.applicationListObj = null;
        }
      }, (err) => {
        this.sharedService.stopLoader();
        if (err.status === 404) {
          this.sharedService.showError2("Sorry we could not find any structures matching your input. Please try again.");
        } else if (err.status === 502) {
          this.sharedService.showError2("Sorry we could not find any structures matching your input. Please try again.");
        } else {
          console.log(err);
        }

      });
  }


  // Click on show more to get more list for applications
  public showMore() {
    this.filter.Limit += this.defaultPageCount;
    this.onSubmit();
  }

  onUpdate(item) {
    try {
      dojo.addOnLoad(() => {
        var removeH = false;
        if (document.cookie.indexOf('phenH=true') == -1) {
          removeH = true;
        }
        this.jsd2 = new JSDraw('draw', { removehydrogens: removeH });
        this.jsd2.setMolfile(item.MolData);
        if (this.jsd2.m.removeHydrogens() > 0) {
          this.jsd2.m.calcHCount(true);
          this.jsd2.moveCenter();
        }
        this.jsd2.fitToWindow(30);
      });
    } catch (err) {
      console.log(err);
    }
  }

  public clearFilter() {
    this.filter.Technique = null;
    this.filter.SeparationMode = null;
    this.filter.ColumnPhase = null;

    this.onSubmit();
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
