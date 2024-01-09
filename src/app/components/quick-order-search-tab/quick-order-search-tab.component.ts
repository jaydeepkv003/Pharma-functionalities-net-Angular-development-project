import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../_services/shared.service';
import { CheckoutCartModalComponent } from '../checkout-cart-modal/checkout-cart-modal.component';
import { CartService } from './../../api/phr-webapi/services/cart.service';
import { PartService } from './../../api/phr-webapi/services/part.service';
import { MessageService } from './../../_services/message.service';
import { QuickorderService } from './../../_services/quickorder.service';
import { AuthService } from './../_core/auth.service';
import { GoogleEcommerceService } from '../../_services/google.ecommerce.service';
import { CartObjModel } from '../../models/common-models';

@Component({
  selector: 'app-quick-order-search-tab',
  templateUrl: './quick-order-search-tab.component.html',
  styleUrls: ['./quick-order-search-tab.component.scss'],
})
export class QuickOrderSearchTabComponent implements OnInit {
  public urlStr: string;
  public cartUrl: string;

  constructor(
    public sharedService: SharedService,
    public quickorderService: QuickorderService,
    private router: Router,
    private modalService: NgbModal,
    private authService: AuthService,
    private cartService: CartService,
    private messageService: MessageService,
    private partService: PartService,
    private googleEcommerceService: GoogleEcommerceService
  ) { }

  ngOnInit() {
    const cartObj = this.sharedService.getCartDetailFromSession('quick_order', this.router.url);
    if (cartObj) {
      if (cartObj.otherInfo) {
        this.quickorderService.searchKeyword = cartObj.otherInfo;
        this.quickorderService.onSearch();
      }
      setTimeout(() => this.addToCart(+cartObj.partId, cartObj.qty ? cartObj.qty : 1), 1000);
    }
  }

  partAddToCart(part: any) {
    this.sharedService.startLoader('loader-menu');
    this.partService.v12PartsGet({ numbers: [part.part_number.raw] }).subscribe(
      (res) => {
        this.sharedService.stopLoader('loader-menu');
        const partDetails = res[0];
        if (partDetails && partDetails.PartID) {
          part.qty = part.qty ? part.qty : 1;
          this.addToCart(partDetails.PartID, part.qty);
        }
      },
      (err) => {
        this.sharedService.stopLoader('loader-menu');
        console.log(err);
      }
    );
  }

  addToCart(partID: number, quantity: number) {
    if (!this.authService.hasValidToken()) {
      let cartObj: CartObjModel = {
        type: 'quick_order',
        partId: partID,
        qty: quantity,
        otherInfo: this.quickorderService.searchKeyword
      }
      this.messageService.sendMessage({ showAuthPopup: true, route: this.router.url, payload: cartObj });
      return;
    }

    const data = [{ PartID: partID, Quantity: quantity }];

    this.sharedService.startLoader('loader-menu');
    this.cartService.v12CartDetailsByPartIdPost({ body: data }).subscribe(
      (res) => {
        this.sharedService.stopLoader('loader-menu');
        const cartDetail = res.Parts.filter((x) => x.Part.PartID === partID)[0];
        this.googleEcommerceService.addToCart(cartDetail);
        const modalRef = this.modalService.open(CheckoutCartModalComponent, { size: 'lg' });
        modalRef.componentInstance.data = cartDetail;
        modalRef.componentInstance.promotions = res.Promotions;
      },
      (err) => {
        this.sharedService.stopLoader('loader-menu');
        this.sharedService.showError(err);
      }
    );
  }

  onChangeQty(item: any) {
    item.qty = item.qty > 0 ? item.qty : 1;
  }
}
