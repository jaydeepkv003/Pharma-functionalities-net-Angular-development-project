import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { SharedService } from '../../_services/shared.service';
import { CART_ROUTE } from '../../models/constants';

@Component({
  selector: 'app-checkout-breadcrumb',
  templateUrl: './checkout-breadcrumb.component.html',
  styleUrls: ['./checkout-breadcrumb.component.scss'],
})
export class CheckoutBreadcrumbComponent {
  @Input() rendering: ComponentRendering;
  @Output() reviewOrder = new EventEmitter<any>();
  navigations = [
    { url: '/cart', title: 'Cart' },
    { url: '/checkout/orderdetails', title: 'Billing and Shipping' },
    { url: '/checkout/review', title: 'Review Order', isReviewOrder: true },
  ];

  constructor(private router: Router, private sharedService: SharedService) { }

  isRouteActive(item) {
    return this.router.url.toLowerCase() == item.url.toLowerCase();
  }

  navigateTo(item) {
    if (this.router.url.startsWith(CART_ROUTE)) {
      return;
    }

    if (!item.isReviewOrder || (item.isReviewOrder && this.sharedService.checkoutForm)) {
      this.router.navigateByUrl(item.url);
    } else if (item.isReviewOrder && this.router.url.toLowerCase() !== '/checkout/orderdetails') {
      this.router.navigateByUrl('/checkout/orderdetails');
    } else {
      this.reviewOrder.emit();
    }
  }
}
