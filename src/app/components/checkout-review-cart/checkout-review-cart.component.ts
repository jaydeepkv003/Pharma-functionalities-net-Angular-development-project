import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { SharedService } from '../../_services/shared.service';
import { CartViewModel } from '../../api/phr-webapi/models';

@Component({
  selector: 'app-checkout-review-cart',
  templateUrl: './checkout-review-cart.component.html',
  styleUrls: ['./checkout-review-cart.component.scss']
})
export class CheckoutReviewCartComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  @Input() cartContent: CartViewModel;

  constructor(public sharedService: SharedService) { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('checkout-review-cart component initialized with component data', this.rendering);
  }
}
