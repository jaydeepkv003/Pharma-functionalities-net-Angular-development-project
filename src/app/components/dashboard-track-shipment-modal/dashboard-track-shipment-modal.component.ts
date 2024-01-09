import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderShipmentViewModel } from '../../api/phr-webapi/models';


@Component({
  selector: 'app-dashboard-track-shipment-modal',
  templateUrl: './dashboard-track-shipment-modal.component.html',
  styleUrls: ['./dashboard-track-shipment-modal.component.scss']
})
export class DashboardTrackShipmentModalComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  @Input() trackShipmentRes: OrderShipmentViewModel;
  @Input() orderNumber;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }
}
