import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { CorporateBannerVideoControlComponent } from './corporate-banner-video-control.component';

describe('CorporateBannerVideoControlComponent', () => {
  let component: CorporateBannerVideoControlComponent;
  let fixture: ComponentFixture<CorporateBannerVideoControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ JssModule.forRoot() ],
      declarations: [ CorporateBannerVideoControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateBannerVideoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
