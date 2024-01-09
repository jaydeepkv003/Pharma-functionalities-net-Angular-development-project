import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageBannerModalComponent } from './homepage-banner-modal.component';

describe('HomepageBannerModalComponent', () => {
  let component: HomepageBannerModalComponent;
  let fixture: ComponentFixture<HomepageBannerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageBannerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageBannerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
