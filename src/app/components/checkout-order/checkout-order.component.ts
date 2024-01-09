import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { CartService } from '../../api/phr-webapi/services';
import { Subscription } from 'rxjs';
import { CartViewModel } from '../../api/phr-webapi/models';
import { SharedService } from '../../_services/shared.service';
import { MessageService } from '../../_services/message.service';
import { CartViewModelPromotion } from '../../api/phr-webapi/models/cart-view-model-promotion';
import { GoogleEcommerceService } from '../../_services/google.ecommerce.service';

@Component({
  selector: 'app-checkout-order',
  templateUrl: './checkout-order.component.html',
  styleUrls: ['./checkout-order.component.scss']
})
export class CheckoutOrderComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  private contextSubscription$: Subscription[] = [];
  private contextCartDetailIdPutSubscription: Subscription;
  private contextCartDetailDeleteSubscription: Subscription;
  private contextCartDetailPostSubscription: Subscription;

  cartContent: CartViewModel;
  cartItemCount: number = 0;
  quoteSuccess?: boolean = null;
  quoteError?: string;
  loaded: boolean = false;
  discountAmount: number;
  applieditemlevelPromo: CartViewModelPromotion[] = [];
  activePromo: CartViewModelPromotion;

  constructor(private cartService: CartService,
    public sharedService: SharedService,
    private messageService: MessageService,
    private googleEcommerceService: GoogleEcommerceService
  ) { }

  ngOnInit() {
    this.loaded = false;
    this.sharedService.startLoader();
    this.contextSubscription$.push(this.cartService.v12CartGet().subscribe(res => {
      this.sharedService.stopLoader();
      this.cartContent = res;
      this.discountAmount = this.cartContent.TotalDiscountAmount;
      this.updateCartTotalQuantity(res);
    }, err => {
      this.sharedService.stopLoader();
      this.sharedService.showError(err);
    }));
  }

  updateQuantity(data: any) {
    this.loaded = false;
    this.sharedService.startLoader();
    this.contextCartDetailIdPutSubscription = this.cartService.v12CartDetailCartDetailIdPut({ cartDetailId: data.CartDetailId, body: { Quantity: data.Quantity } }).subscribe(res => {
      this.sharedService.stopLoader();
      this.cartContent = res;
      this.updateCartTotalQuantity(res);
      this.onSaveMore();
      this.messageService.sendMessage({ checkForCartUpdate: true });
    }, err => {
      this.sharedService.stopLoader();
      this.sharedService.showError(err);
    });
  }

  removeItem(itemDetail: any) {
    this.loaded = false;
    this.sharedService.startLoader();
    this.contextCartDetailDeleteSubscription = this.cartService.v12CartDetailCartDetailIdDelete({ cartDetailId: itemDetail.id }).subscribe(res => {
      this.sharedService.stopLoader();
      const cartDetail = this.cartContent.Parts.filter(x => x.CartDetailID === itemDetail.id)[0];
      this.googleEcommerceService.removeFromCart(cartDetail);
      this.cartContent = res;
      this.updateCartTotalQuantity(res);
      this.messageService.sendMessage({ checkForCartUpdate: true });
      if (itemDetail.isPart) {
        this.sharedService.showSuccess(`Part ${itemDetail.itemNumber} has been removed from your Cart.`);
      } else {
        this.sharedService.showSuccess(`Quote Number ${itemDetail.itemNumber} has been removed from your Cart.`);
      }
    }, err => {
      this.sharedService.stopLoader();
      this.sharedService.showError(err);
    });
  }

  addRecommandedPartToCart(data: any) {
    this.loaded = false;
    this.sharedService.startLoader();
    this.contextCartDetailPostSubscription = this.cartService.v12CartDetailsByPartIdPost({ body: data }).subscribe(res => {
      this.sharedService.stopLoader();
      this.googleEcommerceService.addToCart(res.Parts.filter(x => x.Part.PartID === data[0].PartID)[0]);
      this.cartContent = res;
      this.updateCartTotalQuantity(res);
      this.onSaveMore();
      this.messageService.sendMessage({ checkForCartUpdate: true });
    }, err => {
      this.sharedService.stopLoader();
      this.sharedService.showError(err);
    });
  }

  managePromotion() {
    if (this.cartContent.Promotions && this.cartContent.Promotions.length) {
      this.activePromo = this.cartContent.Promotions.find(d => d.Active);
      if (this.cartContent.Gifts && this.cartContent.Gifts.length) {
        this.cartContent.Gifts.forEach((gift) => {
          if (!this.cartContent.Promotions.find(d => d.PromotionID == gift.Part.PartID)) {
            const giftPromo: CartViewModelPromotion = { PromotionID: gift.Part.PartID, Active: true, Name: 'Freebie (Gift) promotion', Description: gift.Part.Description };
            this.cartContent.Promotions.push(giftPromo);
          }
        });
      }
      this.cartContent.Parts.forEach((item) => {
        if (item.PromotionID) {
          const promo: CartViewModelPromotion = this.cartContent.Promotions.find(d => d.PromotionID == item.PromotionID && d.Active);
          if (!this.applieditemlevelPromo.find(d => d.PromotionID == promo.PromotionID)) {
            this.applieditemlevelPromo.push(promo);
          }
        }
      })
    }
  }

  addQuoteToCart(data: any) {
    this.quoteError = "";
    this.loaded = false;
    this.sharedService.startLoader();
    this.cartService.v12CartDetailByQuoteNumberPost({ body: data }).subscribe(res => {
      this.quoteSuccess = true;
      this.sharedService.stopLoader();
      this.cartContent = res;
      this.updateCartTotalQuantity(res);
      this.messageService.sendMessage({ checkForCartUpdate: true });
    }, err => {
      console.error('Cart Error5', err);
      this.quoteSuccess = false;
      if (err.status === 404) {
        this.quoteError = "Invalid Quote Number";
      } else if (err.status === 400) {
        this.quoteError = "Invalid Quote Number: Quote Expired";
      } else {
        this.sharedService.showError(err);
      }
      this.sharedService.stopLoader();
    });
  }

  updateCartTotalQuantity(res: CartViewModel) {
    setTimeout(() => {
      this.loaded = true;
    }, 1000);
    this.cartItemCount = 0;
    res.Parts.map(x => x.Quantity).forEach(qty => {
      this.cartItemCount += qty;
    });

    if (this.sharedService.feature.Promotions) {
      this.managePromotion();
    }
  }

  onSaveMore() {
    if (this.sharedService.feature.Promotions && this.discountAmount < this.cartContent.TotalDiscountAmount) {
      this.sharedService.showSuccess('Congrats you’ve saved even more.');
    }
    this.discountAmount = this.cartContent.TotalDiscountAmount;
  }

  ngOnDestroy(): void {
    this.contextSubscription$.forEach(element => {
      element.unsubscribe();
    });

    if (this.contextCartDetailPostSubscription) {
      this.contextCartDetailPostSubscription.unsubscribe();
    }
    if (this.contextCartDetailDeleteSubscription) {
      this.contextCartDetailDeleteSubscription.unsubscribe();
    }
    if (this.contextCartDetailIdPutSubscription) {
      this.contextCartDetailIdPutSubscription.unsubscribe();
    }
  }
}
