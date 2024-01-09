/* tslint:disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { AnalyteService } from './services/analyte.service';
import { ApplicationService } from './services/application.service';
import { BillingShippingService } from './services/billing-shipping.service';
import { BrandService } from './services/brand.service';
import { CartService } from './services/cart.service';
import { CertificateRequestService } from './services/certificate-request.service';
import { CreditCardService } from './services/credit-card.service';
import { GcColumnFinderService } from './services/gc-column-finder.service';
import { GcLinerFinderService } from './services/gc-liner-finder.service';
import { GpcSolventService } from './services/gpc-solvent.service';
import { HplcColumnMatchService } from './services/hplc-column-match.service';
import { KinetexService } from './services/kinetex.service';
import { Kinetix26Service } from './services/kinetix-26.service';
import { OrderService } from './services/order.service';
import { PartService } from './services/part.service';
import { ProfileService } from './services/profile.service';
import { PromotionService } from './services/promotion.service';
import { QuickOrderService } from './services/quick-order.service';
import { QuoteService } from './services/quote.service';
import { SecurityGuardSelectionService } from './services/security-guard-selection.service';
import { SpeMethodDevelopmentService } from './services/spe-method-development.service';
import { SyringeFinderService } from './services/syringe-finder.service';
import { UspCalculatorService } from './services/usp-calculator.service';
import { VialFinderService } from './services/vial-finder.service';
import { WebUserService } from './services/web-user.service';
import { WishlistService } from './services/wishlist.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AnalyteService,
    ApplicationService,
    BillingShippingService,
    BrandService,
    CartService,
    CertificateRequestService,
    CreditCardService,
    GcColumnFinderService,
    GcLinerFinderService,
    GpcSolventService,
    HplcColumnMatchService,
    KinetexService,
    Kinetix26Service,
    OrderService,
    PartService,
    ProfileService,
    PromotionService,
    QuickOrderService,
    QuoteService,
    SecurityGuardSelectionService,
    SpeMethodDevelopmentService,
    SyringeFinderService,
    UspCalculatorService,
    VialFinderService,
    WebUserService,
    WishlistService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
