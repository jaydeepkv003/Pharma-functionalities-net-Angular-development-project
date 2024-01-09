import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { CheckoutOrderContactModalComponent } from './checkout-order-contact-modal.component';

describe('CheckoutOrderContactModalComponent', () => {
  let component: CheckoutOrderContactModalComponent;
  let fixture: ComponentFixture<CheckoutOrderContactModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ JssModule.forRoot() ],
      declarations: [ CheckoutOrderContactModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutOrderContactModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
