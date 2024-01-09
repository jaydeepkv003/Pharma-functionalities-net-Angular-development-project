import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { BillToViewModel, CountryViewModel, ShipToViewModel } from '../../api/phr-webapi/models';
import { COUNTRIES } from '../../models/app-constants';

@Component({
  selector: 'app-checkout-order-address-modal',
  templateUrl: './checkout-order-address-modal.component.html',
  styleUrls: ['./checkout-order-address-modal.component.scss']
})
export class CheckoutOrderAddressModalComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  @Input() type: string;
  @Input() user: string;
  @Input() billingAddressList: Array<BillToViewModel> = [];
  @Input() shippingAddressList: Array<ShipToViewModel> = [];
  @Input() selectedAddressId: number;
  @Input() countries: Array<CountryViewModel> = [];

  @Input() set editAddress(address: any) {
    setTimeout(() => {
      this.pageType = '';
      this.onEditAddress(address);
    }, 100);
  }

  @Output() onSelectAddress = new EventEmitter<any>();
  @Output() onAddOrUpdateAddress = new EventEmitter<any>();
  @Output() onDeleteAddress = new EventEmitter<any>();

  stateList: Array<string> = [];
  isFormSubmitted: boolean = false;
  pageType: 'Select' | 'Add New' | 'Edit' | 'Delete' | '' = 'Select';
  selectedForDelete: any;
  newSelectedAddress : any = null;
  beforeUpdateId : any;
  shouldDisableUseAddress : boolean = true;


  billToForm: FormGroup;
  shipToForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // remove this after implementation is done
    console.log('CheckoutOrderAddressModal component initialized with component data', this.rendering);

    this.beforeUpdateId = this.selectedAddressId;
    this.billToForm = this.formBuilder.group({
      DefaultBillToId: [''],
      BillToId: [null],
      Company: ['', Validators.required],
      Address1: ['', Validators.required],
      Address2: [''],
      City: ['', Validators.required],
      Zip: ['', Validators.required],
      State: ['', Validators.compose([Validators.required, Validators.pattern('^[^0-9]*$')])],
      CountryID: ['', Validators.required],
      Phone: ['', Validators.required]
    });

    this.shipToForm = this.formBuilder.group({
      Attention: ['', Validators.required],
      DefaultShipToId: [''],
      ShipToId: [null],
      Company: [''],
      Address1: ['', Validators.required],
      Address2: [''],
      City: ['', Validators.required],
      Zip: ['', Validators.required],
      State: ['', [Validators.required, Validators.pattern('^[^0-9]*$')]],
      CountryID: ['', Validators.required],
      Phone: ['', Validators.required]
    });

    this.billToForm.get('CountryID')!.valueChanges.subscribe(countryId => {
      if(countryId){
        this.billToForm.controls['State'].reset();
        this.stateList = [];
        if (countryId) {
          let country = COUNTRIES.find(y => y.id === countryId);
          if (country) {
            this.stateList = country.states;
          }
        }
      }
    });

    this.shipToForm.get('CountryID')!.valueChanges.subscribe(countryId => {
      if(countryId){
        this.shipToForm.controls['State'].reset();
        this.stateList = [];
        if (countryId) {
          let country = COUNTRIES.find(y => y.id === countryId);
          if (country) {
            this.stateList = country.states;
          }
        }
      }
    });
  }

  selectAddress(address: any): void {
    if(this.type=='Billing'){
      this.selectedAddressId = address.BillToID;
      if(this.beforeUpdateId === address.BillToID) this.shouldDisableUseAddress = true;
      else this.shouldDisableUseAddress = false;
    }
    else if(this.type=='Shipping'){
      this.selectedAddressId = address.ShipToID;
      if(this.beforeUpdateId === address.ShipToID) this.shouldDisableUseAddress = true;
      else this.shouldDisableUseAddress = false;
    }
    this.newSelectedAddress = { address: address, type: this.type };
  }

  useAddress() : void{
    if (this.type == 'Billing' && this.newSelectedAddress.BillToID != this.selectedAddressId) {
      this.onSelectAddress.emit(this.newSelectedAddress);
      this.activeModal.close();
    } else if (this.type == 'Shipping' && this.newSelectedAddress.ShipToID != this.selectedAddressId) {
      this.onSelectAddress.emit(this.newSelectedAddress);
      this.activeModal.close();
    }
    this.shouldDisableUseAddress = true;
  }

  onAddNewAddress() {
    if (this.type == 'Billing') {
      this.billToForm.reset();
    } else {
      this.shipToForm.reset();
      this.shipToForm.controls['Attention'].setValue(this.user);
    }
    this.pageType = 'Add New';
  }

  onEditAddress(address: any) {
    if (this.type == 'Billing') {
      this.billToForm.reset();
      this.billToForm.patchValue(address);
      this.billToForm.patchValue({State : address['State']});
      if (address.BillToID != null) {
        this.billToForm.controls['BillToId'].setValue(address.BillToID);
      }
    } else {
      this.shipToForm.reset();
      if (!address.Attention) {
        address.Attention = this.user;
      }
      this.shipToForm.patchValue(address);
      this.shipToForm.patchValue({State: address['State']});
      if (address.ShipToID != null) {
        this.shipToForm.controls['ShipToId'].setValue(address.ShipToID);
      }
    }
    this.pageType = 'Edit';
  }

  onClickDeleteAddress(i:number) {
    this.selectedForDelete = i;
    this.pageType = 'Delete';
  }

  onDeleteConfirm() {
    if (this.type == 'Billing') {
      const data = { address: this.billingAddressList[this.selectedForDelete], type: this.type };
      this.onDeleteAddress.emit(data);
    } else {
      const data = { address: this.shippingAddressList[this.selectedForDelete], type: this.type };
      this.onDeleteAddress.emit(data);
    }
    this.pageType = 'Select';
  }

  onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.type == 'Billing') {
      if (this.billToForm.valid) {
        const data = { address: this.billToForm.value, type: this.type };
        this.onAddOrUpdateAddress.emit(data);
        this.activeModal.close();
      }
    } else {
      if (this.shipToForm.valid) {
        const data = { address: this.shipToForm.value, type: this.type };
        this.onAddOrUpdateAddress.emit(data);
        this.activeModal.close();
      }
    }
  }

  get billTo() {
    return this.billToForm.controls;
  }

  get shipTo() {
    return this.shipToForm.controls;
  }

}
