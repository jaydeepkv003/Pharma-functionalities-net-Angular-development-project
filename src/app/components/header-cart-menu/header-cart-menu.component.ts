import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { SharedService } from '../../_services/shared.service';
import { CartViewModel, CartViewModelPromotion } from '../../api/phr-webapi/models';

@Component({
  selector: 'app-header-cart-menu',
  templateUrl: './header-cart-menu.component.html',
  styleUrls: ['./header-cart-menu.component.scss']
})
export class HeaderCartMenuComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  @Input() showCartMenu: boolean;
  @Input() cartDetail: CartViewModel;
  @Input() cartItemCount: number;

  appliedItemLevelPromo: CartViewModelPromotion[] = [];
  activePromo: CartViewModelPromotion;

  constructor(public sharedService: SharedService) { }

  ngOnInit() {
    if (this.cartDetail) {

      this.activePromo = this.cartDetail.Promotions.find(d => d.Active);

      this.cartDetail.Parts.forEach((item) => {
        this.cartItemCount += item.Quantity;
        if (item.PromotionID) {
          const promo: CartViewModelPromotion = this.cartDetail.Promotions.find(d => d.PromotionID == item.PromotionID && d.Active);
          if (!this.appliedItemLevelPromo.find(d => d.PromotionID == promo.PromotionID)) {
            this.appliedItemLevelPromo.push(promo);
          }
        }
      });
    }
  }
}
