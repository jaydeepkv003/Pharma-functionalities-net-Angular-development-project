import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ComponentRendering, Field } from '@sitecore-jss/sitecore-jss-angular';
import { Subscription } from 'rxjs';
import { JssContextService } from '../../jss-context.service';
import { PAGE_TYPE, TEMPLATE } from '../../models/constants';
import { GoogleEcommerceEvents, GoogleEcommerceService } from '../../_services/google.ecommerce.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  PAGE_TYPE = PAGE_TYPE;
  templateName = this.PAGE_TYPE.CMS_PAGE_TYPE.BRAND;
  contextFields: { [name: string]: Field };
  bannerImg = { value: '' };
  private contextSubscription: Subscription;

  constructor(private jssContext: JssContextService, private googleEcommerceService: GoogleEcommerceService) { }

  ngOnInit() {
    this.contextSubscription = this.jssContext.state.subscribe((state) => {
      console.log('brand state', state.sitecore);
      this.contextFields = state.sitecore.route.fields;
      this.bannerImg.value = this.contextFields.bannerImg.value.toString().replace('/-/media/phrjss/', '/-/jssmedia/phrjss/');
      this.templateName = state.sitecore.route.templateName;
      switch (state.sitecore.route.templateName) {
        case TEMPLATE.NAME.Brand:
          this.templateName = this.PAGE_TYPE.CMS_PAGE_TYPE.BRAND
          break;
        case TEMPLATE.NAME.Technique:
          this.templateName = this.PAGE_TYPE.CMS_PAGE_TYPE.TECHNIQUE
          break;
        case TEMPLATE.NAME.Industry:
          this.templateName = this.PAGE_TYPE.CMS_PAGE_TYPE.INDUSTRY
          break;
      }
      if (state.sitecore.route.fields.header.value) {
        this.googleEcommerceService.addEventToGoogleDataLayer(GoogleEcommerceEvents.ViewItem, { item_name: state.sitecore.route.fields.header.value });
      }
    });
  }

  ngOnDestroy() {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
  }
}
