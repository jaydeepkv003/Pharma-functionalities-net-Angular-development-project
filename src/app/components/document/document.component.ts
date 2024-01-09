import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../_services/shared.service';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { JssGraphQLService } from '../../jss-graphql.service';
import { DOCUMENT_DETAIL } from './document.graphql';
import { FAVORITE_TYPE, PAGE_TYPE } from '../../models/constants';
import { Subscription } from 'rxjs';
import { JssContextService } from '../../jss-context.service';
import { Field, ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FavoriteAddModalComponent } from '../favorite-add-modal/favorite-add-modal.component';
import { CartService, PartService } from '../../api/phr-webapi/services';
import { AddPartByIdParams, PartViewModel } from '../../api/phr-webapi/models';
import { CheckoutCartModalComponent } from '../checkout-cart-modal/checkout-cart-modal.component';
import { AuthService } from '../_core/auth.service';
import { MessageService } from '../../_services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleEcommerceService } from '../../_services/google.ecommerce.service';
import { CartObjModel } from '../../models/common-models';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  query$: Observable<ApolloQueryResult<any>>;
  PAGE_TYPE = PAGE_TYPE;

  documentDetail: any = {};
  currentHostName: string = environment.sitecoreApiHost;
  productsUsed: PartViewModel[] = [];
  pdfFullUrl: string = "";
  docId: string;
  isPdfLoaded: boolean = false;

  contextFields: { [name: string]: Field };
  private contextSubscriptions: Subscription[] = [];

  constructor(
    public sharedService: SharedService,
    private graphQLService: JssGraphQLService,
    private jssContext: JssContextService,
    private modalService: NgbModal,
    private partService: PartService,
    private cartService: CartService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private googleEcommerceService: GoogleEcommerceService
  ) { }

  ngOnInit() {
    this.contextSubscriptions.push(
      this.jssContext.state.subscribe((state) => {
        this.sharedService.stopLoader();
        this.contextFields = state.sitecore.route.fields;
        this.docId = state.sitecore.route.itemId;
        this.getDocumentById();
      })
    );

    this.productsUsed = [];
  }

  getDocumentById() {

    this.sharedService.startLoader();
    this.query$ = this.graphQLService.query({
      query: DOCUMENT_DETAIL,
      variables: { 'docId': this.docId }
    });

    this.contextSubscriptions.push(
      this.query$.subscribe(res => {
        this.sharedService.stopLoader();
        this.documentDetail = res.data.search.results.items[0].item;
        if (this.documentDetail) {
          if (this.documentDetail.doclink.url) {
            let origin = window.location.origin;
            if (origin.indexOf('localhost') > -1) {
              origin = 'https://dev.phenpreview2.com';
            }
            // this.documentDetail.pdfFullUrl = 'https://www.phenpreview2.com/' + this.documentDetail.doclink.url.replace('/-/media/phrjss/', '/-/jssmedia/phrjss/');
            this.documentDetail.pdfFullUrl = origin + this.documentDetail.doclink.url.replace('/-/media/phrjss/', '/-/jssmedia/phrjss/');
          }
          const associatedProducts: string = this.documentDetail.associatedProducts.value.trim();
          if (associatedProducts.length > 0) {
            this.GetProductByPartNumber(associatedProducts.split(','));
          }
        }
        this.sharedService.startLoader('view-loader');
        this.isPdfLoaded = true;
      }, err => {
        this.sharedService.stopLoader();
        console.log(err);
      })
    );
  }

  GetProductByPartNumber(partNumbers: string[]) {
    partNumbers.forEach((val, i) => {
      partNumbers[i] = val.trim();
    });
    this.contextSubscriptions.push(
      this.partService.v12PartsGet({ numbers: partNumbers }).subscribe(res => {
        this.productsUsed = res;
        // Add to cart

        const urlParams = this.activateRoute.queryParams['value'];
        if (urlParams && urlParams.cart) {
          const parts: PartViewModel[] = this.productsUsed.filter(d => d.PartID === +urlParams.partId);
          if (parts && parts.length) {
            setTimeout(() => this.addToCart(parts[0]), 1000);
          }
        }
      }, err => {
        console.log(err);
      })
    );
  }

  viewPdfFile(url) {
    this.isPdfLoaded = false;
    this.sharedService.startLoader('view-loader');
    this.contextSubscriptions.push(
      this.sharedService.downloadFile(url).subscribe(res => {
        const fileURL = URL.createObjectURL(res);
        window.open(fileURL, '_blank');
        this.sharedService.stopLoader('view-loader');
        this.isPdfLoaded = true;
      }, err => {
        this.isPdfLoaded = true;
        this.sharedService.stopLoader('view-loader');
      })
    );
  }

  onPdfLoaded() {
    this.sharedService.stopLoader('view-loader');
    // alert('loaded');
  }

  addToFavorite() {
    if (!this.authService.hasValidToken()) {
      this.messageService.sendMessage({ showAuthPopup: true });
      return;
    }
    let documentData = {
      docId: this.docId,
      docDescription: this.documentDetail.description.value,
      pdfFullUrl: this.documentDetail.pdfFullUrl
    }
    const modalRef = this.modalService.open(FavoriteAddModalComponent, { size: 'lg' });
    modalRef.componentInstance.modalType = FAVORITE_TYPE.DOCUMENT;
    modalRef.componentInstance.documentData = documentData;
  }

  addToCart(part: PartViewModel) {
    if (!this.authService.hasValidToken()) {
      let cartObj: CartObjModel = {
        type: 'part',
        partId: part.PartID,
        qty: 1
      }
      this.messageService.sendMessage({ showAuthPopup: true, route: this.router.url, payload: cartObj });
      return;
    }

    this.sharedService.startLoader(`loader-${part.PartID}`);
    const data: AddPartByIdParams[] = [{
      PartID: part.PartID,
      Quantity: 1
    }];

    this.contextSubscriptions.push(
      this.cartService.v12CartDetailsByPartIdPost({ body: data }).subscribe(res => {
        const cartDetail = res.Parts.filter(x => x.Part.PartID === part.PartID)[0];
        this.googleEcommerceService.addToCart(cartDetail);
        const modalRef = this.modalService.open(CheckoutCartModalComponent, { size: 'lg' });
        modalRef.componentInstance.data = cartDetail;
        modalRef.componentInstance.promotions = res.Promotions;
      }, err => {
        this.sharedService.showError(err);
      }, () => {
        this.sharedService.stopLoader(`loader-${part.PartID}`);
      })
    );
  }

  getProdTitle(array: any[]) {
    let relPrdHead = ""
    array.forEach(element => {
      if (relPrdHead != element.name) {
        relPrdHead += element.name == "Technical Notes" ? "technical note ," : "document ,"
      }
    });
    return relPrdHead.slice(0, -1);
  }

  ngOnDestroy() {
    this.sharedService.stopLoader();
    this.contextSubscriptions.forEach(element => {
      element.unsubscribe();
    });
  }
}
