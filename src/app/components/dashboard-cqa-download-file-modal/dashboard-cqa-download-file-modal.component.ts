import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CertificateBlobViewModel } from '../../api/phr-webapi/models';
import { AuthService } from '../_core/auth.service';

@Component({
  selector: 'app-dashboard-cqa-download-file-modal',
  templateUrl: './dashboard-cqa-download-file-modal.component.html',
  styleUrls: ['./dashboard-cqa-download-file-modal.component.scss']
})
export class DashboardCqaDownloadFileModalComponent implements OnInit {
  @Input() certificateBlob: CertificateBlobViewModel[] = [];
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
