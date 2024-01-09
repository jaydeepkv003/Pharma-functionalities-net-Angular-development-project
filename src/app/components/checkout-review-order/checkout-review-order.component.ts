import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { Subscription } from 'rxjs';
import { GoogleEcommerceService } from '../../_services/google.ecommerce.service';
import { CartViewModel, CartViewModelPromotion, CountryViewModel } from '../../api/phr-webapi/models';
import { BillingShippingService, CartService, OrderService } from '../../api/phr-webapi/services';
import { CreateOrderParamsExtended } from '../../models/webuser/CreateOrderParamsExtended';
import { SharedService } from '../../_services/shared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutOrderAddressModalComponent } from '../checkout-order-address-modal/checkout-order-address-modal.component';
import { CheckoutOrderContactModalComponent } from '../checkout-order-contact-modal/checkout-order-contact-modal.component';

@Component({
  selector: 'app-checkout-review-order',
  templateUrl: './checkout-review-order.component.html',
  styleUrls: ['./checkout-review-order.component.scss'],
})
export class CheckoutReviewOrderComponent implements OnInit, OnDestroy {
  @Input() rendering: ComponentRendering;
  public getCartubscription: Subscription;
  public orderSubscription: Subscription;
  activePromo: CartViewModelPromotion;
  cartContent: CartViewModel;
  checkoutForm: CreateOrderParamsExtended;
  applieditemlevelPromo: CartViewModelPromotion[] = [];
  countries: CountryViewModel[] = [];

  constructor(
    public sharedService: SharedService,
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
    private modalService: NgbModal,
    private billingShippingService: BillingShippingService,
    private googleEcommerceService: GoogleEcommerceService
  ) {
    this.checkoutForm = this.sharedService.checkoutForm;
    if (!this.checkoutForm) {
      this.router.navigate(['/checkout/orderdetails']);
    }
  }

  ngOnInit() {
    this.sharedService.startLoader();
    this.getCountry();
    this.getCartubscription = this.cartService.v12CartGet().subscribe(
      (res) => {
        this.sharedService.stopLoader();
        this.cartContent = res;
        this.activePromo = this.cartContent.Promotions.find(d => d.Active);
      },
      (err) => this.sharedService.stopLoader()
    );
  }

