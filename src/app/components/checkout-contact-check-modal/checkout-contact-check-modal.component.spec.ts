import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { CheckoutContactCheckModalComponent } from './checkout-contact-check-modal.component';

describe('CheckoutContactCheckModalComponent', () => {
  let component: CheckoutContactCheckModalComponent;
  let fixture: ComponentFixture<CheckoutContactCheckModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ JssModule.forRoot() ],
      declarations: [ CheckoutContactCheckModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutContactCheckModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
