import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../_services/shared.service';
import { CartService } from '../../api/phr-webapi/services';
import { CartViewModelPromotion } from '../../api/phr-webapi/models';
import { PartViewModelExtended } from '../../models/webuser/PartViewModelExtended';
import { MessageService } from '../../_services/message.service';
import { CartViewModelPartDetailExtended } from '../../models/webuser/CartViewModelPartDetailExtended';
import { GoogleEcommerceService } from '../../_services/google.ecommerce.service';

@Component({
  selector: 'app-checkout-cart-modal',
  templateUrl: './checkout-cart-modal.component.html',
  styleUrls: ['./checkout-cart-modal.component.scss']
})
export class CheckoutCartModalComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  @Input() data;
  cartDetail: CartViewModelPartDetailExtended[] = [];
  promotions: CartViewModelPromotion[] = [];

  showAll = false;
  quantity: number;
  addRecommendedParts: number[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private cartService: CartService,
    public sharedService: SharedService,
    private messageService: MessageService,
    private googleEcommerceService: GoogleEcommerceService
  ) { }

  ngOnInit() {
    this.cartDetail = (this.data instanceof Array) ? this.data : [this.data];
    this.cartDetail.forEach(c => {
      c.Promotion = this.getPromotionDetail(c.PromotionID);
    });
    this.quantity = this.cartDetail.map(a => a.Quantity).reduce((a, b) => a + b);
    this.messageService.sendMessage({ checkForCartUpdate: true });
  }

  AddPartToCart(part: PartViewModelExtended) {
    const data = [{ 'PartID': part.PartID, 'Quantity': 1 }];
    this.sharedService.startLoader('loader-' + part.PartID);

    this.cartService.v12CartDetailsByPartIdPost({ body: data }).subscribe(res => {
      this.sharedService.stopLoader('loader-' + part.PartID);
      this.googleEcommerceService.addToCart(res.Parts.filter(x => x.Part.PartID === part.PartID)[0]);
      this.messageService.sendMessage({ checkForCartUpdate: true });
      this.addRecommendedParts.push(part.PartID);
    }, err => {
      this.sharedService.stopLoader('loader-' + part.PartID);
      this.sharedService.showError(err);
    });
  }

  getPromotionDetail(promotionID: number): CartViewModelPromotion {
    if (promotionID) {
      return this.promotions.filter(x => x.PromotionID == promotionID)[0];
    }
  }

  toggle() {
    this.showAll = !this.showAll;
  }
}
