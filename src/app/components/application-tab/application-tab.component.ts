import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { JssContextService } from '../../jss-context.service';
import { Subscription } from 'rxjs';
import { ApplicationService } from '../../api/phr-webapi/services';
import { Applications } from '../../api/phr-webapi/models';
import { SharedService } from '../../_services/shared.service';

@Component({
  selector: 'app-application-tab',
  templateUrl: './application-tab.component.html',
  styleUrls: ['./application-tab.component.scss']
})
export class ApplicationTabComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  private contextSubscription$: Subscription;

  heading: any;
  pageSize: number = 0;
  applications: Array<Applications> = [];
  isLoading = false;

  constructor(private jssContext: JssContextService,
    private applicationService: ApplicationService,
    private sharedService: SharedService) { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('application-tab component initialized with component data', this.rendering);

    this.contextSubscription$ = this.jssContext.state.subscribe((state) => {
      this.heading = state.sitecore.route.fields.heading.value;
    });

    let applicationIdList = this.rendering.fields.applicationIds['value'];
    if (applicationIdList) {
      let applicationIds = applicationIdList.split(',').map((value: string) => {
        let n = Number(value.trim());
        return isNaN(n) ? 0 : n;
      });
      this.loadApplications(applicationIds);
    }
  }

  loadApplications(appIDs: number[]) {
    this.isLoading = true;
    this.sharedService.startLoader('loader-menu');
    this.applicationService.v12ApplicationsSummaryGet({ appIDs: appIDs }).subscribe((res:any) => {
      this.sharedService.stopLoader('loader-menu');
      this.isLoading = false;
      this.applications = res.Applications;
      this.showMore();
    }, err => {
      this.sharedService.stopLoader('loader-menu');
      this.isLoading = false;
    });
  }

  showMore() {
    if (this.applications.length > this.pageSize) {
      if (this.applications.length > this.pageSize + 10) {
        this.pageSize += 10;
      } else {
        this.pageSize = this.applications.length;
      }
    }
  }

  ngOnDestroy() {
    if (this.contextSubscription$) {
      this.contextSubscription$.unsubscribe();
    }
  }
}
