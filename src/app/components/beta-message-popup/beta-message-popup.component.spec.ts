import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetaMessagePopupComponent } from './beta-message-popup.component';

describe('BetaMessagePopupComponent', () => {
  let component: BetaMessagePopupComponent;
  let fixture: ComponentFixture<BetaMessagePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetaMessagePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetaMessagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
