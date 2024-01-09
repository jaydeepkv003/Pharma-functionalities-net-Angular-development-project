import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { CheckoutOrderAddressModalComponent } from './checkout-order-address-modal.component';

describe('CheckoutOrderAddressModalComponent', () => {
  let component: CheckoutOrderAddressModalComponent;
  let fixture: ComponentFixture<CheckoutOrderAddressModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ JssModule.forRoot() ],
      declarations: [ CheckoutOrderAddressModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutOrderAddressModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
