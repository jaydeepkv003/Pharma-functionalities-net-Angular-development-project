import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCqaFormComponent } from './dashboard-cqa-form.component';

describe('DashboardCqaFormComponent', () => {
  let component: DashboardCqaFormComponent;
  let fixture: ComponentFixture<DashboardCqaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCqaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCqaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
