import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { Subscription } from 'rxjs';
import { OrderService } from '../../api/phr-webapi/services';
import { OrderHeaderViewModel } from '../../api/phr-webapi/models/order-header-view-model';
import { SharedService } from '../../_services/shared.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-checkout-order-confirmation',
  templateUrl: './checkout-order-confirmation.component.html',
  styleUrls: ['./checkout-order-confirmation.component.scss']
})
export class CheckoutOrderConfirmationComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  orderHeaderViewModel: OrderHeaderViewModel;
  private contextSubscription: Subscription;
  orderHeadID: number;
  constructor(private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService) { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('checkout-order-confirmation component initialized with component data', this.rendering);

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.orderHeadID = params.orderid;
      if (this.orderHeadID) {
        this.getOrderDetail()
      }
    });
  }

  getOrderDetail() {
    this.sharedService.startLoader();
    this.contextSubscription = this.orderService.v12OrderOrderHeaderIdGet({ orderHeaderID: this.orderHeadID }).subscribe(res => {
      this.sharedService.stopLoader();
      this.orderHeaderViewModel = res;
    }, err => {
      this.sharedService.stopLoader();
    });
  }

  ngOnDestroy(): void {
    if (this.contextSubscription)
      this.contextSubscription.unsubscribe();
  }
}
