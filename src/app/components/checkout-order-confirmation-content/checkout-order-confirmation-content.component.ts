import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { OrderHeaderViewModel } from '../../api/phr-webapi/models/order-header-view-model';

@Component({
  selector: 'app-checkout-order-confirmation-content',
  templateUrl: './checkout-order-confirmation-content.component.html',
  styleUrls: ['./checkout-order-confirmation-content.component.css']
})
export class CheckoutOrderConfirmationContentComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  @Input() OrderHeader: OrderHeaderViewModel;

  constructor() { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('checkout-order-confirmation-content component initialized with component data', this.rendering);
  }
}
