import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentRendering, isExperienceEditorActive } from '@sitecore-jss/sitecore-jss-angular';
import { Subscription } from 'rxjs';
import { CartService, PartService } from '../../api/phr-webapi/services';
import { MessageService } from '../../_services/message.service';
import { SharedService } from '../../_services/shared.service';
import { environment as env } from '../../../environments/environment';
import { JssContextService } from '../../jss-context.service';
import { CheckoutCartModalComponent } from '../checkout-cart-modal/checkout-cart-modal.component';
import { AuthService } from '../_core/auth.service';
import { GoogleEcommerceService } from '../../_services/google.ecommerce.service';

enum iframeCommand {
  OpenChat = 'OpenChat',
  NavigateToPartPage = 'NavigateToPartPage',
  NavigateToApplicationPage = 'NavigateToApplicationPage',
  AddPartToCartByPartNumber = 'AddPartToCartByPartNumber',
}

@Component({
  selector: 'app-tools-single',
  templateUrl: './tools-single.component.html',
  styleUrls: ['./tools-single.component.css'],
})
export class ToolsSingleComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  results: any;
  link: string;
  contextSubscription: Subscription;
  isTab = false;
  isExpEditorActive: boolean = true;
  toolStorageName = 'Toolpart';

  constructor(
    private jssContext: JssContextService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private modalService: NgbModal,
    private sharedService: SharedService,
    private partService: PartService,
    private cartService: CartService,
    private googleEcommerceService: GoogleEcommerceService
  ) {

    this.isExpEditorActive = isExperienceEditorActive();
    if (!this.isExpEditorActive) {
      const urlParams = this.activateRoute.queryParams['value'];
      if (urlParams && urlParams.cart) {
        setTimeout(() => {
          this.addToCart(
            +urlParams.partId,
            urlParams.qty ? urlParams.qty : 1
          );
          this.router.navigate([], {
            queryParams: { partId: null, qty: null, cart: null },
            queryParamsHandling: 'merge',
          });
        }, 1000);
      }
    }
    const partList = localStorage.getItem(this.toolStorageName);
    if (partList) {
      this.getPartByPartNo(JSON.parse(partList), 1);
      localStorage.removeItem(this.toolStorageName);
    }
  }

  ngOnInit() {
    this.contextSubscription = this.jssContext.state.subscribe((newState) => {
      const tool = newState.sitecore.route.name;
      this.link = `${env.legacyUrl}/tools/${tool}?web20=true`;
      if (newState.sitecore.route.fields.brandId === undefined) {
        this.isTab = true;
      }
      if (!this.isTab &&
        newState.sitecore.route.fields.brandId !== undefined &&
        this.rendering.fields.externalLink !== undefined
      ) {
        this.link = `${env.legacyUrl}/tools/${this.rendering.fields.externalLink['value']}?web20=true`;
      }
    });
  }

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event && event.data && event.data.Command) {
      const childEvent = event.data;
      console.log(`Received message from child:[${JSON.stringify(childEvent)}]`);
      switch (childEvent.Command) {
        case iframeCommand.NavigateToApplicationPage:
          if (childEvent.Data) {
            this.router.navigate(['/applications/single'], {
              queryParams: { appid: childEvent.Data.ApplicationID },
            });
          }
          break;
        case iframeCommand.NavigateToPartPage:
          if (childEvent.Data) {
            this.router.navigate(['/part'], {
              queryParams: { partNo: childEvent.Data.PartNumber },
            });
          }
          break;
        case iframeCommand.AddPartToCartByPartNumber:
          this.getPartByPartNo(childEvent.Data.PartNumber, +childEvent.Data.Quantity);
          break;
        case iframeCommand.OpenChat:
          this.openChat();
          break;
        default:
          break;
      }
    }
  };

  private openChat(): void {
    const element = document.getElementById(
      'comm100-button-4666'
    ) as HTMLElement;
    const iframe = element.firstElementChild;
    const innerDoc = iframe['contentDocument']
      ? iframe['contentDocument']
      : iframe['contentWindow'].document;
    const elementx = innerDoc.querySelectorAll('.chatButton');
    if (elementx && elementx.length) {
      elementx[0].click();
    }
  }

  private async getPartByPartNo(PartNumber: string[], Quantity: number) {

    if (!this.authService.hasValidToken()) {
      localStorage.setItem(this.toolStorageName, JSON.stringify(PartNumber));
      this.messageService.sendMessage({ showAuthPopup: true, route: this.router.url });
      return;
    }

    this.sharedService.startLoader();
    let partDetails: any;
    this.partService.v12PartsGet({ numbers: PartNumber }).subscribe(res => {
      this.sharedService.stopLoader();
      if (res) {
        partDetails = res[0];
        this.addToCart(partDetails.PartID, Quantity);
      }
    });
  }

  private async addToCart(PartId: number, Quantity: number) {
    if (!this.authService.hasValidToken()) {
      this.messageService.sendMessage({ showAuthPopup: true, route: `${this.router.url}?partId=${PartId}&qty=${Quantity}&cart=true` });
      return;
    }

    const data = [{
      PartID: PartId,
      Quantity: Quantity,
    }];
    this.sharedService.startLoader();
    this.cartService.v12CartDetailsByPartIdPost({ body: data }).subscribe(
      (res) => {
        this.sharedService.stopLoader();
        const cartDetail = res.Parts.filter((x) => x.Part.PartID === PartId)[0];
        this.googleEcommerceService.addToCart(cartDetail);
        const modalRef = this.modalService.open(CheckoutCartModalComponent, { size: 'lg', });
        modalRef.componentInstance.data = cartDetail;
        modalRef.componentInstance.promotions = res.Promotions;
      },
      (err) => {
        this.sharedService.stopLoader();
        this.sharedService.showError(err);
      }
    );
  }
}
