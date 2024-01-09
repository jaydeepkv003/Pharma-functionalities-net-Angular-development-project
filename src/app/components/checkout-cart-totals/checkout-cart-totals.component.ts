import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { CartViewModel } from '../../api/phr-webapi/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from './../../_services/shared.service';
import { CartViewModelPromotion } from '../../api/phr-webapi/models/cart-view-model-promotion';

@Component({
  selector: 'app-checkout-cart-totals',
  templateUrl: './checkout-cart-totals.component.html',
  styleUrls: ['./checkout-cart-totals.component.scss']
})
export class CheckoutCartTotalsComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  @Input() cartContent: CartViewModel;
  @Input() activePromo: CartViewModelPromotion;
  @Input() quoteSuccess: boolean;
  @Input() quoteError: string;
  @Output() addQuoteToCart = new EventEmitter<any>();

  quoteForm: FormGroup;
  quoteIdSubmitted: boolean = false;
  quoteNumberAdded: string = null;

  constructor(private formBuilder: FormBuilder,
    public sharedService: SharedService) { }

  ngOnInit() {
    // remove this after implementation is done
    // console.log('checkout-cart-totals component initialized with component data', this.rendering);

    this.quoteForm = this.formBuilder.group({
      QuoteNumber: ['', Validators.required]
    });
  }

  get f() { return this.quoteForm.controls; }

  onSubmit() {
    this.quoteIdSubmitted = true;
    // stop here if form is invalid
    if (this.quoteForm.invalid) {
      return;
    }

    this.addQuoteToCart.emit(this.quoteForm.value);
    this.quoteNumberAdded = this.quoteForm.value.QuoteNumber;
  }
}
