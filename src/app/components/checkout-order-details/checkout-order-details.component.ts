import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { ErrorSummaryModel } from '../../models/webuser/ErrorSummaryModel';
import {
  DeliveryTimeViewModel,
  WebUserViewModel
} from '../../api/phr-webapi/models';
import { BillToViewModel } from '../../api/phr-webapi/models/bill-to-view-model';
import { CountryViewModel } from '../../api/phr-webapi/models/country-view-model';
import { ShipToViewModel } from '../../api/phr-webapi/models/ship-to-view-model';
import { WebUserService } from '../../api/phr-webapi/services';
import { BillingShippingService } from '../../api/phr-webapi/services/billing-shipping.service';
import { SharedService } from '../../_services/shared.service';
import { ValidationSummaryModalComponent } from '../validation-summary-modal/validation-summary-modal.component';
import { CHECKOUT_ERROR_MODAL } from '../../models/constants';
import { COUNTRIES } from '../../models/app-constants';
import { CheckoutOrderAddressModalComponent } from '../checkout-order-address-modal/checkout-order-address-modal.component';
@Component({
  selector: 'app-checkout-order-details',
  templateUrl: './checkout-order-details.component.html',
  styleUrls: ['./checkout-order-details.component.scss'],
})
export class CheckoutOrderDetailsComponent implements OnInit {
  @Input() rendering: ComponentRendering;

  public countries: CountryViewModel[] = [];
  public billStates: string[] = [];
  public shipStates: string[] = [];
  public webUser: WebUserViewModel = {};
  public showNewBillingAddress = false;
  public showNewShippingAddress = false;
  public checkoutFormSubmitted = false;
  public showCreditCardForm = false;
  public showPO = true;
  public creditCardVerified = false;

  public apiCallCounter = 0;

  public billToViewModel: BillToViewModel[];
  public deliveryTimeViewModel: DeliveryTimeViewModel[];
  public selectedBillingAddress: BillToViewModel;
  public selectedShippingAddress: ShipToViewModel;
  public checkoutForm: FormGroup;
  public contactEmails: FormArray;
  public backupAddress: BillToViewModel[] = [];
  public selectedBillToId: number = 0;
  public selectedShipToId: number = 0;

  public preFilledDeliveryTimeID = 0;
  public isDeliveryTimeLoaded = false;
  public routeURL = {};

  public isDeliveryTimeFieldError = false;
  public isPurchaseOrderSelected = true;
  public attention : string;

  public errorList: ErrorSummaryModel[] = [];

  constructor(
    private billingShippingService: BillingShippingService,
    private webUserService: WebUserService,
    private sharedService: SharedService,
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private scrollToService: ScrollToService
  ) { }

