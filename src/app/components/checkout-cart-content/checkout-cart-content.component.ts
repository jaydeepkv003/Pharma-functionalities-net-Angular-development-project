import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { CartViewModelExtended } from '../../models/webuser/CartViewModelExtended';
import { CartViewModelPartDetail, PartViewModel } from '../../api/phr-webapi/models';
import { CartDetailViewModelExtended } from '../../models/webuser/CartDetailViewModelExtended';
import { CartViewModelPromotion } from '../../api/phr-webapi/models/cart-view-model-promotion';
import { SharedService } from '../../_services/shared.service';

@Component({
  selector: 'app-checkout-cart-content',
  templateUrl: './checkout-cart-content.component.html',
  styleUrls: ['./checkout-cart-content.component.scss']
})
export class CheckoutCartContentComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  @Input() cartContent: CartViewModelExtended;
  @Input() appliedItemLevelPromo: CartViewModelPromotion[] = [];
  @Output() removeItem = new EventEmitter<any>();
  @Output() updateQtyParams = new EventEmitter<any>();
  @Output() addRecommandedPartToCart = new EventEmitter<any>();

  showAll: boolean = false;

  constructor(public sharedService: SharedService) { }

  ngOnInit() {
    // remove this after implementation is done
    // console.log('checkout-cart-content component initialized with component data', this.rendering);
  }

  qtyChange(cartViewModelPartDetail: CartViewModelPartDetail) {
    if (cartViewModelPartDetail.Quantity > 0 && cartViewModelPartDetail.Quantity.toString().length <= 4) {
      this.updateQtyParams.emit({
        'CartDetailId': cartViewModelPartDetail.CartDetailID,
        'Quantity': cartViewModelPartDetail.Quantity
      });
    }
  }

  removeCartDetail(id, itemNumber: string, isPart: boolean) {
    this.removeItem.emit({ id: id, itemNumber: itemNumber, isPart: isPart });
  }

  toggle(detail: CartDetailViewModelExtended) {
    detail.showAllParts = !detail.showAllParts;
  }

  AddRecommandedPartToCart(rp: PartViewModel) {
    this.addRecommandedPartToCart.emit([{
      'PartID': rp.PartID,
      'Quantity': 1
    }]);
  }
}
