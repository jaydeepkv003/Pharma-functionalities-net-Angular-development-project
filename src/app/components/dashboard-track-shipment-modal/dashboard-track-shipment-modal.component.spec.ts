import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { DashboardTrackShipmentModalComponent } from './dashboard-track-shipment-modal.component';

describe('DashboardTrackShipmentModalComponent', () => {
  let component: DashboardTrackShipmentModalComponent;
  let fixture: ComponentFixture<DashboardTrackShipmentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ JssModule.forRoot() ],
      declarations: [ DashboardTrackShipmentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTrackShipmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
