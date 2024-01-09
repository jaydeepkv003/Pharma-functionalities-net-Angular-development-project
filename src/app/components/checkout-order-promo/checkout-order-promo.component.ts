import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { CartViewModel } from '../../api/phr-webapi/models/cart-view-model';
import { CartViewModelPromotion } from '../../api/phr-webapi/models/cart-view-model-promotion';

@Component({
  selector: 'app-checkout-order-promo',
  templateUrl: './checkout-order-promo.component.html',
  styleUrls: ['./checkout-order-promo.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        'max-height': '6000px', 'opacity': '1', 'visibility': 'visible'
      })),
      state('out', style({
        'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
      })),
      transition('in => out', [group([
        animate('600ms ease-in-out', style({
          'max-height': '0px'
        })),
        animate('300ms ease-in-out', style({
          'visibility': 'hidden'
        }))
      ]
      )]),
      transition('out => in', [group([
        animate('1ms ease-in-out', style({
          'visibility': 'visible'
        })),
        animate('600ms ease-in-out', style({
          'max-height': '6000px'
        })),
      ]
      )])
    ]),
  ]
})
export class CheckoutOrderPromoComponent implements OnInit {
  @Input() set cartContent(cardData: CartViewModel) {
    if (cardData && cardData.Promotions.length) {
      cardData.Promotions = cardData.Promotions.sort((x, y) => Number(y.Active) - Number(x.Active));
      this.cartContentDetails = cardData;
    }
  }

  @Input() activePromo: CartViewModelPromotion;
  cartContentDetails: CartViewModel;
  promotions: CartViewModelPromotion[];
  animationState = 'in';
  showMore = true;

  constructor() { }

  ngOnInit(): void { }



  toggleShowDiv() {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
  }

}
