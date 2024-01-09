import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { ErrorSummaryModel } from '../../models/webuser/ErrorSummaryModel';

@Component({
  selector: 'app-validation-summary-modal',
  templateUrl: './validation-summary-modal.component.html',
  styleUrls: ['./validation-summary-modal.component.css']
})
export class ValidationSummaryModalComponent {
  @Input() rendering: ComponentRendering;
  @Input() header: string;
  @Input() subHeader: string;
  @Input() data: ErrorSummaryModel[] = [];

  constructor(public activeModal: NgbActiveModal) { }
}
