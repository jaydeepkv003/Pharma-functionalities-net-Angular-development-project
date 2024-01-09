import { Injectable, OnInit } from '@angular/core';
import { CartViewModel, CartViewModelPartDetail } from '../api/phr-webapi/models';
import { GoogleDataLayer } from '../models/googledatalayer/google-data-layer';
import { GoogleEcommerceItem } from '../models/googledatalayer/google-ecommerce-item';
export enum GoogleEcommerceEvents {
  SelectItem = 'select_item',
  ViewItem = 'view_item',
  AddToCart = 'add_to_cart',
  RemoveFromCart = 'remove_to_cart',
  Purchase = 'purchase',
  OrderComplete = 'orderComplete'
}

@Injectable({ providedIn: 'root' })

export class GoogleEcommerceService implements OnInit {
  constructor() { }

  ngOnInit(): void {
    window['dataLayer'] = window['dataLayer'] || [];
  }

  pushToGoogleDataLayer(data: GoogleDataLayer | any) {
    console.log(data, 'Google Datalayer Push');
    window['dataLayer'].push(data);
  }

  addEventToGoogleDataLayer(event: string, dataItem: GoogleEcommerceItem) {
    this.pushToGoogleDataLayer({ event: event, ecommerce: { currency: 'USD', items: [dataItem] } });
  }

  addToCart(cartDetail: CartViewModelPartDetail) {
    if (cartDetail) {
      this.pushToGoogleDataLayer({
        event: GoogleEcommerceEvents.AddToCart,
        ecommerce: {
          items: this.cartModeltoGoogleItem([cartDetail])
        }
      });
    }
  }

  removeFromCart(cartDetail: CartViewModelPartDetail) {
    if (cartDetail) {
      this.pushToGoogleDataLayer({
        event: GoogleEcommerceEvents.RemoveFromCart,
        ecommerce: {
          items: this.cartModeltoGoogleItem([cartDetail])
        }
      });
    }
  }

  purchaseEvent(cart: CartViewModel, orderid: any) {
    if (orderid) {
      this.pushToGoogleDataLayer({
        event: GoogleEcommerceEvents.Purchase,
        ecommerce: {
          value: cart.TotalAmount,
          transaction_id: orderid,
          items: this.cartModeltoGoogleItem(cart.Parts)
        }
      });
    }
  }

  OrderCompleteEvent(cart: CartViewModel, orderid: any) {
    if (orderid) {
      this.pushToGoogleDataLayer({
        event: GoogleEcommerceEvents.OrderComplete,
        orderValue: cart.TotalAmount,
        orderId: orderid,
        currency: 'USD'
      });
    }
  }

  cartModeltoGoogleItem(partList: CartViewModelPartDetail[]): GoogleEcommerceItem[] {
    const data: GoogleEcommerceItem[] = [];
    partList.forEach(cartDetail => {
      data.push({
        item_name: cartDetail.Part.PartNumber,
        item_id: cartDetail.Part.PartID,
        item_category: cartDetail.Part.BrandName,
        item_category2: cartDetail.Part.PhaseName,
        item_category3: cartDetail.Part.UOM,
        item_category4: cartDetail.Part.PhaseID,
        item_category5: cartDetail.Part.PhaseName,
        price: cartDetail.Part.Price,
        quantity: cartDetail.Quantity,
      });
    });
    return data;
  }
}
