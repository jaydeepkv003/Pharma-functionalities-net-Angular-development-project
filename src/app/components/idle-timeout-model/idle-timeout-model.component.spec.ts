import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdleTimeoutModelComponent } from './idle-timeout-model.component';

describe('IdleTimeoutModelComponent', () => {
  let component: IdleTimeoutModelComponent;
  let fixture: ComponentFixture<IdleTimeoutModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdleTimeoutModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdleTimeoutModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
