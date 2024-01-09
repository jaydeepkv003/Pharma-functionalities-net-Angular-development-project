import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-checkout-contact-check-modal',
  templateUrl: './checkout-contact-check-modal.component.html',
  styleUrls: ['./checkout-contact-check-modal.component.css']
})
export class CheckoutContactCheckModalComponent {
  @Input() rendering: ComponentRendering;

  constructor(public activeModal: NgbActiveModal) { }
}
