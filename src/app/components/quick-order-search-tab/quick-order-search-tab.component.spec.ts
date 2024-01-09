import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuickOrderSearchTabComponent } from './quick-order-search-tab.component';

describe('QuickOrderSearchTabComponent', () => {
  let component: QuickOrderSearchTabComponent;
  let fixture: ComponentFixture<QuickOrderSearchTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickOrderSearchTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickOrderSearchTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
