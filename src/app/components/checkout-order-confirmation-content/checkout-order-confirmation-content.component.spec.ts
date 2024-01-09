import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { CheckoutOrderConfirmationContentComponent } from './checkout-order-confirmation-content.component';

describe('CheckoutOrderConfirmationContentComponent', () => {
  let component: CheckoutOrderConfirmationContentComponent;
  let fixture: ComponentFixture<CheckoutOrderConfirmationContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ JssModule.forRoot() ],
      declarations: [ CheckoutOrderConfirmationContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutOrderConfirmationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
