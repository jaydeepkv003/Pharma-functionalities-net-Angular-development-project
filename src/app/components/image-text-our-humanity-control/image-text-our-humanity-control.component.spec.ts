import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { ImageTextOurHumanityControlComponent } from './image-text-our-humanity-control.component';

describe('ImageTextOurHumanityControlComponent', () => {
  let component: ImageTextOurHumanityControlComponent;
  let fixture: ComponentFixture<ImageTextOurHumanityControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ JssModule.forRoot() ],
      declarations: [ ImageTextOurHumanityControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTextOurHumanityControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
