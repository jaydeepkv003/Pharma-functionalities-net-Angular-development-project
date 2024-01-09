import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-checkout-order-contact-modal',
  templateUrl: './checkout-order-contact-modal.component.html',
  styleUrls: ['./checkout-order-contact-modal.component.scss']
})
export class CheckoutOrderContactModalComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  @Input() set contactData(data: any) {
    setTimeout(() => {
      this.initConatctForm(data);
    }, 200);
  }

  @Output() onEditContact = new EventEmitter<any>();

  contactForm: FormGroup;
  contactFormSubmitted: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('CheckoutOrderContactModal component initialized with component data', this.rendering);

    this.contactForm = this.formBuilder.group({
      ContactEmails: this.formBuilder.array([]),
      BillingPhone: ['', Validators.required],
      ShippingPhone: ['', Validators.required]
    });
  }

  initConatctForm(contactData: any) {
    contactData.ContactEmails.forEach((item: string, index: number) => {
      const control = <FormArray>this.contactForm.controls.ContactEmails;
      if (index == 0) {
        control.push(new FormControl(item, [Validators.required,Validators.email]));
      } else {
        control.push(new FormControl(item));
      }
    });

    this.contactForm.controls['BillingPhone'].setValue(contactData.BillingPhone);
    this.contactForm.controls['ShippingPhone'].setValue(contactData.ShippingPhone);
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.contactFormSubmitted = true;
    if (this.contactForm.valid) {
      this.onEditContact.emit(this.contactForm.value);
      this.activeModal.close();
    }
  }
}