  getCountry() {
    this.billingShippingService.v12BillingShippingCountriesGet().subscribe(
      (res) => {
        this.countries = res;
      },
      (err) => {
        this.sharedService.stopLoader();
      }
    );
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

  placeOrder() {
    this.sharedService.startLoader();
    this.orderSubscription = this.orderService.v12OrderPost({ body: this.checkoutForm }).subscribe(
      (res) => {
        this.sharedService.stopLoader();
        this.sharedService.checkoutForm = null;
        this.googleEcommerceService.purchaseEvent(this.cartContent, res);
        this.googleEcommerceService.OrderCompleteEvent(this.cartContent, res);
        this.router.navigate(['/Checkout/Confirmation'], {
          queryParams: { orderid: res },
        });
      },
      (err) => {
        this.sharedService.stopLoader();
        this.sharedService.showError(err);
        console.log(err);
      }
    );
  }

  onEditAddress(type: 'Billing' | 'Shipping', address: any) {
    const addressModalRef = this.modalService.open(CheckoutOrderAddressModalComponent, { size: 'lg', windowClass: 'change-pop-up-size' });
    addressModalRef.componentInstance.type = type;
    addressModalRef.componentInstance.editAddress = address;
    addressModalRef.componentInstance.countries = this.countries;

    addressModalRef.componentInstance.onAddOrUpdateAddress.subscribe((d : any) => {
      if (d.type == 'Billing') {
        this.checkoutForm.BillTo.Address1 = d.address.Address1;
        this.checkoutForm.BillTo.Address2 = d.address.Address2;
        this.checkoutForm.BillTo.BillToId = null;
        this.checkoutForm.BillTo.City = d.address.City;
        this.checkoutForm.BillTo.Company = d.address.Company;
        this.checkoutForm.BillTo.CountryID = d.address.CountryID;
        this.checkoutForm.BillTo.Phone = d.address.Phone;
        this.checkoutForm.BillTo.State = d.address.State;
        this.checkoutForm.BillTo.Zip = d.address.Zip;
        this.checkoutForm.BillTo.Country = this.countries.find(country => country.CountryID === d.address.CountryID);

        if(this.checkoutForm.BillTo.BillToId){
          const index = this.sharedService.billToViewModel.findIndex(c => c.BillToID == this.checkoutForm.BillTo.BillToId);
          if(index !== -1){
            let billToAddress = this.sharedService.billToViewModel[index];
            billToAddress.Address1 = d.address.Address1;
            billToAddress.Address2 = d.address.Address2;
            billToAddress.BillToID = null;
            billToAddress.City = d.address.City;
            billToAddress.Company = d.address.Company;
            billToAddress.CountryID = d.address.CountryID;
            billToAddress.Phone = d.address.Phone;
            billToAddress.State = d.address.State;
            billToAddress.Zip = d.address.Zip;
            billToAddress.Country = this.countries.find(country => country.CountryID === d.address.CountryID).Name;
          }
        }

      } else {
        this.checkoutForm.ShipTo.Address1 = d.address.Address1;
        this.checkoutForm.ShipTo.Address2 = d.address.Address2;
        this.checkoutForm.ShipTo.Attention = d.address.Attention;
        this.checkoutForm.ShipTo.City = d.address.City;
        this.checkoutForm.ShipTo.Company = d.address.Company;
        this.checkoutForm.ShipTo.CountryID = d.address.CountryID;
        this.checkoutForm.ShipTo.Phone = d.address.Phone;
        this.checkoutForm.ShipTo.ShipToId =null;
        this.checkoutForm.ShipTo.State = d.address.State;
        this.checkoutForm.ShipTo.Zip = d.address.Zip;
        this.checkoutForm.ShipTo.Country = this.countries.find(country => country.CountryID === d.address.CountryID);
        if (this.checkoutForm.BillTo.BillToId && d.address.ShipToId) {
          const billToIndex = this.sharedService.billToViewModel.findIndex(c => c.BillToID == this.checkoutForm.BillTo.BillToId);
          if(billToIndex !== -1){
            let billToAddress = this.sharedService.billToViewModel[billToIndex];
            const shipToIndex = billToAddress.ShipTos.findIndex(c => c.ShipToID == d.address.ShipToId);
            if (shipToIndex != -1) {
              let shipToAddress = billToAddress.ShipTos[shipToIndex];
              shipToAddress.Address1 = d.address.Address1;
              shipToAddress.Address2 = d.address.Address2;
              shipToAddress.ShipToID = null;
              shipToAddress.City = d.address.City;
              shipToAddress.Company = d.address.Company;
              shipToAddress.CountryID = d.address.CountryID;
              shipToAddress.Phone = d.address.Phone;
              shipToAddress.State = d.address.State;
              shipToAddress.Zip = d.address.Zip;
              shipToAddress.Country = this.countries.find(country => country.CountryID === d.address.CountryID).Name;
              this.sharedService.checkoutForm.ShipTo.Attention = d.address.Attention;
            }
          }
        }
      }
    });
  }

  onEditContact() {
    const contactData = {
      ContactEmails: this.checkoutForm.ContactEmails,
      BillingPhone: this.checkoutForm.BillTo.Phone,
      ShippingPhone: this.checkoutForm.ShipTo.Phone
    };
    const contactModalRef = this.modalService.open(CheckoutOrderContactModalComponent, { size: 'lg', windowClass: 'change-pop-up-size' });
    contactModalRef.componentInstance.contactData = contactData;

    contactModalRef.componentInstance.onEditContact.subscribe((d : any) => {
      this.checkoutForm.ContactEmails = d.ContactEmails;
      this.checkoutForm.BillTo.Phone = d.BillingPhone;
      this.checkoutForm.ShipTo.Phone = d.ShippingPhone;
    });
  }

  ngOnDestroy(): void {
    if (this.getCartubscription) { this.getCartubscription.unsubscribe(); }
    if (this.orderSubscription) { this.orderSubscription.unsubscribe(); }
  }
}