  addShippingInstruction = false;
  isCcVerifyForm = false;

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      ContactEmails: this.formBuilder.array([]),
      BillTo: this.formBuilder.group({
        DefaultBillToId: [''],
        BillToId: [''],
        Company: ['', Validators.required],
        Address1: ['', Validators.required],
        Address2: [''],
        City: ['', Validators.required],
        Zip: ['', Validators.required],
        State: ['', Validators.compose([Validators.required, Validators.pattern('^[^0-9]*$')])],
        CountryID: ['', Validators.required],
        Phone: ['']
      }),
      ShipTo: this.formBuilder.group({
        Attention: ['', Validators.required],
        DefaultShipToId: [''],
        ShipToId: [''],
        Company: [''],
        Address1: ['', Validators.required],
        Address2: [''],
        City: ['', Validators.required],
        Zip: ['', Validators.required],
        State: ['', [Validators.required, Validators.pattern('^[^0-9]*$')]],
        CountryID: ['', Validators.required],
        Phone: ['']
      }),
      PartialOK: [true, Validators.required],
      DeliveryTimeID: ['', Validators.required],
      CarrierNumber: [''],
      ShippingInstructions: [''],
      PaymentInfo: this.formBuilder.group({
        PONumber: ['', Validators.required],
        CreditCardID: [''],
      }),
    });
    this.initLoad();
  }

  initLoad() {
    this.apiCallCounter = 0;
    this.sharedService.startLoader();
    this.billingShippingService.v12BillingShippingAddressesGet().subscribe(
      (res) => {
        this.apiCallCounter++;
        this.billToViewModel = res;
        this.backupAddress = JSON.parse(JSON.stringify(res));
        this.preFillForm();
      },
      (err) => {
        this.sharedService.stopLoader();
      }
    );

    this.billingShippingService.v12BillingShippingCountriesGet().subscribe(
      (res) => {
        this.apiCallCounter++;
        this.countries = res;
        this.preFillForm();
      },
      (err) => {
        this.sharedService.stopLoader();
      }
    );

    this.webUserService.v12WebUserGet().subscribe((res) => {
      this.apiCallCounter++;
      this.webUser = res;
      this.preFillForm();
    }, (err) => {
      this.sharedService.stopLoader();
    });

    this.checkoutForm.get('BillTo').get('CountryID')!.valueChanges.subscribe(countryId => {
      this.checkoutForm.get('BillTo').get('State').reset();
      this.billStates = [];
      if (countryId) {
        let country = COUNTRIES.find(y => y.id === countryId);
        if (country) {
          this.billStates = country.states;
        }
      }
    });

    this.checkoutForm.get('ShipTo').get('CountryID')!.valueChanges.subscribe(countryId => {
      this.checkoutForm.get('ShipTo').get('State').reset();
      this.shipStates = [];
      this.checkoutForm.get('DeliveryTimeID').reset();
      this.deliveryTimeViewModel = [];
      if (countryId) {
        this.shippingCountryChange(countryId);
        let country = COUNTRIES.find(y => y.id === countryId);
        if (country) {
          this.shipStates = country.states;
        }
      }
    });
  }

  get f() {
    return this.checkoutForm.controls;
  }

  preFillForm() {
    if (this.apiCallCounter < 3) {
      return;
    }
    this.sharedService.stopLoader();

    // If service variable has the checkout form
    if (this.sharedService.checkoutForm) {
      this.preFilledDeliveryTimeID = this.sharedService.checkoutForm.DeliveryTimeID;
      this.setDefaultBillingAddress(this.billToViewModel);

      if (this.sharedService.checkoutForm.BillTo.BillToId) {
        const billAddress = this.billToViewModel.filter(
          (x) => x.BillToID === this.sharedService.checkoutForm.BillTo.BillToId
        )[0];
        this.selectBillTo(billAddress);

        if (this.sharedService.checkoutForm.ShipTo.ShipToId) {
          const shipAddress = billAddress.ShipTos.filter(
            (x) =>
              x.ShipToID === this.sharedService.checkoutForm.ShipTo.ShipToId
          )[0];
          this.selectShipTo(shipAddress);
        } else if (this.sharedService.checkoutForm.ShipTo) {
          this.createNewShippingAddress();
          this.shippingCountryChange(this.sharedService.checkoutForm.ShipTo.CountryID);
        }
      }

      if (
        !this.sharedService.checkoutForm.BillTo.BillToId &&
        this.sharedService.checkoutForm.ShipTo &&
        this.sharedService.checkoutForm.ShipTo.CountryID
      ) {
        this.shippingCountryChange(this.sharedService.checkoutForm.ShipTo.CountryID);
      }

      this.sharedService.checkoutForm.ContactEmails.forEach((email) => {
        this.addContactEmail(email);
      });

      if (this.sharedService.billToViewModel.length) {
        this.billToViewModel = JSON.parse(JSON.stringify(this.sharedService.billToViewModel));
        this.selectedBillToId = this.sharedService.selectedAddress.billToId;
        this.selectedShipToId = this.sharedService.selectedAddress.shipToId;
        this.attention = this.sharedService.checkoutForm.ShipTo.Attention;
        this.selectedBillingAddress = this.billToViewModel.find(d => d.BillToID == this.selectedBillToId);
        this.shippingCountryChange(this.sharedService.checkoutForm.ShipTo.CountryID);
      }

      this.checkoutForm.patchValue(this.sharedService.checkoutForm);
      setTimeout(() => {
        if (this.sharedService.checkoutForm.BillTo) {
          this.checkoutForm.get('BillTo').get('State').patchValue(this.sharedService.checkoutForm.BillTo.State);
          this.checkoutForm.get('ShipTo').get('State').patchValue(this.sharedService.checkoutForm.ShipTo.State);
        }
        this.sharedService.checkoutForm = null;
        this.sharedService.billToViewModel = [];
        this.sharedService.selectedAddress = { billToId: 0, shipToId: 0 };
      }, 500);

      this.creditCardVerified = this.sharedService.checkoutForm && this.sharedService.checkoutForm.PaymentInfo.CreditCardID ? true : false;
      if (this.creditCardVerified) {
        this.showPO = !this.creditCardVerified;
        this.setCCRequired();
      }
    } else {
      if (this.billToViewModel.length === 0) {
        this.setAddressFromUserInfo();
      } else {
        this.setDefaultBillingAddress(this.billToViewModel, true);
      }
      this.addContactEmail(this.webUser.Email);
    }
  }

  addContactEmail(email: string) {
    const control = <FormArray>this.checkoutForm.controls.ContactEmails;
    let controlv: any;
    if(control.controls && control.controls.length > 0) {
      controlv = new FormControl(email);
    } else {
      controlv = new FormControl(email, [
        Validators.required,
        Validators.email,
      ]);
    }
    control.push(controlv);
  }

  deleteContactEmail(index) {
    const control = <FormArray>this.checkoutForm.controls.ContactEmails;
    control.removeAt(index);
  }

  /// Billing address methods
  copyToBillingAddress() {
    const billTo = {
      Company: this.webUser.Company,
      Address1: this.webUser.CompanyAddress,
      Address2: this.webUser.CompanyAddress2,
      City: this.webUser.City,
      State: this.webUser.State,
      Zip: this.webUser.ZipCode,
      CountryID: this.webUser.CountryID,
      Phone: this.webUser.WorkPhone,
    };
    this.checkoutForm.controls['BillTo'].patchValue(billTo);
    setTimeout(() => {
      this.checkoutForm.get('BillTo').get('State').patchValue(billTo.State);
    }, 500);
  }
  createNewBillingAddress() {
    this.deliveryTimeViewModel = [];
    this.showNewBillingAddress = true;
    this.selectedBillingAddress = null;
    this.checkoutForm.controls['BillTo'].reset();
    this.addBillingAddressValidators();
    this.createNewShippingAddress();
  }
  addBillingAddressValidators() {
    this.checkoutForm.get('BillTo').get('Company').setValidators([Validators.required]);
    this.checkoutForm.get('BillTo').get('Address1').setValidators([Validators.required]);
    this.checkoutForm.get('BillTo').get('City').setValidators([Validators.required]);
    this.checkoutForm.get('BillTo').get('State').setValidators([Validators.required, Validators.pattern('^[^0-9]*$')]);
    this.checkoutForm.get('BillTo').get('Zip').setValidators([Validators.required]);
    this.checkoutForm.get('BillTo').get('CountryID').setValidators([Validators.required]);

    this.checkoutForm.get('BillTo').get('BillToId').clearValidators();
    this.checkoutForm.get('BillTo').get('BillToId').updateValueAndValidity();
  }

  cancelBillingAddress() {
    this.showNewBillingAddress = false;
    this.removeBillingAddressValidators();
    this.cancelShippingAddress();
  }
  removeBillingAddressValidators() {
    this.checkoutForm.get('BillTo').get('Company').clearValidators();
    this.checkoutForm.get('BillTo').get('Address1').clearValidators();
    this.checkoutForm.get('BillTo').get('City').clearValidators();
    this.checkoutForm.get('BillTo').get('State').clearValidators();
    this.checkoutForm.get('BillTo').get('Zip').clearValidators();
    this.checkoutForm.get('BillTo').get('CountryID').clearValidators();
    this.checkoutForm.get('BillTo').get('Phone').clearValidators();

    this.checkoutForm.get('BillTo').get('BillToId').updateValueAndValidity();
  }
  shippingCountryChange(CountryID: number) {
    this.deliveryTimeViewModel = [];
    this.isDeliveryTimeFieldError = false;
    this.isDeliveryTimeLoaded = false;
    this.checkoutForm.controls.DeliveryTimeID.setValue('');
    this.billingShippingService
      .v12BillingShippingDeliveryTimesGet({ countryID: CountryID })
      .subscribe(
        (res) => {
          this.isDeliveryTimeLoaded = true;
          this.deliveryTimeViewModel = res;
        },
        (err) => { this.isDeliveryTimeLoaded = true; }
      );
  }
  selectBillTo(billAddress: BillToViewModel) {
    this.cancelBillingAddress();
    this.addBillingAddressValidators();
    this.selectedBillingAddress = billAddress;
    if (!billAddress) {
      return;
    }
    this.selectedBillToId = billAddress.BillToID;
    let billToId = null;
    if (billAddress.BillToID > 0 && this.backupAddress.length) {
      billToId = (this.backupAddress.find(d => d.BillToID == billAddress.BillToID)) ? billAddress.BillToID : null;
    }

    const billTo = {
      BillToId: billToId,
      Company: billAddress.Company,
      Address1: billAddress.Address1,
      Address2: billAddress.Address2,
      City: billAddress.City,
      State: billAddress.State,
      Zip: billAddress.Zip,
      CountryID: billAddress.CountryID,
      Phone: billAddress.Phone,
    };
    this.checkoutForm.controls['BillTo'].patchValue(billTo);
    setTimeout(() => {
      this.checkoutForm.get('BillTo').get('State').patchValue(billTo.State);
    }, 500);

    if (billAddress.ShipTos.length > 0) {
      const defaultShipAddress = billAddress.ShipTos.filter(x => x.IsDefault)[0];
      if (defaultShipAddress) {
        this.selectShipTo(defaultShipAddress);
      }
    }

    if (billTo.BillToId && this.billToViewModel.find(d => d.BillToID == billTo.BillToId && !d.IsDefault)) {
      this.updateDefaultBillingAddress(billTo.BillToId);
    }
  }
  updateDefaultBillingAddress(billToID: number) {
    this.billingShippingService.v12BillingShippingBillToBillToIdSetDefaultPut({ billToID: billToID }).subscribe(res => {
      this.checkoutForm.get('BillTo').get('DefaultBillToId').setValue(billToID);
    }, err => { })
  }
  setDefaultBillingAddress(
    billToViewModel: BillToViewModel[],
    selectDefaultAddress: boolean = false
  ) {
    // Set default billing
    if (billToViewModel.length > 0) {
      const defaultBillAddress = billToViewModel.filter((x) => x.IsDefault)[0];
      if (defaultBillAddress) {
        this.checkoutForm.get('BillTo').get('DefaultBillToId').setValue(defaultBillAddress.BillToID);
        if (selectDefaultAddress) {
          this.selectBillTo(defaultBillAddress);
        }
        this.setDefaultShippingAddress(
          defaultBillAddress.ShipTos,
          selectDefaultAddress
        );
      }
    }
  }
  setDefaultShippingAddress(
    shipToViewModel: ShipToViewModel[],
    selectDefaultAddress: boolean = false
  ) {
    // Set default shipping
    if (shipToViewModel.length > 0) {
      const defaultShipAddress = shipToViewModel.filter((x) => x.IsDefault)[0];
      if (defaultShipAddress) {
        this.checkoutForm.get('ShipTo').get('DefaultShipToId').setValue(defaultShipAddress.ShipToID);
        if (selectDefaultAddress) {
          this.selectShipTo(defaultShipAddress);
        }
      }
    }
  }

  /// Shipping Address methods
  copyToShippingingAddress() {
    this.checkoutForm.controls['ShipTo'].patchValue(this.checkoutForm.value.BillTo);
    setTimeout(() => {
      this.checkoutForm.get('ShipTo').get('State').patchValue(this.checkoutForm.value.BillTo.State);
    }, 500);
    this.shippingCountryChange(this.checkoutForm.value.BillTo.CountryID);
  }
  createNewShippingAddress() {
    this.showNewShippingAddress = true;
    this.selectedShippingAddress = null;
    this.deliveryTimeViewModel = [];
    // this.checkoutForm.controls['ShipToID'].reset();
    this.checkoutForm.controls['ShipTo'].reset();
    this.addShippingAddressValidators();
    if (this.webUser) {
      this.checkoutForm.get('ShipTo').get('Attention').setValue(this.webUser.FirstName);
    }
  }
  addShippingAddressValidators() {
    this.checkoutForm.get('ShipTo').get('Address1').setValidators([Validators.required]);
    this.checkoutForm.get('ShipTo').get('City').setValidators([Validators.required]);
    this.checkoutForm.get('ShipTo').get('State').setValidators([Validators.required, Validators.pattern('^[^0-9]*$')]);
    this.checkoutForm.get('ShipTo').get('Zip').setValidators([Validators.required]);
    this.checkoutForm.get('ShipTo').get('CountryID').setValidators([Validators.required]);

    this.checkoutForm.get('ShipTo').get('ShipToId').clearValidators();
    this.checkoutForm.get('ShipTo').get('ShipToId').updateValueAndValidity();
  }
  cancelShippingAddress() {
    this.showNewShippingAddress = false;
    this.removeShippingAddressValidators();
  }
  removeShippingAddressValidators() {
    this.checkoutForm.get('ShipTo').get('Company').clearValidators();
    this.checkoutForm.get('ShipTo').get('Address1').clearValidators();
    this.checkoutForm.get('ShipTo').get('City').clearValidators();
    this.checkoutForm.get('ShipTo').get('State').clearValidators();
    this.checkoutForm.get('ShipTo').get('Zip').clearValidators();
    this.checkoutForm.get('ShipTo').get('CountryID').clearValidators();
    this.checkoutForm.get('ShipTo').get('Phone').clearValidators();

    this.checkoutForm.get('ShipTo').get('ShipToId').updateValueAndValidity();
  }
  selectShipTo(shipAddress: ShipToViewModel, attention: string = '') {
    this.cancelShippingAddress();
    this.addShippingAddressValidators();
    this.selectedShippingAddress = shipAddress;

    if (!shipAddress) {
      return;
    }

    this.selectedShipToId = shipAddress.ShipToID;
    let backupShipTo = this.backupAddress.find(d => d.BillToID == this.selectedBillingAddress.BillToID);
    let shipToId = null;
    if (shipAddress.ShipToID > 0 && backupShipTo && backupShipTo.ShipTos.length) {
      shipToId = (backupShipTo.ShipTos.find(d => d.ShipToID == shipAddress.ShipToID)) ? shipAddress.ShipToID : null;
    }

    const shipTo = {
      Attention: attention ? attention : this.webUser ? this.webUser.FirstName : '',
      ShipToId: shipToId,
      Company: shipAddress.Company,
      Address1: shipAddress.Address1,
      Address2: shipAddress.Address2,
      City: shipAddress.City,
      State: shipAddress.State,
      Zip: shipAddress.Zip,
      CountryID: shipAddress.CountryID,
      Phone: shipAddress.Phone,
    };
    this.checkoutForm.controls['ShipTo'].patchValue(shipTo);
    setTimeout(() => {
      this.checkoutForm.get('ShipTo').get('State').patchValue(shipTo.State);
    }, 500);
    this.checkoutForm.get('ShipTo').get('Attention').patchValue(shipTo.Attention);
    this.shippingCountryChange(shipTo.CountryID);
    if (shipTo.ShipToId && this.selectedBillingAddress.ShipTos.find(d => d.ShipToID == shipTo.ShipToId && !d.IsDefault)) {
      this.updateDefaultShippingAddress(shipTo.ShipToId);
    }
  }
  updateDefaultShippingAddress(shipToID: number) {
    this.billingShippingService.v12BillingShippingShipToShipToIdSetDefaultPut({ shipToID: shipToID }).subscribe(res => {
      this.checkoutForm.get('ShipTo').get('DefaultShipToId').setValue(shipToID);
    }, err => { })
  }

  paymentMethodChange(method, $event: MatRadioChange) {
    if (method === 'C' && $event.source.checked) {
      this.showPO = false;
      this.setCCRequired();
    } else if (method === 'P' && $event.source.checked) {
      this.showPO = true;
      this.setPORequired();
    } else {
      this.showPO = true;
    }
  }

  setPORequired() {
    this.checkoutForm.get('PaymentInfo').get('CreditCardID').clearValidators();
    this.checkoutForm.get('PaymentInfo').get('CreditCardID').updateValueAndValidity();
    this.checkoutForm
      .get('PaymentInfo')
      .get('PONumber')
      .setValidators([Validators.required]);
    this.checkoutForm
      .get('PaymentInfo')
      .get('PONumber')
      .updateValueAndValidity();
  }

  setCCRequired() {
    this.checkoutForm.get('PaymentInfo').get('PONumber').clearValidators();
    this.checkoutForm.get('PaymentInfo').get('PONumber').updateValueAndValidity();
    this.checkoutForm
      .get('PaymentInfo')
      .get('CreditCardID')
      .setValidators([Validators.required]);
    this.checkoutForm
      .get('PaymentInfo')
      .get('CreditCardID')
      .updateValueAndValidity();
  }

  onSubmit() {
    this.checkoutFormSubmitted = true;

    // stop here if form is invalid
    if (this.checkoutForm.invalid) {
      let invalidControls = [];
      this.findInvalidControls(this.checkoutForm, invalidControls);
      this.generateErrorMessages(invalidControls);
      this.triggerScrollTo(invalidControls[0].id);
      return;
    }

    var emailArray = this.checkoutForm.controls['ContactEmails'] as FormArray;
    for(var i=0;i<emailArray.controls.length;i++){
      if(!emailArray.controls[i].value || emailArray.controls[i].value.trim().length===0){
        emailArray.removeAt(i);
        i--;
      }
    }

    this.sharedService.checkoutForm = this.checkoutForm.value;
    this.sharedService.billToViewModel = JSON.parse(JSON.stringify(this.billToViewModel));
    this.sharedService.selectedAddress = { billToId: this.selectedBillToId, shipToId: this.selectedShipToId };
    this.sharedService.checkoutForm.BillTo.Country = this.countries
      .find((x) => x.CountryID === this.sharedService.checkoutForm.BillTo.CountryID);
    this.sharedService.checkoutForm.ShipTo.Country = this.countries
      .find((x) => x.CountryID === this.sharedService.checkoutForm.ShipTo.CountryID);
    this.sharedService.checkoutForm.DeliveryTimeViewModel = this.deliveryTimeViewModel
      .find((x) => x.DeliveryTimeID === this.sharedService.checkoutForm.DeliveryTimeID);
    this.sharedService.checkoutForm.WebUser = this.webUser;
    this.sharedService.checkoutForm.ShipTo.Attention = this.checkoutForm.value.ShipTo.Attention;
    this.router.navigate(['/checkout/review']);
  }

  triggerScrollTo(id) {
    const config: ScrollToConfigOptions = {
      target: id,
      offset: -10
    };
    this.scrollToService.scrollTo(config).subscribe(
      value => { },
      err => console.error(err) // Error is caught and logged instead of thrown
    );
  }

  public findInvalidControls(form: FormGroup | FormArray, invalidControls: any[], parentControlName: string = '') {
    const controls = form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        if ((form.controls[name] as FormGroup).controls) {
          this.findInvalidControls(form.controls[name] as FormGroup, invalidControls, name);
        } else {
          let id = name;
          if (parentControlName) {
            id = `${parentControlName}-${name}`;
          }
          invalidControls.push({ groupName: parentControlName, id: id, control: controls[name] });
        }
      }
    }
  }

  generateErrorMessages(invalidControls: any[]) {
    this.errorList = [];
    var errorToPush: ErrorSummaryModel = { groupName: 'Contact Information', validations: [] };
    var subFormGroup = this.checkoutForm.get('ContactEmails');
    if (subFormGroup.invalid) {
      (<FormArray>this.checkoutForm.controls.ContactEmails).controls.forEach(control => {
        this.checkEmailRequired(control as FormControl, errorToPush.validations);
      });
      this.errorList.push(errorToPush);
    }

    this.validateBillingShipping('Billing Information', 'BillTo');
    this.validateBillingShipping('Shipping Information', 'ShipTo');

    errorToPush = { groupName: 'Delivery Method', validations: [] };
    this.checkRequired(this.checkoutForm, 'DeliveryTimeID', errorToPush, 'Delivery Method is required');
    if (errorToPush.validations.length) { this.errorList.push(errorToPush); }

    errorToPush = { groupName: 'Payment Information', validations: [] };
    var subFormGroup = this.checkoutForm.get('PaymentInfo');

    if(this.isPurchaseOrderSelected){
      this.checkRequired(subFormGroup, 'PONumber', errorToPush, 'Purchase Order Number is required');
      if (errorToPush.validations.length) { this.errorList.push(errorToPush); }
    }

    if(!this.isPurchaseOrderSelected){
      this.checkRequired(subFormGroup, 'CreditCardID', errorToPush, 'CreditCardID is required');
      if (errorToPush.validations.length) { this.errorList.push(errorToPush); }
    }

    if (this.errorList.length) {
      this.showValidationPopup();
    }
  }

  onCancelEditCreditCard(event) {
    this.showCreditCardForm = event;
    this.isCcVerifyForm = false;
  }

  onSuccessCreditCardVerification(event: number) {
    this.creditCardVerified = event && event !== 0;
    this.checkoutForm.patchValue({
      ...this.checkoutForm.value,
      PaymentInfo: {
        CreditCardID: event,
      },
    });
    this.showCreditCardForm = false;
  }

  onMultipleShipmentSelect(){
    this.checkoutForm.controls['PartialOK'].setValue(true);
  }

  onOneShipmentSelect(){
    this.checkoutForm.controls['PartialOK'].setValue(false);
  }

  onClickDeliveryTime(id: number) {
    this.checkoutForm.controls['DeliveryTimeID'].setValue(id);
    const checkoutData = this.checkoutForm.value;
    this.isDeliveryTimeFieldError = (checkoutData.ShipTo && (checkoutData.ShipTo.CountryID == null || typeof checkoutData.ShipTo.CountryID !== "number")) ? true : false;
  }

  showValidationPopup(): void {
    const modalRef = this.modalService.open(ValidationSummaryModalComponent, { size: 'lg' });
    modalRef.componentInstance.data = this.errorList;
    modalRef.componentInstance.header = CHECKOUT_ERROR_MODAL.header;
    modalRef.componentInstance.subHeader = CHECKOUT_ERROR_MODAL.subHeader;
  }

  validateBillingShipping(groupName: string, formGroupName: string) {
    const errorToPush: ErrorSummaryModel = { groupName: groupName, validations: [] };
    var subFormGroup = this.checkoutForm.get(formGroupName);
    if (subFormGroup.invalid) {
      if (formGroupName == 'ShipTo') { this.checkRequired(subFormGroup, 'Attention', errorToPush, 'Recipient / SHIP TO is required'); }
      this.checkRequired(subFormGroup, 'Company', errorToPush);
      this.checkRequired(subFormGroup, 'Address1', errorToPush, 'Company Address is required');
      this.checkRequired(subFormGroup, 'City', errorToPush);
      this.checkRequired(subFormGroup, 'Zip', errorToPush);
      this.checkRequired(subFormGroup, 'State', errorToPush);
      this.checkPattern(subFormGroup, 'State', errorToPush, 'Numeric characters are not allowed in State');
      this.checkInvalid(subFormGroup, 'State', errorToPush, 'State must be selected from the list');
      this.checkRequired(subFormGroup, 'CountryID', errorToPush, 'Country is required');
      this.checkInvalid(subFormGroup, 'CountryID', errorToPush, 'Country must be selected from the list');
      this.checkRequired(subFormGroup, 'Phone', errorToPush);
      if (errorToPush.validations.length) { this.errorList.push(errorToPush); }
    }
  }

  checkRequired(formGroup: any, fieldName: string, errorSummary: ErrorSummaryModel, customMessage?: string) {
    if (formGroup.get(fieldName).errors && formGroup.get(fieldName).errors.required) {
      errorSummary.validations.push(customMessage ? customMessage : `${fieldName} is required`);
    }
  }

  checkEmailRequired(formControl: FormControl, validationList: string[]) {
    if (formControl.errors) {
      if (formControl.errors.email) { validationList.push('Email is invalid'); }
      if (formControl.errors.required) { validationList.push('Email is required'); }
    }
  }

  checkPattern(formGroup: any, fieldName: string, errorSummary: ErrorSummaryModel, customMessage?: string) {
    if (formGroup.get(fieldName).errors && formGroup.get(fieldName).errors.pattern) {
      errorSummary.validations.push(customMessage ? customMessage : `${fieldName} is invalid`);
    }
  }

  checkInvalid(formGroup: any, fieldName: string, errorSummary: ErrorSummaryModel, customMessage?: string) {
    if (formGroup.get(fieldName).errors && formGroup.get(fieldName).errors.invalid) {
      errorSummary.validations.push(customMessage ? customMessage : `${fieldName} is invalid`);
    }
  }

  onSelectPurchaseOrder(){
    this.isPurchaseOrderSelected = true;
    this.checkoutForm.get('PaymentInfo.CreditCardID').clearValidators();
    this.checkoutForm.get('PaymentInfo.PONumber').setValidators(Validators.required);
    this.checkoutForm.get('PaymentInfo.CreditCardID').updateValueAndValidity();
    this.checkoutForm.get('PaymentInfo.PONumber').updateValueAndValidity();
  }

  onSelectCreditCard(){
    this.isPurchaseOrderSelected = false;
    this.checkoutForm.get('PaymentInfo.PONumber').clearValidators();
    this.checkoutForm.get('PaymentInfo.CreditCardID').setValidators(Validators.required);
    this.checkoutForm.get('PaymentInfo.CreditCardID').updateValueAndValidity();
    this.checkoutForm.get('PaymentInfo.PONumber').updateValueAndValidity();
  }

  onPayWithCreditCard() {
    this.showCreditCardForm = true;
    this.isCcVerifyForm = false;
  }

  setAddressFromUserInfo(): void {
    const billTo: BillToViewModel = {
      BillToID: 0,
      Company: this.webUser.Company,
      Address1: this.webUser.CompanyAddress,
      Address2: this.webUser.CompanyAddress2,
      City: this.webUser.City,
      Zip: this.webUser.ZipCode,
      State: this.webUser.State,
      CountryID: this.webUser.CountryID,
      Phone: this.webUser.WorkPhone,
      IsDefault: true,
      ShipTos: [
        {
          ShipToID: 0,
          Company: this.webUser.Company,
          Address1: this.webUser.CompanyAddress,
          Address2: this.webUser.CompanyAddress2,
          City: this.webUser.City,
          Zip: this.webUser.ZipCode,
          State: this.webUser.State,
          CountryID: this.webUser.CountryID,
          Phone: this.webUser.WorkPhone,
          IsDefault: true,
        }
      ]
    };
    this.billToViewModel.push(billTo);
    this.selectBillTo(billTo);
    this.selectShipTo(billTo.ShipTos[0]);
  }

  onChangeAddress(type: 'Billing' | 'Shipping') {
    const addressModalRef = this.modalService.open(CheckoutOrderAddressModalComponent, { size: 'lg', windowClass: 'change-pop-up-size' });
    addressModalRef.componentInstance.type = type;
    addressModalRef.componentInstance.countries = this.countries;
    addressModalRef.componentInstance.user = this.attention ? this.attention : this.webUser.FirstName;
    if (type == "Billing") {
      addressModalRef.componentInstance.billingAddressList = this.billToViewModel;
      addressModalRef.componentInstance.selectedAddressId = this.selectedBillToId;
    } else {
      addressModalRef.componentInstance.shippingAddressList = JSON.parse(JSON.stringify(this.selectedBillingAddress.ShipTos));
      addressModalRef.componentInstance.selectedAddressId = this.selectedShipToId;
    }

    addressModalRef.componentInstance.onSelectAddress.subscribe((d : any) => {
      if (d.type == 'Billing') {
        this.selectBillTo(d.address);
        addressModalRef.componentInstance.selectedAddressId = d.address.BillToID;
      } else {
        this.selectShipTo(d.address);
        addressModalRef.componentInstance.selectedAddressId = d.address.ShipToID;
      }
    });

    addressModalRef.componentInstance.onAddOrUpdateAddress.subscribe((d : any) => {
      if (d.type == 'Billing') {
        if (d.address.BillToId != null) {
          const index = this.billToViewModel.findIndex(c => c.BillToID == d.address.BillToId);
          if (index != -1) {
            let billToAddress = this.billToViewModel[index];
            billToAddress.Company = d.address.Company;
            billToAddress.Address1 = d.address.Address1;
            billToAddress.Address2 = d.address.Address2;
            billToAddress.City = d.address.City;
            billToAddress.Zip = d.address.Zip;
            billToAddress.State = d.address.State;
            billToAddress.CountryID = d.address.CountryID;
            billToAddress.Country = d.address.Country;
            billToAddress.Phone = d.address.Phone;
            billToAddress.BillToID = null;
            this.billToViewModel[index] = billToAddress;
            this.selectBillTo(billToAddress);
          }
        } else {
          var newBillToId = (this.billToViewModel.length) ? this.billToViewModel[this.billToViewModel.length-1].BillToID+1 : 0;
          const billToAddress = {
            BillToID: newBillToId,
            Company: d.address.Company,
            Address1: d.address.Address1,
            Address2: d.address.Address2,
            City: d.address.City,
            Zip: d.address.Zip,
            State: d.address.State,
            CountryID: d.address.CountryID,
            Phone: d.address.Phone,
            IsDefault: false,
            ShipTos: []
          };
          this.billToViewModel.push(billToAddress);
          this.selectedShippingAddress = null;
          this.deliveryTimeViewModel = [];
          this.checkoutForm.controls['ShipTo'].reset();
          this.addShippingAddressValidators();
          if (this.webUser) {
            this.checkoutForm.get('ShipTo').get('Attention').setValue(this.webUser.FirstName);
          }
          this.selectBillTo(billToAddress);
        }
        addressModalRef.componentInstance.selectedAddressId = d.address.BillToId;
      } else {
        if (d.address.ShipToId != null) {
          const index = this.selectedBillingAddress.ShipTos.findIndex(c => c.ShipToID == d.address.ShipToId);
          if (index != -1) {
            let shipToAddress = this.selectedBillingAddress.ShipTos[index];
            shipToAddress.Company = d.address.Company;
            shipToAddress.Address1 = d.address.Address1;
            shipToAddress.Address2 = d.address.Address2;
            shipToAddress.City = d.address.City;
            shipToAddress.State = d.address.State;
            shipToAddress.Zip = d.address.Zip;
            shipToAddress.CountryID = d.address.CountryID;
            shipToAddress.Country = d.address.Country;
            shipToAddress.Phone = d.address.Phone;
            shipToAddress.IsDefault = d.address.IsDefault;
            shipToAddress.ShipToID = null;
            this.selectedBillingAddress.ShipTos[index] = shipToAddress;
            this.selectShipTo(shipToAddress, d.address.Attention);
          }
        } else {
          var newShipToId = (this.selectedBillingAddress.ShipTos.length) ? this.selectedBillingAddress.ShipTos[this.selectedBillingAddress.ShipTos.length-1].ShipToID+1 : 0;
          const shipToAddress = {
            ShipToID: newShipToId,
            Company: d.address.Company,
            Address1: d.address.Address1,
            Address2: d.address.Address2,
            City: d.address.City,
            State: d.address.State,
            Zip: d.address.Zip,
            CountryID: d.address.CountryID,
            Country: d.address.Country,
            Phone: d.address.Phone,
            IsDefault: d.address.IsDefault,
          }
          this.selectedBillingAddress.ShipTos.push(shipToAddress);
          this.selectShipTo(shipToAddress, d.address.Attention);
        }
        addressModalRef.componentInstance.selectedAddressId = d.address.ShipToId;
      }
    });

    addressModalRef.componentInstance.onDeleteAddress.subscribe((d: any) => {
      if (d.type == 'Billing') {
        const index = this.billToViewModel.findIndex(t => t.BillToID == d.address.BillToID);
        if (index > -1) {
          this.billToViewModel.splice(index,1);
          addressModalRef.componentInstance.billingAddressList = this.billToViewModel;
          addressModalRef.componentInstance.selectedAddressId = this.selectedBillToId;
        }
      } else {
        const index = this.selectedBillingAddress.ShipTos.findIndex(t => t.ShipToID == d.address.ShipToID);
        if (index > -1) {
          this.selectedBillingAddress.ShipTos.splice(index,1);
          addressModalRef.componentInstance.shippingAddressList = this.selectedBillingAddress.ShipTos;
          addressModalRef.componentInstance.selectedAddressId = this.selectedShipToId;
        }
      }
    });
  }
}
