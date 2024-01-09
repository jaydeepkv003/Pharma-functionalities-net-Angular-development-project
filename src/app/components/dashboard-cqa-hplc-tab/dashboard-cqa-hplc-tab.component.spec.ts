import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCqaHplcTabComponent } from './dashboard-cqa-hplc-tab.component';

describe('DashboardCqaHplcTabComponent', () => {
  let component: DashboardCqaHplcTabComponent;
  let fixture: ComponentFixture<DashboardCqaHplcTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCqaHplcTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCqaHplcTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
