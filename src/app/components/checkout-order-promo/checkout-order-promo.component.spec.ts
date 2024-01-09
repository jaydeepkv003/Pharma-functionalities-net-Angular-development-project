import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutOrderPromoComponent } from './checkout-order-promo.component';

describe('CheckoutOrderPromoComponent', () => {
  let component: CheckoutOrderPromoComponent;
  let fixture: ComponentFixture<CheckoutOrderPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutOrderPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutOrderPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
