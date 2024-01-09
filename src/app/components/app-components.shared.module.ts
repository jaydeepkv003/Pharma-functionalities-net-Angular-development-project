import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { GraphQLModule } from '../jss-graphql.module';
import { StyleguideSpecimenComponent } from './shared/styleguide-specimen/styleguide-specimen.component';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { SafePipe } from '../pipes/safe.pipe';
import { ArrayToStringPipe } from '../pipes/array-to-string.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule, MatSelectModule, MatRadioModule, MatCheckboxModule, MatInputModule, MatExpansionModule, MatAutocompleteModule, MatStepperModule, MatSliderModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { NgxGalleryModule } from 'ngx-gallery';
import { LOADER_CONFIG } from '../models/app-constants';
import { CartImgPipe } from '../pipes/cart-img.pipe';
import { DaysRemainingPipe } from '../pipes/days-remaining.pipe';
import { NgxPrintModule } from 'ngx-print';
import { ToastrModule } from 'ngx-toastr';
import { OnlyNumericDirective } from '../directives/numeric-only.directive';
import { GenericLinkDirective } from '../directives/generic-link.directive';
import { ClickStopPropagation } from '../directives/click-stop-propogation.directive';
import { OpenChatDirective } from '../directives/open-chat.directive';
import { AttributePatternPipe } from '../pipes/attribute-pattern.pipe';
import { MaxLengthDirective } from '../directives/max-length.directive';
import { TimeFormatPipe } from '../pipes/time-format.pipe';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { StringToNumberPipe } from '../pipes/string-to-number.pipe';

/*
  This module is imported by the generated app-components.module.ts.
  You can use this module to provide shared Angular components that are not
  JSS components, etc to the generated module.

  Don't want code generation? See ./.gitignore for instructions to turn it off.
*/

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    TranslateModule,
    RouterModule,
    GraphQLModule,
    JssModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    NgxUiLoaderModule.forRoot(LOADER_CONFIG),
    NgbModule,
    MatStepperModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatSliderModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatAutocompleteModule,
    RecaptchaV3Module,
    NgxGalleryModule,
    NgxPrintModule,
    ToastrModule.forRoot(),
    ScrollToModule.forRoot()
  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    TranslateModule,
    RouterModule,
    GraphQLModule,
    FormsModule,
    ReactiveFormsModule,
    StyleguideSpecimenComponent,
    SafePipe,
    TimeFormatPipe,
    StringToNumberPipe,
    ArrayToStringPipe,
    CartImgPipe,
    AttributePatternPipe,
    MatStepperModule,
    PdfViewerModule,
    NgxUiLoaderModule,
    NgbModule,
    MatIconModule,
    MatSelectModule,
    MatSliderModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatAutocompleteModule,
    RecaptchaV3Module,
    NgxGalleryModule,
    DaysRemainingPipe,
    OrderByPipe,
    NgxPrintModule,
    ToastrModule,
    OnlyNumericDirective,
    MaxLengthDirective,
    OpenChatDirective,
    GenericLinkDirective,
    ScrollToModule,
    NgxDropzoneModule
  ],
  declarations: [
    StyleguideSpecimenComponent,
    SafePipe,
    TimeFormatPipe,
    StringToNumberPipe,
    ArrayToStringPipe,
    CartImgPipe,
    AttributePatternPipe,
    DaysRemainingPipe,
    StringToNumberPipe,
    OrderByPipe,
    OnlyNumericDirective,
    ClickStopPropagation,
    OpenChatDirective,
    MaxLengthDirective,
    GenericLinkDirective
  ],
  providers: [
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: 'u6' },
  ]
})
export class AppComponentsSharedModule { }
