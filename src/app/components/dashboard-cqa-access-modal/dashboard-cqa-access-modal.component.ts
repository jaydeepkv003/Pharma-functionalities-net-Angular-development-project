import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { AuthService } from '../_core/auth.service';

@Component({
  selector: 'app-dashboard-cqa-access-modal',
  templateUrl: './dashboard-cqa-access-modal.component.html',
  styleUrls: ['./dashboard-cqa-access-modal.component.scss']
})
export class DashboardCqaAccessModalComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  claims: object;

  constructor(public activeModal: NgbActiveModal,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.claims = this.authService.identityClaims;
  }

  close() {
    this.activeModal.close('closed');
  }
}
